import { GuestTag } from "@/backend";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useHotelStore } from "@/store/useHotelStore";
import type { Booking, Guest } from "@/types/index";
import {
  Building2,
  Calendar,
  Crown,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Star,
  Tag,
  User,
  UserCog,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ────────────────────────────────────────────────────────────────
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function fmtDate(ts: bigint | undefined): string {
  if (!ts) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(Number(ts)));
}

function fmtCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function nightsBetween(checkIn: bigint, checkOut: bigint): number {
  const diff = Number(checkOut) - Number(checkIn);
  return Math.max(1, Math.round(diff / 86400000));
}

// ─── Tag config ─────────────────────────────────────────────────────────────
const TAG_CONFIG: Record<GuestTag, { label: string; classes: string }> = {
  [GuestTag.VIP]: {
    label: "VIP",
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30 font-semibold",
  },
  [GuestTag.Corporate]: {
    label: "Corporate",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  [GuestTag.Regular]: {
    label: "Regular",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  [GuestTag.New]: {
    label: "New",
    classes: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  },
};

function GuestTagBadge({ tag }: { tag: GuestTag }) {
  const cfg = TAG_CONFIG[tag];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.classes}`}
    >
      {tag === GuestTag.VIP && <Crown className="w-2.5 h-2.5" />}
      {cfg.label}
    </span>
  );
}

// ─── Mock communication log ─────────────────────────────────────────────────
interface CommLog {
  date: string;
  type: "Email" | "SMS";
  subject: string;
  status: "Sent" | "Delivered";
}

function getCommLogs(guestId: bigint): CommLog[] {
  const base = [
    {
      date: "12 Mar 2026",
      type: "Email" as const,
      subject: "Booking Confirmation – Grand Meridian",
      status: "Delivered" as const,
    },
    {
      date: "10 Mar 2026",
      type: "SMS" as const,
      subject: "Check-in reminder: Tomorrow at 14:00",
      status: "Delivered" as const,
    },
    {
      date: "5 Feb 2026",
      type: "Email" as const,
      subject: "Thank you for your stay! Rate your experience",
      status: "Sent" as const,
    },
    {
      date: "18 Jan 2026",
      type: "Email" as const,
      subject: "Exclusive member offer – 20% off next stay",
      status: "Delivered" as const,
    },
    {
      date: "1 Jan 2026",
      type: "SMS" as const,
      subject: "Happy New Year from Grand Meridian",
      status: "Sent" as const,
    },
  ];
  // Rotate based on guestId for variety
  const offset = Number(guestId) % 3;
  return base.slice(offset, offset + 3).concat(base.slice(0, offset));
}

// ─── Types ───────────────────────────────────────────────────────────────────
type FilterTag = "All" | GuestTag;

interface GuestFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  tags: GuestTag[];
}

const BLANK_FORM: GuestFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  country: "",
  tags: [],
};

// ─── Guest List Item ─────────────────────────────────────────────────────────
function GuestListItem({
  guest,
  bookings,
  selected,
  onClick,
  index,
}: {
  guest: Guest;
  bookings: Booking[];
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  const guestBookings = bookings.filter((b) => b.guestId === guest.id);
  const lastStay =
    guestBookings.length > 0
      ? guestBookings.reduce((a, b) => (a.checkOut > b.checkOut ? a : b))
      : null;

  return (
    <button
      type="button"
      data-ocid={`guest-crm.guest-list.item.${index}`}
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 ${
        selected
          ? "bg-primary/10 border-primary/40 shadow-sm"
          : "bg-card border-border hover:bg-muted/50 hover:border-primary/20"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary">
            {getInitials(guest.name)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-semibold text-foreground truncate">
              {guest.name}
            </span>
            {guest.tags.includes(GuestTag.VIP) && (
              <Crown className="w-3 h-3 text-amber-400 shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {guest.email}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {guest.tags.slice(0, 2).map((tag) => (
              <GuestTagBadge key={tag} tag={tag} />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
            {lastStay && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {fmtDate(lastStay.checkOut)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400" />
              {guest.loyaltyPoints.toString()}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-muted/40 border border-border rounded-lg p-4 text-center">
      <div
        className={`text-2xl font-bold ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

// ─── Add / Edit Guest Modal ───────────────────────────────────────────────────
function GuestModal({
  open,
  onClose,
  initial,
  onSubmit,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  initial: GuestFormData;
  onSubmit: (data: GuestFormData) => void;
  mode: "add" | "edit";
}) {
  const [form, setForm] = useState<GuestFormData>(initial);

  // Reset when initial changes (for edit)
  const handleOpen = () => setForm(initial);

  function toggleTag(tag: GuestTag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }

  function handleSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Name, email, and phone are required.");
      return;
    }
    onSubmit(form);
    onClose();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
        else handleOpen();
      }}
    >
      <DialogContent
        data-ocid={`guest-crm.${mode}-guest.dialog`}
        className="max-w-md bg-card border-border"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground font-display">
            {mode === "add" ? "Add New Guest" : "Edit Guest Profile"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-foreground">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                data-ocid={`guest-crm.${mode}-guest.name-input`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Arjun Mehta"
                className="bg-background border-input text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                data-ocid={`guest-crm.${mode}-guest.email-input`}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                className="bg-background border-input text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                data-ocid={`guest-crm.${mode}-guest.phone-input`}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98xxx xxxxx"
                className="bg-background border-input text-foreground"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-foreground">Address</Label>
              <Input
                data-ocid={`guest-crm.${mode}-guest.address-input`}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="City, State"
                className="bg-background border-input text-foreground"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-foreground">Country</Label>
              <Input
                data-ocid={`guest-crm.${mode}-guest.country-input`}
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder="India"
                className="bg-background border-input text-foreground"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Tags</Label>
            <div className="flex gap-3 flex-wrap">
              {Object.values(GuestTag).map((tag) => (
                <label
                  key={tag}
                  htmlFor={`tag-${mode}-${tag}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    id={`tag-${mode}-${tag}`}
                    data-ocid={`guest-crm.${mode}-guest.tag-${tag.toLowerCase()}`}
                    checked={form.tags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                    className="border-input"
                  />
                  <GuestTagBadge tag={tag} />
                </label>
              ))}
            </div>
          </div>
          <Separator className="bg-border" />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              data-ocid={`guest-crm.${mode}-guest.cancel-button`}
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid={`guest-crm.${mode}-guest.submit-button`}
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {mode === "add" ? "Add Guest" : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Guest Profile Panel ──────────────────────────────────────────────────────
function GuestProfile({
  guest,
  bookings,
  hotels,
  rooms,
  onUpdate,
}: {
  guest: Guest;
  bookings: Booking[];
  hotels: { id: bigint; name: string }[];
  rooms: { id: bigint; roomType: string }[];
  onUpdate: (updated: Guest) => void;
}) {
  const guestBookings = bookings.filter((b) => b.guestId === guest.id);
  const [notes, setNotes] = useState(guest.notes);
  const [editOpen, setEditOpen] = useState(false);

  const totalSpent = guestBookings.reduce((sum, b) => {
    const room = rooms.find((r) => r.id === b.roomId);
    const nights = nightsBetween(b.checkIn, b.checkOut);
    // Approximate price from room (not available, so use 6000 avg)
    return sum + (room ? nights * 6000 : 0);
  }, 0);

  const avgNights =
    guestBookings.length > 0
      ? Math.round(
          guestBookings.reduce(
            (s, b) => s + nightsBetween(b.checkIn, b.checkOut),
            0,
          ) / guestBookings.length,
        )
      : 0;

  function handleSaveNotes() {
    onUpdate({ ...guest, notes });
    toast.success("Notes saved successfully.");
  }

  function handleEdit(data: GuestFormData) {
    onUpdate({
      ...guest,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      country: data.country,
      tags: data.tags,
    });
    toast.success("Guest profile updated.");
  }

  const editInitial: GuestFormData = {
    name: guest.name,
    email: guest.email,
    phone: guest.phone,
    address: guest.address,
    country: guest.country,
    tags: [...guest.tags],
  };

  const commLogs = getCommLogs(guest.id);

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-primary">
                {getInitials(guest.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-foreground font-display leading-tight">
                {guest.name}
              </h2>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {guest.tags.map((tag) => (
                  <GuestTagBadge key={tag} tag={tag} />
                ))}
              </div>
            </div>
            <Button
              type="button"
              data-ocid="guest-crm.edit-guest.open_modal_button"
              variant="outline"
              size="sm"
              onClick={() => setEditOpen(true)}
              className="border-border text-foreground hover:bg-muted shrink-0"
            >
              <UserCog className="w-3.5 h-3.5 mr-1.5" />
              Edit Profile
            </Button>
          </div>

          {/* Contact Info */}
          <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-2.5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: Mail, value: guest.email },
                { icon: Phone, value: guest.phone },
                { icon: MapPin, value: guest.address || "—" },
                { icon: Globe, value: guest.country || "—" },
                {
                  icon: Calendar,
                  value: `Member since ${fmtDate(guest.createdAt)}`,
                },
              ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-2.5 text-sm">
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground truncate">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Loyalty & Stats */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Loyalty & Stats
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <StatCard
                label="Loyalty Pts"
                value={guest.loyaltyPoints.toString()}
                highlight
              />
              <StatCard
                label="Total Stays"
                value={String(guestBookings.length)}
              />
              <StatCard
                label="Total Spent"
                value={totalSpent > 0 ? fmtCurrency(totalSpent) : "—"}
              />
              <StatCard
                label="Avg Nights"
                value={avgNights > 0 ? `${avgNights}n` : "—"}
              />
            </div>
          </div>

          {/* Stay History */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Stay History
            </h3>
            {guestBookings.length === 0 ? (
              <div
                data-ocid="guest-crm.stay-history.empty_state"
                className="text-center py-6 text-muted-foreground text-sm"
              >
                No bookings found for this guest.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      {[
                        "Booking ID",
                        "Hotel",
                        "Room Type",
                        "Check-in",
                        "Check-out",
                        "Nights",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2.5 text-left font-semibold text-muted-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guestBookings.map((b, i) => {
                      const hotel = hotels.find((h) => h.id === b.hotelId);
                      const room = rooms.find((r) => r.id === b.roomId);
                      const nights = nightsBetween(b.checkIn, b.checkOut);
                      return (
                        <tr
                          key={b.id.toString()}
                          data-ocid={`guest-crm.stay-history.item.${i + 1}`}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-3 py-2.5 text-muted-foreground font-mono">
                            #{b.id.toString()}
                          </td>
                          <td className="px-3 py-2.5 text-foreground">
                            {hotel?.name
                              .replace("The Grand Meridian", "Grand Meridian")
                              .replace("Azure Beach Resort", "Azure Beach")
                              .replace("Highland Retreat", "Highland") ?? "—"}
                          </td>
                          <td className="px-3 py-2.5 text-foreground">
                            {room?.roomType ?? "—"}
                          </td>
                          <td className="px-3 py-2.5 text-foreground">
                            {fmtDate(b.checkIn)}
                          </td>
                          <td className="px-3 py-2.5 text-foreground">
                            {fmtDate(b.checkOut)}
                          </td>
                          <td className="px-3 py-2.5 text-right text-foreground">
                            {nights}
                          </td>
                          <td className="px-3 py-2.5">
                            <StatusBadge status={b.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Preferences
            </h3>
            <div className="bg-muted/30 border border-border rounded-lg p-4">
              {guest.preferences ? (
                <p className="text-sm text-foreground leading-relaxed">
                  {guest.preferences}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No preferences on record.
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Internal Notes
            </h3>
            <Textarea
              data-ocid="guest-crm.notes.textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add notes about this guest..."
              className="bg-background border-input text-foreground text-sm resize-none"
            />
            <Button
              type="button"
              data-ocid="guest-crm.notes.save-button"
              size="sm"
              onClick={handleSaveNotes}
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Notes
            </Button>
          </div>

          {/* Communication Log */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Communication Log
              </h3>
              <Button
                type="button"
                data-ocid="guest-crm.comm-log.new-button"
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.success("Communication drafted. Feature coming soon.");
                }}
                className="border-border text-foreground hover:bg-muted text-xs h-7"
              >
                <Plus className="w-3 h-3 mr-1" />
                New Communication
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    {["Date", "Type", "Subject / Message", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-3 py-2.5 text-left font-semibold text-muted-foreground"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {commLogs.map((log, i) => (
                    <tr
                      key={`${log.date}-${i}`}
                      data-ocid={`guest-crm.comm-log.item.${i + 1}`}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap">
                        {log.date}
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                            log.type === "Email"
                              ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                              : "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                          }`}
                        >
                          <MessageSquare className="w-2.5 h-2.5" />
                          {log.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-foreground max-w-[220px] truncate">
                        {log.subject}
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                            log.status === "Delivered"
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                              : "bg-amber-500/15 text-amber-400 border-amber-500/25"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Edit modal */}
      <GuestModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initial={editInitial}
        onSubmit={handleEdit}
        mode="edit"
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GuestCRMPage() {
  const guests = useHotelStore((s) => s.guests);
  const bookings = useHotelStore((s) => s.bookings);
  const hotels = useHotelStore((s) => s.hotels);
  const rooms = useHotelStore((s) => s.rooms);
  const addGuest = useHotelStore((s) => s.addGuest);
  const updateGuest = useHotelStore((s) => s.updateGuest);

  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState<FilterTag>("All");
  const [selectedGuestId, setSelectedGuestId] = useState<bigint | null>(
    guests.length > 0 ? guests[0].id : null,
  );
  const [addOpen, setAddOpen] = useState(false);

  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q) ||
        g.phone.includes(q);
      const matchTag =
        filterTag === "All" || g.tags.includes(filterTag as GuestTag);
      return matchSearch && matchTag;
    });
  }, [guests, search, filterTag]);

  const selectedGuest = selectedGuestId
    ? (guests.find((g) => g.id === selectedGuestId) ?? null)
    : null;

  function handleAddGuest(data: GuestFormData) {
    const newId = BigInt(Math.max(...guests.map((g) => Number(g.id))) + 1);
    addGuest({
      id: newId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      country: data.country,
      tags: data.tags,
      loyaltyPoints: 0n,
      preferences: "",
      notes: "",
      createdAt: BigInt(Date.now()),
    });
    setSelectedGuestId(newId);
    toast.success(`Guest "${data.name}" added successfully.`);
  }

  const filterTabs: FilterTag[] = [
    "All",
    GuestTag.VIP,
    GuestTag.Corporate,
    GuestTag.Regular,
    GuestTag.New,
  ];

  return (
    <div
      data-ocid="guest-crm.page"
      className="h-[calc(100vh-4rem)] flex flex-col"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground font-display">
            Guest CRM
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {guests.length} guests · loyalty, profiles &amp; communication
          </p>
        </div>
        <Button
          type="button"
          data-ocid="guest-crm.add-guest.open_modal_button"
          onClick={() => setAddOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add Guest
        </Button>
      </div>

      {/* Two-panel layout */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left panel — Guest Directory */}
        <div className="w-80 shrink-0 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                data-ocid="guest-crm.search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone…"
                className="pl-8 h-8 text-xs bg-background border-input text-foreground"
              />
            </div>
          </div>

          {/* Filter pills */}
          <div className="px-3 py-2 border-b border-border flex gap-1.5 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                type="button"
                key={tab}
                data-ocid={`guest-crm.filter.${tab.toLowerCase()}`}
                onClick={() => setFilterTag(tab)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${
                  filterTag === tab
                    ? "bg-primary/20 border-primary/40 text-primary"
                    : "bg-muted/40 border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Count */}
          <div className="px-4 py-1.5 border-b border-border">
            <span className="text-xs text-muted-foreground">
              {filteredGuests.length} of {guests.length} guests
            </span>
          </div>

          {/* List */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1.5">
              {filteredGuests.length === 0 ? (
                <div
                  data-ocid="guest-crm.guest-list.empty_state"
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  No guests match your search.
                </div>
              ) : (
                filteredGuests.map((guest, i) => (
                  <GuestListItem
                    key={guest.id.toString()}
                    guest={guest}
                    bookings={bookings}
                    selected={selectedGuestId === guest.id}
                    onClick={() => setSelectedGuestId(guest.id)}
                    index={i + 1}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Right panel — Guest Profile */}
        <div className="flex-1 min-w-0 bg-card border border-border rounded-xl overflow-hidden">
          {selectedGuest ? (
            <GuestProfile
              key={selectedGuest.id.toString()}
              guest={selectedGuest}
              bookings={bookings}
              hotels={hotels}
              rooms={rooms.map((r) => ({ id: r.id, roomType: r.roomType }))}
              onUpdate={updateGuest}
            />
          ) : (
            <div
              data-ocid="guest-crm.profile.empty_state"
              className="h-full flex flex-col items-center justify-center text-center p-10"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-primary/40" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Select a Guest
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Choose a guest from the directory to view their profile, stay
                history, and communication log.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Guest Modal */}
      <GuestModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        initial={BLANK_FORM}
        onSubmit={handleAddGuest}
        mode="add"
      />
    </div>
  );
}

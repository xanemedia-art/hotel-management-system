import { StaffRole, StaffStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useHotelStore } from "@/store/useHotelStore";
import type { Hotel, Staff } from "@/types/index";
import {
  Bell,
  Building2,
  Check,
  CircleDot,
  Edit2,
  Mail,
  Phone,
  Plus,
  Shield,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type UserRole = "Admin" | "Manager" | "FrontDesk" | "Housekeeping";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hotelId: bigint;
  status: boolean;
}

interface RoomTypeRow {
  type: string;
  basePrice: number;
  capacity: number;
  totalRooms: number;
  active: boolean;
}

interface NotificationItem {
  key: string;
  label: string;
  value: boolean;
}

interface NotificationGroup {
  label: string;
  items: NotificationItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLE_COLORS: Record<UserRole, string> = {
  Admin: "bg-red-500/20 text-red-400 border-red-500/30",
  Manager: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  FrontDesk: "bg-green-500/20 text-green-400 border-green-500/30",
  Housekeeping: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const ROLE_LABELS: Record<UserRole, string> = {
  Admin: "Admin",
  Manager: "Manager",
  FrontDesk: "Front Desk",
  Housekeeping: "Housekeeping",
};

type Permission = "full" | "view" | "none";

const PERMISSIONS_MATRIX: Record<string, Record<UserRole, Permission>> = {
  Dashboard: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "view",
    Housekeeping: "view",
  },
  Reservations: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "full",
    Housekeeping: "none",
  },
  "Front Desk": {
    Admin: "full",
    Manager: "full",
    FrontDesk: "full",
    Housekeeping: "none",
  },
  Housekeeping: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "view",
    Housekeeping: "full",
  },
  Billing: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "full",
    Housekeeping: "none",
  },
  "Channel Manager": {
    Admin: "full",
    Manager: "full",
    FrontDesk: "none",
    Housekeeping: "none",
  },
  Reports: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "view",
    Housekeeping: "none",
  },
  CRM: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "view",
    Housekeeping: "none",
  },
  Settings: {
    Admin: "full",
    Manager: "none",
    FrontDesk: "none",
    Housekeeping: "none",
  },
};

const ROLE_COLUMNS: UserRole[] = [
  "Admin",
  "Manager",
  "FrontDesk",
  "Housekeeping",
];

const DEFAULT_ROOM_TYPES: RoomTypeRow[] = [
  {
    type: "Standard",
    basePrice: 4500,
    capacity: 2,
    totalRooms: 8,
    active: true,
  },
  { type: "Deluxe", basePrice: 7200, capacity: 2, totalRooms: 6, active: true },
  { type: "Suite", basePrice: 14000, capacity: 4, totalRooms: 4, active: true },
  {
    type: "Presidential",
    basePrice: 35000,
    capacity: 4,
    totalRooms: 2,
    active: true,
  },
];

const DEFAULT_NOTIFICATIONS: NotificationGroup[] = [
  {
    label: "Booking Notifications",
    items: [
      { key: "booking_created", label: "New booking created", value: true },
      { key: "booking_cancelled", label: "Booking cancelled", value: true },
      { key: "booking_modified", label: "Booking modified", value: false },
    ],
  },
  {
    label: "Operations",
    items: [
      { key: "guest_checkin", label: "Guest check-in", value: true },
      { key: "guest_checkout", label: "Guest check-out", value: true },
      {
        key: "housekeeping_task_due",
        label: "Housekeeping task due",
        value: false,
      },
    ],
  },
  {
    label: "Billing",
    items: [
      { key: "invoice_generated", label: "Invoice generated", value: true },
      { key: "payment_received", label: "Payment received", value: true },
      { key: "overdue_balance", label: "Overdue balance", value: true },
    ],
  },
];

// ─── Permission Cell ──────────────────────────────────────────────────────────

function PermCell({ perm }: { perm: Permission }) {
  if (perm === "full")
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/15 text-green-400">
        <Check size={13} />
      </span>
    );
  if (perm === "view")
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary">
        <CircleDot size={13} />
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground">
      <X size={12} />
    </span>
  );
}

// ─── Property Selector ────────────────────────────────────────────────────────

function PropertySelector({
  hotels,
  selectedId,
  onSelect,
  prefix,
}: {
  hotels: Hotel[];
  selectedId: bigint;
  onSelect: (id: bigint) => void;
  prefix: string;
}) {
  return (
    <div>
      <Label className="text-sm text-muted-foreground mb-2 block">
        Select Property
      </Label>
      <div className="flex flex-wrap gap-2">
        {hotels.map((h) => (
          <button
            key={String(h.id)}
            type="button"
            onClick={() => onSelect(h.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              selectedId === h.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
            data-ocid={`${prefix}.${String(h.id)}`}
          >
            {h.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────

interface UserFormState {
  name: string;
  email: string;
  role: StaffRole;
  hotelId: string;
}

function UsersTab() {
  const { staff, hotels, addStaff, updateStaff, removeStaff } = useHotelStore();
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Staff | null>(null);
  const [form, setForm] = useState<UserFormState>({
    name: "",
    email: "",
    role: StaffRole.FrontDesk,
    hotelId: String(hotels[0]?.id ?? "1"),
  });

  const userRows: UserRow[] = staff.map((s) => ({
    id: String(s.id),
    name: s.name,
    email: s.email,
    role: s.role as unknown as UserRole,
    hotelId: s.hotelId,
    status: s.status === StaffStatus.Active,
  }));

  function openAdd() {
    setEditTarget(null);
    setForm({
      name: "",
      email: "",
      role: StaffRole.FrontDesk,
      hotelId: String(hotels[0]?.id ?? "1"),
    });
    setShowModal(true);
  }

  function openEdit(row: UserRow) {
    const member = staff.find((s) => String(s.id) === row.id);
    if (!member) return;
    setEditTarget(member);
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
      hotelId: String(member.hotelId),
    });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    if (editTarget) {
      updateStaff({
        ...editTarget,
        name: form.name,
        email: form.email,
        role: form.role,
        hotelId: BigInt(form.hotelId),
      });
      toast.success("User updated");
    } else {
      const newStaff: Staff = {
        id: BigInt(Date.now()),
        name: form.name,
        email: form.email,
        role: form.role,
        hotelId: BigInt(form.hotelId),
        status: StaffStatus.Active,
        phone: "",
      };
      addStaff(newStaff);
      toast.success("User added");
    }
    setShowModal(false);
  }

  function handleDelete(row: UserRow) {
    removeStaff(BigInt(row.id));
    toast.success("User removed");
  }

  function toggleStatus(row: UserRow) {
    const member = staff.find((s) => String(s.id) === row.id);
    if (!member) return;
    updateStaff({
      ...member,
      status: row.status ? StaffStatus.Inactive : StaffStatus.Active,
    });
  }

  return (
    <div className="space-y-8">
      {/* User Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            User Management
          </h2>
          <Button
            type="button"
            size="sm"
            onClick={openAdd}
            data-ocid="settings.add_user_button"
          >
            <Plus size={14} className="mr-1.5" /> Add User
          </Button>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 text-muted-foreground border-b border-border">
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-4 py-3 font-medium">Role</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">
                  Property
                </th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userRows.map((row, idx) => {
                const hotel = hotels.find((h) => h.id === row.hotelId);
                return (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`settings.user.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs shrink-0">
                          {row.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-foreground truncate">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      <span className="truncate block max-w-[180px]">
                        {row.email}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[row.role]}`}
                      >
                        {ROLE_LABELS[row.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                      <span className="truncate block max-w-[150px] text-sm">
                        {hotel?.name ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Switch
                        checked={row.status}
                        onCheckedChange={() => toggleStatus(row)}
                        data-ocid={`settings.user.status_toggle.${idx + 1}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => openEdit(row)}
                          aria-label="Edit user"
                          data-ocid={`settings.user.edit_button.${idx + 1}`}
                        >
                          <Edit2 size={13} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(row)}
                          aria-label="Delete user"
                          data-ocid={`settings.user.delete_button.${idx + 1}`}
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              {userRows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-muted-foreground"
                    data-ocid="settings.users.empty_state"
                  >
                    No users found. Add your first user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Role Permissions Matrix
          </h2>
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Module
                </th>
                {ROLE_COLUMNS.map((role) => (
                  <th key={role} className="text-center px-4 py-3 font-medium">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[role]}`}
                    >
                      {ROLE_LABELS[role]}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(PERMISSIONS_MATRIX).map(
                ([module, perms], idx) => (
                  <tr
                    key={module}
                    className={`border-b border-border/50 ${idx % 2 === 0 ? "bg-muted/10" : ""}`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {module}
                    </td>
                    {ROLE_COLUMNS.map((role) => (
                      <td key={role} className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <PermCell perm={perms[role]} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
          <div className="flex items-center gap-6 px-4 py-3 bg-muted/20 border-t border-border text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Check size={11} className="text-green-400" /> Full access
            </span>
            <span className="flex items-center gap-1.5">
              <CircleDot size={11} className="text-primary" /> View only
            </span>
            <span className="flex items-center gap-1.5">
              <X size={11} /> No access
            </span>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="settings.user.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="user-name">Full Name</Label>
              <Input
                id="user-name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Priya Sharma"
                className="mt-1.5 bg-background"
                data-ocid="settings.user.name_input"
              />
            </div>
            <div>
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="e.g. priya@hotel.com"
                className="mt-1.5 bg-background"
                data-ocid="settings.user.email_input"
              />
            </div>
            <div>
              <Label htmlFor="user-role">Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, role: v as StaffRole }))
                }
              >
                <SelectTrigger
                  id="user-role"
                  className="mt-1.5 bg-background"
                  data-ocid="settings.user.role_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value={StaffRole.Admin}>Admin</SelectItem>
                  <SelectItem value={StaffRole.Manager}>Manager</SelectItem>
                  <SelectItem value={StaffRole.FrontDesk}>
                    Front Desk
                  </SelectItem>
                  <SelectItem value={StaffRole.Housekeeping}>
                    Housekeeping
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="user-hotel">Property</Label>
              <Select
                value={form.hotelId}
                onValueChange={(v) => setForm((f) => ({ ...f, hotelId: v }))}
              >
                <SelectTrigger
                  id="user-hotel"
                  className="mt-1.5 bg-background"
                  data-ocid="settings.user.hotel_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {hotels.map((h) => (
                    <SelectItem key={String(h.id)} value={String(h.id)}>
                      {h.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
              data-ocid="settings.user.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              data-ocid="settings.user.submit_button"
            >
              {editTarget ? "Save Changes" : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Property Settings Tab ───────────────────────────────────────────────────

interface PropertyForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  checkInTime: string;
  checkOutTime: string;
  currency: string;
}

function buildPropertyForm(h: Hotel | undefined): PropertyForm {
  return {
    name: h?.name ?? "",
    address: h?.address ?? "",
    phone: h?.phone ?? "",
    email: h?.email ?? "",
    city: h?.city ?? "",
    checkInTime: h?.checkInTime ?? "14:00",
    checkOutTime: h?.checkOutTime ?? "11:00",
    currency: h?.currency ?? "INR",
  };
}

function PropertySettingsTab() {
  const { hotels, updateHotel } = useHotelStore();
  const [selectedId, setSelectedId] = useState<bigint>(hotels[0]?.id ?? 1n);
  const [gstin, setGstin] = useState("27AAGCA1234B1ZX");

  const hotel = hotels.find((h) => h.id === selectedId);
  const [form, setForm] = useState<PropertyForm>(buildPropertyForm(hotel));

  function selectHotel(id: bigint) {
    setSelectedId(id);
    const h = hotels.find((h2) => h2.id === id);
    setForm(buildPropertyForm(h));
  }

  function handleSave() {
    if (!hotel) return;
    updateHotel({ ...hotel, ...form });
    toast.success("Settings saved successfully");
  }

  return (
    <div className="space-y-6">
      <PropertySelector
        hotels={hotels}
        selectedId={selectedId}
        onSelect={selectHotel}
        prefix="settings.property.tab"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-card rounded-xl border border-border p-5">
        <div className="md:col-span-2">
          <Label htmlFor="hotel-name">Hotel Name</Label>
          <Input
            id="hotel-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1.5 bg-background"
            data-ocid="settings.property.name_input"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="hotel-address">Address</Label>
          <Textarea
            id="hotel-address"
            value={form.address}
            onChange={(e) =>
              setForm((f) => ({ ...f, address: e.target.value }))
            }
            className="mt-1.5 bg-background resize-none"
            rows={2}
            data-ocid="settings.property.address_input"
          />
        </div>
        <div>
          <Label htmlFor="hotel-phone" className="flex items-center gap-1.5">
            <Phone size={12} /> Phone
          </Label>
          <Input
            id="hotel-phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="mt-1.5 bg-background"
            data-ocid="settings.property.phone_input"
          />
        </div>
        <div>
          <Label htmlFor="hotel-email" className="flex items-center gap-1.5">
            <Mail size={12} /> Email
          </Label>
          <Input
            id="hotel-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1.5 bg-background"
            data-ocid="settings.property.email_input"
          />
        </div>
        <div>
          <Label htmlFor="hotel-checkin">Check-in Time</Label>
          <Input
            id="hotel-checkin"
            type="time"
            value={form.checkInTime}
            onChange={(e) =>
              setForm((f) => ({ ...f, checkInTime: e.target.value }))
            }
            className="mt-1.5 bg-background"
            data-ocid="settings.property.checkin_input"
          />
        </div>
        <div>
          <Label htmlFor="hotel-checkout">Check-out Time</Label>
          <Input
            id="hotel-checkout"
            type="time"
            value={form.checkOutTime}
            onChange={(e) =>
              setForm((f) => ({ ...f, checkOutTime: e.target.value }))
            }
            className="mt-1.5 bg-background"
            data-ocid="settings.property.checkout_input"
          />
        </div>
        <div>
          <Label htmlFor="hotel-currency">Currency</Label>
          <Select
            value={form.currency}
            onValueChange={(v) => setForm((f) => ({ ...f, currency: v }))}
          >
            <SelectTrigger
              id="hotel-currency"
              className="mt-1.5 bg-background"
              data-ocid="settings.property.currency_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="INR">INR — Indian Rupee</SelectItem>
              <SelectItem value="USD">USD — US Dollar</SelectItem>
              <SelectItem value="EUR">EUR — Euro</SelectItem>
              <SelectItem value="GBP">GBP — British Pound</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="hotel-gstin">GSTIN Number</Label>
          <Input
            id="hotel-gstin"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
            placeholder="27AAGCA1234B1ZX"
            className="mt-1.5 bg-background font-mono"
            data-ocid="settings.property.gstin_input"
          />
        </div>
        <div className="md:col-span-2 flex justify-end pt-2">
          <Button
            type="button"
            onClick={handleSave}
            data-ocid="settings.property.save_button"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Room Types Tab ───────────────────────────────────────────────────────────

interface EditRoomModal {
  type: string;
  price: number;
  capacity: number;
}

function RoomTypesTab() {
  const { hotels, rooms, updateRoom } = useHotelStore();
  const [selectedId, setSelectedId] = useState<bigint>(hotels[0]?.id ?? 1n);
  const [editModal, setEditModal] = useState<EditRoomModal | null>(null);

  const hotelRooms = rooms.filter((r) => r.hotelId === selectedId);

  const roomTypeMap: RoomTypeRow[] = DEFAULT_ROOM_TYPES.map((rt) => {
    const matching = hotelRooms.filter((r) => r.roomType === rt.type);
    const avgPrice =
      matching.length > 0
        ? matching.reduce((sum, r) => sum + r.pricePerNight, 0) /
          matching.length
        : rt.basePrice;
    return {
      ...rt,
      basePrice: Math.round(avgPrice),
      totalRooms: matching.length || rt.totalRooms,
    };
  });

  function openEdit(row: RoomTypeRow) {
    setEditModal({
      type: row.type,
      price: row.basePrice,
      capacity: row.capacity,
    });
  }

  function handleEditSave() {
    if (!editModal) return;
    const toUpdate = hotelRooms.filter((r) => r.roomType === editModal.type);
    for (const room of toUpdate) {
      updateRoom({
        ...room,
        pricePerNight: editModal.price,
        capacity: BigInt(editModal.capacity),
      });
    }
    toast.success(`${editModal.type} rooms updated`);
    setEditModal(null);
  }

  return (
    <div className="space-y-6">
      <PropertySelector
        hotels={hotels}
        selectedId={selectedId}
        onSelect={setSelectedId}
        prefix="settings.roomtypes.property_tab"
      />

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-3 font-medium">Type</th>
              <th className="text-right px-4 py-3 font-medium">
                Base Price (INR/night)
              </th>
              <th className="text-right px-4 py-3 font-medium hidden md:table-cell">
                Capacity
              </th>
              <th className="text-right px-4 py-3 font-medium hidden md:table-cell">
                Total Rooms
              </th>
              <th className="text-center px-4 py-3 font-medium">Active</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roomTypeMap.map((row, idx) => (
              <tr
                key={row.type}
                className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                data-ocid={`settings.roomtype.item.${idx + 1}`}
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {row.type}
                </td>
                <td className="px-4 py-3 text-right font-mono text-foreground">
                  ₹{row.basePrice.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">
                  {row.capacity} guests
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">
                  {row.totalRooms} rooms
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge
                    variant={row.active ? "default" : "secondary"}
                    className={
                      row.active
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : ""
                    }
                  >
                    {row.active ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(row)}
                    data-ocid={`settings.roomtype.edit_button.${idx + 1}`}
                  >
                    <Edit2 size={13} className="mr-1.5" /> Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={!!editModal}
        onOpenChange={(o) => {
          if (!o) setEditModal(null);
        }}
      >
        <DialogContent
          className="bg-card border-border"
          data-ocid="settings.roomtype.dialog"
        >
          <DialogHeader>
            <DialogTitle>Edit {editModal?.type} Room Type</DialogTitle>
          </DialogHeader>
          {editModal && (
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="rt-price">Base Price (INR/night)</Label>
                <Input
                  id="rt-price"
                  type="number"
                  value={editModal.price}
                  onChange={(e) =>
                    setEditModal((m) =>
                      m ? { ...m, price: Number(e.target.value) } : m,
                    )
                  }
                  className="mt-1.5 bg-background"
                  data-ocid="settings.roomtype.price_input"
                />
              </div>
              <div>
                <Label htmlFor="rt-capacity">Max Capacity (guests)</Label>
                <Input
                  id="rt-capacity"
                  type="number"
                  min={1}
                  max={10}
                  value={editModal.capacity}
                  onChange={(e) =>
                    setEditModal((m) =>
                      m
                        ? {
                            ...m,
                            capacity: Number.parseInt(e.target.value) || 1,
                          }
                        : m,
                    )
                  }
                  className="mt-1.5 bg-background"
                  data-ocid="settings.roomtype.capacity_input"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditModal(null)}
              data-ocid="settings.roomtype.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleEditSave}
              data-ocid="settings.roomtype.confirm_button"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────

function NotificationsTab() {
  const [groups, setGroups] = useState<NotificationGroup[]>(
    DEFAULT_NOTIFICATIONS,
  );

  function toggle(groupIdx: number, itemIdx: number) {
    setGroups((prev) =>
      prev.map((g, gi) =>
        gi !== groupIdx
          ? g
          : {
              ...g,
              items: g.items.map((item, ii) =>
                ii !== itemIdx ? item : { ...item, value: !item.value },
              ),
            },
      ),
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {groups.map((group, gi) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.08 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-border bg-muted/30">
            <h3 className="font-semibold text-foreground text-sm">
              {group.label}
            </h3>
          </div>
          <div className="divide-y divide-border/50">
            {group.items.map((item, ii) => (
              <div
                key={item.key}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/10 transition-colors"
                data-ocid={`settings.notification.${item.key}`}
              >
                <span className="text-sm text-foreground">{item.label}</span>
                <Switch
                  checked={item.value}
                  onCheckedChange={() => toggle(gi, ii)}
                  data-ocid={`settings.notification.toggle.${item.key}`}
                />
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => toast.success("Notification preferences saved")}
          data-ocid="settings.notifications.save_button"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6" data-ocid="settings.page">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground font-display">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage users, property details, room types, and notification
          preferences.
        </p>
      </motion.div>

      <Tabs defaultValue="users" data-ocid="settings.tabs">
        <TabsList className="bg-muted/50 border border-border h-auto p-1 gap-0.5 flex-wrap">
          <TabsTrigger
            value="users"
            className="flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground"
            data-ocid="settings.tab.users"
          >
            <Users size={14} /> Users &amp; Roles
          </TabsTrigger>
          <TabsTrigger
            value="property"
            className="flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground"
            data-ocid="settings.tab.property"
          >
            <Building2 size={14} /> Property
          </TabsTrigger>
          <TabsTrigger
            value="rooms"
            className="flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground"
            data-ocid="settings.tab.rooms"
          >
            <CircleDot size={14} /> Room Types
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground"
            data-ocid="settings.tab.notifications"
          >
            <Bell size={14} /> Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <UsersTab />
        </TabsContent>
        <TabsContent value="property" className="mt-6">
          <PropertySettingsTab />
        </TabsContent>
        <TabsContent value="rooms" className="mt-6">
          <RoomTypesTab />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

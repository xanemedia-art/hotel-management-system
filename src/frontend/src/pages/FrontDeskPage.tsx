import {
  BookingSource,
  BookingStatus,
  ChargeCategory,
  FolioStatus,
  GuestTag,
  PaymentMethod,
  RoomStatus,
  RoomType,
} from "@/backend";
import { MobileCheckIn } from "@/components/MobileCheckIn";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRoomStatusPolling } from "@/hooks/useRoomStatusPolling";
import { cn } from "@/lib/utils";
import { useHotelStore } from "@/store/useHotelStore";
import type { Booking, Folio, Guest, Room } from "@/types/index";
import {
  AlertCircle,
  Banknote,
  BedDouble,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Flag,
  LogOut,
  Mail,
  PhoneCall,
  Receipt,
  Search,
  Smartphone,
  Star,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

// ── Mobile detection hook ─────────────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(ts: bigint) {
  return new Date(Number(ts)).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function nightsBetween(checkIn: bigint, checkOut: bigint): number {
  return Math.max(
    1,
    Math.round((Number(checkOut) - Number(checkIn)) / 86400000),
  );
}

function formatCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function isToday(ts: bigint): boolean {
  const d = new Date(Number(ts));
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

const SOURCE_LABELS: Record<string, string> = {
  [BookingSource.Direct]: "Direct",
  [BookingSource.OTA]: "OTA",
  [BookingSource.WalkIn]: "Walk-In",
};

const SOURCE_COLORS: Record<string, string> = {
  [BookingSource.Direct]: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  [BookingSource.OTA]: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  [BookingSource.WalkIn]: "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

// ── Sub-components ────────────────────────────────────────────────────────────

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}
function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-muted-foreground mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-foreground font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

interface SearchDropdownProps {
  query: string;
  results: Array<{
    booking: Booking;
    room: Room | undefined;
    guest: Guest | undefined;
  }>;
  onSelect: (bookingId: bigint) => void;
  show: boolean;
}
function SearchDropdown({ results, onSelect, show }: SearchDropdownProps) {
  if (!show || results.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-xl shadow-xl overflow-hidden"
    >
      {results.map(({ booking, room }) => (
        <button
          type="button"
          key={String(booking.id)}
          onClick={() => onSelect(booking.id)}
          className="w-full flex items-center gap-4 px-4 py-3 hover:bg-muted/60 transition-colors text-left border-b border-border/50 last:border-0"
          data-ocid={`front-desk.search-result.${String(booking.id)}`}
        >
          <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <BedDouble className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-foreground truncate">
                {booking.guestName}
              </span>
              <StatusBadge status={booking.status} className="shrink-0" />
            </div>
            <p className="text-xs text-muted-foreground">
              #{String(booking.id)} · Room {room?.number ?? "—"} ·{" "}
              {booking.source}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">
              {formatDate(booking.checkIn)}
            </p>
            <p className="text-xs text-muted-foreground">
              {nightsBetween(booking.checkIn, booking.checkOut)}N
            </p>
          </div>
        </button>
      ))}
    </motion.div>
  );
}

// ── Check-In Panel ────────────────────────────────────────────────────────────

interface CheckInPanelProps {
  bookings: Booking[];
  rooms: Room[];
  guests: Guest[];
}
function CheckInPanel({ bookings, rooms, guests }: CheckInPanelProps) {
  const [query, setQuery] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [selectedId, setSelectedId] = useState<bigint | null>(null);
  const [earlyCheckIn, setEarlyCheckIn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateBooking } = useHotelStore();

  const eligible = useMemo(
    () =>
      bookings.filter(
        (b) =>
          b.status === BookingStatus.Confirmed ||
          b.status === BookingStatus.Pending,
      ),
    [bookings],
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return eligible
      .filter(
        (b) =>
          b.guestName.toLowerCase().includes(q) ||
          String(b.id).includes(q) ||
          b.guestEmail.toLowerCase().includes(q),
      )
      .slice(0, 6)
      .map((b) => ({
        booking: b,
        room: rooms.find((r) => r.id === b.roomId),
        guest: guests.find((g) => g.id === b.guestId),
      }));
  }, [query, eligible, rooms, guests]);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    const booking = bookings.find((b) => b.id === selectedId);
    if (!booking) return null;
    return {
      booking,
      room: rooms.find((r) => r.id === booking.roomId),
      guest: guests.find((g) => g.id === booking.guestId),
    };
  }, [selectedId, bookings, rooms, guests]);

  function handleSelect(id: bigint) {
    setSelectedId(id);
    setQuery("");
    setShowDrop(false);
    setEarlyCheckIn(false);
  }

  function handleCheckIn() {
    if (!selected) return;
    const now = BigInt(Date.now());
    updateBooking({
      ...selected.booking,
      status: BookingStatus.CheckedIn,
      actualCheckIn: now,
      earlyCheckIn,
    });
    toast.success(
      `${selected.booking.guestName} checked in to Room ${selected.room?.number ?? "—"}`,
      {
        description: earlyCheckIn ? "Early check-in flagged" : undefined,
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      },
    );
    setSelectedId(null);
    setEarlyCheckIn(false);
  }

  const nights = selected
    ? nightsBetween(selected.booking.checkIn, selected.booking.checkOut)
    : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
          <UserCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground font-display">
            Check-In
          </h3>
          <p className="text-xs text-muted-foreground">
            {eligible.length} booking{eligible.length !== 1 ? "s" : ""} awaiting
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDrop(true);
            setSelectedId(null);
          }}
          onFocus={() => setShowDrop(true)}
          onBlur={() => setTimeout(() => setShowDrop(false), 180)}
          placeholder="Search guest name or booking ID..."
          className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          data-ocid="front-desk.checkin.search_input"
        />
        <AnimatePresence>
          <SearchDropdown
            query={query}
            results={results}
            onSelect={handleSelect}
            show={showDrop && results.length > 0}
          />
        </AnimatePresence>
      </div>

      {/* Check-In Card */}
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={String(selectedId)}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="flex-1 flex flex-col"
          >
            {/* Guest details */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-xl font-bold text-foreground font-display">
                    {selected.booking.guestName}
                  </h4>
                  {selected.guest?.tags.includes(GuestTag.VIP) && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25 font-medium">
                      <Star className="w-3 h-3" />
                      VIP
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Booking #{String(selected.booking.id)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <InfoRow
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={selected.booking.guestEmail}
              />
              <InfoRow
                icon={<PhoneCall className="w-4 h-4" />}
                label="Phone"
                value={selected.booking.guestPhone}
              />
              <InfoRow
                icon={<BedDouble className="w-4 h-4" />}
                label="Room"
                value={`${selected.room?.number ?? "—"} · ${selected.room?.roomType ?? ""} · Floor ${selected.room?.floor ?? ""}`}
              />
              <InfoRow
                icon={<Users className="w-4 h-4" />}
                label="Guests"
                value={`${selected.booking.numGuests} guest${selected.booking.numGuests > 1n ? "s" : ""}`}
              />
              <InfoRow
                icon={<CalendarDays className="w-4 h-4" />}
                label="Check-in"
                value={formatDate(selected.booking.checkIn)}
              />
              <InfoRow
                icon={<CalendarDays className="w-4 h-4" />}
                label="Check-out"
                value={`${formatDate(selected.booking.checkOut)} · ${nights} nights`}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium",
                  SOURCE_COLORS[selected.booking.source],
                )}
              >
                {SOURCE_LABELS[selected.booking.source]}
              </span>
              <StatusBadge status={selected.booking.status} />
            </div>

            {/* Early check-in */}
            <label
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border cursor-pointer hover:bg-muted/60 transition-colors mb-4"
              data-ocid="front-desk.checkin.early_checkin_checkbox"
            >
              <input
                type="checkbox"
                checked={earlyCheckIn}
                onChange={(e) => setEarlyCheckIn(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-foreground">
                Early Check-in Request
              </span>
              {earlyCheckIn && (
                <span className="ml-auto flex items-center gap-1 text-xs text-amber-400 font-medium">
                  <Flag className="w-3.5 h-3.5" /> Flagged
                </span>
              )}
            </label>

            {selected.booking.notes && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300">
                  {selected.booking.notes}
                </p>
              </div>
            )}

            <Button
              onClick={handleCheckIn}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl shadow-md shadow-emerald-900/30 transition-all"
              data-ocid="front-desk.checkin.confirm_button"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Confirm Check-In
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="empty-checkin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center py-12 text-center"
            data-ocid="front-desk.checkin.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-4">
              <UserCheck className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Search for a booking
            </p>
            <p className="text-xs text-muted-foreground max-w-48">
              Enter guest name or booking ID to begin check-in
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Balance Summary ───────────────────────────────────────────────────────────

interface BalanceSummaryProps {
  booking: Booking;
  room: Room | undefined;
  folio: Folio | undefined;
}
function BalanceSummary({ booking, room, folio }: BalanceSummaryProps) {
  const nights = nightsBetween(booking.checkIn, booking.checkOut);
  const roomRate = (room?.pricePerNight ?? 0) * nights;
  const gst = Math.round(roomRate * 0.18);
  const extras = folio
    ? folio.charges
        .filter((c) => c.category === ChargeCategory.Extra)
        .reduce((sum, c) => sum + c.amount, 0)
    : 0;
  const total = roomRate + gst + extras;
  const paid = folio ? folio.payments.reduce((sum, p) => sum + p.amount, 0) : 0;
  const outstanding = total - paid;

  return (
    <div className="bg-muted/30 border border-border rounded-xl p-4 mb-4 space-y-2.5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Balance Summary
      </p>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Room Rate</span>
        <span className="text-foreground font-medium">
          {formatCurrency(room?.pricePerNight ?? 0)}/night × {nights} ={" "}
          {formatCurrency(roomRate)}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">GST (18%)</span>
        <span className="text-foreground font-medium">
          {formatCurrency(gst)}
        </span>
      </div>
      {extras > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Extras</span>
          <span className="text-foreground font-medium">
            {formatCurrency(extras)}
          </span>
        </div>
      )}
      <div className="border-t border-border/60 pt-2.5 space-y-2">
        <div className="flex justify-between text-base font-bold">
          <span className="text-foreground">Total Due</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Amount Paid</span>
          <span className="text-foreground font-medium">
            {formatCurrency(paid)}
          </span>
        </div>
        <div className="flex justify-between text-sm font-semibold">
          <span className="text-foreground">Outstanding</span>
          <span
            className={outstanding > 0 ? "text-red-400" : "text-emerald-400"}
          >
            {outstanding > 0 ? formatCurrency(outstanding) : "Settled"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Check-Out Panel ───────────────────────────────────────────────────────────

interface CheckOutPanelProps {
  bookings: Booking[];
  rooms: Room[];
  guests: Guest[];
  folios: Folio[];
}
function CheckOutPanel({
  bookings,
  rooms,
  guests,
  folios,
}: CheckOutPanelProps) {
  const [query, setQuery] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [selectedId, setSelectedId] = useState<bigint | null>(null);
  const [lateCheckOut, setLateCheckOut] = useState(false);
  const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Cash);
  const { updateBooking } = useHotelStore();

  const checkedIn = useMemo(
    () => bookings.filter((b) => b.status === BookingStatus.CheckedIn),
    [bookings],
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return checkedIn
      .filter(
        (b) =>
          b.guestName.toLowerCase().includes(q) ||
          String(b.id).includes(q) ||
          b.guestEmail.toLowerCase().includes(q),
      )
      .slice(0, 6)
      .map((b) => ({
        booking: b,
        room: rooms.find((r) => r.id === b.roomId),
        guest: guests.find((g) => g.id === b.guestId),
      }));
  }, [query, checkedIn, rooms, guests]);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    const booking = bookings.find((b) => b.id === selectedId);
    if (!booking) return null;
    return {
      booking,
      room: rooms.find((r) => r.id === booking.roomId),
      guest: guests.find((g) => g.id === booking.guestId),
      folio: folios.find((f) => f.bookingId === booking.id),
    };
  }, [selectedId, bookings, rooms, guests, folios]);

  function handleSelect(id: bigint) {
    setSelectedId(id);
    setQuery("");
    setShowDrop(false);
    const b = bookings.find((bk) => bk.id === id);
    setLateCheckOut(b?.lateCheckOut ?? false);
  }

  function handleCheckOut() {
    if (!selected) return;
    const now = BigInt(Date.now());
    updateBooking({
      ...selected.booking,
      status: BookingStatus.CheckedOut,
      actualCheckOut: now,
      lateCheckOut,
    });
    toast.success(
      `${selected.booking.guestName} checked out from Room ${selected.room?.number ?? "—"}`,
      {
        description: `Payment via ${payMethod}`,
        icon: <LogOut className="w-4 h-4 text-violet-400" />,
      },
    );
    setSelectedId(null);
    setLateCheckOut(false);
    setPayMethod(PaymentMethod.Cash);
  }

  const PAY_OPTIONS: Array<{
    value: PaymentMethod;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      value: PaymentMethod.Cash,
      label: "Cash",
      icon: <Banknote className="w-4 h-4" />,
    },
    {
      value: PaymentMethod.Card,
      label: "Card",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      value: PaymentMethod.UPI,
      label: "UPI",
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      value: PaymentMethod.BankTransfer,
      label: "Bank Transfer",
      icon: <Building2 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
          <LogOut className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground font-display">
            Check-Out
          </h3>
          <p className="text-xs text-muted-foreground">
            {checkedIn.length} guest{checkedIn.length !== 1 ? "s" : ""} checked
            in
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDrop(true);
            setSelectedId(null);
          }}
          onFocus={() => setShowDrop(true)}
          onBlur={() => setTimeout(() => setShowDrop(false), 180)}
          placeholder="Search checked-in guests..."
          className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          data-ocid="front-desk.checkout.search_input"
        />
        <AnimatePresence>
          <SearchDropdown
            query={query}
            results={results}
            onSelect={handleSelect}
            show={showDrop && results.length > 0}
          />
        </AnimatePresence>
      </div>

      {/* Check-Out Card */}
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={String(selectedId)}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="flex-1 flex flex-col"
          >
            {/* Guest header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-foreground font-display">
                  {selected.booking.guestName}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Room {selected.room?.number} · #{String(selected.booking.id)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <InfoRow
                icon={<CalendarDays className="w-4 h-4" />}
                label="Checked In"
                value={
                  selected.booking.actualCheckIn
                    ? formatDate(selected.booking.actualCheckIn)
                    : formatDate(selected.booking.checkIn)
                }
              />
              <InfoRow
                icon={<CalendarDays className="w-4 h-4" />}
                label="Due Check-out"
                value={formatDate(selected.booking.checkOut)}
              />
            </div>

            {/* Balance */}
            <BalanceSummary
              booking={selected.booking}
              room={selected.room}
              folio={selected.folio}
            />

            {/* Payment method */}
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Payment Method
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PAY_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setPayMethod(opt.value)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all",
                      payMethod === opt.value
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60",
                    )}
                    data-ocid={`front-desk.checkout.payment_method.${opt.value.toLowerCase()}`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Late check-out */}
            <label
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border cursor-pointer hover:bg-muted/60 transition-colors mb-4"
              data-ocid="front-desk.checkout.late_checkout_checkbox"
            >
              <input
                type="checkbox"
                checked={lateCheckOut}
                onChange={(e) => setLateCheckOut(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-foreground">
                Late Check-out Request
              </span>
              {lateCheckOut && (
                <span className="ml-auto flex items-center gap-1 text-xs text-orange-400 font-medium">
                  <Flag className="w-3.5 h-3.5" /> Flagged
                </span>
              )}
            </label>

            <Button
              onClick={handleCheckOut}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl shadow-md shadow-violet-900/30 transition-all"
              data-ocid="front-desk.checkout.confirm_button"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Confirm Check-Out
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="empty-checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center py-12 text-center"
            data-ocid="front-desk.checkout.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-4">
              <LogOut className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Search for a guest
            </p>
            <p className="text-xs text-muted-foreground max-w-48">
              Find a checked-in guest to process check-out
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Walk-In Modal ─────────────────────────────────────────────────────────────

interface WalkInModalProps {
  onClose: () => void;
  rooms: Room[];
  hotelId: bigint;
}
function WalkInModal({ onClose, rooms, hotelId }: WalkInModalProps) {
  const { addBooking, addGuest, guests } = useHotelStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roomType, setRoomType] = useState<RoomType>(RoomType.Standard);
  const [nights, setNights] = useState(1);
  const [numGuests, setNumGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const availableRooms = useMemo(
    () =>
      rooms.filter(
        (r) =>
          r.hotelId === hotelId &&
          r.roomType === roomType &&
          r.status === RoomStatus.Clean &&
          r.isActive,
      ),
    [rooms, hotelId, roomType],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    if (availableRooms.length === 0) {
      toast.error(`No available ${roomType} rooms`);
      return;
    }
    setLoading(true);

    const now = BigInt(Date.now());
    const checkOut = BigInt(Date.now() + nights * 86400000);
    const room = availableRooms[0];
    const newGuestId = BigInt(guests.length + 100 + (Date.now() % 1000));
    const newBookingId = BigInt(Date.now() % 100000);

    const newGuest = {
      id: newGuestId,
      name: name.trim(),
      email: email.trim() || `walkin.${newGuestId}@hotel.in`,
      phone: phone.trim(),
      country: "India",
      address: "",
      tags: [GuestTag.New],
      loyaltyPoints: 0n,
      preferences: "",
      notes: "Walk-in guest",
      createdAt: now,
    };

    const newBooking: Booking = {
      id: newBookingId,
      hotelId,
      guestId: newGuestId,
      roomId: room.id,
      guestName: name.trim(),
      guestEmail: newGuest.email,
      guestPhone: phone.trim(),
      checkIn: now,
      checkOut,
      numGuests: BigInt(numGuests),
      status: BookingStatus.CheckedIn,
      source: BookingSource.WalkIn,
      earlyCheckIn: false,
      lateCheckOut: false,
      notes: "Walk-in booking",
      actualCheckIn: now,
      actualCheckOut: undefined,
      createdAt: now,
    };

    addGuest(newGuest);
    addBooking(newBooking);

    setTimeout(() => {
      setLoading(false);
      toast.success(`Walk-in check-in complete for ${name.trim()}`, {
        description: `Assigned to Room ${room.number}`,
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      });
      onClose();
    }, 400);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="front-desk.walkin.dialog"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md z-10"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-display">
                Walk-In Guest
              </h3>
              <p className="text-xs text-muted-foreground">
                Quick check-in at the desk
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="front-desk.walkin.close_button"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="wi-name"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Guest Name <span className="text-red-400">*</span>
              </label>
              <input
                id="wi-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                className="w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                data-ocid="front-desk.walkin.name_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="wi-phone"
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                >
                  Phone <span className="text-red-400">*</span>
                </label>
                <input
                  id="wi-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  required
                  className="w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  data-ocid="front-desk.walkin.phone_input"
                />
              </div>
              <div>
                <label
                  htmlFor="wi-email"
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                >
                  Email
                </label>
                <input
                  id="wi-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="optional"
                  className="w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  data-ocid="front-desk.walkin.email_input"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="wi-room-type"
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                >
                  Room Type
                </label>
                <select
                  id="wi-room-type"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value as RoomType)}
                  className="w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  data-ocid="front-desk.walkin.room_type_select"
                >
                  {Object.values(RoomType).map((rt) => (
                    <option key={rt} value={rt}>
                      {rt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="wi-nights"
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                >
                  Nights
                </label>
                <input
                  id="wi-nights"
                  type="number"
                  min={1}
                  max={30}
                  value={nights}
                  onChange={(e) =>
                    setNights(Math.max(1, Number.parseInt(e.target.value) || 1))
                  }
                  className="w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  data-ocid="front-desk.walkin.nights_input"
                />
              </div>
              <div>
                <label
                  htmlFor="wi-guests"
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                >
                  Guests
                </label>
                <input
                  id="wi-guests"
                  type="number"
                  min={1}
                  max={6}
                  value={numGuests}
                  onChange={(e) =>
                    setNumGuests(
                      Math.max(1, Number.parseInt(e.target.value) || 1),
                    )
                  }
                  className="w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  data-ocid="front-desk.walkin.num_guests_input"
                />
              </div>
            </div>
          </div>

          {/* Available rooms info */}
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl text-xs border",
              availableRooms.length > 0
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400",
            )}
          >
            {availableRooms.length > 0 ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                {availableRooms.length} {roomType} room
                {availableRooms.length !== 1 ? "s" : ""} available
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                No {roomType} rooms available
              </>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-ocid="front-desk.walkin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || availableRooms.length === 0}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              data-ocid="front-desk.walkin.submit_button"
            >
              {loading ? "Processing..." : "Check In Now"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Today's Activity ──────────────────────────────────────────────────────────

interface TodayActivityProps {
  bookings: Booking[];
  rooms: Room[];
}
function TodayActivity({ bookings, rooms }: TodayActivityProps) {
  const todayCheckIns = useMemo(
    () =>
      bookings.filter(
        (b) =>
          b.status === BookingStatus.CheckedIn &&
          b.actualCheckIn &&
          isToday(b.actualCheckIn),
      ),
    [bookings],
  );

  const todayCheckOuts = useMemo(
    () =>
      bookings.filter(
        (b) =>
          b.status === BookingStatus.CheckedOut &&
          b.actualCheckOut &&
          isToday(b.actualCheckOut),
      ),
    [bookings],
  );

  const upcomingCheckOuts = useMemo(
    () =>
      bookings.filter(
        (b) => b.status === BookingStatus.CheckedIn && isToday(b.checkOut),
      ),
    [bookings],
  );

  return (
    <div
      className="grid grid-cols-2 gap-6 mt-6"
      data-ocid="front-desk.activity.section"
    >
      {/* Today's Check-ins */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Today's Check-ins
            </h4>
            <p className="text-xs text-muted-foreground">
              {todayCheckIns.length} completed
            </p>
          </div>
        </div>
        {todayCheckIns.length === 0 ? (
          <div
            className="py-6 text-center"
            data-ocid="front-desk.checkins_today.empty_state"
          >
            <p className="text-xs text-muted-foreground">
              No check-ins yet today
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {todayCheckIns.map((b, i) => {
              const room = rooms.find((r) => r.id === b.roomId);
              return (
                <li
                  key={String(b.id)}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  data-ocid={`front-desk.checkin_item.${i + 1}`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {b.guestName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Room {room?.number ?? "—"}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-xs text-muted-foreground">
                      {b.actualCheckIn ? formatTime(b.actualCheckIn) : "—"}
                    </p>
                    {b.earlyCheckIn && (
                      <span className="text-xs text-amber-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Early
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Today's Check-outs */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Today's Check-outs
            </h4>
            <p className="text-xs text-muted-foreground">
              {todayCheckOuts.length} done · {upcomingCheckOuts.length} due
            </p>
          </div>
        </div>
        {todayCheckOuts.length === 0 && upcomingCheckOuts.length === 0 ? (
          <div
            className="py-6 text-center"
            data-ocid="front-desk.checkouts_today.empty_state"
          >
            <p className="text-xs text-muted-foreground">No check-outs today</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {[...todayCheckOuts, ...upcomingCheckOuts].map((b, i) => {
              const room = rooms.find((r) => r.id === b.roomId);
              const isDone = b.status === BookingStatus.CheckedOut;
              return (
                <li
                  key={String(b.id)}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  data-ocid={`front-desk.checkout_item.${i + 1}`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {b.guestName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Room {room?.number ?? "—"}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3 flex flex-col items-end gap-1">
                    {isDone ? (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Done
                      </span>
                    ) : (
                      <span className="text-xs text-amber-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due
                      </span>
                    )}
                    {b.lateCheckOut && (
                      <span className="text-xs text-orange-400 flex items-center gap-1">
                        <Flag className="w-3 h-3" />
                        Late
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function FrontDeskPage() {
  const isMobile = useIsMobile();
  const [showWalkIn, setShowWalkIn] = useState(false);
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allRooms = useHotelStore((s) => s.rooms);
  const allBookings = useHotelStore((s) => s.bookings);
  const allGuests = useHotelStore((s) => s.guests);
  const allFolios = useHotelStore((s) => s.folios);

  // Keep room availability fresh during check-in operations
  useRoomStatusPolling({ enabled: true, intervalMs: 7000 });

  const bookings = useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId],
  );
  const rooms = useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId],
  );
  const guests = useMemo(() => allGuests, [allGuests]);
  const folios = useMemo(
    () => allFolios.filter((f) => f.hotelId === selectedHotelId),
    [allFolios, selectedHotelId],
  );

  const confirmedCount = bookings.filter(
    (b) =>
      b.status === BookingStatus.Confirmed ||
      b.status === BookingStatus.Pending,
  ).length;
  const checkedInCount = bookings.filter(
    (b) => b.status === BookingStatus.CheckedIn,
  ).length;
  const dueCheckouts = bookings.filter(
    (b) => b.status === BookingStatus.CheckedIn && isToday(b.checkOut),
  ).length;

  // Mobile: render touch-optimized check-in flow
  if (isMobile) {
    return (
      <div
        data-ocid="front-desk.page"
        className="h-[calc(100vh-4rem)] flex flex-col px-4 pt-4 pb-safe overflow-hidden"
      >
        <MobileCheckIn />
      </div>
    );
  }

  // Desktop: existing two-panel layout
  return (
    <div data-ocid="front-desk.page" className="min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground font-display">
            Front Desk
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Check-in, check-out, and guest operations
          </p>
        </div>
        <Button
          onClick={() => setShowWalkIn(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-md shadow-amber-900/20"
          data-ocid="front-desk.walkin_button"
        >
          <UserPlus className="w-4 h-4" />
          Walk-In Guest
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Arrivals Today",
            value: confirmedCount,
            icon: <UserCheck className="w-4 h-4" />,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20",
          },
          {
            label: "Checked In",
            value: checkedInCount,
            icon: <BedDouble className="w-4 h-4" />,
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20",
          },
          {
            label: "Due Check-outs",
            value: dueCheckouts,
            icon: <LogOut className="w-4 h-4" />,
            color: "text-amber-400",
            bg: "bg-amber-500/10 border-amber-500/20",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "flex items-center gap-3 bg-card border rounded-xl px-4 py-3",
              stat.bg,
            )}
          >
            <div className={cn("shrink-0", stat.color)}>{stat.icon}</div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={cn("text-xl font-bold font-display", stat.color)}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Panels */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-2xl p-6 min-h-[460px]"
          data-ocid="front-desk.checkin.panel"
        >
          <CheckInPanel bookings={bookings} rooms={rooms} guests={guests} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="bg-card border border-border rounded-2xl p-6 min-h-[460px]"
          data-ocid="front-desk.checkout.panel"
        >
          <CheckOutPanel
            bookings={bookings}
            rooms={rooms}
            guests={guests}
            folios={folios}
          />
        </motion.div>
      </div>

      {/* Today's Activity */}
      <TodayActivity bookings={bookings} rooms={rooms} />

      {/* Walk-In Modal */}
      <AnimatePresence>
        {showWalkIn && (
          <WalkInModal
            onClose={() => setShowWalkIn(false)}
            rooms={rooms}
            hotelId={selectedHotelId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

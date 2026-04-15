import { BookingStatus, GuestTag } from "@/backend";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { useCheckIn, useCheckOut } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useHotelStore } from "@/store/useHotelStore";
import type { Booking, Guest, Room } from "@/types/index";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Flag,
  KeyRound,
  LogOut,
  Search,
  Star,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function nightsBetween(checkIn: bigint, checkOut: bigint): number {
  return Math.max(
    1,
    Math.round((Number(checkOut) - Number(checkIn)) / 86400000),
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Mode = "checkin" | "checkout";
type Step = 1 | 2 | 3;

interface SearchResult {
  booking: Booking;
  room: Room | undefined;
  guest: Guest | undefined;
}

// ── Step Indicator ────────────────────────────────────────────────────────────

function StepDots({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {([1, 2, 3] as Step[]).map((s) => (
        <motion.div
          key={s}
          animate={{
            width: step === s ? 24 : 8,
            backgroundColor: step === s ? "var(--primary)" : "var(--muted)",
          }}
          transition={{ duration: 0.2 }}
          className="h-2 rounded-full"
        />
      ))}
    </div>
  );
}

// ── Step 1: Search ────────────────────────────────────────────────────────────

interface Step1Props {
  mode: Mode;
  results: SearchResult[];
  query: string;
  onQueryChange: (q: string) => void;
  onSelect: (id: bigint) => void;
}

function Step1Search({
  mode,
  results,
  query,
  onQueryChange,
  onSelect,
}: Step1Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22 }}
      className="flex-1 flex flex-col"
    >
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground font-display mb-1">
          {mode === "checkin" ? "Guest Check-In" : "Guest Check-Out"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {mode === "checkin"
            ? "Search for a confirmed booking to check in"
            : "Search for a checked-in guest to check out"}
        </p>
      </div>

      {/* Large touch-friendly search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Guest name or booking ID..."
          className="w-full pl-12 pr-4 py-4 text-base bg-input border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          data-ocid="mobile-checkin.search_input"
          style={{ minHeight: 56 }}
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-2">
        <AnimatePresence mode="popLayout">
          {query.trim() === "" ? (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="mobile-checkin.search.empty_state"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-4">
                {mode === "checkin" ? (
                  <UserCheck className="w-7 h-7 text-muted-foreground" />
                ) : (
                  <LogOut className="w-7 h-7 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                Start typing to search
              </p>
              <p className="text-xs text-muted-foreground">
                Enter guest name or booking ID above
              </p>
            </motion.div>
          ) : results.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="mobile-checkin.no_results.empty_state"
            >
              <p className="text-sm font-medium text-foreground mb-1">
                No bookings found
              </p>
              <p className="text-xs text-muted-foreground">
                Try a different search term
              </p>
            </motion.div>
          ) : (
            results.map(({ booking, room, guest }, i) => (
              <motion.button
                key={String(booking.id)}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onSelect(booking.id)}
                className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-2xl text-left active:bg-muted/60 transition-colors"
                style={{ minHeight: 72 }}
                data-ocid={`mobile-checkin.search_result.${i + 1}`}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <BedDouble className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground truncate">
                      {booking.guestName}
                    </span>
                    {guest?.tags.includes(GuestTag.VIP) && (
                      <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25 shrink-0">
                        <Star className="w-2.5 h-2.5" />
                        VIP
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Room {room?.number ?? "—"}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(booking.checkIn)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <StatusBadge status={booking.status} />
                  <ArrowRight className="w-4 h-4 text-muted-foreground mt-1" />
                </div>
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Step 2: Booking Detail ────────────────────────────────────────────────────

interface Step2Props {
  mode: Mode;
  booking: Booking;
  room: Room | undefined;
  guest: Guest | undefined;
  earlyFlag: boolean;
  lateFlag: boolean;
  onEarlyFlagChange: (v: boolean) => void;
  onLateFlagChange: (v: boolean) => void;
  onConfirm: () => void;
  onBack: () => void;
  loading: boolean;
}

function Step2Detail({
  mode,
  booking,
  room,
  guest,
  earlyFlag,
  lateFlag,
  onEarlyFlagChange,
  onLateFlagChange,
  onConfirm,
  onBack,
  loading,
}: Step2Props) {
  const nights = nightsBetween(booking.checkIn, booking.checkOut);

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.22 }}
      className="flex-1 flex flex-col"
    >
      {/* Back + title */}
      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-muted/50 border border-border flex items-center justify-center active:bg-muted transition-colors"
          aria-label="Back"
          data-ocid="mobile-checkin.detail.back_button"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-foreground font-display leading-tight">
            {mode === "checkin" ? "Confirm Check-In" : "Confirm Check-Out"}
          </h2>
          <p className="text-xs text-muted-foreground">
            Review booking details
          </p>
        </div>
      </div>

      {/* Guest card */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold text-foreground text-lg font-display">
                {booking.guestName}
              </h3>
              {guest?.tags.includes(GuestTag.VIP) && (
                <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                  <Star className="w-2.5 h-2.5" />
                  VIP
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Booking #{String(booking.id)}
            </p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/40 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <BedDouble className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Room
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {room?.number ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {room?.roomType ?? ""} · Floor {room?.floor ?? ""}
            </p>
          </div>
          <div className="bg-muted/40 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Guests
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {String(booking.numGuests)} guest
              {booking.numGuests > 1n ? "s" : ""}
            </p>
          </div>
          <div className="bg-muted/40 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Check-In
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {formatDate(booking.checkIn)}
            </p>
          </div>
          <div className="bg-muted/40 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Check-Out
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {formatDate(booking.checkOut)}
            </p>
            <p className="text-xs text-muted-foreground">
              {nights} night{nights !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Notes */}
      {booking.notes && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
          <Flag className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300">{booking.notes}</p>
        </div>
      )}

      {/* Flag toggles */}
      {mode === "checkin" && (
        <label
          className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40 border border-border active:bg-muted/60 transition-colors mb-4 cursor-pointer"
          style={{ minHeight: 56 }}
          data-ocid="mobile-checkin.early_checkin_toggle"
        >
          <input
            type="checkbox"
            checked={earlyFlag}
            onChange={(e) => onEarlyFlagChange(e.target.checked)}
            className="w-5 h-5 rounded accent-primary"
          />
          <span className="text-sm text-foreground flex-1">
            Early Check-in Request
          </span>
          {earlyFlag && (
            <span className="flex items-center gap-1 text-xs text-amber-400 font-medium">
              <Flag className="w-3.5 h-3.5" /> Flagged
            </span>
          )}
        </label>
      )}

      {mode === "checkout" && (
        <label
          className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40 border border-border active:bg-muted/60 transition-colors mb-4 cursor-pointer"
          style={{ minHeight: 56 }}
          data-ocid="mobile-checkin.late_checkout_toggle"
        >
          <input
            type="checkbox"
            checked={lateFlag}
            onChange={(e) => onLateFlagChange(e.target.checked)}
            className="w-5 h-5 rounded accent-primary"
          />
          <span className="text-sm text-foreground flex-1">
            Late Check-out Request
          </span>
          {lateFlag && (
            <span className="flex items-center gap-1 text-xs text-orange-400 font-medium">
              <Flag className="w-3.5 h-3.5" /> Flagged
            </span>
          )}
        </label>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA */}
      <Button
        onClick={onConfirm}
        disabled={loading}
        className={cn(
          "w-full font-bold text-base py-4 rounded-2xl shadow-lg transition-all",
          mode === "checkin"
            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30"
            : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/30",
        )}
        style={{ minHeight: 56 }}
        data-ocid="mobile-checkin.confirm_button"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : mode === "checkin" ? (
          <span className="flex items-center justify-center gap-2">
            <UserCheck className="w-5 h-5" />
            Confirm Check-In
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            Confirm Check-Out
          </span>
        )}
      </Button>
    </motion.div>
  );
}

// ── Step 3: Success ───────────────────────────────────────────────────────────

interface Step3Props {
  mode: Mode;
  booking: Booking;
  room: Room | undefined;
  onDone: () => void;
}

function Step3Success({ mode, booking, room, onDone }: Step3Props) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
      className="flex-1 flex flex-col items-center justify-center"
      data-ocid="mobile-checkin.success.panel"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
        className={cn(
          "w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-lg",
          mode === "checkin"
            ? "bg-emerald-500/20 border-2 border-emerald-500/40 shadow-emerald-900/30"
            : "bg-violet-500/20 border-2 border-violet-500/40 shadow-violet-900/30",
        )}
      >
        <CheckCircle2
          className={cn(
            "w-12 h-12",
            mode === "checkin" ? "text-emerald-400" : "text-violet-400",
          )}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-foreground font-display mb-2 text-center"
      >
        {mode === "checkin" ? "Checked In!" : "Checked Out!"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-muted-foreground text-sm text-center mb-8"
      >
        {booking.guestName} · Room {room?.number ?? "—"}
      </motion.p>

      {/* Confirmation card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-card border border-border rounded-2xl p-5 mb-6 space-y-3"
      >
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            Booking
          </span>
          <span className="text-sm font-semibold text-foreground">
            #{String(booking.id)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            Room
          </span>
          <span className="text-sm font-semibold text-foreground">
            {room?.number ?? "—"} · {room?.roomType ?? ""}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {mode === "checkin" ? "Check-In" : "Check-Out"}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {new Date().toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>

        {/* Room key placeholder (check-in only) */}
        {mode === "checkin" && (
          <div className="mt-2 pt-3 border-t border-border flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border-amber-500/20">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
              <KeyRound className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-300">Room Key</p>
              <p className="text-xs text-muted-foreground">
                Issue key card for Room {room?.number ?? "—"}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full"
      >
        <Button
          onClick={onDone}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-4 rounded-2xl"
          style={{ minHeight: 56 }}
          data-ocid="mobile-checkin.done_button"
        >
          Done
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function MobileCheckIn() {
  const [mode, setMode] = useState<Mode>("checkin");
  const [step, setStep] = useState<Step>(1);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<bigint | null>(null);
  const [earlyFlag, setEarlyFlag] = useState(false);
  const [lateFlag, setLateFlag] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<bigint | null>(
    null,
  );

  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allBookings = useHotelStore((s) => s.bookings);
  const allRooms = useHotelStore((s) => s.rooms);
  const allGuests = useHotelStore((s) => s.guests);
  const updateBooking = useHotelStore((s) => s.updateBooking);

  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();

  const bookings = useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId],
  );
  const rooms = useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId],
  );

  const eligible = useMemo(() => {
    if (mode === "checkin") {
      return bookings.filter(
        (b) =>
          b.status === BookingStatus.Confirmed ||
          b.status === BookingStatus.Pending,
      );
    }
    return bookings.filter((b) => b.status === BookingStatus.CheckedIn);
  }, [bookings, mode]);

  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return eligible
      .filter(
        (b) =>
          b.guestName.toLowerCase().includes(q) ||
          String(b.id).includes(q) ||
          b.guestEmail.toLowerCase().includes(q),
      )
      .slice(0, 8)
      .map((b) => ({
        booking: b,
        room: rooms.find((r) => r.id === b.roomId),
        guest: allGuests.find((g) => g.id === b.guestId),
      }));
  }, [query, eligible, rooms, allGuests]);

  const selected = useMemo((): SearchResult | null => {
    if (!selectedId) return null;
    const booking = bookings.find((b) => b.id === selectedId);
    if (!booking) return null;
    return {
      booking,
      room: rooms.find((r) => r.id === booking.roomId),
      guest: allGuests.find((g) => g.id === booking.guestId),
    };
  }, [selectedId, bookings, rooms, allGuests]);

  const confirmed = useMemo((): SearchResult | null => {
    if (!confirmedBookingId) return null;
    const booking = bookings.find((b) => b.id === confirmedBookingId);
    if (!booking) return null;
    return {
      booking,
      room: rooms.find((r) => r.id === booking.roomId),
      guest: allGuests.find((g) => g.id === booking.guestId),
    };
  }, [confirmedBookingId, bookings, rooms, allGuests]);

  function handleSelect(id: bigint) {
    setSelectedId(id);
    setQuery("");
    setEarlyFlag(false);
    setLateFlag(false);
    setStep(2);
  }

  async function handleConfirm() {
    if (!selected) return;
    const id = selected.booking.id;

    if (mode === "checkin") {
      updateBooking({
        ...selected.booking,
        status: BookingStatus.CheckedIn,
        actualCheckIn: BigInt(Date.now()),
        earlyCheckIn: earlyFlag,
      });
      toast.success(
        `${selected.booking.guestName} checked in to Room ${selected.room?.number ?? "—"}`,
        {
          description: earlyFlag ? "Early check-in flagged" : undefined,
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
        },
      );
    } else {
      updateBooking({
        ...selected.booking,
        status: BookingStatus.CheckedOut,
        actualCheckOut: BigInt(Date.now()),
        lateCheckOut: lateFlag,
      });
      toast.success(
        `${selected.booking.guestName} checked out from Room ${selected.room?.number ?? "—"}`,
        {
          icon: <LogOut className="w-4 h-4 text-violet-400" />,
        },
      );
    }

    setConfirmedBookingId(id);
    setStep(3);

    // Also trigger the mutation for React Query cache invalidation
    if (mode === "checkin") {
      checkInMutation.mutate(id);
    } else {
      checkOutMutation.mutate(id);
    }
  }

  function handleDone() {
    setStep(1);
    setQuery("");
    setSelectedId(null);
    setConfirmedBookingId(null);
    setEarlyFlag(false);
    setLateFlag(false);
  }

  function handleModeChange(m: Mode) {
    setMode(m);
    setStep(1);
    setQuery("");
    setSelectedId(null);
    setConfirmedBookingId(null);
  }

  const isLoading = checkInMutation.isPending || checkOutMutation.isPending;

  return (
    <div
      className="flex flex-col h-full bg-background"
      data-ocid="mobile-checkin.page"
    >
      {/* Mode tabs */}
      {step === 1 && (
        <div
          className="flex gap-2 p-1 bg-muted/50 border border-border rounded-2xl mb-5"
          data-ocid="mobile-checkin.mode_tabs"
        >
          <button
            type="button"
            onClick={() => handleModeChange("checkin")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
              mode === "checkin"
                ? "bg-card border border-border text-foreground shadow-sm"
                : "text-muted-foreground",
            )}
            style={{ minHeight: 44 }}
            data-ocid="mobile-checkin.checkin_tab"
          >
            <UserCheck className="w-4 h-4" />
            Check-In
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("checkout")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
              mode === "checkout"
                ? "bg-card border border-border text-foreground shadow-sm"
                : "text-muted-foreground",
            )}
            style={{ minHeight: 44 }}
            data-ocid="mobile-checkin.checkout_tab"
          >
            <LogOut className="w-4 h-4" />
            Check-Out
          </button>
        </div>
      )}

      {/* Step dots */}
      <StepDots step={step} />

      {/* Step content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <Step1Search
              key="step1"
              mode={mode}
              results={results}
              query={query}
              onQueryChange={setQuery}
              onSelect={handleSelect}
            />
          )}
          {step === 2 && selected && (
            <Step2Detail
              key="step2"
              mode={mode}
              booking={selected.booking}
              room={selected.room}
              guest={selected.guest}
              earlyFlag={earlyFlag}
              lateFlag={lateFlag}
              onEarlyFlagChange={setEarlyFlag}
              onLateFlagChange={setLateFlag}
              onConfirm={handleConfirm}
              onBack={() => setStep(1)}
              loading={isLoading}
            />
          )}
          {step === 3 && confirmed && (
            <Step3Success
              key="step3"
              mode={mode}
              booking={confirmed.booking}
              room={confirmed.room}
              onDone={handleDone}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

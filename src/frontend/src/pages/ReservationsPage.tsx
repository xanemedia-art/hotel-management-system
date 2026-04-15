import { BookingSource, BookingStatus, RoomType } from "@/backend";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useHotelStore } from "@/store/useHotelStore";
import type { Booking, Room } from "@/types/index";
import {
  BedDouble,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit2,
  Filter,
  Plus,
  Search,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── helpers ──────────────────────────────────────────────────────────────────

function tsToDate(ts: bigint): Date {
  return new Date(Number(ts));
}
function dateToTs(d: Date): bigint {
  return BigInt(d.getTime());
}
function fmtDate(ts: bigint): string {
  return tsToDate(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function fmtDateInput(ts: bigint): string {
  return tsToDate(ts).toISOString().split("T")[0];
}
function nights(checkIn: bigint, checkOut: bigint): number {
  return Math.round((Number(checkOut) - Number(checkIn)) / 86400000);
}

const STATUS_COLORS: Record<string, string> = {
  [BookingStatus.Confirmed]: "bg-emerald-500",
  [BookingStatus.CheckedIn]: "bg-blue-500",
  [BookingStatus.CheckedOut]: "bg-violet-500",
  [BookingStatus.Pending]: "bg-amber-500",
  [BookingStatus.Cancelled]: "bg-red-500",
  [BookingStatus.NoShow]: "bg-zinc-500",
};

const SOURCE_LABEL: Record<string, string> = {
  [BookingSource.OTA]: "OTA",
  [BookingSource.Direct]: "Direct",
  [BookingSource.WalkIn]: "Walk-in",
};

interface BookingFormData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomType: RoomType | "";
  roomId: string;
  checkIn: string;
  checkOut: string;
  numGuests: string;
  source: BookingSource;
  notes: string;
  status: BookingStatus;
}

const EMPTY_FORM: BookingFormData = {
  guestName: "",
  guestEmail: "",
  guestPhone: "",
  roomType: "",
  roomId: "",
  checkIn: "",
  checkOut: "",
  numGuests: "1",
  source: BookingSource.Direct,
  notes: "",
  status: BookingStatus.Confirmed,
};

// ─── New/Edit Booking Modal ────────────────────────────────────────────────────

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  editBooking?: Booking;
  defaultDate?: string;
}

function BookingModal({
  open,
  onClose,
  editBooking,
  defaultDate,
}: BookingModalProps) {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allRooms = useHotelStore((s) => s.rooms);
  const allBookings = useHotelStore((s) => s.bookings);
  const addBooking = useHotelStore((s) => s.addBooking);
  const updateBooking = useHotelStore((s) => s.updateBooking);

  const currentRooms = useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId],
  );
  const currentBookings = useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId],
  );

  const [form, setForm] = useState<BookingFormData>(() => {
    if (editBooking) {
      const room = currentRooms.find((r) => r.id === editBooking.roomId);
      return {
        guestName: editBooking.guestName,
        guestEmail: editBooking.guestEmail,
        guestPhone: editBooking.guestPhone,
        roomType: room?.roomType ?? "",
        roomId: String(editBooking.roomId),
        checkIn: fmtDateInput(editBooking.checkIn),
        checkOut: fmtDateInput(editBooking.checkOut),
        numGuests: String(editBooking.numGuests),
        source: editBooking.source,
        notes: editBooking.notes,
        status: editBooking.status,
      };
    }
    return {
      ...EMPTY_FORM,
      checkIn: defaultDate ?? "",
      status: BookingStatus.Confirmed,
    };
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFormData, string>>
  >({});

  const setField = (k: keyof BookingFormData, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const filteredRooms = useMemo<Room[]>(() => {
    if (!form.roomType) return currentRooms;
    return currentRooms.filter((r) => r.roomType === form.roomType);
  }, [form.roomType, currentRooms]);

  const validate = (): boolean => {
    const e: Partial<Record<keyof BookingFormData, string>> = {};
    if (!form.guestName.trim()) e.guestName = "Guest name required";
    if (!form.guestEmail.trim()) e.guestEmail = "Email required";
    if (!form.guestPhone.trim()) e.guestPhone = "Phone required";
    if (!form.roomId) e.roomId = "Select a room";
    if (!form.checkIn) e.checkIn = "Check-in date required";
    if (!form.checkOut) e.checkOut = "Check-out date required";
    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) {
      e.checkOut = "Check-out must be after check-in";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const roomId = BigInt(form.roomId);
    const checkIn = dateToTs(new Date(form.checkIn));
    const checkOut = dateToTs(new Date(form.checkOut));

    if (editBooking) {
      updateBooking({
        ...editBooking,
        guestName: form.guestName,
        guestEmail: form.guestEmail,
        guestPhone: form.guestPhone,
        roomId,
        checkIn,
        checkOut,
        numGuests: BigInt(form.numGuests),
        source: form.source,
        notes: form.notes,
        status: form.status,
      });
      toast.success("Booking updated successfully");
    } else {
      const newId = BigInt(
        Math.max(...allBookings.map((b) => Number(b.id))) + 1,
      );
      const hotelId = currentBookings[0]?.hotelId ?? 1n;
      addBooking({
        id: newId,
        hotelId,
        guestId: 1n,
        guestName: form.guestName,
        guestEmail: form.guestEmail,
        guestPhone: form.guestPhone,
        roomId,
        checkIn,
        checkOut,
        numGuests: BigInt(form.numGuests),
        source: form.source,
        notes: form.notes,
        status: form.status,
        earlyCheckIn: false,
        lateCheckOut: false,
        actualCheckIn: undefined,
        actualCheckOut: undefined,
        createdAt: BigInt(Date.now()),
      });
      toast.success("Booking created successfully");
    }
    onClose();
  };

  const isEdit = !!editBooking;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border"
        data-ocid="booking.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground font-display text-lg">
            {isEdit ? "Edit Booking" : "New Booking"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-2">
          {/* Guest Name */}
          <div className="col-span-2 sm:col-span-1 space-y-1.5">
            <Label htmlFor="guestName" className="text-foreground">
              Guest Name *
            </Label>
            <Input
              id="guestName"
              value={form.guestName}
              onChange={(e) => setField("guestName", e.target.value)}
              placeholder="Full name"
              className="bg-background border-border"
              data-ocid="booking.guest_name.input"
            />
            {errors.guestName && (
              <p
                className="text-xs text-red-400"
                data-ocid="booking.guest_name.field_error"
              >
                {errors.guestName}
              </p>
            )}
          </div>
          {/* Status (edit only) */}
          {isEdit ? (
            <div className="col-span-2 sm:col-span-1 space-y-1.5">
              <Label className="text-foreground">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setField("status", v)}
              >
                <SelectTrigger
                  className="bg-background border-border"
                  data-ocid="booking.status.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {Object.values(BookingStatus).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div />
          )}
          {/* Email */}
          <div className="col-span-2 sm:col-span-1 space-y-1.5">
            <Label htmlFor="guestEmail" className="text-foreground">
              Email *
            </Label>
            <Input
              id="guestEmail"
              type="email"
              value={form.guestEmail}
              onChange={(e) => setField("guestEmail", e.target.value)}
              placeholder="guest@email.com"
              className="bg-background border-border"
              data-ocid="booking.guest_email.input"
            />
            {errors.guestEmail && (
              <p
                className="text-xs text-red-400"
                data-ocid="booking.guest_email.field_error"
              >
                {errors.guestEmail}
              </p>
            )}
          </div>
          {/* Phone */}
          <div className="col-span-2 sm:col-span-1 space-y-1.5">
            <Label htmlFor="guestPhone" className="text-foreground">
              Phone *
            </Label>
            <Input
              id="guestPhone"
              value={form.guestPhone}
              onChange={(e) => setField("guestPhone", e.target.value)}
              placeholder="+91 98000 00000"
              className="bg-background border-border"
              data-ocid="booking.guest_phone.input"
            />
            {errors.guestPhone && (
              <p
                className="text-xs text-red-400"
                data-ocid="booking.guest_phone.field_error"
              >
                {errors.guestPhone}
              </p>
            )}
          </div>
          {/* Room Type */}
          <div className="col-span-2 sm:col-span-1 space-y-1.5">
            <Label className="text-foreground">Room Type</Label>
            <Select
              value={form.roomType}
              onValueChange={(v) => {
                setField("roomType", v);
                setField("roomId", "");
              }}
            >
              <SelectTrigger
                className="bg-background border-border"
                data-ocid="booking.room_type.select"
              >
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="any">Any type</SelectItem>
                {Object.values(RoomType).map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Room */}
          <div className="col-span-2 sm:col-span-1 space-y-1.5">
            <Label className="text-foreground">Room *</Label>
            <Select
              value={form.roomId}
              onValueChange={(v) => setField("roomId", v)}
            >
              <SelectTrigger
                className="bg-background border-border"
                data-ocid="booking.room.select"
              >
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {filteredRooms.map((r) => (
                  <SelectItem key={String(r.id)} value={String(r.id)}>
                    Room {r.number} — {r.roomType} (₹
                    {r.pricePerNight.toLocaleString()}/night)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.roomId && (
              <p
                className="text-xs text-red-400"
                data-ocid="booking.room.field_error"
              >
                {errors.roomId}
              </p>
            )}
          </div>
          {/* Check-in */}
          <div className="space-y-1.5">
            <Label htmlFor="checkIn" className="text-foreground">
              Check-in *
            </Label>
            <Input
              id="checkIn"
              type="date"
              value={form.checkIn}
              onChange={(e) => setField("checkIn", e.target.value)}
              className="bg-background border-border"
              data-ocid="booking.checkin.input"
            />
            {errors.checkIn && (
              <p
                className="text-xs text-red-400"
                data-ocid="booking.checkin.field_error"
              >
                {errors.checkIn}
              </p>
            )}
          </div>
          {/* Check-out */}
          <div className="space-y-1.5">
            <Label htmlFor="checkOut" className="text-foreground">
              Check-out *
            </Label>
            <Input
              id="checkOut"
              type="date"
              value={form.checkOut}
              onChange={(e) => setField("checkOut", e.target.value)}
              min={form.checkIn}
              className="bg-background border-border"
              data-ocid="booking.checkout.input"
            />
            {errors.checkOut && (
              <p
                className="text-xs text-red-400"
                data-ocid="booking.checkout.field_error"
              >
                {errors.checkOut}
              </p>
            )}
          </div>
          {/* Num Guests */}
          <div className="space-y-1.5">
            <Label htmlFor="numGuests" className="text-foreground">
              Guests
            </Label>
            <Input
              id="numGuests"
              type="number"
              min="1"
              max="10"
              value={form.numGuests}
              onChange={(e) => setField("numGuests", e.target.value)}
              className="bg-background border-border"
              data-ocid="booking.num_guests.input"
            />
          </div>
          {/* Source */}
          <div className="space-y-1.5">
            <Label className="text-foreground">Source</Label>
            <Select
              value={form.source}
              onValueChange={(v) => setField("source", v)}
            >
              <SelectTrigger
                className="bg-background border-border"
                data-ocid="booking.source.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value={BookingSource.Direct}>Direct</SelectItem>
                <SelectItem value={BookingSource.OTA}>OTA</SelectItem>
                <SelectItem value={BookingSource.WalkIn}>Walk-in</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Notes */}
          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="notes" className="text-foreground">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              placeholder="Special requests, preferences…"
              rows={2}
              className="bg-background border-border resize-none"
              data-ocid="booking.notes.textarea"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="booking.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold"
            data-ocid="booking.submit_button"
          >
            {isEdit ? "Update Booking" : "Create Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Cancel Confirm ────────────────────────────────────────────────────────────

interface CancelDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingId: bigint;
}

function CancelDialog({
  open,
  onClose,
  onConfirm,
  bookingId,
}: CancelDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
      <AlertDialogContent
        className="bg-card border-border"
        data-ocid="booking.cancel.dialog"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Cancel Booking #{String(bookingId)}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This will mark the booking as cancelled. This action cannot be
            undone easily.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border-border text-foreground"
            data-ocid="booking.cancel.cancel_button"
          >
            Keep Booking
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500 text-white"
            onClick={onConfirm}
            data-ocid="booking.cancel.confirm_button"
          >
            Yes, Cancel It
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Calendar View ─────────────────────────────────────────────────────────────

interface CalendarViewProps {
  bookings: Booking[];
  onNewBooking: (date: string) => void;
  onEditBooking: (b: Booking) => void;
}

function CalendarView({
  bookings,
  onNewBooking,
  onEditBooking,
}: CalendarViewProps) {
  const [viewDate, setViewDate] = useState(() => new Date());
  const [calView, setCalView] = useState<"month" | "week" | "day">("month");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startPad = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1),
    ),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const bookingsOnDay = useCallback(
    (d: Date): Booking[] => {
      const ts = d.getTime();
      return bookings.filter((b) => {
        const ci = Number(b.checkIn);
        const co = Number(b.checkOut);
        return ts >= ci && ts < co;
      });
    },
    [bookings],
  );

  const navigate = (dir: 1 | -1) => {
    setViewDate((d) => {
      const nd = new Date(d);
      nd.setMonth(nd.getMonth() + dir);
      return nd;
    });
  };

  const monthLabel = viewDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
            data-ocid="calendar.prev_button"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-foreground font-semibold text-base min-w-[160px] text-center">
            {monthLabel}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(1)}
            className="text-muted-foreground hover:text-foreground"
            data-ocid="calendar.next_button"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewDate(new Date())}
            className="ml-2 text-xs border-border"
            data-ocid="calendar.today_button"
          >
            Today
          </Button>
        </div>
        <div
          className="flex rounded-lg border border-border overflow-hidden"
          data-ocid="calendar.view_toggle"
        >
          {(["day", "week", "month"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setCalView(v)}
              onKeyDown={(e) => e.key === "Enter" && setCalView(v)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                calView === v
                  ? "bg-amber-500 text-black"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
              data-ocid={`calendar.${v}_view.tab`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-px">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="py-2 text-center text-xs font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden">
        {cells.map((d, idx) => {
          if (!d) {
            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: padding cells are positional by design
                key={`pad-${idx}`}
                className="bg-background/50 min-h-[100px]"
                aria-hidden="true"
              />
            );
          }
          const isToday = d.getTime() === today.getTime();
          const isOtherMonth = d.getMonth() !== month;
          const dayBookings = bookingsOnDay(d);
          const dateStr = d.toISOString().split("T")[0];
          const cellKey = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

          return (
            <button
              key={cellKey}
              type="button"
              className={cn(
                "bg-card min-h-[100px] p-1.5 text-left hover:bg-muted/50 transition-colors group w-full",
                isOtherMonth && "opacity-40",
              )}
              onClick={() => onNewBooking(dateStr)}
              data-ocid={`calendar.day.${idx + 1}`}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium mb-1",
                  isToday
                    ? "bg-amber-500 text-black"
                    : "text-foreground group-hover:bg-muted",
                )}
              >
                {d.getDate()}
              </div>
              <div className="space-y-0.5">
                {dayBookings.slice(0, 3).map((b) => (
                  <button
                    key={String(b.id)}
                    type="button"
                    className={cn(
                      "text-xs rounded px-1 py-0.5 truncate text-white font-medium w-full text-left",
                      STATUS_COLORS[b.status],
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditBooking(b);
                    }}
                    data-ocid={`calendar.booking.${String(b.id)}`}
                    title={`${b.guestName} — Room ${String(b.roomId)}`}
                  >
                    {b.guestName.split(" ")[0]}
                  </button>
                ))}
                {dayBookings.length > 3 && (
                  <div className="text-xs text-muted-foreground pl-1">
                    +{dayBookings.length - 3} more
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-1">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={cn("w-2.5 h-2.5 rounded-full", color)} />
            <span className="text-xs text-muted-foreground">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Timeline / Gantt View ─────────────────────────────────────────────────────

interface TimelineViewProps {
  bookings: Booking[];
  rooms: Room[];
  onEditBooking: (b: Booking) => void;
}

function TimelineView({ bookings, rooms, onEditBooking }: TimelineViewProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() + weekOffset * 14);

  const days: Date[] = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  const DAY_W = 52;

  function bookingBar(b: Booking) {
    const ci = new Date(Number(b.checkIn));
    ci.setHours(0, 0, 0, 0);
    const co = new Date(Number(b.checkOut));
    co.setHours(0, 0, 0, 0);
    const rangeStart = startDate.getTime();
    const rangeEnd = days[days.length - 1].getTime() + 86400000;

    if (ci.getTime() >= rangeEnd || co.getTime() <= rangeStart) return null;

    const clampedStart = Math.max(ci.getTime(), rangeStart);
    const clampedEnd = Math.min(co.getTime(), rangeEnd);
    const left = Math.round(((clampedStart - rangeStart) / 86400000) * DAY_W);
    const width = Math.max(
      Math.round(((clampedEnd - clampedStart) / 86400000) * DAY_W) - 2,
      20,
    );

    return { left, width };
  }

  const todayIdx = days.findIndex((d) => d.getTime() === today.getTime());

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <span className="text-sm text-muted-foreground">
          {startDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}{" "}
          —{" "}
          {days[13].toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset((w) => w - 1)}
            data-ocid="timeline.prev_button"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset(0)}
            data-ocid="timeline.today_button"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset((w) => w + 1)}
            data-ocid="timeline.next_button"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        {/* Header row: dates */}
        <div className="flex bg-muted/50 border-b border-border">
          <div className="w-28 shrink-0 px-3 py-2 text-xs font-medium text-muted-foreground border-r border-border">
            Room
          </div>
          <div className="overflow-x-auto flex-1">
            <div className="flex" style={{ width: days.length * DAY_W }}>
              {days.map((d) => {
                const isToday = d.getTime() === today.getTime();
                const dayKey = d.toISOString().split("T")[0];
                return (
                  <div
                    key={dayKey}
                    style={{ width: DAY_W }}
                    className={cn(
                      "shrink-0 text-center py-2 text-xs border-r border-border/50 last:border-r-0",
                      isToday
                        ? "text-amber-400 font-bold bg-amber-500/10"
                        : "text-muted-foreground",
                    )}
                  >
                    <div>
                      {d
                        .toLocaleDateString("en-IN", { weekday: "short" })
                        .slice(0, 2)}
                    </div>
                    <div className="font-semibold">{d.getDate()}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Room rows */}
        <div className="max-h-[480px] overflow-y-auto">
          {rooms.map((room, ri) => {
            const roomBookings = bookings.filter((b) => b.roomId === room.id);
            return (
              <div
                key={String(room.id)}
                className={cn(
                  "flex border-b border-border/50 last:border-b-0",
                  ri % 2 === 0 ? "bg-card" : "bg-muted/20",
                )}
                data-ocid={`timeline.room.${ri + 1}`}
              >
                <div className="w-28 shrink-0 px-3 py-3 border-r border-border">
                  <div className="text-xs font-semibold text-foreground">
                    Room {room.number}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {room.roomType}
                  </div>
                </div>
                <div className="flex-1 relative overflow-x-auto">
                  <div
                    className="relative"
                    style={{ width: days.length * DAY_W, height: 44 }}
                  >
                    {/* Today vertical line */}
                    {todayIdx >= 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-amber-500/60 z-10"
                        style={{ left: todayIdx * DAY_W + DAY_W / 2 }}
                      />
                    )}
                    {/* Day grid lines */}
                    {days.map((gridDay) => {
                      const gridKey = gridDay.toISOString().split("T")[0];
                      const di = days.indexOf(gridDay);
                      return (
                        <div
                          key={gridKey}
                          className="absolute top-0 bottom-0 border-r border-border/30"
                          style={{ left: (di + 1) * DAY_W }}
                        />
                      );
                    })}
                    {/* Booking bars */}
                    {roomBookings.map((b) => {
                      const bar = bookingBar(b);
                      if (!bar) return null;
                      return (
                        <button
                          key={String(b.id)}
                          type="button"
                          className={cn(
                            "absolute top-2 h-8 rounded text-white text-xs font-medium px-2 flex items-center truncate hover:brightness-110 transition-all shadow-sm",
                            STATUS_COLORS[b.status],
                          )}
                          style={{ left: bar.left, width: bar.width }}
                          onClick={() => onEditBooking(b)}
                          title={`${b.guestName} (${b.status})`}
                          data-ocid={`timeline.booking.${String(b.id)}`}
                        >
                          <span className="truncate">
                            {bar.width > 60 ? b.guestName.split(" ")[0] : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-1">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={cn("w-2.5 h-2.5 rounded-full", color)} />
            <span className="text-xs text-muted-foreground">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bookings List View ────────────────────────────────────────────────────────

interface BookingsListProps {
  bookings: Booking[];
  rooms: Room[];
  onEdit: (b: Booking) => void;
  onCancel: (b: Booking) => void;
  onNew: () => void;
}

function BookingsList({
  bookings,
  rooms,
  onEdit,
  onCancel,
  onNew,
}: BookingsListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "All">(
    "All",
  );

  const roomMap = useMemo(() => {
    const m: Record<string, Room> = {};
    for (const r of rooms) {
      m[String(r.id)] = r;
    }
    return m;
  }, [rooms]);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        !search ||
        b.guestName.toLowerCase().includes(search.toLowerCase()) ||
        String(b.id).includes(search);
      const matchStatus = statusFilter === "All" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  return (
    <div className="space-y-4">
      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by guest name or booking ID…"
            className="pl-9 bg-background border-border"
            data-ocid="bookings.search_input"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as BookingStatus | "All")}
          >
            <SelectTrigger
              className="w-40 bg-background border-border"
              data-ocid="bookings.status_filter.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="All">All Statuses</SelectItem>
              {Object.values(BookingStatus).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Badge
          variant="outline"
          className="text-muted-foreground border-border"
        >
          {filtered.length} booking{filtered.length !== 1 ? "s" : ""}
        </Badge>
        <Button
          onClick={onNew}
          className="ml-auto bg-amber-500 hover:bg-amber-400 text-black font-semibold"
          data-ocid="bookings.new_booking.primary_button"
        >
          <Plus className="w-4 h-4 mr-1.5" /> New Booking
        </Button>
      </div>

      {/* Table */}
      <div className="border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Guest
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Room
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Check-in
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Check-out
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">
                  Nights
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Source
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-16 text-center"
                    data-ocid="bookings.empty_state"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Calendar className="w-10 h-10 text-muted-foreground/40" />
                      <p className="text-muted-foreground font-medium">
                        No bookings found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Try changing your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((b, idx) => {
                  const room = roomMap[String(b.roomId)];
                  const n = nights(b.checkIn, b.checkOut);
                  const isCancellable =
                    b.status !== BookingStatus.Cancelled &&
                    b.status !== BookingStatus.CheckedOut &&
                    b.status !== BookingStatus.NoShow;
                  return (
                    <tr
                      key={String(b.id)}
                      className="border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition-colors"
                      data-ocid={`bookings.item.${idx + 1}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        #{String(b.id).padStart(4, "0")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground truncate max-w-[140px]">
                          {b.guestName}
                        </div>
                        <div className="text-xs text-muted-foreground truncate max-w-[140px]">
                          {b.guestEmail}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-foreground">
                          {room
                            ? `Room ${room.number}`
                            : `#${String(b.roomId)}`}
                        </div>
                        {room && (
                          <div className="text-xs text-muted-foreground">
                            {room.roomType}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-foreground whitespace-nowrap">
                        {fmtDate(b.checkIn)}
                      </td>
                      <td className="px-4 py-3 text-foreground whitespace-nowrap">
                        {fmtDate(b.checkOut)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-semibold text-foreground">
                          {n}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className="text-xs border-border text-muted-foreground"
                        >
                          {SOURCE_LABEL[b.source] ?? b.source}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={() => onEdit(b)}
                            aria-label="Edit booking"
                            data-ocid={`bookings.edit_button.${idx + 1}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          {isCancellable && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-red-400"
                              onClick={() => onCancel(b)}
                              aria-label="Cancel booking"
                              data-ocid={`bookings.delete_button.${idx + 1}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ReservationsPage() {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allRooms = useHotelStore((s) => s.rooms);
  const allBookings = useHotelStore((s) => s.bookings);
  const updateBooking = useHotelStore((s) => s.updateBooking);

  const currentBookings = useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId],
  );
  const currentRooms = useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId],
  );

  const [activeTab, setActiveTab] = useState("bookings");
  const [modalOpen, setModalOpen] = useState(false);
  const [editBooking, setEditBooking] = useState<Booking | undefined>();
  const [cancelTarget, setCancelTarget] = useState<Booking | undefined>();
  const [defaultDate, setDefaultDate] = useState<string | undefined>();

  const openNew = (date?: string) => {
    setEditBooking(undefined);
    setDefaultDate(date);
    setModalOpen(true);
  };

  const openEdit = (b: Booking) => {
    setEditBooking(b);
    setDefaultDate(undefined);
    setModalOpen(true);
  };

  const openCancel = (b: Booking) => setCancelTarget(b);

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    updateBooking({ ...cancelTarget, status: BookingStatus.Cancelled });
    toast.success(`Booking #${cancelTarget.id} cancelled`);
    setCancelTarget(undefined);
  };

  const confirmed = currentBookings.filter(
    (b) => b.status === BookingStatus.Confirmed,
  ).length;
  const checkedIn = currentBookings.filter(
    (b) => b.status === BookingStatus.CheckedIn,
  ).length;
  const pending = currentBookings.filter(
    (b) => b.status === BookingStatus.Pending,
  ).length;
  const cancelled = currentBookings.filter(
    (b) => b.status === BookingStatus.Cancelled,
  ).length;

  return (
    <div
      className="p-6 space-y-6 max-w-[1400px] mx-auto"
      data-ocid="reservations.page"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Reservations
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage all hotel bookings across calendar, timeline and list views
          </p>
        </div>
        <Button
          onClick={() => openNew()}
          className="bg-amber-500 hover:bg-amber-400 text-black font-semibold shrink-0"
          data-ocid="reservations.new_booking.primary_button"
        >
          <Plus className="w-4 h-4 mr-1.5" /> New Booking
        </Button>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          {
            label: "Confirmed",
            count: confirmed,
            icon: Calendar,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Checked In",
            count: checkedIn,
            icon: User,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            label: "Pending",
            count: pending,
            icon: Clock,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
          },
          {
            label: "Cancelled",
            count: cancelled,
            icon: X,
            color: "text-red-400",
            bg: "bg-red-500/10",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3"
            data-ocid={`reservations.stat.${stat.label.toLowerCase().replace(" ", "_")}`}
          >
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                stat.bg,
              )}
            >
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {stat.count}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="reservations.tabs"
      >
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger
            value="calendar"
            className="data-[state=active]:bg-card"
            data-ocid="reservations.calendar.tab"
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5" /> Calendar
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="data-[state=active]:bg-card"
            data-ocid="reservations.timeline.tab"
          >
            <BedDouble className="w-3.5 h-3.5 mr-1.5" /> Timeline
          </TabsTrigger>
          <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-card"
            data-ocid="reservations.list.tab"
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" /> Bookings List
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="calendar" className="mt-4">
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-card border border-border rounded-xl p-5">
                <CalendarView
                  bookings={currentBookings}
                  onNewBooking={(date) => openNew(date)}
                  onEditBooking={openEdit}
                />
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-4">
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-card border border-border rounded-xl p-5">
                <TimelineView
                  bookings={currentBookings}
                  rooms={currentRooms}
                  onEditBooking={openEdit}
                />
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-4">
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-card border border-border rounded-xl p-5">
                <BookingsList
                  bookings={currentBookings}
                  rooms={currentRooms}
                  onEdit={openEdit}
                  onCancel={openCancel}
                  onNew={() => openNew()}
                />
              </div>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>

      {/* New/Edit modal */}
      {modalOpen && (
        <BookingModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditBooking(undefined);
          }}
          editBooking={editBooking}
          defaultDate={defaultDate}
        />
      )}

      {/* Cancel confirmation */}
      {cancelTarget && (
        <CancelDialog
          open={!!cancelTarget}
          onClose={() => setCancelTarget(undefined)}
          onConfirm={handleConfirmCancel}
          bookingId={cancelTarget.id}
        />
      )}
    </div>
  );
}

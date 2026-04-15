import { BookingSource, BookingStatus } from "@/backend";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHotelStore } from "@/store/useHotelStore";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<BookingStatus, string> = {
  [BookingStatus.Confirmed]:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  [BookingStatus.Pending]: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  [BookingStatus.Cancelled]: "bg-red-500/15 text-red-400 border-red-500/25",
  [BookingStatus.NoShow]: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25",
  [BookingStatus.CheckedIn]: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  [BookingStatus.CheckedOut]:
    "bg-violet-500/15 text-violet-400 border-violet-500/25",
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ManagementBookingsTab() {
  const hotels = useHotelStore((s) => s.hotels);
  const bookings = useHotelStore((s) => s.bookings);
  const rooms = useHotelStore((s) => s.rooms);
  const updateBooking = useHotelStore((s) => s.updateBooking);
  const removeBooking = useHotelStore((s) => s.removeBooking);

  const [hotelFilter, setHotelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<bigint | null>(null);

  const filtered = bookings
    .filter((b) =>
      hotelFilter === "all" ? true : String(b.hotelId) === hotelFilter,
    )
    .filter((b) => (statusFilter === "all" ? true : b.status === statusFilter));

  const hotelName = (id: bigint) =>
    hotels.find((h) => h.id === id)?.name ?? "Unknown";

  const roomNumber = (id: bigint) =>
    rooms.find((r) => r.id === id)?.number ?? String(id);

  const handleStatusChange = (bookingId: bigint, newStatus: BookingStatus) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;
    updateBooking({ ...booking, status: newStatus });
    toast.success(`Booking status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-4" data-ocid="management.bookings_tab">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={hotelFilter} onValueChange={setHotelFilter}>
          <SelectTrigger
            data-ocid="management.bookings_hotel_filter"
            className="w-52"
          >
            <SelectValue placeholder="All Hotels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Hotels</SelectItem>
            {hotels.map((h) => (
              <SelectItem key={String(h.id)} value={String(h.id)}>
                {h.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            data-ocid="management.bookings_status_filter"
            className="w-44"
          >
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.values(BookingStatus).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="ml-auto text-sm text-muted-foreground">
          {filtered.length} bookings
        </span>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {[
                  "Guest",
                  "Hotel",
                  "Room",
                  "Check-in",
                  "Check-out",
                  "Guests",
                  "Source",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-muted-foreground"
                    data-ocid="management.bookings_empty_state"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map((booking, idx) => (
                  <tr
                    key={String(booking.id)}
                    data-ocid={`management.booking_row.${idx + 1}`}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {booking.guestName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.guestEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs truncate max-w-[120px]">
                      {hotelName(booking.hotelId)}
                    </td>
                    <td className="px-4 py-3 font-mono text-foreground">
                      {roomNumber(booking.roomId)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {formatDate(booking.checkIn)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {formatDate(booking.checkOut)}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {String(booking.numGuests)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          booking.source === BookingSource.Direct
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/25 text-xs"
                            : booking.source === BookingSource.OTA
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/25 text-xs"
                              : "bg-muted text-muted-foreground text-xs"
                        }
                      >
                        {booking.source}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={booking.status}
                        onValueChange={(v) =>
                          handleStatusChange(booking.id, v as BookingStatus)
                        }
                      >
                        <SelectTrigger
                          data-ocid={`management.booking_status_select.${idx + 1}`}
                          className={`h-7 text-xs w-36 ${STATUS_COLORS[booking.status]}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(BookingStatus).map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        data-ocid={`management.booking_delete_button.${idx + 1}`}
                        onClick={() => setDeleteId(booking.id)}
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteId(null);
        }}
      >
        <AlertDialogContent data-ocid="management.booking_delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="management.booking_delete_cancel_button"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="management.booking_delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteId !== null) {
                  removeBooking(deleteId);
                  toast.success("Booking deleted");
                  setDeleteId(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

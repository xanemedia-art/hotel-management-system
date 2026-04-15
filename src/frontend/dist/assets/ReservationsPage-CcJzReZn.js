import { c as createLucideIcon, u as useHotelStore, r as reactExports, B as BookingStatus, j as jsxRuntimeExports, C as Calendar, X, a as cn, f as ue, g as ChevronLeft, h as ChevronRight, i as BookingSource, k as RoomType } from "./index-CBcYPlz6.js";
import { S as StatusBadge } from "./StatusBadge-C7ZHomM8.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Bbo2Grkc.js";
import { B as Badge } from "./badge-Ca613t8w.js";
import { B as Button } from "./button-Db-hK2sn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./index-BsZnwoVC.js";
import { I as Input } from "./input-CcvuTxso.js";
import { L as Label } from "./label-CXZjKKoG.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, P as Pen } from "./select-BG7gycgm.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DqB3xbOv.js";
import { T as Textarea } from "./textarea-B51ZXUe5.js";
import { P as Plus } from "./plus-uqfn8bA2.js";
import { m as motion } from "./proxy-DDZWRdmp.js";
import { U as User } from "./user-DdoRQTNO.js";
import { C as Clock } from "./clock-CchWJkw1.js";
import { B as BedDouble } from "./bed-double-DFIXwpvs.js";
import { A as AnimatePresence } from "./index-CDAIX88k.js";
import { S as Search } from "./search-u_kKtxgz.js";
import "./index-Dma1JNTM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
function tsToDate(ts) {
  return new Date(Number(ts));
}
function dateToTs(d) {
  return BigInt(d.getTime());
}
function fmtDate(ts) {
  return tsToDate(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function fmtDateInput(ts) {
  return tsToDate(ts).toISOString().split("T")[0];
}
function nights(checkIn, checkOut) {
  return Math.round((Number(checkOut) - Number(checkIn)) / 864e5);
}
const STATUS_COLORS = {
  [BookingStatus.Confirmed]: "bg-emerald-500",
  [BookingStatus.CheckedIn]: "bg-blue-500",
  [BookingStatus.CheckedOut]: "bg-violet-500",
  [BookingStatus.Pending]: "bg-amber-500",
  [BookingStatus.Cancelled]: "bg-red-500",
  [BookingStatus.NoShow]: "bg-zinc-500"
};
const SOURCE_LABEL = {
  [BookingSource.OTA]: "OTA",
  [BookingSource.Direct]: "Direct",
  [BookingSource.WalkIn]: "Walk-in"
};
const EMPTY_FORM = {
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
  status: BookingStatus.Confirmed
};
function BookingModal({
  open,
  onClose,
  editBooking,
  defaultDate
}) {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allRooms = useHotelStore((s) => s.rooms);
  const allBookings = useHotelStore((s) => s.bookings);
  const addBooking = useHotelStore((s) => s.addBooking);
  const updateBooking = useHotelStore((s) => s.updateBooking);
  const currentRooms = reactExports.useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId]
  );
  const currentBookings = reactExports.useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId]
  );
  const [form, setForm] = reactExports.useState(() => {
    if (editBooking) {
      const room = currentRooms.find((r) => r.id === editBooking.roomId);
      return {
        guestName: editBooking.guestName,
        guestEmail: editBooking.guestEmail,
        guestPhone: editBooking.guestPhone,
        roomType: (room == null ? void 0 : room.roomType) ?? "",
        roomId: String(editBooking.roomId),
        checkIn: fmtDateInput(editBooking.checkIn),
        checkOut: fmtDateInput(editBooking.checkOut),
        numGuests: String(editBooking.numGuests),
        source: editBooking.source,
        notes: editBooking.notes,
        status: editBooking.status
      };
    }
    return {
      ...EMPTY_FORM,
      checkIn: defaultDate ?? "",
      status: BookingStatus.Confirmed
    };
  });
  const [errors, setErrors] = reactExports.useState({});
  const setField = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };
  const filteredRooms = reactExports.useMemo(() => {
    if (!form.roomType) return currentRooms;
    return currentRooms.filter((r) => r.roomType === form.roomType);
  }, [form.roomType, currentRooms]);
  const validate = () => {
    const e = {};
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
    var _a;
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
        status: form.status
      });
      ue.success("Booking updated successfully");
    } else {
      const newId = BigInt(
        Math.max(...allBookings.map((b) => Number(b.id))) + 1
      );
      const hotelId = ((_a = currentBookings[0]) == null ? void 0 : _a.hotelId) ?? 1n;
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
        actualCheckIn: void 0,
        actualCheckOut: void 0,
        createdAt: BigInt(Date.now())
      });
      ue.success("Booking created successfully");
    }
    onClose();
  };
  const isEdit = !!editBooking;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border",
      "data-ocid": "booking.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-foreground font-display text-lg", children: isEdit ? "Edit Booking" : "New Booking" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "guestName", className: "text-foreground", children: "Guest Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "guestName",
                value: form.guestName,
                onChange: (e) => setField("guestName", e.target.value),
                placeholder: "Full name",
                className: "bg-background border-border",
                "data-ocid": "booking.guest_name.input"
              }
            ),
            errors.guestName && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-red-400",
                "data-ocid": "booking.guest_name.field_error",
                children: errors.guestName
              }
            )
          ] }),
          isEdit ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.status,
                onValueChange: (v) => setField("status", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "bg-background border-border",
                      "data-ocid": "booking.status.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: Object.values(BookingStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "guestEmail", className: "text-foreground", children: "Email *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "guestEmail",
                type: "email",
                value: form.guestEmail,
                onChange: (e) => setField("guestEmail", e.target.value),
                placeholder: "guest@email.com",
                className: "bg-background border-border",
                "data-ocid": "booking.guest_email.input"
              }
            ),
            errors.guestEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-red-400",
                "data-ocid": "booking.guest_email.field_error",
                children: errors.guestEmail
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "guestPhone", className: "text-foreground", children: "Phone *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "guestPhone",
                value: form.guestPhone,
                onChange: (e) => setField("guestPhone", e.target.value),
                placeholder: "+91 98000 00000",
                className: "bg-background border-border",
                "data-ocid": "booking.guest_phone.input"
              }
            ),
            errors.guestPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-red-400",
                "data-ocid": "booking.guest_phone.field_error",
                children: errors.guestPhone
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Room Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.roomType,
                onValueChange: (v) => {
                  setField("roomType", v);
                  setField("roomId", "");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "bg-background border-border",
                      "data-ocid": "booking.room_type.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Any type" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-card border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "any", children: "Any type" }),
                    Object.values(RoomType).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t))
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Room *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.roomId,
                onValueChange: (v) => setField("roomId", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "bg-background border-border",
                      "data-ocid": "booking.room.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select room" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border", children: filteredRooms.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(r.id), children: [
                    "Room ",
                    r.number,
                    " — ",
                    r.roomType,
                    " (₹",
                    r.pricePerNight.toLocaleString(),
                    "/night)"
                  ] }, String(r.id))) })
                ]
              }
            ),
            errors.roomId && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-red-400",
                "data-ocid": "booking.room.field_error",
                children: errors.roomId
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "checkIn", className: "text-foreground", children: "Check-in *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "checkIn",
                type: "date",
                value: form.checkIn,
                onChange: (e) => setField("checkIn", e.target.value),
                className: "bg-background border-border",
                "data-ocid": "booking.checkin.input"
              }
            ),
            errors.checkIn && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-red-400",
                "data-ocid": "booking.checkin.field_error",
                children: errors.checkIn
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "checkOut", className: "text-foreground", children: "Check-out *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "checkOut",
                type: "date",
                value: form.checkOut,
                onChange: (e) => setField("checkOut", e.target.value),
                min: form.checkIn,
                className: "bg-background border-border",
                "data-ocid": "booking.checkout.input"
              }
            ),
            errors.checkOut && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-red-400",
                "data-ocid": "booking.checkout.field_error",
                children: errors.checkOut
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "numGuests", className: "text-foreground", children: "Guests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "numGuests",
                type: "number",
                min: "1",
                max: "10",
                value: form.numGuests,
                onChange: (e) => setField("numGuests", e.target.value),
                className: "bg-background border-border",
                "data-ocid": "booking.num_guests.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Source" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.source,
                onValueChange: (v) => setField("source", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "bg-background border-border",
                      "data-ocid": "booking.source.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-card border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BookingSource.Direct, children: "Direct" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BookingSource.OTA, children: "OTA" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BookingSource.WalkIn, children: "Walk-in" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", className: "text-foreground", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "notes",
                value: form.notes,
                onChange: (e) => setField("notes", e.target.value),
                placeholder: "Special requests, preferences…",
                rows: 2,
                className: "bg-background border-border resize-none",
                "data-ocid": "booking.notes.textarea"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onClose,
              "data-ocid": "booking.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSubmit,
              className: "bg-amber-500 hover:bg-amber-400 text-black font-semibold",
              "data-ocid": "booking.submit_button",
              children: isEdit ? "Update Booking" : "Create Booking"
            }
          )
        ] })
      ]
    }
  ) });
}
function CancelDialog({
  open,
  onClose,
  onConfirm,
  bookingId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AlertDialogContent,
    {
      className: "bg-card border-border",
      "data-ocid": "booking.cancel.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "text-foreground", children: [
            "Cancel Booking #",
            String(bookingId),
            "?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This will mark the booking as cancelled. This action cannot be undone easily." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogCancel,
            {
              className: "border-border text-foreground",
              "data-ocid": "booking.cancel.cancel_button",
              children: "Keep Booking"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogAction,
            {
              className: "bg-red-600 hover:bg-red-500 text-white",
              onClick: onConfirm,
              "data-ocid": "booking.cancel.confirm_button",
              children: "Yes, Cancel It"
            }
          )
        ] })
      ]
    }
  ) });
}
function CalendarView({
  bookings,
  onNewBooking,
  onEditBooking
}) {
  const [viewDate, setViewDate] = reactExports.useState(() => /* @__PURE__ */ new Date());
  const [calView, setCalView] = reactExports.useState("month");
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startPad = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(startPad).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    )
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const bookingsOnDay = reactExports.useCallback(
    (d) => {
      const ts = d.getTime();
      return bookings.filter((b) => {
        const ci = Number(b.checkIn);
        const co = Number(b.checkOut);
        return ts >= ci && ts < co;
      });
    },
    [bookings]
  );
  const navigate = (dir) => {
    setViewDate((d) => {
      const nd = new Date(d);
      nd.setMonth(nd.getMonth() + dir);
      return nd;
    });
  };
  const monthLabel = viewDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => navigate(-1),
            className: "text-muted-foreground hover:text-foreground",
            "data-ocid": "calendar.prev_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold text-base min-w-[160px] text-center", children: monthLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => navigate(1),
            className: "text-muted-foreground hover:text-foreground",
            "data-ocid": "calendar.next_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setViewDate(/* @__PURE__ */ new Date()),
            className: "ml-2 text-xs border-border",
            "data-ocid": "calendar.today_button",
            children: "Today"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex rounded-lg border border-border overflow-hidden",
          "data-ocid": "calendar.view_toggle",
          children: ["day", "week", "month"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCalView(v),
              onKeyDown: (e) => e.key === "Enter" && setCalView(v),
              className: cn(
                "px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                calView === v ? "bg-amber-500 text-black" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              ),
              "data-ocid": `calendar.${v}_view.tab`,
              children: v
            },
            v
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-px", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-2 text-center text-xs font-medium text-muted-foreground",
        children: d
      },
      d
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden", children: cells.map((d, idx) => {
      if (!d) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-background/50 min-h-[100px]",
            "aria-hidden": "true"
          },
          `pad-${idx}`
        );
      }
      const isToday = d.getTime() === today.getTime();
      const isOtherMonth = d.getMonth() !== month;
      const dayBookings = bookingsOnDay(d);
      const dateStr = d.toISOString().split("T")[0];
      const cellKey = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: cn(
            "bg-card min-h-[100px] p-1.5 text-left hover:bg-muted/50 transition-colors group w-full",
            isOtherMonth && "opacity-40"
          ),
          onClick: () => onNewBooking(dateStr),
          "data-ocid": `calendar.day.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium mb-1",
                  isToday ? "bg-amber-500 text-black" : "text-foreground group-hover:bg-muted"
                ),
                children: d.getDate()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
              dayBookings.slice(0, 3).map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: cn(
                    "text-xs rounded px-1 py-0.5 truncate text-white font-medium w-full text-left",
                    STATUS_COLORS[b.status]
                  ),
                  onClick: (e) => {
                    e.stopPropagation();
                    onEditBooking(b);
                  },
                  "data-ocid": `calendar.booking.${String(b.id)}`,
                  title: `${b.guestName} — Room ${String(b.roomId)}`,
                  children: b.guestName.split(" ")[0]
                },
                String(b.id)
              )),
              dayBookings.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground pl-1", children: [
                "+",
                dayBookings.length - 3,
                " more"
              ] })
            ] })
          ]
        },
        cellKey
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 pt-1", children: Object.entries(STATUS_COLORS).map(([status, color]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-2.5 h-2.5 rounded-full", color) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: status })
    ] }, status)) })
  ] });
}
function TimelineView({ bookings, rooms, onEditBooking }) {
  const [weekOffset, setWeekOffset] = reactExports.useState(0);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() + weekOffset * 14);
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });
  const DAY_W = 52;
  function bookingBar(b) {
    const ci = new Date(Number(b.checkIn));
    ci.setHours(0, 0, 0, 0);
    const co = new Date(Number(b.checkOut));
    co.setHours(0, 0, 0, 0);
    const rangeStart = startDate.getTime();
    const rangeEnd = days[days.length - 1].getTime() + 864e5;
    if (ci.getTime() >= rangeEnd || co.getTime() <= rangeStart) return null;
    const clampedStart = Math.max(ci.getTime(), rangeStart);
    const clampedEnd = Math.min(co.getTime(), rangeEnd);
    const left = Math.round((clampedStart - rangeStart) / 864e5 * DAY_W);
    const width = Math.max(
      Math.round((clampedEnd - clampedStart) / 864e5 * DAY_W) - 2,
      20
    );
    return { left, width };
  }
  const todayIdx = days.findIndex((d) => d.getTime() === today.getTime());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        startDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short"
        }),
        " ",
        "—",
        " ",
        days[13].toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setWeekOffset((w) => w - 1),
            "data-ocid": "timeline.prev_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setWeekOffset(0),
            "data-ocid": "timeline.today_button",
            children: "Today"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setWeekOffset((w) => w + 1),
            "data-ocid": "timeline.next_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-muted/50 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 shrink-0 px-3 py-2 text-xs font-medium text-muted-foreground border-r border-border", children: "Room" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", style: { width: days.length * DAY_W }, children: days.map((d) => {
          const isToday = d.getTime() === today.getTime();
          const dayKey = d.toISOString().split("T")[0];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { width: DAY_W },
              className: cn(
                "shrink-0 text-center py-2 text-xs border-r border-border/50 last:border-r-0",
                isToday ? "text-amber-400 font-bold bg-amber-500/10" : "text-muted-foreground"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: d.toLocaleDateString("en-IN", { weekday: "short" }).slice(0, 2) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: d.getDate() })
              ]
            },
            dayKey
          );
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[480px] overflow-y-auto", children: rooms.map((room, ri) => {
        const roomBookings = bookings.filter((b) => b.roomId === room.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex border-b border-border/50 last:border-b-0",
              ri % 2 === 0 ? "bg-card" : "bg-muted/20"
            ),
            "data-ocid": `timeline.room.${ri + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-28 shrink-0 px-3 py-3 border-r border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-foreground", children: [
                  "Room ",
                  room.number
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: room.roomType })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative",
                  style: { width: days.length * DAY_W, height: 44 },
                  children: [
                    todayIdx >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute top-0 bottom-0 w-0.5 bg-amber-500/60 z-10",
                        style: { left: todayIdx * DAY_W + DAY_W / 2 }
                      }
                    ),
                    days.map((gridDay) => {
                      const gridKey = gridDay.toISOString().split("T")[0];
                      const di = days.indexOf(gridDay);
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute top-0 bottom-0 border-r border-border/30",
                          style: { left: (di + 1) * DAY_W }
                        },
                        gridKey
                      );
                    }),
                    roomBookings.map((b) => {
                      const bar = bookingBar(b);
                      if (!bar) return null;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: cn(
                            "absolute top-2 h-8 rounded text-white text-xs font-medium px-2 flex items-center truncate hover:brightness-110 transition-all shadow-sm",
                            STATUS_COLORS[b.status]
                          ),
                          style: { left: bar.left, width: bar.width },
                          onClick: () => onEditBooking(b),
                          title: `${b.guestName} (${b.status})`,
                          "data-ocid": `timeline.booking.${String(b.id)}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: bar.width > 60 ? b.guestName.split(" ")[0] : "" })
                        },
                        String(b.id)
                      );
                    })
                  ]
                }
              ) })
            ]
          },
          String(room.id)
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 pt-1", children: Object.entries(STATUS_COLORS).map(([status, color]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-2.5 h-2.5 rounded-full", color) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: status })
    ] }, status)) })
  ] });
}
function BookingsList({
  bookings,
  rooms,
  onEdit,
  onCancel,
  onNew
}) {
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "All"
  );
  const roomMap = reactExports.useMemo(() => {
    const m = {};
    for (const r of rooms) {
      m[String(r.id)] = r;
    }
    return m;
  }, [rooms]);
  const filtered = reactExports.useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch = !search || b.guestName.toLowerCase().includes(search.toLowerCase()) || String(b.id).includes(search);
      const matchStatus = statusFilter === "All" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by guest name or booking ID…",
            className: "pl-9 bg-background border-border",
            "data-ocid": "bookings.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: statusFilter,
            onValueChange: (v) => setStatusFilter(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-40 bg-background border-border",
                  "data-ocid": "bookings.status_filter.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-card border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "All", children: "All Statuses" }),
                Object.values(BookingStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "text-muted-foreground border-border",
          children: [
            filtered.length,
            " booking",
            filtered.length !== 1 ? "s" : ""
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: onNew,
          className: "ml-auto bg-amber-500 hover:bg-amber-400 text-black font-semibold",
          "data-ocid": "bookings.new_booking.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
            " New Booking"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-medium text-muted-foreground", children: "ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-medium text-muted-foreground", children: "Guest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-medium text-muted-foreground", children: "Room" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-medium text-muted-foreground", children: "Check-in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-medium text-muted-foreground", children: "Check-out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 text-xs font-medium text-muted-foreground", children: "Nights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-medium text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-medium text-muted-foreground", children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 9,
          className: "py-16 text-center",
          "data-ocid": "bookings.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No bookings found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Try changing your search or filters" })
          ] })
        }
      ) }) : filtered.map((b, idx) => {
        const room = roomMap[String(b.roomId)];
        const n = nights(b.checkIn, b.checkOut);
        const isCancellable = b.status !== BookingStatus.Cancelled && b.status !== BookingStatus.CheckedOut && b.status !== BookingStatus.NoShow;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition-colors",
            "data-ocid": `bookings.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
                "#",
                String(b.id).padStart(4, "0")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground truncate max-w-[140px]", children: b.guestName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate max-w-[140px]", children: b.guestEmail })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground", children: room ? `Room ${room.number}` : `#${String(b.roomId)}` }),
                room && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: room.roomType })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground whitespace-nowrap", children: fmtDate(b.checkIn) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground whitespace-nowrap", children: fmtDate(b.checkOut) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: n }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: b.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs border-border text-muted-foreground",
                  children: SOURCE_LABEL[b.source] ?? b.source
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7 text-muted-foreground hover:text-foreground",
                    onClick: () => onEdit(b),
                    "aria-label": "Edit booking",
                    "data-ocid": `bookings.edit_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                  }
                ),
                isCancellable && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-7 w-7 text-muted-foreground hover:text-red-400",
                    onClick: () => onCancel(b),
                    "aria-label": "Cancel booking",
                    "data-ocid": `bookings.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) })
            ]
          },
          String(b.id)
        );
      }) })
    ] }) }) })
  ] });
}
function ReservationsPage() {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allRooms = useHotelStore((s) => s.rooms);
  const allBookings = useHotelStore((s) => s.bookings);
  const updateBooking = useHotelStore((s) => s.updateBooking);
  const currentBookings = reactExports.useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId]
  );
  const currentRooms = reactExports.useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId]
  );
  const [activeTab, setActiveTab] = reactExports.useState("bookings");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editBooking, setEditBooking] = reactExports.useState();
  const [cancelTarget, setCancelTarget] = reactExports.useState();
  const [defaultDate, setDefaultDate] = reactExports.useState();
  const openNew = (date) => {
    setEditBooking(void 0);
    setDefaultDate(date);
    setModalOpen(true);
  };
  const openEdit = (b) => {
    setEditBooking(b);
    setDefaultDate(void 0);
    setModalOpen(true);
  };
  const openCancel = (b) => setCancelTarget(b);
  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    updateBooking({ ...cancelTarget, status: BookingStatus.Cancelled });
    ue.success(`Booking #${cancelTarget.id} cancelled`);
    setCancelTarget(void 0);
  };
  const confirmed = currentBookings.filter(
    (b) => b.status === BookingStatus.Confirmed
  ).length;
  const checkedIn = currentBookings.filter(
    (b) => b.status === BookingStatus.CheckedIn
  ).length;
  const pending = currentBookings.filter(
    (b) => b.status === BookingStatus.Pending
  ).length;
  const cancelled = currentBookings.filter(
    (b) => b.status === BookingStatus.Cancelled
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-6 space-y-6 max-w-[1400px] mx-auto",
      "data-ocid": "reservations.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Reservations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Manage all hotel bookings across calendar, timeline and list views" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => openNew(),
              className: "bg-amber-500 hover:bg-amber-400 text-black font-semibold shrink-0",
              "data-ocid": "reservations.new_booking.primary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                " New Booking"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            className: "grid grid-cols-2 md:grid-cols-4 gap-3",
            children: [
              {
                label: "Confirmed",
                count: confirmed,
                icon: Calendar,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10"
              },
              {
                label: "Checked In",
                count: checkedIn,
                icon: User,
                color: "text-blue-400",
                bg: "bg-blue-500/10"
              },
              {
                label: "Pending",
                count: pending,
                icon: Clock,
                color: "text-amber-400",
                bg: "bg-amber-500/10"
              },
              {
                label: "Cancelled",
                count: cancelled,
                icon: X,
                color: "text-red-400",
                bg: "bg-red-500/10"
              }
            ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3",
                "data-ocid": `reservations.stat.${stat.label.toLowerCase().replace(" ", "_")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                        stat.bg
                      ),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: cn("w-4 h-4", stat.color) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-foreground", children: stat.count }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: stat.label })
                  ] })
                ]
              },
              stat.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Tabs,
          {
            value: activeTab,
            onValueChange: setActiveTab,
            "data-ocid": "reservations.tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/50 border border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "calendar",
                    className: "data-[state=active]:bg-card",
                    "data-ocid": "reservations.calendar.tab",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 mr-1.5" }),
                      " Calendar"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "timeline",
                    className: "data-[state=active]:bg-card",
                    "data-ocid": "reservations.timeline.tab",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-3.5 h-3.5 mr-1.5" }),
                      " Timeline"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "bookings",
                    className: "data-[state=active]:bg-card",
                    "data-ocid": "reservations.list.tab",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 mr-1.5" }),
                      " Bookings List"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "calendar", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 6 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CalendarView,
                      {
                        bookings: currentBookings,
                        onNewBooking: (date) => openNew(date),
                        onEditBooking: openEdit
                      }
                    ) })
                  },
                  "calendar"
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timeline", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 6 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TimelineView,
                      {
                        bookings: currentBookings,
                        rooms: currentRooms,
                        onEditBooking: openEdit
                      }
                    ) })
                  },
                  "timeline"
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bookings", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 6 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      BookingsList,
                      {
                        bookings: currentBookings,
                        rooms: currentRooms,
                        onEdit: openEdit,
                        onCancel: openCancel,
                        onNew: () => openNew()
                      }
                    ) })
                  },
                  "bookings"
                ) })
              ] })
            ]
          }
        ),
        modalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingModal,
          {
            open: modalOpen,
            onClose: () => {
              setModalOpen(false);
              setEditBooking(void 0);
            },
            editBooking,
            defaultDate
          }
        ),
        cancelTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CancelDialog,
          {
            open: !!cancelTarget,
            onClose: () => setCancelTarget(void 0),
            onConfirm: handleConfirmCancel,
            bookingId: cancelTarget.id
          }
        )
      ]
    }
  );
}
export {
  ReservationsPage as default
};

import { c as createLucideIcon, u as useHotelStore, r as reactExports, j as jsxRuntimeExports, B as BookingStatus, i as BookingSource, f as ue, G as GuestTag, R as RoomStatus, k as RoomType, E as StaffStatus, w as StaffRole, H as LayoutDashboard, U as Users, h as ChevronRight, I as sampleActivityFeed, J as sampleAnalytics, K as sampleChannelConfigs, M as sampleFolios, N as sampleHousekeepingTasks, Q as sampleStaff, V as sampleGuests, W as sampleBookings, Y as sampleRooms, Z as sampleHotels } from "./index-CBcYPlz6.js";
import { B as Button } from "./button-Db-hK2sn.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DqB3xbOv.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Bbo2Grkc.js";
import { B as Badge } from "./badge-Ca613t8w.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, P as Pen } from "./select-BG7gycgm.js";
import { T as Trash2 } from "./trash-2-u1RSvh14.js";
import { C as Checkbox, U as UserCog } from "./checkbox-Cyg0l1zt.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./index-BsZnwoVC.js";
import { I as Input } from "./input-CcvuTxso.js";
import { L as Label } from "./label-CXZjKKoG.js";
import { T as Textarea } from "./textarea-B51ZXUe5.js";
import { S as Search } from "./search-u_kKtxgz.js";
import { P as Plus } from "./plus-uqfn8bA2.js";
import { S as StatusBadge } from "./StatusBadge-C7ZHomM8.js";
import { S as Switch } from "./switch-C5pUhbL7.js";
import { B as BedDouble } from "./bed-double-DFIXwpvs.js";
import { m as motion } from "./proxy-DDZWRdmp.js";
import { R as RefreshCw } from "./refresh-cw-DrE_i4KT.js";
import "./index-Dma1JNTM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode);
const STATUS_COLORS = {
  [BookingStatus.Confirmed]: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  [BookingStatus.Pending]: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  [BookingStatus.Cancelled]: "bg-red-500/15 text-red-400 border-red-500/25",
  [BookingStatus.NoShow]: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25",
  [BookingStatus.CheckedIn]: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  [BookingStatus.CheckedOut]: "bg-violet-500/15 text-violet-400 border-violet-500/25"
};
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function ManagementBookingsTab() {
  const hotels = useHotelStore((s) => s.hotels);
  const bookings = useHotelStore((s) => s.bookings);
  const rooms = useHotelStore((s) => s.rooms);
  const updateBooking = useHotelStore((s) => s.updateBooking);
  const removeBooking = useHotelStore((s) => s.removeBooking);
  const [hotelFilter, setHotelFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const filtered = bookings.filter(
    (b) => hotelFilter === "all" ? true : String(b.hotelId) === hotelFilter
  ).filter((b) => statusFilter === "all" ? true : b.status === statusFilter);
  const hotelName = (id) => {
    var _a;
    return ((_a = hotels.find((h) => h.id === id)) == null ? void 0 : _a.name) ?? "Unknown";
  };
  const roomNumber = (id) => {
    var _a;
    return ((_a = rooms.find((r) => r.id === id)) == null ? void 0 : _a.number) ?? String(id);
  };
  const handleStatusChange = (bookingId, newStatus) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;
    updateBooking({ ...booking, status: newStatus });
    ue.success(`Booking status updated to ${newStatus}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "management.bookings_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: hotelFilter, onValueChange: setHotelFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            "data-ocid": "management.bookings_hotel_filter",
            className: "w-52",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Hotels" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Hotels" }),
          hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(h.id), children: h.name }, String(h.id)))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            "data-ocid": "management.bookings_status_filter",
            className: "w-44",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Statuses" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
          Object.values(BookingStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-sm text-muted-foreground", children: [
        filtered.length,
        " bookings"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: [
        "Guest",
        "Hotel",
        "Room",
        "Check-in",
        "Check-out",
        "Guests",
        "Source",
        "Status",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 9,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "management.bookings_empty_state",
          children: "No bookings found."
        }
      ) }) : filtered.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `management.booking_row.${idx + 1}`,
          className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: booking.guestName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: booking.guestEmail })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs truncate max-w-[120px]", children: hotelName(booking.hotelId) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-foreground", children: roomNumber(booking.roomId) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: formatDate(booking.checkIn) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: formatDate(booking.checkOut) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center text-muted-foreground", children: String(booking.numGuests) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: booking.source === BookingSource.Direct ? "bg-amber-500/10 text-amber-400 border-amber-500/25 text-xs" : booking.source === BookingSource.OTA ? "bg-blue-500/10 text-blue-400 border-blue-500/25 text-xs" : "bg-muted text-muted-foreground text-xs",
                children: booking.source
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: booking.status,
                onValueChange: (v) => handleStatusChange(booking.id, v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      "data-ocid": `management.booking_status_select.${idx + 1}`,
                      className: `h-7 text-xs w-36 ${STATUS_COLORS[booking.status]}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(BookingStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                "data-ocid": `management.booking_delete_button.${idx + 1}`,
                onClick: () => setDeleteId(booking.id),
                className: "h-7 w-7 text-muted-foreground hover:text-destructive",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            ) })
          ]
        },
        String(booking.id)
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deleteId !== null,
        onOpenChange: (o) => {
          if (!o) setDeleteId(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "management.booking_delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Booking?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogCancel,
              {
                "data-ocid": "management.booking_delete_cancel_button",
                onClick: () => setDeleteId(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "management.booking_delete_confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                onClick: () => {
                  if (deleteId !== null) {
                    removeBooking(deleteId);
                    ue.success("Booking deleted");
                    setDeleteId(null);
                  }
                },
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const ALL_TAGS = Object.values(GuestTag);
const TAG_COLORS = {
  [GuestTag.VIP]: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  [GuestTag.Corporate]: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  [GuestTag.Regular]: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  [GuestTag.New]: "bg-violet-500/15 text-violet-400 border-violet-500/25"
};
const emptyForm$2 = () => ({
  name: "",
  email: "",
  phone: "",
  country: "India",
  address: "",
  tags: [],
  preferences: "",
  notes: ""
});
function guestToForm(g) {
  return {
    name: g.name,
    email: g.email,
    phone: g.phone,
    country: g.country,
    address: g.address,
    tags: [...g.tags],
    preferences: g.preferences,
    notes: g.notes
  };
}
function ManagementGuestsTab() {
  const guests = useHotelStore((s) => s.guests);
  const addGuest = useHotelStore((s) => s.addGuest);
  const updateGuest = useHotelStore((s) => s.updateGuest);
  const removeGuest = useHotelStore((s) => s.removeGuest);
  const [search, setSearch] = reactExports.useState("");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editGuest, setEditGuest] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm$2());
  const filtered = guests.filter(
    (g) => !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase())
  );
  const openAdd = () => {
    setForm(emptyForm$2());
    setShowAdd(true);
  };
  const openEdit = (g) => {
    setForm(guestToForm(g));
    setEditGuest(g);
  };
  const closeModals = () => {
    setShowAdd(false);
    setEditGuest(null);
  };
  const toggleTag = (tag) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag]
    }));
  };
  const handleSubmit = () => {
    if (!form.name.trim()) return ue.error("Name is required");
    if (!form.email.trim()) return ue.error("Email is required");
    if (editGuest) {
      updateGuest({
        ...editGuest,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country,
        address: form.address,
        tags: form.tags,
        preferences: form.preferences,
        notes: form.notes
      });
      ue.success("Guest updated");
    } else {
      const maxId = guests.reduce((m, g) => g.id > m ? g.id : m, 0n);
      addGuest({
        id: maxId + 1n,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country,
        address: form.address,
        tags: form.tags,
        preferences: form.preferences,
        notes: form.notes,
        loyaltyPoints: 0n,
        createdAt: BigInt(Date.now())
      });
      ue.success("Guest added");
    }
    closeModals();
  };
  const GuestFormFields = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "guest-form.name_input",
          value: form.name,
          onChange: (e) => setForm({ ...form, name: e.target.value }),
          placeholder: "e.g. Arjun Mehta"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "guest-form.email_input",
          type: "email",
          value: form.email,
          onChange: (e) => setForm({ ...form, email: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "guest-form.phone_input",
          value: form.phone,
          onChange: (e) => setForm({ ...form, phone: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Country" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "guest-form.country_input",
          value: form.country,
          onChange: (e) => setForm({ ...form, country: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "guest-form.address_input",
          value: form.address,
          onChange: (e) => setForm({ ...form, address: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tags" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ALL_TAGS.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: `tag-${tag}`,
            "data-ocid": `guest-form.tag_${tag.toLowerCase()}`,
            checked: form.tags.includes(tag),
            onCheckedChange: () => toggleTag(tag)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: `tag-${tag}`,
            className: "cursor-pointer font-normal",
            children: tag
          }
        )
      ] }, tag)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preferences" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          "data-ocid": "guest-form.preferences_textarea",
          value: form.preferences,
          onChange: (e) => setForm({ ...form, preferences: e.target.value }),
          rows: 2
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          "data-ocid": "guest-form.notes_textarea",
          value: form.notes,
          onChange: (e) => setForm({ ...form, notes: e.target.value }),
          rows: 2
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "management.guests_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-64", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "management.guests_search_input",
            className: "pl-9",
            placeholder: "Search guests...",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "management.guests_add_button",
          onClick: openAdd,
          className: "ml-auto gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Guest"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: [
        "Name",
        "Email",
        "Phone",
        "Tags",
        "Stays",
        "Loyalty",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 7,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "management.guests_empty_state",
          children: "No guests found."
        }
      ) }) : filtered.map((g, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `management.guest_row.${idx + 1}`,
          className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: g.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: g.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: g.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: g.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `status-badge text-[10px] ${TAG_COLORS[t] ?? "bg-muted text-muted-foreground border-border"}`,
                children: t
              },
              t
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center text-muted-foreground", children: "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-medium text-amber-400", children: [
              String(g.loyaltyPoints),
              " pts"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `management.guest_edit_button.${idx + 1}`,
                  onClick: () => openEdit(g),
                  className: "h-7 w-7 text-muted-foreground hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `management.guest_delete_button.${idx + 1}`,
                  onClick: () => setDeleteId(g.id),
                  className: "h-7 w-7 text-muted-foreground hover:text-destructive",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) })
          ]
        },
        String(g.id)
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "management.guest_add_dialog",
        className: "sm:max-w-lg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Guest" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GuestFormFields, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                "data-ocid": "management.guest_form_cancel_button",
                onClick: closeModals,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "management.guest_form_submit_button",
                onClick: handleSubmit,
                children: "Add Guest"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!editGuest,
        onOpenChange: (o) => {
          if (!o) setEditGuest(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            "data-ocid": "management.guest_edit_dialog",
            className: "sm:max-w-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Guest" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GuestFormFields, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    "data-ocid": "management.guest_edit_cancel_button",
                    onClick: closeModals,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "management.guest_edit_submit_button",
                    onClick: handleSubmit,
                    children: "Save Changes"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deleteId !== null,
        onOpenChange: (o) => {
          if (!o) setDeleteId(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "management.guest_delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Guest?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Guest record will be permanently removed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogCancel,
              {
                "data-ocid": "management.guest_delete_cancel_button",
                onClick: () => setDeleteId(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "management.guest_delete_confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                onClick: () => {
                  if (deleteId !== null) {
                    removeGuest(deleteId);
                    ue.success("Guest deleted");
                    setDeleteId(null);
                  }
                },
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const ROOM_TYPES = Object.values(RoomType);
const ROOM_STATUSES = Object.values(RoomStatus);
const emptyForm$1 = () => ({
  number: "",
  floor: "1",
  roomType: RoomType.Standard,
  status: RoomStatus.Clean,
  pricePerNight: "3500",
  capacity: "2",
  isActive: true
});
function roomToForm(r) {
  return {
    number: r.number,
    floor: String(r.floor),
    roomType: r.roomType,
    status: r.status,
    pricePerNight: String(r.pricePerNight),
    capacity: String(r.capacity),
    isActive: r.isActive
  };
}
function ManagementRoomsTab() {
  const hotels = useHotelStore((s) => s.hotels);
  const rooms = useHotelStore((s) => s.rooms);
  const addRoom = useHotelStore((s) => s.addRoom);
  const updateRoom = useHotelStore((s) => s.updateRoom);
  const removeRoom = useHotelStore((s) => s.removeRoom);
  const [hotelFilter, setHotelFilter] = reactExports.useState("all");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editRoom, setEditRoom] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm$1());
  const filteredRooms = hotelFilter === "all" ? rooms : rooms.filter((r) => String(r.hotelId) === hotelFilter);
  const hotelName = (id) => {
    var _a;
    return ((_a = hotels.find((h) => h.id === id)) == null ? void 0 : _a.name) ?? "Unknown";
  };
  const openAdd = () => {
    setForm(emptyForm$1());
    setShowAdd(true);
  };
  const openEdit = (r) => {
    setForm(roomToForm(r));
    setEditRoom(r);
  };
  const closeModals = () => {
    setShowAdd(false);
    setEditRoom(null);
  };
  const handleSubmit = () => {
    var _a;
    const price = Number.parseFloat(form.pricePerNight);
    const cap = Number.parseInt(form.capacity, 10);
    const floor = Number.parseInt(form.floor, 10);
    if (!form.number.trim()) return ue.error("Room number is required");
    if (Number.isNaN(price) || price <= 0) return ue.error("Invalid price");
    if (editRoom) {
      updateRoom({
        ...editRoom,
        number: form.number.trim(),
        floor: BigInt(floor),
        roomType: form.roomType,
        status: form.status,
        pricePerNight: price,
        capacity: BigInt(cap),
        isActive: form.isActive
      });
      ue.success("Room updated");
    } else {
      const newHotelId = hotelFilter !== "all" ? BigInt(hotelFilter) : ((_a = hotels[0]) == null ? void 0 : _a.id) ?? 1n;
      const maxId = rooms.reduce((m, r) => r.id > m ? r.id : m, 0n);
      addRoom({
        id: maxId + 1n,
        hotelId: newHotelId,
        number: form.number.trim(),
        floor: BigInt(floor),
        roomType: form.roomType,
        status: form.status,
        pricePerNight: price,
        capacity: BigInt(cap),
        amenities: ["WiFi", "AC", "TV"],
        isActive: form.isActive
      });
      ue.success("Room added");
    }
    closeModals();
  };
  const handleToggleActive = (room) => {
    updateRoom({ ...room, isActive: !room.isActive });
  };
  const RoomFormFields = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Room Number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "room-form.number_input",
          value: form.number,
          onChange: (e) => setForm({ ...form, number: e.target.value }),
          placeholder: "e.g. 101"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Floor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "room-form.floor_input",
          type: "number",
          min: 1,
          max: 10,
          value: form.floor,
          onChange: (e) => setForm({ ...form, floor: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Room Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: form.roomType,
          onValueChange: (v) => setForm({ ...form, roomType: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "room-form.type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROOM_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: form.status,
          onValueChange: (v) => setForm({ ...form, status: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "room-form.status_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROOM_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price / Night (₹)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "room-form.price_input",
          type: "number",
          min: 0,
          value: form.pricePerNight,
          onChange: (e) => setForm({ ...form, pricePerNight: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Capacity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "room-form.capacity_input",
          type: "number",
          min: 1,
          max: 10,
          value: form.capacity,
          onChange: (e) => setForm({ ...form, capacity: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          "data-ocid": "room-form.active_switch",
          checked: form.isActive,
          onCheckedChange: (v) => setForm({ ...form, isActive: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Active" })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "management.rooms_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: hotelFilter, onValueChange: setHotelFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            "data-ocid": "management.rooms_hotel_filter",
            className: "w-52",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Hotels" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Hotels" }),
          hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(h.id), children: h.name }, String(h.id)))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "management.rooms_add_button",
          onClick: openAdd,
          className: "ml-auto gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Room"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: [
        "Room #",
        "Hotel",
        "Floor",
        "Type",
        "Status",
        "Price/Night",
        "Capacity",
        "Active",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredRooms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 9,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "management.rooms_empty_state",
          children: "No rooms found."
        }
      ) }) : filteredRooms.map((room, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `management.room_row.${idx + 1}`,
          className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono font-medium text-foreground", children: room.number }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[150px]", children: hotelName(room.hotelId) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: String(room.floor) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: room.roomType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: room.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-medium", children: [
              "₹",
              room.pricePerNight.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: String(room.capacity) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                "data-ocid": `management.room_active_toggle.${idx + 1}`,
                checked: room.isActive,
                onCheckedChange: () => handleToggleActive(room)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `management.room_edit_button.${idx + 1}`,
                  onClick: () => openEdit(room),
                  className: "h-7 w-7 text-muted-foreground hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `management.room_delete_button.${idx + 1}`,
                  onClick: () => setDeleteId(room.id),
                  className: "h-7 w-7 text-muted-foreground hover:text-destructive",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) })
          ]
        },
        String(room.id)
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "management.room_add_dialog",
        className: "sm:max-w-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Room" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoomFormFields, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                "data-ocid": "management.room_form_cancel_button",
                onClick: closeModals,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "management.room_form_submit_button",
                onClick: handleSubmit,
                children: "Add Room"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!editRoom,
        onOpenChange: (o) => {
          if (!o) setEditRoom(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            "data-ocid": "management.room_edit_dialog",
            className: "sm:max-w-md",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Room" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RoomFormFields, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    "data-ocid": "management.room_edit_cancel_button",
                    onClick: closeModals,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "management.room_edit_submit_button",
                    onClick: handleSubmit,
                    children: "Save Changes"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deleteId !== null,
        onOpenChange: (o) => {
          if (!o) setDeleteId(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "management.room_delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Room?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogCancel,
              {
                "data-ocid": "management.room_delete_cancel_button",
                onClick: () => setDeleteId(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "management.room_delete_confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                onClick: () => {
                  if (deleteId !== null) {
                    removeRoom(deleteId);
                    ue.success("Room deleted");
                    setDeleteId(null);
                  }
                },
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const ROLES = Object.values(StaffRole);
const emptyForm = (defaultHotelId = "") => ({
  name: "",
  email: "",
  phone: "",
  role: StaffRole.FrontDesk,
  hotelId: defaultHotelId,
  isActive: true
});
function staffToForm(s) {
  return {
    name: s.name,
    email: s.email,
    phone: s.phone,
    role: s.role,
    hotelId: String(s.hotelId),
    isActive: s.status === StaffStatus.Active
  };
}
function ManagementStaffTab() {
  const hotels = useHotelStore((s) => s.hotels);
  const staff = useHotelStore((s) => s.staff);
  const addStaff = useHotelStore((s) => s.addStaff);
  const updateStaff = useHotelStore((s) => s.updateStaff);
  const removeStaff = useHotelStore((s) => s.removeStaff);
  const [hotelFilter, setHotelFilter] = reactExports.useState("all");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editMember, setEditMember] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm());
  const filtered = hotelFilter === "all" ? staff : staff.filter((s) => String(s.hotelId) === hotelFilter);
  const hotelName = (id) => {
    var _a;
    return ((_a = hotels.find((h) => h.id === id)) == null ? void 0 : _a.name) ?? "Unknown";
  };
  const openAdd = () => {
    setForm(emptyForm(hotels[0] ? String(hotels[0].id) : ""));
    setShowAdd(true);
  };
  const openEdit = (m) => {
    setForm(staffToForm(m));
    setEditMember(m);
  };
  const closeModals = () => {
    setShowAdd(false);
    setEditMember(null);
  };
  const handleSubmit = () => {
    if (!form.name.trim()) return ue.error("Name is required");
    if (!form.email.trim()) return ue.error("Email is required");
    if (!form.hotelId) return ue.error("Select a hotel");
    const status = form.isActive ? StaffStatus.Active : StaffStatus.Inactive;
    if (editMember) {
      updateStaff({
        ...editMember,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        status
      });
      ue.success("Staff updated");
    } else {
      const maxId = staff.reduce((m, s) => s.id > m ? s.id : m, 0n);
      addStaff({
        id: maxId + 1n,
        hotelId: BigInt(form.hotelId),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        status
      });
      ue.success("Staff member added");
    }
    closeModals();
  };
  const handleToggle = (m) => {
    updateStaff({
      ...m,
      status: m.status === StaffStatus.Active ? StaffStatus.Inactive : StaffStatus.Active
    });
  };
  const StaffFormFields = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "staff-form.name_input",
          value: form.name,
          onChange: (e) => setForm({ ...form, name: e.target.value }),
          placeholder: "e.g. Ravi Menon"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "staff-form.email_input",
          type: "email",
          value: form.email,
          onChange: (e) => setForm({ ...form, email: e.target.value }),
          placeholder: "email@hotel.in"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "staff-form.phone_input",
          value: form.phone,
          onChange: (e) => setForm({ ...form, phone: e.target.value }),
          placeholder: "+91 98000 00000"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: form.role,
          onValueChange: (v) => setForm({ ...form, role: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "staff-form.role_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Property" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: form.hotelId,
          onValueChange: (v) => setForm({ ...form, hotelId: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "staff-form.hotel_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select hotel" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(h.id), children: h.name }, String(h.id))) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          "data-ocid": "staff-form.active_switch",
          checked: form.isActive,
          onCheckedChange: (v) => setForm({ ...form, isActive: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Active" })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "management.staff_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: hotelFilter, onValueChange: setHotelFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            "data-ocid": "management.staff_hotel_filter",
            className: "w-52",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Hotels" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Hotels" }),
          hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(h.id), children: h.name }, String(h.id)))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "management.staff_add_button",
          onClick: openAdd,
          className: "ml-auto gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Staff"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: ["Name", "Email", "Role", "Property", "Status", "Actions"].map(
        (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
            children: h
          },
          h
        )
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 6,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "management.staff_empty_state",
          children: "No staff found."
        }
      ) }) : filtered.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `management.staff_row.${idx + 1}`,
          className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: m.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: m.role }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[160px]", children: hotelName(m.hotelId) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                "data-ocid": `management.staff_active_toggle.${idx + 1}`,
                checked: m.status === StaffStatus.Active,
                onCheckedChange: () => handleToggle(m)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `management.staff_edit_button.${idx + 1}`,
                  onClick: () => openEdit(m),
                  className: "h-7 w-7 text-muted-foreground hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `management.staff_delete_button.${idx + 1}`,
                  onClick: () => setDeleteId(m.id),
                  className: "h-7 w-7 text-muted-foreground hover:text-destructive",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) })
          ]
        },
        String(m.id)
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "management.staff_add_dialog",
        className: "sm:max-w-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Staff Member" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StaffFormFields, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                "data-ocid": "management.staff_form_cancel_button",
                onClick: closeModals,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "management.staff_form_submit_button",
                onClick: handleSubmit,
                children: "Add Staff"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!editMember,
        onOpenChange: (o) => {
          if (!o) setEditMember(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            "data-ocid": "management.staff_edit_dialog",
            className: "sm:max-w-md",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Staff Member" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StaffFormFields, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    "data-ocid": "management.staff_edit_cancel_button",
                    onClick: closeModals,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "management.staff_edit_submit_button",
                    onClick: handleSubmit,
                    children: "Save Changes"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deleteId !== null,
        onOpenChange: (o) => {
          if (!o) setDeleteId(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "management.staff_delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove Staff Member?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogCancel,
              {
                "data-ocid": "management.staff_delete_cancel_button",
                onClick: () => setDeleteId(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "management.staff_delete_confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                onClick: () => {
                  if (deleteId !== null) {
                    removeStaff(deleteId);
                    ue.success("Staff member removed");
                    setDeleteId(null);
                  }
                },
                children: "Remove"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const QUICK_LINKS = [
  {
    label: "Rooms",
    tab: "rooms",
    icon: BedDouble,
    bg: "bg-blue-500/10 border-blue-500/20",
    color: "text-blue-400"
  },
  {
    label: "Staff",
    tab: "staff",
    icon: UserCog,
    bg: "bg-violet-500/10 border-violet-500/20",
    color: "text-violet-400"
  },
  {
    label: "Guests",
    tab: "guests",
    icon: Users,
    bg: "bg-emerald-500/10 border-emerald-500/20",
    color: "text-emerald-400"
  },
  {
    label: "Bookings",
    tab: "bookings",
    icon: BookOpen,
    bg: "bg-amber-500/10 border-amber-500/20",
    color: "text-amber-400"
  }
];
function StatCard({
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-medium uppercase tracking-wider", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-foreground font-display mt-1", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
  ] });
}
function OverviewTab({ onTabChange }) {
  const hotels = useHotelStore((s) => s.hotels);
  const rooms = useHotelStore((s) => s.rooms);
  const guests = useHotelStore((s) => s.guests);
  const bookings = useHotelStore((s) => s.bookings);
  const staff = useHotelStore((s) => s.staff);
  const handleLoadSample = () => {
    useHotelStore.setState({
      hotels: sampleHotels,
      rooms: sampleRooms,
      bookings: sampleBookings,
      guests: sampleGuests,
      staff: sampleStaff,
      housekeepingTasks: sampleHousekeepingTasks,
      folios: sampleFolios,
      channelConfigs: sampleChannelConfigs,
      analyticsData: sampleAnalytics,
      activityFeed: sampleActivityFeed
    });
    ue.success("Sample data loaded", {
      description: "All stores re-seeded with demo data."
    });
  };
  const handleClearAll = () => {
    useHotelStore.setState({
      hotels: [],
      rooms: [],
      bookings: [],
      guests: [],
      staff: [],
      housekeepingTasks: [],
      folios: [],
      channelConfigs: [],
      analyticsData: [],
      activityFeed: []
    });
    ue.warning("All data cleared", {
      description: "Store reset to empty state."
    });
  };
  const stats = [
    { label: "Hotels", value: hotels.length },
    {
      label: "Rooms",
      value: rooms.length,
      sub: `${rooms.filter((r) => r.isActive).length} active`
    },
    { label: "Guests", value: guests.length },
    {
      label: "Bookings",
      value: bookings.length,
      sub: `${bookings.filter((b) => b.status === "CheckedIn").length} checked in`
    },
    {
      label: "Staff",
      value: staff.length,
      sub: `${staff.filter((s) => s.status === "Active").length} active`
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...stat })
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "management.load_sample_button",
          size: "lg",
          className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold px-6",
          onClick: handleLoadSample,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Load Sample Data"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "management.clear_all_button",
          variant: "outline",
          size: "lg",
          onClick: handleClearAll,
          className: "border-destructive/60 text-destructive hover:bg-destructive/10 gap-2 font-semibold px-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
            "Clear All Data"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Quick Access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: QUICK_LINKS.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: 0.25 + i * 0.07 },
          "data-ocid": `management.quicklink_${link.tab}`,
          onClick: () => onTabChange(link.tab),
          className: `flex items-center justify-between p-4 rounded-xl border transition-smooth hover:scale-[1.02] cursor-pointer ${link.bg}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: `w-5 h-5 ${link.color}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: link.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
          ]
        },
        link.tab
      )) })
    ] })
  ] });
}
const TABS = [
  { value: "overview", label: "Overview", icon: LayoutDashboard },
  { value: "rooms", label: "Rooms", icon: BedDouble },
  { value: "staff", label: "Staff", icon: UserCog },
  { value: "guests", label: "Guests", icon: Users },
  { value: "bookings", label: "Bookings", icon: BookOpen }
];
function ManagementPage() {
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "management.page", className: "page-enter space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold text-foreground font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-6 h-6 text-primary" }),
        "Management Panel"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Full CRUD control over rooms, staff, guests, and bookings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: (v) => setActiveTab(v),
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "bg-card border border-border h-auto p-1 flex-wrap gap-1", children: TABS.map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value,
              "data-ocid": `management.tab_${value}`,
              className: "gap-2 text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
                label
              ]
            },
            value
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, { onTabChange: setActiveTab }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rooms", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ManagementRoomsTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "staff", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ManagementStaffTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "guests", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ManagementGuestsTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bookings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ManagementBookingsTab, {}) })
        ]
      }
    )
  ] });
}
export {
  ManagementPage as default
};

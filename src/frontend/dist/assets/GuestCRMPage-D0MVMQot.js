import { c as createLucideIcon, u as useHotelStore, r as reactExports, G as GuestTag, j as jsxRuntimeExports, U as Users, f as ue, C as Calendar, A as Globe } from "./index-CBcYPlz6.js";
import { S as StatusBadge } from "./StatusBadge-C7ZHomM8.js";
import { B as Button } from "./button-Db-hK2sn.js";
import { U as UserCog, C as Checkbox } from "./checkbox-Cyg0l1zt.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./index-BsZnwoVC.js";
import { I as Input } from "./input-CcvuTxso.js";
import { L as Label } from "./label-CXZjKKoG.js";
import { S as ScrollArea, a as Separator } from "./separator-BU6TS2m-.js";
import { T as Textarea } from "./textarea-B51ZXUe5.js";
import { P as Plus } from "./plus-uqfn8bA2.js";
import { S as Search } from "./search-u_kKtxgz.js";
import { U as User } from "./user-DdoRQTNO.js";
import { S as Star } from "./star-0cWHhGe9.js";
import { M as Mail } from "./mail-C_Rs8ezD.js";
import { P as Phone } from "./phone-BnZ7kXfT.js";
import "./index-Dma1JNTM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode);
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function fmtDate(ts) {
  if (!ts) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(Number(ts)));
}
function fmtCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function nightsBetween(checkIn, checkOut) {
  const diff = Number(checkOut) - Number(checkIn);
  return Math.max(1, Math.round(diff / 864e5));
}
const TAG_CONFIG = {
  [GuestTag.VIP]: {
    label: "VIP",
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30 font-semibold"
  },
  [GuestTag.Corporate]: {
    label: "Corporate",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/30"
  },
  [GuestTag.Regular]: {
    label: "Regular",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  },
  [GuestTag.New]: {
    label: "New",
    classes: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30"
  }
};
function GuestTagBadge({ tag }) {
  const cfg = TAG_CONFIG[tag];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.classes}`,
      children: [
        tag === GuestTag.VIP && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-2.5 h-2.5" }),
        cfg.label
      ]
    }
  );
}
function getCommLogs(guestId) {
  const base = [
    {
      date: "12 Mar 2026",
      type: "Email",
      subject: "Booking Confirmation – Grand Meridian",
      status: "Delivered"
    },
    {
      date: "10 Mar 2026",
      type: "SMS",
      subject: "Check-in reminder: Tomorrow at 14:00",
      status: "Delivered"
    },
    {
      date: "5 Feb 2026",
      type: "Email",
      subject: "Thank you for your stay! Rate your experience",
      status: "Sent"
    },
    {
      date: "18 Jan 2026",
      type: "Email",
      subject: "Exclusive member offer – 20% off next stay",
      status: "Delivered"
    },
    {
      date: "1 Jan 2026",
      type: "SMS",
      subject: "Happy New Year from Grand Meridian",
      status: "Sent"
    }
  ];
  const offset = Number(guestId) % 3;
  return base.slice(offset, offset + 3).concat(base.slice(0, offset));
}
const BLANK_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
  country: "",
  tags: []
};
function GuestListItem({
  guest,
  bookings,
  selected,
  onClick,
  index
}) {
  const guestBookings = bookings.filter((b) => b.guestId === guest.id);
  const lastStay = guestBookings.length > 0 ? guestBookings.reduce((a, b) => a.checkOut > b.checkOut ? a : b) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "data-ocid": `guest-crm.guest-list.item.${index}`,
      onClick,
      className: `w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 ${selected ? "bg-primary/10 border-primary/40 shadow-sm" : "bg-card border-border hover:bg-muted/50 hover:border-primary/20"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: getInitials(guest.name) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate", children: guest.name }),
            guest.tags.includes(GuestTag.VIP) && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3 text-amber-400 shrink-0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: guest.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-1.5 flex-wrap", children: guest.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(GuestTagBadge, { tag }, tag)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 text-xs text-muted-foreground", children: [
            lastStay && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
              fmtDate(lastStay.checkOut)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-amber-400" }),
              guest.loyaltyPoints.toString()
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function StatCard({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-lg p-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `text-2xl font-bold ${highlight ? "text-primary" : "text-foreground"}`,
        children: value
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: label })
  ] });
}
function GuestModal({
  open,
  onClose,
  initial,
  onSubmit,
  mode
}) {
  const [form, setForm] = reactExports.useState(initial);
  const handleOpen = () => setForm(initial);
  function toggleTag(tag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag]
    }));
  }
  function handleSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      ue.error("Name, email, and phone are required.");
      return;
    }
    onSubmit(form);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (v) => {
        if (!v) onClose();
        else handleOpen();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          "data-ocid": `guest-crm.${mode}-guest.dialog`,
          className: "max-w-md bg-card border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-foreground font-display", children: mode === "add" ? "Add New Guest" : "Edit Guest Profile" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-foreground", children: [
                    "Full Name ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": `guest-crm.${mode}-guest.name-input`,
                      value: form.name,
                      onChange: (e) => setForm({ ...form, name: e.target.value }),
                      placeholder: "e.g. Arjun Mehta",
                      className: "bg-background border-input text-foreground"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-foreground", children: [
                    "Email ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": `guest-crm.${mode}-guest.email-input`,
                      type: "email",
                      value: form.email,
                      onChange: (e) => setForm({ ...form, email: e.target.value }),
                      placeholder: "email@example.com",
                      className: "bg-background border-input text-foreground"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-foreground", children: [
                    "Phone ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": `guest-crm.${mode}-guest.phone-input`,
                      value: form.phone,
                      onChange: (e) => setForm({ ...form, phone: e.target.value }),
                      placeholder: "+91 98xxx xxxxx",
                      className: "bg-background border-input text-foreground"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": `guest-crm.${mode}-guest.address-input`,
                      value: form.address,
                      onChange: (e) => setForm({ ...form, address: e.target.value }),
                      placeholder: "City, State",
                      className: "bg-background border-input text-foreground"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Country" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": `guest-crm.${mode}-guest.country-input`,
                      value: form.country,
                      onChange: (e) => setForm({ ...form, country: e.target.value }),
                      placeholder: "India",
                      className: "bg-background border-input text-foreground"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground", children: "Tags" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: Object.values(GuestTag).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: `tag-${mode}-${tag}`,
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: `tag-${mode}-${tag}`,
                          "data-ocid": `guest-crm.${mode}-guest.tag-${tag.toLowerCase()}`,
                          checked: form.tags.includes(tag),
                          onCheckedChange: () => toggleTag(tag),
                          className: "border-input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(GuestTagBadge, { tag })
                    ]
                  },
                  tag
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": `guest-crm.${mode}-guest.cancel-button`,
                    variant: "outline",
                    onClick: onClose,
                    className: "border-border text-foreground hover:bg-muted",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": `guest-crm.${mode}-guest.submit-button`,
                    onClick: handleSubmit,
                    className: "bg-primary text-primary-foreground hover:bg-primary/90",
                    children: mode === "add" ? "Add Guest" : "Save Changes"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function GuestProfile({
  guest,
  bookings,
  hotels,
  rooms,
  onUpdate
}) {
  const guestBookings = bookings.filter((b) => b.guestId === guest.id);
  const [notes, setNotes] = reactExports.useState(guest.notes);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const totalSpent = guestBookings.reduce((sum, b) => {
    const room = rooms.find((r) => r.id === b.roomId);
    const nights = nightsBetween(b.checkIn, b.checkOut);
    return sum + (room ? nights * 6e3 : 0);
  }, 0);
  const avgNights = guestBookings.length > 0 ? Math.round(
    guestBookings.reduce(
      (s, b) => s + nightsBetween(b.checkIn, b.checkOut),
      0
    ) / guestBookings.length
  ) : 0;
  function handleSaveNotes() {
    onUpdate({ ...guest, notes });
    ue.success("Notes saved successfully.");
  }
  function handleEdit(data) {
    onUpdate({
      ...guest,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      country: data.country,
      tags: data.tags
    });
    ue.success("Guest profile updated.");
  }
  const editInitial = {
    name: guest.name,
    email: guest.email,
    phone: guest.phone,
    address: guest.address,
    country: guest.country,
    tags: [...guest.tags]
  };
  const commLogs = getCommLogs(guest.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: getInitials(guest.name) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground font-display leading-tight", children: guest.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-1.5", children: guest.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(GuestTagBadge, { tag }, tag)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "guest-crm.edit-guest.open_modal_button",
            variant: "outline",
            size: "sm",
            onClick: () => setEditOpen(true),
            className: "border-border text-foreground hover:bg-muted shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Edit Profile"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-4 space-y-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Contact Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2", children: [
          { icon: Mail, value: guest.email },
          { icon: Phone, value: guest.phone },
          { icon: MapPin, value: guest.address || "—" },
          { icon: Globe, value: guest.country || "—" },
          {
            icon: Calendar,
            value: `Member since ${fmtDate(guest.createdAt)}`
          }
        ].map(({ icon: Icon, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate", children: value })
        ] }, value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Loyalty & Stats" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Loyalty Pts",
              value: guest.loyaltyPoints.toString(),
              highlight: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Stays",
              value: String(guestBookings.length)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Spent",
              value: totalSpent > 0 ? fmtCurrency(totalSpent) : "—"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Avg Nights",
              value: avgNights > 0 ? `${avgNights}n` : "—"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Stay History" }),
        guestBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "guest-crm.stay-history.empty_state",
            className: "text-center py-6 text-muted-foreground text-sm",
            children: "No bookings found for this guest."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/30 border-b border-border", children: [
            "Booking ID",
            "Hotel",
            "Room Type",
            "Check-in",
            "Check-out",
            "Nights",
            "Status"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-3 py-2.5 text-left font-semibold text-muted-foreground",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: guestBookings.map((b, i) => {
            const hotel = hotels.find((h) => h.id === b.hotelId);
            const room = rooms.find((r) => r.id === b.roomId);
            const nights = nightsBetween(b.checkIn, b.checkOut);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `guest-crm.stay-history.item.${i + 1}`,
                className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 text-muted-foreground font-mono", children: [
                    "#",
                    b.id.toString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground", children: (hotel == null ? void 0 : hotel.name.replace("The Grand Meridian", "Grand Meridian").replace("Azure Beach Resort", "Azure Beach").replace("Highland Retreat", "Highland")) ?? "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground", children: (room == null ? void 0 : room.roomType) ?? "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground", children: fmtDate(b.checkIn) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground", children: fmtDate(b.checkOut) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right text-foreground", children: nights }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: b.status }) })
                ]
              },
              b.id.toString()
            );
          }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Preferences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border border-border rounded-lg p-4", children: guest.preferences ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: guest.preferences }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No preferences on record." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Internal Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            "data-ocid": "guest-crm.notes.textarea",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            rows: 3,
            placeholder: "Add notes about this guest...",
            className: "bg-background border-input text-foreground text-sm resize-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            "data-ocid": "guest-crm.notes.save-button",
            size: "sm",
            onClick: handleSaveNotes,
            className: "mt-2 bg-primary text-primary-foreground hover:bg-primary/90",
            children: "Save Notes"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Communication Log" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "guest-crm.comm-log.new-button",
              variant: "outline",
              size: "sm",
              onClick: () => {
                ue.success("Communication drafted. Feature coming soon.");
              },
              className: "border-border text-foreground hover:bg-muted text-xs h-7",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
                "New Communication"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/30 border-b border-border", children: ["Date", "Type", "Subject / Message", "Status"].map(
            (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-3 py-2.5 text-left font-semibold text-muted-foreground",
                children: h
              },
              h
            )
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: commLogs.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `guest-crm.comm-log.item.${i + 1}`,
              className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground whitespace-nowrap", children: log.date }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${log.type === "Email" ? "bg-blue-500/15 text-blue-400 border-blue-500/25" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-2.5 h-2.5" }),
                      log.type
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground max-w-[220px] truncate", children: log.subject }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${log.status === "Delivered" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" : "bg-amber-500/15 text-amber-400 border-amber-500/25"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current opacity-80" }),
                      log.status
                    ]
                  }
                ) })
              ]
            },
            `${log.date}-${i}`
          )) })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GuestModal,
      {
        open: editOpen,
        onClose: () => setEditOpen(false),
        initial: editInitial,
        onSubmit: handleEdit,
        mode: "edit"
      }
    )
  ] });
}
function GuestCRMPage() {
  const guests = useHotelStore((s) => s.guests);
  const bookings = useHotelStore((s) => s.bookings);
  const hotels = useHotelStore((s) => s.hotels);
  const rooms = useHotelStore((s) => s.rooms);
  const addGuest = useHotelStore((s) => s.addGuest);
  const updateGuest = useHotelStore((s) => s.updateGuest);
  const [search, setSearch] = reactExports.useState("");
  const [filterTag, setFilterTag] = reactExports.useState("All");
  const [selectedGuestId, setSelectedGuestId] = reactExports.useState(
    guests.length > 0 ? guests[0].id : null
  );
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const filteredGuests = reactExports.useMemo(() => {
    return guests.filter((g) => {
      const q = search.toLowerCase();
      const matchSearch = !q || g.name.toLowerCase().includes(q) || g.email.toLowerCase().includes(q) || g.phone.includes(q);
      const matchTag = filterTag === "All" || g.tags.includes(filterTag);
      return matchSearch && matchTag;
    });
  }, [guests, search, filterTag]);
  const selectedGuest = selectedGuestId ? guests.find((g) => g.id === selectedGuestId) ?? null : null;
  function handleAddGuest(data) {
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
      createdAt: BigInt(Date.now())
    });
    setSelectedGuestId(newId);
    ue.success(`Guest "${data.name}" added successfully.`);
  }
  const filterTabs = [
    "All",
    GuestTag.VIP,
    GuestTag.Corporate,
    GuestTag.Regular,
    GuestTag.New
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "guest-crm.page",
      className: "h-[calc(100vh-4rem)] flex flex-col",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground font-display", children: "Guest CRM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
              guests.length,
              " guests · loyalty, profiles & communication"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "guest-crm.add-guest.open_modal_button",
              onClick: () => setAddOpen(true),
              className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add Guest"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex gap-4 min-h-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 shrink-0 flex flex-col bg-card border border-border rounded-xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "guest-crm.search-input",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  placeholder: "Search by name, email, phone…",
                  className: "pl-8 h-8 text-xs bg-background border-input text-foreground"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 border-b border-border flex gap-1.5 flex-wrap", children: filterTabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `guest-crm.filter.${tab.toLowerCase()}`,
                onClick: () => setFilterTag(tab),
                className: `px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${filterTag === tab ? "bg-primary/20 border-primary/40 text-primary" : "bg-muted/40 border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"}`,
                children: tab
              },
              tab
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-1.5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              filteredGuests.length,
              " of ",
              guests.length,
              " guests"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 space-y-1.5", children: filteredGuests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "guest-crm.guest-list.empty_state",
                className: "py-10 text-center text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                  "No guests match your search."
                ]
              }
            ) : filteredGuests.map((guest, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              GuestListItem,
              {
                guest,
                bookings,
                selected: selectedGuestId === guest.id,
                onClick: () => setSelectedGuestId(guest.id),
                index: i + 1
              },
              guest.id.toString()
            )) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 bg-card border border-border rounded-xl overflow-hidden", children: selectedGuest ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            GuestProfile,
            {
              guest: selectedGuest,
              bookings,
              hotels,
              rooms: rooms.map((r) => ({ id: r.id, roomType: r.roomType })),
              onUpdate: updateGuest
            },
            selectedGuest.id.toString()
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "guest-crm.profile.empty_state",
              className: "h-full flex flex-col items-center justify-center text-center p-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-primary/40" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1", children: "Select a Guest" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Choose a guest from the directory to view their profile, stay history, and communication log." })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GuestModal,
          {
            open: addOpen,
            onClose: () => setAddOpen(false),
            initial: BLANK_FORM,
            onSubmit: handleAddGuest,
            mode: "add"
          }
        )
      ]
    }
  );
}
export {
  GuestCRMPage as default
};

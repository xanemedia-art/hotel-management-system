import { c as createLucideIcon, j as jsxRuntimeExports, U as Users, e as Building2, D as Bell, u as useHotelStore, r as reactExports, w as StaffRole, E as StaffStatus, z as Shield, X, f as ue } from "./index-CBcYPlz6.js";
import { B as Badge } from "./badge-Ca613t8w.js";
import { B as Button } from "./button-Db-hK2sn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./index-BsZnwoVC.js";
import { I as Input } from "./input-CcvuTxso.js";
import { L as Label } from "./label-CXZjKKoG.js";
import { P as Pen, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BG7gycgm.js";
import { S as Switch } from "./switch-C5pUhbL7.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DqB3xbOv.js";
import { C as Check, T as Textarea } from "./textarea-B51ZXUe5.js";
import { m as motion } from "./proxy-DDZWRdmp.js";
import { P as Plus } from "./plus-uqfn8bA2.js";
import { T as Trash2 } from "./trash-2-u1RSvh14.js";
import { P as Phone } from "./phone-BnZ7kXfT.js";
import { M as Mail } from "./mail-C_Rs8ezD.js";
import "./index-Dma1JNTM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
];
const CircleDot = createLucideIcon("circle-dot", __iconNode);
const ROLE_COLORS = {
  Admin: "bg-red-500/20 text-red-400 border-red-500/30",
  Manager: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  FrontDesk: "bg-green-500/20 text-green-400 border-green-500/30",
  Housekeeping: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
};
const ROLE_LABELS = {
  Admin: "Admin",
  Manager: "Manager",
  FrontDesk: "Front Desk",
  Housekeeping: "Housekeeping"
};
const PERMISSIONS_MATRIX = {
  Dashboard: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "view",
    Housekeeping: "view"
  },
  Reservations: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "full",
    Housekeeping: "none"
  },
  "Front Desk": {
    Admin: "full",
    Manager: "full",
    FrontDesk: "full",
    Housekeeping: "none"
  },
  Housekeeping: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "view",
    Housekeeping: "full"
  },
  Billing: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "full",
    Housekeeping: "none"
  },
  "Channel Manager": {
    Admin: "full",
    Manager: "full",
    FrontDesk: "none",
    Housekeeping: "none"
  },
  Reports: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "view",
    Housekeeping: "none"
  },
  CRM: {
    Admin: "full",
    Manager: "full",
    FrontDesk: "view",
    Housekeeping: "none"
  },
  Settings: {
    Admin: "full",
    Manager: "none",
    FrontDesk: "none",
    Housekeeping: "none"
  }
};
const ROLE_COLUMNS = [
  "Admin",
  "Manager",
  "FrontDesk",
  "Housekeeping"
];
const DEFAULT_ROOM_TYPES = [
  {
    type: "Standard",
    basePrice: 4500,
    capacity: 2,
    totalRooms: 8,
    active: true
  },
  { type: "Deluxe", basePrice: 7200, capacity: 2, totalRooms: 6, active: true },
  { type: "Suite", basePrice: 14e3, capacity: 4, totalRooms: 4, active: true },
  {
    type: "Presidential",
    basePrice: 35e3,
    capacity: 4,
    totalRooms: 2,
    active: true
  }
];
const DEFAULT_NOTIFICATIONS = [
  {
    label: "Booking Notifications",
    items: [
      { key: "booking_created", label: "New booking created", value: true },
      { key: "booking_cancelled", label: "Booking cancelled", value: true },
      { key: "booking_modified", label: "Booking modified", value: false }
    ]
  },
  {
    label: "Operations",
    items: [
      { key: "guest_checkin", label: "Guest check-in", value: true },
      { key: "guest_checkout", label: "Guest check-out", value: true },
      {
        key: "housekeeping_task_due",
        label: "Housekeeping task due",
        value: false
      }
    ]
  },
  {
    label: "Billing",
    items: [
      { key: "invoice_generated", label: "Invoice generated", value: true },
      { key: "payment_received", label: "Payment received", value: true },
      { key: "overdue_balance", label: "Overdue balance", value: true }
    ]
  }
];
function PermCell({ perm }) {
  if (perm === "full")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/15 text-green-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }) });
  if (perm === "view")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDot, { size: 13 }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }) });
}
function PropertySelector({
  hotels,
  selectedId,
  onSelect,
  prefix
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-muted-foreground mb-2 block", children: "Select Property" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onSelect(h.id),
        className: `px-4 py-2 rounded-lg text-sm font-medium border transition-all ${selectedId === h.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
        "data-ocid": `${prefix}.${String(h.id)}`,
        children: h.name
      },
      String(h.id)
    )) })
  ] });
}
function UsersTab() {
  var _a;
  const { staff, hotels, addStaff, updateStaff, removeStaff } = useHotelStore();
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    role: StaffRole.FrontDesk,
    hotelId: String(((_a = hotels[0]) == null ? void 0 : _a.id) ?? "1")
  });
  const userRows = staff.map((s) => ({
    id: String(s.id),
    name: s.name,
    email: s.email,
    role: s.role,
    hotelId: s.hotelId,
    status: s.status === StaffStatus.Active
  }));
  function openAdd() {
    var _a2;
    setEditTarget(null);
    setForm({
      name: "",
      email: "",
      role: StaffRole.FrontDesk,
      hotelId: String(((_a2 = hotels[0]) == null ? void 0 : _a2.id) ?? "1")
    });
    setShowModal(true);
  }
  function openEdit(row) {
    const member = staff.find((s) => String(s.id) === row.id);
    if (!member) return;
    setEditTarget(member);
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
      hotelId: String(member.hotelId)
    });
    setShowModal(true);
  }
  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) {
      ue.error("Name and email are required");
      return;
    }
    if (editTarget) {
      updateStaff({
        ...editTarget,
        name: form.name,
        email: form.email,
        role: form.role,
        hotelId: BigInt(form.hotelId)
      });
      ue.success("User updated");
    } else {
      const newStaff = {
        id: BigInt(Date.now()),
        name: form.name,
        email: form.email,
        role: form.role,
        hotelId: BigInt(form.hotelId),
        status: StaffStatus.Active,
        phone: ""
      };
      addStaff(newStaff);
      ue.success("User added");
    }
    setShowModal(false);
  }
  function handleDelete(row) {
    removeStaff(BigInt(row.id));
    ue.success("User removed");
  }
  function toggleStatus(row) {
    const member = staff.find((s) => String(s.id) === row.id);
    if (!member) return;
    updateStaff({
      ...member,
      status: row.status ? StaffStatus.Inactive : StaffStatus.Active
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "User Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: openAdd,
            "data-ocid": "settings.add_user_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1.5" }),
              " Add User"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 text-muted-foreground border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden lg:table-cell", children: "Property" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          userRows.map((row, idx) => {
            const hotel = hotels.find((h) => h.id === row.hotelId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.tr,
              {
                initial: { opacity: 0, y: 4 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: idx * 0.04 },
                className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
                "data-ocid": `settings.user.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs shrink-0", children: row.name.charAt(0).toUpperCase() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: row.name })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block max-w-[180px]", children: row.email }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[row.role]}`,
                      children: ROLE_LABELS[row.role]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block max-w-[150px] text-sm", children: (hotel == null ? void 0 : hotel.name) ?? "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      checked: row.status,
                      onCheckedChange: () => toggleStatus(row),
                      "data-ocid": `settings.user.status_toggle.${idx + 1}`
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7",
                        onClick: () => openEdit(row),
                        "aria-label": "Edit user",
                        "data-ocid": `settings.user.edit_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 13 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-destructive hover:text-destructive",
                        onClick: () => handleDelete(row),
                        "aria-label": "Delete user",
                        "data-ocid": `settings.user.delete_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                      }
                    )
                  ] }) })
                ]
              },
              row.id
            );
          }),
          userRows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 6,
              className: "px-4 py-10 text-center text-muted-foreground",
              "data-ocid": "settings.users.empty_state",
              children: "No users found. Add your first user."
            }
          ) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Role Permissions Matrix" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Module" }),
            ROLE_COLUMNS.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[role]}`,
                children: ROLE_LABELS[role]
              }
            ) }, role))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Object.entries(PERMISSIONS_MATRIX).map(
            ([module, perms], idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-border/50 ${idx % 2 === 0 ? "bg-muted/10" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: module }),
                  ROLE_COLUMNS.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PermCell, { perm: perms[role] }) }) }, role))
                ]
              },
              module
            )
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 px-4 py-3 bg-muted/20 border-t border-border text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 11, className: "text-green-400" }),
            " Full access"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDot, { size: 11, className: "text-primary" }),
            " View only"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 11 }),
            " No access"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "bg-card border-border",
        "data-ocid": "settings.user.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Edit User" : "Add New User" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-name", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "user-name",
                  value: form.name,
                  onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                  placeholder: "e.g. Priya Sharma",
                  className: "mt-1.5 bg-background",
                  "data-ocid": "settings.user.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-email", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "user-email",
                  type: "email",
                  value: form.email,
                  onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                  placeholder: "e.g. priya@hotel.com",
                  className: "mt-1.5 bg-background",
                  "data-ocid": "settings.user.email_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-role", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.role,
                  onValueChange: (v) => setForm((f) => ({ ...f, role: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "user-role",
                        className: "mt-1.5 bg-background",
                        "data-ocid": "settings.user.role_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-popover border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: StaffRole.Admin, children: "Admin" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: StaffRole.Manager, children: "Manager" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: StaffRole.FrontDesk, children: "Front Desk" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: StaffRole.Housekeeping, children: "Housekeeping" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-hotel", children: "Property" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.hotelId,
                  onValueChange: (v) => setForm((f) => ({ ...f, hotelId: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "user-hotel",
                        className: "mt-1.5 bg-background",
                        "data-ocid": "settings.user.hotel_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-popover border-border", children: hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(h.id), children: h.name }, String(h.id))) })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setShowModal(false),
                "data-ocid": "settings.user.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleSave,
                "data-ocid": "settings.user.submit_button",
                children: editTarget ? "Save Changes" : "Add User"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
function buildPropertyForm(h) {
  return {
    name: (h == null ? void 0 : h.name) ?? "",
    address: (h == null ? void 0 : h.address) ?? "",
    phone: (h == null ? void 0 : h.phone) ?? "",
    email: (h == null ? void 0 : h.email) ?? "",
    city: (h == null ? void 0 : h.city) ?? "",
    checkInTime: (h == null ? void 0 : h.checkInTime) ?? "14:00",
    checkOutTime: (h == null ? void 0 : h.checkOutTime) ?? "11:00",
    currency: (h == null ? void 0 : h.currency) ?? "INR"
  };
}
function PropertySettingsTab() {
  var _a;
  const { hotels, updateHotel } = useHotelStore();
  const [selectedId, setSelectedId] = reactExports.useState(((_a = hotels[0]) == null ? void 0 : _a.id) ?? 1n);
  const [gstin, setGstin] = reactExports.useState("27AAGCA1234B1ZX");
  const hotel = hotels.find((h) => h.id === selectedId);
  const [form, setForm] = reactExports.useState(buildPropertyForm(hotel));
  function selectHotel(id) {
    setSelectedId(id);
    const h = hotels.find((h2) => h2.id === id);
    setForm(buildPropertyForm(h));
  }
  function handleSave() {
    if (!hotel) return;
    updateHotel({ ...hotel, ...form });
    ue.success("Settings saved successfully");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertySelector,
      {
        hotels,
        selectedId,
        onSelect: selectHotel,
        prefix: "settings.property.tab"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 bg-card rounded-xl border border-border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hotel-name", children: "Hotel Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hotel-name",
            value: form.name,
            onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
            className: "mt-1.5 bg-background",
            "data-ocid": "settings.property.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hotel-address", children: "Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "hotel-address",
            value: form.address,
            onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
            className: "mt-1.5 bg-background resize-none",
            rows: 2,
            "data-ocid": "settings.property.address_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "hotel-phone", className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12 }),
          " Phone"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hotel-phone",
            value: form.phone,
            onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
            className: "mt-1.5 bg-background",
            "data-ocid": "settings.property.phone_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "hotel-email", className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 12 }),
          " Email"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hotel-email",
            type: "email",
            value: form.email,
            onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
            className: "mt-1.5 bg-background",
            "data-ocid": "settings.property.email_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hotel-checkin", children: "Check-in Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hotel-checkin",
            type: "time",
            value: form.checkInTime,
            onChange: (e) => setForm((f) => ({ ...f, checkInTime: e.target.value })),
            className: "mt-1.5 bg-background",
            "data-ocid": "settings.property.checkin_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hotel-checkout", children: "Check-out Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hotel-checkout",
            type: "time",
            value: form.checkOutTime,
            onChange: (e) => setForm((f) => ({ ...f, checkOutTime: e.target.value })),
            className: "mt-1.5 bg-background",
            "data-ocid": "settings.property.checkout_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hotel-currency", children: "Currency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.currency,
            onValueChange: (v) => setForm((f) => ({ ...f, currency: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "hotel-currency",
                  className: "mt-1.5 bg-background",
                  "data-ocid": "settings.property.currency_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-popover border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "INR", children: "INR — Indian Rupee" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "USD", children: "USD — US Dollar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "EUR", children: "EUR — Euro" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "GBP", children: "GBP — British Pound" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hotel-gstin", children: "GSTIN Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hotel-gstin",
            value: gstin,
            onChange: (e) => setGstin(e.target.value),
            placeholder: "27AAGCA1234B1ZX",
            className: "mt-1.5 bg-background font-mono",
            "data-ocid": "settings.property.gstin_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: handleSave,
          "data-ocid": "settings.property.save_button",
          children: "Save Settings"
        }
      ) })
    ] })
  ] });
}
function RoomTypesTab() {
  var _a;
  const { hotels, rooms, updateRoom } = useHotelStore();
  const [selectedId, setSelectedId] = reactExports.useState(((_a = hotels[0]) == null ? void 0 : _a.id) ?? 1n);
  const [editModal, setEditModal] = reactExports.useState(null);
  const hotelRooms = rooms.filter((r) => r.hotelId === selectedId);
  const roomTypeMap = DEFAULT_ROOM_TYPES.map((rt) => {
    const matching = hotelRooms.filter((r) => r.roomType === rt.type);
    const avgPrice = matching.length > 0 ? matching.reduce((sum, r) => sum + r.pricePerNight, 0) / matching.length : rt.basePrice;
    return {
      ...rt,
      basePrice: Math.round(avgPrice),
      totalRooms: matching.length || rt.totalRooms
    };
  });
  function openEdit(row) {
    setEditModal({
      type: row.type,
      price: row.basePrice,
      capacity: row.capacity
    });
  }
  function handleEditSave() {
    if (!editModal) return;
    const toUpdate = hotelRooms.filter((r) => r.roomType === editModal.type);
    for (const room of toUpdate) {
      updateRoom({
        ...room,
        pricePerNight: editModal.price,
        capacity: BigInt(editModal.capacity)
      });
    }
    ue.success(`${editModal.type} rooms updated`);
    setEditModal(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertySelector,
      {
        hotels,
        selectedId,
        onSelect: setSelectedId,
        prefix: "settings.roomtypes.property_tab"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Base Price (INR/night)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden md:table-cell", children: "Capacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden md:table-cell", children: "Total Rooms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: roomTypeMap.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
          "data-ocid": `settings.roomtype.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: row.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-foreground", children: [
              "₹",
              row.basePrice.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-muted-foreground hidden md:table-cell", children: [
              row.capacity,
              " guests"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-muted-foreground hidden md:table-cell", children: [
              row.totalRooms,
              " rooms"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: row.active ? "default" : "secondary",
                className: row.active ? "bg-green-500/20 text-green-400 border border-green-500/30" : "",
                children: row.active ? "Active" : "Inactive"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => openEdit(row),
                "data-ocid": `settings.roomtype.edit_button.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 13, className: "mr-1.5" }),
                  " Edit"
                ]
              }
            ) })
          ]
        },
        row.type
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!editModal,
        onOpenChange: (o) => {
          if (!o) setEditModal(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "bg-card border-border",
            "data-ocid": "settings.roomtype.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
                "Edit ",
                editModal == null ? void 0 : editModal.type,
                " Room Type"
              ] }) }),
              editModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rt-price", children: "Base Price (INR/night)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "rt-price",
                      type: "number",
                      value: editModal.price,
                      onChange: (e) => setEditModal(
                        (m) => m ? { ...m, price: Number(e.target.value) } : m
                      ),
                      className: "mt-1.5 bg-background",
                      "data-ocid": "settings.roomtype.price_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rt-capacity", children: "Max Capacity (guests)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "rt-capacity",
                      type: "number",
                      min: 1,
                      max: 10,
                      value: editModal.capacity,
                      onChange: (e) => setEditModal(
                        (m) => m ? {
                          ...m,
                          capacity: Number.parseInt(e.target.value) || 1
                        } : m
                      ),
                      className: "mt-1.5 bg-background",
                      "data-ocid": "settings.roomtype.capacity_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => setEditModal(null),
                    "data-ocid": "settings.roomtype.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    onClick: handleEditSave,
                    "data-ocid": "settings.roomtype.confirm_button",
                    children: "Save Changes"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function NotificationsTab() {
  const [groups, setGroups] = reactExports.useState(
    DEFAULT_NOTIFICATIONS
  );
  function toggle(groupIdx, itemIdx) {
    setGroups(
      (prev) => prev.map(
        (g, gi) => gi !== groupIdx ? g : {
          ...g,
          items: g.items.map(
            (item, ii) => ii !== itemIdx ? item : { ...item, value: !item.value }
          )
        }
      )
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
    groups.map((group, gi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: gi * 0.08 },
        className: "bg-card rounded-xl border border-border overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3.5 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: group.label }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: group.items.map((item, ii) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-5 py-3.5 hover:bg-muted/10 transition-colors",
              "data-ocid": `settings.notification.${item.key}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: item.value,
                    onCheckedChange: () => toggle(gi, ii),
                    "data-ocid": `settings.notification.toggle.${item.key}`
                  }
                )
              ]
            },
            item.key
          )) })
        ]
      },
      group.label
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        onClick: () => ue.success("Notification preferences saved"),
        "data-ocid": "settings.notifications.save_button",
        children: "Save Preferences"
      }
    ) })
  ] });
}
function SettingsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage users, property details, room types, and notification preferences." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "users", "data-ocid": "settings.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/50 border border-border h-auto p-1 gap-0.5 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "users",
            className: "flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground",
            "data-ocid": "settings.tab.users",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 }),
              " Users & Roles"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "property",
            className: "flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground",
            "data-ocid": "settings.tab.property",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 14 }),
              " Property"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "rooms",
            className: "flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground",
            "data-ocid": "settings.tab.rooms",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDot, { size: 14 }),
              " Room Types"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "notifications",
            className: "flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground",
            "data-ocid": "settings.tab.notifications",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 14 }),
              " Notifications"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "property", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PropertySettingsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rooms", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoomTypesTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notifications", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsTab, {}) })
    ] })
  ] });
}
export {
  SettingsPage as default
};

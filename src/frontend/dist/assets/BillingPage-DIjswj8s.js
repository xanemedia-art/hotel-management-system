import { c as createLucideIcon, u as useHotelStore, r as reactExports, F as FolioStatus, j as jsxRuntimeExports, x as Receipt, C as Calendar, a as cn, P as PaymentMethod, f as ue, e as Building2, v as ChargeCategory } from "./index-CBcYPlz6.js";
import { S as StatusBadge } from "./StatusBadge-C7ZHomM8.js";
import { B as Badge } from "./badge-Ca613t8w.js";
import { B as Button } from "./button-Db-hK2sn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./index-BsZnwoVC.js";
import { I as Input } from "./input-CcvuTxso.js";
import { L as Label } from "./label-CXZjKKoG.js";
import { S as ScrollArea, a as Separator } from "./separator-BU6TS2m-.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-DqB3xbOv.js";
import { S as Search } from "./search-u_kKtxgz.js";
import { P as Plus } from "./plus-uqfn8bA2.js";
import { D as Download } from "./download-B4gvO5Sw.js";
import { U as User } from "./user-DdoRQTNO.js";
import { C as CreditCard } from "./credit-card-DIOLeYAl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode);
const GST_RATE = 0.18;
function fmtCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function fmtDate(ts) {
  if (!ts) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(Number(ts)));
}
function computeTotals(folio) {
  const baseCharges = folio.charges.filter(
    (c) => c.category !== ChargeCategory.Tax && c.category !== ChargeCategory.Discount
  );
  const discounts = folio.charges.filter((c) => c.category === ChargeCategory.Discount).reduce((s, c) => s + c.amount, 0);
  const subtotal = baseCharges.reduce((s, c) => s + c.amount, 0) - discounts;
  const taxCharge = folio.charges.find(
    (c) => c.category === ChargeCategory.Tax
  );
  const gstAmount = taxCharge ? taxCharge.amount : Math.round(subtotal * GST_RATE);
  const total = subtotal + gstAmount;
  const paid = folio.payments.reduce((s, p) => s + p.amount, 0);
  const balance = total - paid;
  return { subtotal, gstAmount, total, paid, balance };
}
const PAYMENT_METHOD_LABELS = {
  [PaymentMethod.Cash]: "Cash",
  [PaymentMethod.Card]: "Card",
  [PaymentMethod.UPI]: "UPI",
  [PaymentMethod.BankTransfer]: "Bank Transfer"
};
const PAYMENT_METHOD_COLORS = {
  [PaymentMethod.Cash]: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  [PaymentMethod.Card]: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  [PaymentMethod.UPI]: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  [PaymentMethod.BankTransfer]: "bg-amber-500/15 text-amber-400 border-amber-500/25"
};
const CHARGE_CATEGORY_COLORS = {
  [ChargeCategory.Room]: "text-foreground",
  [ChargeCategory.Extra]: "text-foreground",
  [ChargeCategory.Tax]: "text-muted-foreground italic",
  [ChargeCategory.Discount]: "text-red-400"
};
function AddChargeModal({ open, onClose, onAdd }) {
  const [description, setDescription] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(
    ChargeCategory.Extra
  );
  function handleSubmit(e) {
    e.preventDefault();
    const amt = Number.parseFloat(amount);
    if (!description.trim() || Number.isNaN(amt) || amt <= 0) {
      ue.error("Please enter a valid description and amount");
      return;
    }
    onAdd({
      description: description.trim(),
      amount: amt,
      category,
      date: BigInt(Date.now())
    });
    setDescription("");
    setAmount("");
    setCategory(ChargeCategory.Extra);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border sm:max-w-md",
      "data-ocid": "billing.add_charge.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-foreground", children: "Add Charge" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "charge-desc",
                className: "text-muted-foreground text-xs",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "charge-desc",
                placeholder: "e.g. Spa Service, Breakfast...",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                className: "bg-background border-input text-foreground",
                "data-ocid": "billing.charge_description.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "charge-amount",
                className: "text-muted-foreground text-xs",
                children: "Amount (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "charge-amount",
                type: "number",
                min: "0",
                step: "0.01",
                placeholder: "0",
                value: amount,
                onChange: (e) => setAmount(e.target.value),
                className: "bg-background border-input text-foreground",
                "data-ocid": "billing.charge_amount.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: [
              ChargeCategory.Extra,
              ChargeCategory.Room,
              ChargeCategory.Discount
            ].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setCategory(cat),
                "data-ocid": `billing.charge_category.${cat.toLowerCase()}`,
                className: cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                  category === cat ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"
                ),
                children: cat
              },
              cat
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "billing.add_charge.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", "data-ocid": "billing.add_charge.confirm_button", children: "Add Charge" })
          ] })
        ] })
      ]
    }
  ) });
}
function FolioListItem({
  folio,
  guestName,
  bookingDates,
  isSelected,
  onClick,
  index
}) {
  const { total, balance } = computeTotals(folio);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `billing.folio.item.${index}`,
      className: cn(
        "w-full text-left p-3 rounded-lg border transition-all duration-200",
        isSelected ? "bg-primary/10 border-primary/40 shadow-sm" : "bg-background border-border hover:border-primary/30 hover:bg-muted/40"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm truncate min-w-0", children: guestName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: folio.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mb-2", children: [
          "Booking #",
          folio.bookingId.toString(),
          bookingDates && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1", children: [
            "· ",
            fmtDate(bookingDates.checkIn),
            " – ",
            fmtDate(bookingDates.checkOut)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Total: ",
            fmtCurrency(total)
          ] }),
          balance > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-red-400", children: [
            "Due: ",
            fmtCurrency(balance)
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-emerald-400", children: "Settled" })
        ] })
      ]
    }
  );
}
function InvoicePanel({
  folio,
  hotelName,
  hotelAddress,
  hotelPhone,
  hotelEmail,
  guestName,
  guestEmail,
  guestPhone,
  guestAddress,
  bookingId,
  checkIn,
  checkOut,
  roomNumber,
  roomType,
  onUpdateFolio
}) {
  const [payAmount, setPayAmount] = reactExports.useState("");
  const [payMethod, setPayMethod] = reactExports.useState(PaymentMethod.Card);
  const [payRef, setPayRef] = reactExports.useState("");
  const [payDate, setPayDate] = reactExports.useState(
    (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  );
  const [addChargeOpen, setAddChargeOpen] = reactExports.useState(false);
  const { subtotal, gstAmount, total, balance } = computeTotals(folio);
  function handleRecordPayment(e) {
    e.preventDefault();
    const amt = Number.parseFloat(payAmount);
    if (Number.isNaN(amt) || amt <= 0) {
      ue.error("Enter a valid payment amount");
      return;
    }
    if (amt > balance + 0.01) {
      ue.error("Payment exceeds outstanding balance");
      return;
    }
    const newPayment = {
      id: BigInt(Date.now()),
      amount: amt,
      method: payMethod,
      referenceId: payRef.trim(),
      date: BigInt(new Date(payDate).getTime())
    };
    onUpdateFolio({ ...folio, payments: [...folio.payments, newPayment] });
    setPayAmount("");
    setPayRef("");
    ue.success(
      `Payment of ${fmtCurrency(amt)} recorded via ${PAYMENT_METHOD_LABELS[payMethod]}`
    );
  }
  function handleAddCharge(chargeData) {
    const newCharge = { ...chargeData, id: BigInt(Date.now()) };
    onUpdateFolio({ ...folio, charges: [...folio.charges, newCharge] });
    ue.success("Charge added to folio");
  }
  function handleMarkSettled() {
    if (balance > 0.01) {
      ue.error("Cannot settle — outstanding balance remaining");
      return;
    }
    onUpdateFolio({ ...folio, status: FolioStatus.Settled });
    ue.success("Folio marked as settled");
  }
  const isOpen = folio.status === FolioStatus.Open;
  const today = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(/* @__PURE__ */ new Date());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "billing.invoice.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: "Tax Invoice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
          "#",
          folio.id.toString().padStart(6, "0")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: folio.status, className: "ml-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "border-border text-muted-foreground hover:text-foreground",
            onClick: () => setAddChargeOpen(true),
            "data-ocid": "billing.add_charge.open_modal_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
              "Add Charge"
            ]
          }
        ),
        isOpen && balance <= 0.01 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10",
            onClick: handleMarkSettled,
            "data-ocid": "billing.mark_settled.button",
            children: "Mark Settled"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "border-primary/40 text-primary hover:bg-primary/10",
            onClick: () => ue.info("PDF export feature coming soon"),
            "data-ocid": "billing.export_pdf.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1" }),
              "Export PDF"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: hotelName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-5", children: hotelAddress }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Phone: ",
            hotelPhone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Email: ",
            hotelEmail
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 font-mono", children: "GSTIN: 22AABCU9603R1ZX" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary tracking-wide", children: "TAX INVOICE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Invoice #: INV-",
            folio.id.toString().padStart(6, "0")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Date: ",
            today
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Bill To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: guestName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-5", children: guestAddress || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-5", children: guestEmail }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-5", children: guestPhone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Booking Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Booking ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono", children: [
                "#",
                bookingId.toString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Check-in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: fmtDate(checkIn) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Check-out" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: fmtDate(checkOut) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Room" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: roomNumber })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Room Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: roomType })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Itemized Charges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-muted-foreground font-medium", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-muted-foreground font-medium", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 text-muted-foreground font-medium", children: "Amount" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: folio.charges.filter((c) => c.category !== ChargeCategory.Tax).map((charge, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `billing.charge.item.${i + 1}`,
              className: "border-b border-border/50 last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    className: cn(
                      "px-4 py-2.5",
                      CHARGE_CATEGORY_COLORS[charge.category]
                    ),
                    children: [
                      charge.category === ChargeCategory.Discount && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: "−" }),
                      charge.description
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: fmtDate(charge.date) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    className: cn(
                      "px-4 py-2.5 text-right font-mono",
                      charge.category === ChargeCategory.Discount ? "text-red-400" : "text-foreground"
                    ),
                    children: [
                      charge.category === ChargeCategory.Discount ? "-" : "",
                      fmtCurrency(charge.amount)
                    ]
                  }
                )
              ]
            },
            charge.id.toString()
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tfoot", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60 bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 2,
                  className: "px-4 py-2 text-muted-foreground text-right pr-4",
                  children: "Subtotal"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-foreground", children: fmtCurrency(subtotal) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 2,
                  className: "px-4 py-2 text-muted-foreground text-right pr-4 italic text-xs",
                  children: "GST @ 18% (CGST 9% + SGST 9%)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-muted-foreground", children: fmtCurrency(gstAmount) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-primary/10 border-t border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 2,
                  className: "px-4 py-3 text-primary font-bold text-sm text-right pr-4",
                  children: "TOTAL"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-bold text-primary text-base", children: fmtCurrency(total) })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Payments Received" }),
        folio.payments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-dashed border-border p-4 text-center",
            "data-ocid": "billing.payments.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-6 h-6 text-muted-foreground mx-auto mb-1.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No payments recorded yet" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-muted-foreground font-medium", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-muted-foreground font-medium", children: "Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-muted-foreground font-medium", children: "Reference" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 text-muted-foreground font-medium", children: "Amount" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: folio.payments.map((payment, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `billing.payment.item.${i + 1}`,
              className: "border-b border-border/50 last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-foreground", children: fmtDate(payment.date) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: cn(
                      "text-xs border px-2 py-0.5",
                      PAYMENT_METHOD_COLORS[payment.method]
                    ),
                    children: PAYMENT_METHOD_LABELS[payment.method]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground font-mono", children: payment.referenceId || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-mono text-emerald-400 font-medium", children: fmtCurrency(payment.amount) })
              ]
            },
            payment.id.toString()
          )) })
        ] }) })
      ] }),
      balance > 0.01 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg bg-red-500/10 border border-red-500/25 p-4 flex items-center justify-between",
          "data-ocid": "billing.outstanding_balance.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 text-red-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-red-400", children: "Outstanding Balance" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-red-400 font-mono", children: fmtCurrency(balance) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg bg-emerald-500/10 border border-emerald-500/25 p-4 flex items-center justify-between",
          "data-ocid": "billing.settled_status.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4 text-emerald-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-emerald-400", children: "Invoice Settled" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25", children: "SETTLED" })
          ]
        }
      ),
      isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg border border-border bg-muted/20 p-5",
          "data-ocid": "billing.add_payment.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Record Payment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRecordPayment, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "pay-amount",
                      className: "text-muted-foreground text-xs",
                      children: "Amount (₹)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "pay-amount",
                      type: "number",
                      min: "1",
                      max: balance,
                      step: "0.01",
                      placeholder: "0",
                      value: payAmount,
                      onChange: (e) => setPayAmount(e.target.value),
                      className: "bg-background border-input text-foreground",
                      "data-ocid": "billing.payment_amount.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "pay-date",
                      className: "text-muted-foreground text-xs",
                      children: "Payment Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "pay-date",
                      type: "date",
                      value: payDate,
                      onChange: (e) => setPayDate(e.target.value),
                      className: "bg-background border-input text-foreground",
                      "data-ocid": "billing.payment_date.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs", children: "Payment Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
                  PaymentMethod.Card,
                  PaymentMethod.Cash,
                  PaymentMethod.UPI,
                  PaymentMethod.BankTransfer
                ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `billing.payment_method.${m.toLowerCase()}`,
                    onClick: () => setPayMethod(m),
                    className: cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                      payMethod === m ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"
                    ),
                    children: PAYMENT_METHOD_LABELS[m]
                  },
                  m
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "pay-ref",
                    className: "text-muted-foreground text-xs",
                    children: [
                      "Reference ID",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "(optional)" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pay-ref",
                    placeholder: "Transaction ID, cheque no., etc.",
                    value: payRef,
                    onChange: (e) => setPayRef(e.target.value),
                    className: "bg-background border-input text-foreground",
                    "data-ocid": "billing.payment_reference.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  "data-ocid": "billing.record_payment.submit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 mr-2" }),
                    "Record Payment"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddChargeModal,
      {
        open: addChargeOpen,
        onClose: () => setAddChargeOpen(false),
        onAdd: handleAddCharge
      }
    )
  ] });
}
function BillingPage() {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allFolios = useHotelStore((s) => s.folios);
  const allBookings = useHotelStore((s) => s.bookings);
  const allGuests = useHotelStore((s) => s.guests);
  const allRooms = useHotelStore((s) => s.rooms);
  const allHotels = useHotelStore((s) => s.hotels);
  const updateFolio = useHotelStore((s) => s.updateFolio);
  const currentFolios = reactExports.useMemo(
    () => allFolios.filter((f) => f.hotelId === selectedHotelId),
    [allFolios, selectedHotelId]
  );
  const currentHotel = reactExports.useMemo(
    () => allHotels.find((h) => h.id === selectedHotelId),
    [allHotels, selectedHotelId]
  );
  const currentBookings = reactExports.useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId]
  );
  const currentGuests = reactExports.useMemo(() => allGuests, [allGuests]);
  const currentRooms = reactExports.useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId]
  );
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [selectedFolioId, setSelectedFolioId] = reactExports.useState(
    currentFolios.length > 0 ? currentFolios[0].id : null
  );
  const guestMap = reactExports.useMemo(
    () => new Map(currentGuests.map((g) => [g.id, g])),
    [currentGuests]
  );
  const bookingMap = reactExports.useMemo(
    () => new Map(currentBookings.map((b) => [b.id, b])),
    [currentBookings]
  );
  const roomMap = reactExports.useMemo(
    () => new Map(currentRooms.map((r) => [r.id, r])),
    [currentRooms]
  );
  const filteredFolios = reactExports.useMemo(() => {
    return currentFolios.filter((f) => {
      const guest = guestMap.get(f.guestId);
      const guestName = (guest == null ? void 0 : guest.name) ?? "Unknown Guest";
      const matchesSearch = !search.trim() || guestName.toLowerCase().includes(search.toLowerCase()) || f.bookingId.toString().includes(search);
      const matchesFilter = filter === "all" || filter === "open" && f.status === FolioStatus.Open || filter === "settled" && f.status === FolioStatus.Settled;
      return matchesSearch && matchesFilter;
    });
  }, [currentFolios, search, filter, guestMap]);
  const selectedFolio = reactExports.useMemo(
    () => selectedFolioId != null ? currentFolios.find((f) => f.id === selectedFolioId) ?? null : null,
    [selectedFolioId, currentFolios]
  );
  const selectedGuest = selectedFolio ? guestMap.get(selectedFolio.guestId) : void 0;
  const selectedBooking = selectedFolio ? bookingMap.get(selectedFolio.bookingId) : void 0;
  const selectedRoom = selectedBooking ? roomMap.get(selectedBooking.roomId) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex h-[calc(100vh-4rem)] overflow-hidden bg-background",
      "data-ocid": "billing.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 min-w-72 flex flex-col border-r border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold text-foreground text-sm", children: "Billing & Invoices" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search guest or booking ID...",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-8 text-xs bg-background border-input text-foreground h-8",
                  "data-ocid": "billing.search.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pt-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tabs,
            {
              value: filter,
              onValueChange: (v) => setFilter(v),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full bg-muted/40 h-7", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "all",
                    className: "flex-1 text-xs h-6",
                    "data-ocid": "billing.filter.all.tab",
                    children: [
                      "All (",
                      currentFolios.length,
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "open",
                    className: "flex-1 text-xs h-6",
                    "data-ocid": "billing.filter.open.tab",
                    children: "Open"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "settled",
                    className: "flex-1 text-xs h-6",
                    "data-ocid": "billing.filter.settled.tab",
                    children: "Settled"
                  }
                )
              ] })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 space-y-2", children: filteredFolios.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-10",
              "data-ocid": "billing.folio_list.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-7 h-7 text-muted-foreground mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No folios found" })
              ]
            }
          ) : filteredFolios.map((folio, i) => {
            const guest = guestMap.get(folio.guestId);
            const booking = bookingMap.get(folio.bookingId);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              FolioListItem,
              {
                folio,
                guestName: (guest == null ? void 0 : guest.name) ?? "Unknown Guest",
                bookingDates: booking ? {
                  checkIn: booking.checkIn,
                  checkOut: booking.checkOut
                } : void 0,
                isSelected: selectedFolioId === folio.id,
                onClick: () => setSelectedFolioId(folio.id),
                index: i + 1
              },
              folio.id.toString()
            );
          }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden flex flex-col bg-background", children: selectedFolio ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          InvoicePanel,
          {
            folio: selectedFolio,
            hotelName: (currentHotel == null ? void 0 : currentHotel.name) ?? "Hotel",
            hotelAddress: (currentHotel == null ? void 0 : currentHotel.address) ?? "",
            hotelPhone: (currentHotel == null ? void 0 : currentHotel.phone) ?? "",
            hotelEmail: (currentHotel == null ? void 0 : currentHotel.email) ?? "",
            guestName: (selectedGuest == null ? void 0 : selectedGuest.name) ?? "Guest",
            guestEmail: (selectedGuest == null ? void 0 : selectedGuest.email) ?? "",
            guestPhone: (selectedGuest == null ? void 0 : selectedGuest.phone) ?? "",
            guestAddress: (selectedGuest == null ? void 0 : selectedGuest.address) ?? "",
            bookingId: selectedFolio.bookingId,
            checkIn: selectedBooking == null ? void 0 : selectedBooking.checkIn,
            checkOut: selectedBooking == null ? void 0 : selectedBooking.checkOut,
            roomNumber: (selectedRoom == null ? void 0 : selectedRoom.number) ?? "—",
            roomType: (selectedRoom == null ? void 0 : selectedRoom.roomType) ?? "—",
            onUpdateFolio: updateFolio
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 flex flex-col items-center justify-center text-center p-8",
            "data-ocid": "billing.invoice.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-8 h-8 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-1", children: "No Folio Selected" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Select a folio from the list to view the invoice details, record payments, and manage charges." })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  BillingPage as default
};

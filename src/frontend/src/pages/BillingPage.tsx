import { ChargeCategory, FolioStatus, PaymentMethod } from "@/backend";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useHotelStore } from "@/store/useHotelStore";
import type { Folio, FolioCharge, Payment } from "@/types/index";
import {
  Building2,
  Calendar,
  CreditCard,
  Download,
  IndianRupee,
  Plus,
  Receipt,
  Search,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const GST_RATE = 0.18;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function fmtDate(ts: bigint | undefined): string {
  if (!ts) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(Number(ts)));
}

function computeTotals(folio: Folio) {
  const baseCharges = folio.charges.filter(
    (c) =>
      c.category !== ChargeCategory.Tax &&
      c.category !== ChargeCategory.Discount,
  );
  const discounts = folio.charges
    .filter((c) => c.category === ChargeCategory.Discount)
    .reduce((s, c) => s + c.amount, 0);
  const subtotal = baseCharges.reduce((s, c) => s + c.amount, 0) - discounts;
  const taxCharge = folio.charges.find(
    (c) => c.category === ChargeCategory.Tax,
  );
  const gstAmount = taxCharge
    ? taxCharge.amount
    : Math.round(subtotal * GST_RATE);
  const total = subtotal + gstAmount;
  const paid = folio.payments.reduce((s, p) => s + p.amount, 0);
  const balance = total - paid;
  return { subtotal, gstAmount, total, paid, balance };
}

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.Cash]: "Cash",
  [PaymentMethod.Card]: "Card",
  [PaymentMethod.UPI]: "UPI",
  [PaymentMethod.BankTransfer]: "Bank Transfer",
};

const PAYMENT_METHOD_COLORS: Record<PaymentMethod, string> = {
  [PaymentMethod.Cash]:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  [PaymentMethod.Card]: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  [PaymentMethod.UPI]: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  [PaymentMethod.BankTransfer]:
    "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

const CHARGE_CATEGORY_COLORS: Record<ChargeCategory, string> = {
  [ChargeCategory.Room]: "text-foreground",
  [ChargeCategory.Extra]: "text-foreground",
  [ChargeCategory.Tax]: "text-muted-foreground italic",
  [ChargeCategory.Discount]: "text-red-400",
};

// ─── Add Charge Modal ──────────────────────────────────────────────────────────
interface AddChargeModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (charge: Omit<FolioCharge, "id">) => void;
}

function AddChargeModal({ open, onClose, onAdd }: AddChargeModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ChargeCategory>(
    ChargeCategory.Extra,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number.parseFloat(amount);
    if (!description.trim() || Number.isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid description and amount");
      return;
    }
    onAdd({
      description: description.trim(),
      amount: amt,
      category,
      date: BigInt(Date.now()),
    });
    setDescription("");
    setAmount("");
    setCategory(ChargeCategory.Extra);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="bg-card border-border sm:max-w-md"
        data-ocid="billing.add_charge.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Charge</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="charge-desc"
              className="text-muted-foreground text-xs"
            >
              Description
            </Label>
            <Input
              id="charge-desc"
              placeholder="e.g. Spa Service, Breakfast..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-background border-input text-foreground"
              data-ocid="billing.charge_description.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="charge-amount"
              className="text-muted-foreground text-xs"
            >
              Amount (₹)
            </Label>
            <Input
              id="charge-amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-background border-input text-foreground"
              data-ocid="billing.charge_amount.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">Category</Label>
            <div className="flex gap-2 flex-wrap">
              {(
                [
                  ChargeCategory.Extra,
                  ChargeCategory.Room,
                  ChargeCategory.Discount,
                ] as ChargeCategory[]
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  data-ocid={`billing.charge_category.${cat.toLowerCase()}`}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                    category === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="billing.add_charge.cancel_button"
            >
              Cancel
            </Button>
            <Button type="submit" data-ocid="billing.add_charge.confirm_button">
              Add Charge
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Folio List Item ───────────────────────────────────────────────────────────
interface FolioListItemProps {
  folio: Folio;
  guestName: string;
  bookingDates: { checkIn: bigint; checkOut: bigint } | undefined;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

function FolioListItem({
  folio,
  guestName,
  bookingDates,
  isSelected,
  onClick,
  index,
}: FolioListItemProps) {
  const { total, balance } = computeTotals(folio);

  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`billing.folio.item.${index}`}
      className={cn(
        "w-full text-left p-3 rounded-lg border transition-all duration-200",
        isSelected
          ? "bg-primary/10 border-primary/40 shadow-sm"
          : "bg-background border-border hover:border-primary/30 hover:bg-muted/40",
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="font-medium text-foreground text-sm truncate min-w-0">
          {guestName}
        </span>
        <StatusBadge status={folio.status} />
      </div>
      <div className="text-xs text-muted-foreground mb-2">
        Booking #{folio.bookingId.toString()}
        {bookingDates && (
          <span className="ml-1">
            · {fmtDate(bookingDates.checkIn)} – {fmtDate(bookingDates.checkOut)}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Total: {fmtCurrency(total)}
        </span>
        {balance > 0 ? (
          <span className="text-xs font-semibold text-red-400">
            Due: {fmtCurrency(balance)}
          </span>
        ) : (
          <span className="text-xs font-semibold text-emerald-400">
            Settled
          </span>
        )}
      </div>
    </button>
  );
}

// ─── Invoice Panel ─────────────────────────────────────────────────────────────
interface InvoicePanelProps {
  folio: Folio;
  hotelName: string;
  hotelAddress: string;
  hotelPhone: string;
  hotelEmail: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  bookingId: bigint;
  checkIn: bigint | undefined;
  checkOut: bigint | undefined;
  roomNumber: string;
  roomType: string;
  onUpdateFolio: (folio: Folio) => void;
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
  onUpdateFolio,
}: InvoicePanelProps) {
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Card);
  const [payRef, setPayRef] = useState("");
  const [payDate, setPayDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [addChargeOpen, setAddChargeOpen] = useState(false);

  const { subtotal, gstAmount, total, balance } = computeTotals(folio);

  function handleRecordPayment(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number.parseFloat(payAmount);
    if (Number.isNaN(amt) || amt <= 0) {
      toast.error("Enter a valid payment amount");
      return;
    }
    if (amt > balance + 0.01) {
      toast.error("Payment exceeds outstanding balance");
      return;
    }
    const newPayment: Payment = {
      id: BigInt(Date.now()),
      amount: amt,
      method: payMethod,
      referenceId: payRef.trim(),
      date: BigInt(new Date(payDate).getTime()),
    };
    onUpdateFolio({ ...folio, payments: [...folio.payments, newPayment] });
    setPayAmount("");
    setPayRef("");
    toast.success(
      `Payment of ${fmtCurrency(amt)} recorded via ${PAYMENT_METHOD_LABELS[payMethod]}`,
    );
  }

  function handleAddCharge(chargeData: Omit<FolioCharge, "id">) {
    const newCharge: FolioCharge = { ...chargeData, id: BigInt(Date.now()) };
    onUpdateFolio({ ...folio, charges: [...folio.charges, newCharge] });
    toast.success("Charge added to folio");
  }

  function handleMarkSettled() {
    if (balance > 0.01) {
      toast.error("Cannot settle — outstanding balance remaining");
      return;
    }
    onUpdateFolio({ ...folio, status: FolioStatus.Settled });
    toast.success("Folio marked as settled");
  }

  const isOpen = folio.status === FolioStatus.Open;
  const today = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="flex flex-col h-full" data-ocid="billing.invoice.panel">
      {/* Invoice Header Actions */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground text-sm">
            Tax Invoice
          </span>
          <span className="text-muted-foreground text-xs">
            #{folio.id.toString().padStart(6, "0")}
          </span>
          <StatusBadge status={folio.status} className="ml-1" />
        </div>
        <div className="flex items-center gap-2">
          {isOpen && (
            <Button
              size="sm"
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground"
              onClick={() => setAddChargeOpen(true)}
              data-ocid="billing.add_charge.open_modal_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Charge
            </Button>
          )}
          {isOpen && balance <= 0.01 && (
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
              onClick={handleMarkSettled}
              data-ocid="billing.mark_settled.button"
            >
              Mark Settled
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10"
            onClick={() => toast.info("PDF export feature coming soon")}
            data-ocid="billing.export_pdf.button"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            Export PDF
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Hotel + Invoice Title */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  {hotelName}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground leading-5">
                {hotelAddress}
              </p>
              <p className="text-xs text-muted-foreground">
                Phone: {hotelPhone}
              </p>
              <p className="text-xs text-muted-foreground">
                Email: {hotelEmail}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                GSTIN: 22AABCU9603R1ZX
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary tracking-wide">
                TAX INVOICE
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Invoice #: INV-{folio.id.toString().padStart(6, "0")}
              </p>
              <p className="text-xs text-muted-foreground">Date: {today}</p>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Guest + Booking Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Bill To
              </p>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <p className="text-sm font-semibold text-foreground">
                  {guestName}
                </p>
              </div>
              <p className="text-xs text-muted-foreground pl-5">
                {guestAddress || "—"}
              </p>
              <p className="text-xs text-muted-foreground pl-5">{guestEmail}</p>
              <p className="text-xs text-muted-foreground pl-5">{guestPhone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Booking Details
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="text-foreground font-mono">
                    #{bookingId.toString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="text-foreground">{fmtDate(checkIn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="text-foreground">{fmtDate(checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room</span>
                  <span className="text-foreground">{roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room Type</span>
                  <span className="text-foreground">{roomType}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Charges Table */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Itemized Charges
            </p>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">
                      Description
                    </th>
                    <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">
                      Date
                    </th>
                    <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {folio.charges
                    .filter((c) => c.category !== ChargeCategory.Tax)
                    .map((charge, i) => (
                      <tr
                        key={charge.id.toString()}
                        data-ocid={`billing.charge.item.${i + 1}`}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td
                          className={cn(
                            "px-4 py-2.5",
                            CHARGE_CATEGORY_COLORS[charge.category],
                          )}
                        >
                          {charge.category === ChargeCategory.Discount && (
                            <span className="mr-1">−</span>
                          )}
                          {charge.description}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {fmtDate(charge.date)}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-2.5 text-right font-mono",
                            charge.category === ChargeCategory.Discount
                              ? "text-red-400"
                              : "text-foreground",
                          )}
                        >
                          {charge.category === ChargeCategory.Discount
                            ? "-"
                            : ""}
                          {fmtCurrency(charge.amount)}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border/60 bg-muted/20">
                    <td
                      colSpan={2}
                      className="px-4 py-2 text-muted-foreground text-right pr-4"
                    >
                      Subtotal
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-foreground">
                      {fmtCurrency(subtotal)}
                    </td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td
                      colSpan={2}
                      className="px-4 py-2 text-muted-foreground text-right pr-4 italic text-xs"
                    >
                      GST @ 18% (CGST 9% + SGST 9%)
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {fmtCurrency(gstAmount)}
                    </td>
                  </tr>
                  <tr className="bg-primary/10 border-t border-primary/20">
                    <td
                      colSpan={2}
                      className="px-4 py-3 text-primary font-bold text-sm text-right pr-4"
                    >
                      TOTAL
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-primary text-base">
                      {fmtCurrency(total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payments Received */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Payments Received
            </p>
            {folio.payments.length === 0 ? (
              <div
                className="rounded-lg border border-dashed border-border p-4 text-center"
                data-ocid="billing.payments.empty_state"
              >
                <CreditCard className="w-6 h-6 text-muted-foreground mx-auto mb-1.5" />
                <p className="text-xs text-muted-foreground">
                  No payments recorded yet
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">
                        Date
                      </th>
                      <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">
                        Method
                      </th>
                      <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">
                        Reference
                      </th>
                      <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {folio.payments.map((payment, i) => (
                      <tr
                        key={payment.id.toString()}
                        data-ocid={`billing.payment.item.${i + 1}`}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td className="px-4 py-2.5 text-foreground">
                          {fmtDate(payment.date)}
                        </td>
                        <td className="px-4 py-2.5">
                          <Badge
                            className={cn(
                              "text-xs border px-2 py-0.5",
                              PAYMENT_METHOD_COLORS[payment.method],
                            )}
                          >
                            {PAYMENT_METHOD_LABELS[payment.method]}
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground font-mono">
                          {payment.referenceId || "—"}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-emerald-400 font-medium">
                          {fmtCurrency(payment.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Outstanding Balance */}
          {balance > 0.01 ? (
            <div
              className="rounded-lg bg-red-500/10 border border-red-500/25 p-4 flex items-center justify-between"
              data-ocid="billing.outstanding_balance.panel"
            >
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-red-400" />
                <span className="text-sm font-semibold text-red-400">
                  Outstanding Balance
                </span>
              </div>
              <span className="text-lg font-bold text-red-400 font-mono">
                {fmtCurrency(balance)}
              </span>
            </div>
          ) : (
            <div
              className="rounded-lg bg-emerald-500/10 border border-emerald-500/25 p-4 flex items-center justify-between"
              data-ocid="billing.settled_status.panel"
            >
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">
                  Invoice Settled
                </span>
              </div>
              <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                SETTLED
              </Badge>
            </div>
          )}

          {/* Add Payment Form */}
          {isOpen && (
            <div
              className="rounded-lg border border-border bg-muted/20 p-5"
              data-ocid="billing.add_payment.panel"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Record Payment
              </p>
              <form onSubmit={handleRecordPayment} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="pay-amount"
                      className="text-muted-foreground text-xs"
                    >
                      Amount (₹)
                    </Label>
                    <Input
                      id="pay-amount"
                      type="number"
                      min="1"
                      max={balance}
                      step="0.01"
                      placeholder="0"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="bg-background border-input text-foreground"
                      data-ocid="billing.payment_amount.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="pay-date"
                      className="text-muted-foreground text-xs"
                    >
                      Payment Date
                    </Label>
                    <Input
                      id="pay-date"
                      type="date"
                      value={payDate}
                      onChange={(e) => setPayDate(e.target.value)}
                      className="bg-background border-input text-foreground"
                      data-ocid="billing.payment_date.input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-muted-foreground text-xs">
                    Payment Method
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        PaymentMethod.Card,
                        PaymentMethod.Cash,
                        PaymentMethod.UPI,
                        PaymentMethod.BankTransfer,
                      ] as PaymentMethod[]
                    ).map((m) => (
                      <button
                        key={m}
                        type="button"
                        data-ocid={`billing.payment_method.${m.toLowerCase()}`}
                        onClick={() => setPayMethod(m)}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                          payMethod === m
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-border hover:border-primary/50",
                        )}
                      >
                        {PAYMENT_METHOD_LABELS[m]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="pay-ref"
                    className="text-muted-foreground text-xs"
                  >
                    Reference ID{" "}
                    <span className="text-muted-foreground/60">(optional)</span>
                  </Label>
                  <Input
                    id="pay-ref"
                    placeholder="Transaction ID, cheque no., etc."
                    value={payRef}
                    onChange={(e) => setPayRef(e.target.value)}
                    className="bg-background border-input text-foreground"
                    data-ocid="billing.payment_reference.input"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  data-ocid="billing.record_payment.submit_button"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Record Payment
                </Button>
              </form>
            </div>
          )}
        </div>
      </ScrollArea>

      <AddChargeModal
        open={addChargeOpen}
        onClose={() => setAddChargeOpen(false)}
        onAdd={handleAddCharge}
      />
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function BillingPage() {
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allFolios = useHotelStore((s) => s.folios);
  const allBookings = useHotelStore((s) => s.bookings);
  const allGuests = useHotelStore((s) => s.guests);
  const allRooms = useHotelStore((s) => s.rooms);
  const allHotels = useHotelStore((s) => s.hotels);
  const updateFolio = useHotelStore((s) => s.updateFolio);

  const currentFolios = useMemo(
    () => allFolios.filter((f) => f.hotelId === selectedHotelId),
    [allFolios, selectedHotelId],
  );
  const currentHotel = useMemo(
    () => allHotels.find((h) => h.id === selectedHotelId),
    [allHotels, selectedHotelId],
  );
  const currentBookings = useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId],
  );
  const currentGuests = useMemo(() => allGuests, [allGuests]);
  const currentRooms = useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId],
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "settled">("all");
  const [selectedFolioId, setSelectedFolioId] = useState<bigint | null>(
    currentFolios.length > 0 ? currentFolios[0].id : null,
  );

  const guestMap = useMemo(
    () => new Map(currentGuests.map((g) => [g.id, g])),
    [currentGuests],
  );
  const bookingMap = useMemo(
    () => new Map(currentBookings.map((b) => [b.id, b])),
    [currentBookings],
  );
  const roomMap = useMemo(
    () => new Map(currentRooms.map((r) => [r.id, r])),
    [currentRooms],
  );

  const filteredFolios = useMemo(() => {
    return currentFolios.filter((f) => {
      const guest = guestMap.get(f.guestId);
      const guestName = guest?.name ?? "Unknown Guest";
      const matchesSearch =
        !search.trim() ||
        guestName.toLowerCase().includes(search.toLowerCase()) ||
        f.bookingId.toString().includes(search);
      const matchesFilter =
        filter === "all" ||
        (filter === "open" && f.status === FolioStatus.Open) ||
        (filter === "settled" && f.status === FolioStatus.Settled);
      return matchesSearch && matchesFilter;
    });
  }, [currentFolios, search, filter, guestMap]);

  const selectedFolio = useMemo(
    () =>
      selectedFolioId != null
        ? (currentFolios.find((f) => f.id === selectedFolioId) ?? null)
        : null,
    [selectedFolioId, currentFolios],
  );

  const selectedGuest = selectedFolio
    ? guestMap.get(selectedFolio.guestId)
    : undefined;
  const selectedBooking = selectedFolio
    ? bookingMap.get(selectedFolio.bookingId)
    : undefined;
  const selectedRoom = selectedBooking
    ? roomMap.get(selectedBooking.roomId)
    : undefined;

  return (
    <div
      className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background"
      data-ocid="billing.page"
    >
      {/* Left Panel — Folio List */}
      <div className="w-80 min-w-72 flex flex-col border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <Receipt className="w-4 h-4 text-primary" />
            <h1 className="font-semibold text-foreground text-sm">
              Billing &amp; Invoices
            </h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search guest or booking ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 text-xs bg-background border-input text-foreground h-8"
              data-ocid="billing.search.input"
            />
          </div>
        </div>

        <div className="px-3 pt-3 pb-2">
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as "all" | "open" | "settled")}
          >
            <TabsList className="w-full bg-muted/40 h-7">
              <TabsTrigger
                value="all"
                className="flex-1 text-xs h-6"
                data-ocid="billing.filter.all.tab"
              >
                All ({currentFolios.length})
              </TabsTrigger>
              <TabsTrigger
                value="open"
                className="flex-1 text-xs h-6"
                data-ocid="billing.filter.open.tab"
              >
                Open
              </TabsTrigger>
              <TabsTrigger
                value="settled"
                className="flex-1 text-xs h-6"
                data-ocid="billing.filter.settled.tab"
              >
                Settled
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {filteredFolios.length === 0 ? (
              <div
                className="text-center py-10"
                data-ocid="billing.folio_list.empty_state"
              >
                <Calendar className="w-7 h-7 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">No folios found</p>
              </div>
            ) : (
              filteredFolios.map((folio, i) => {
                const guest = guestMap.get(folio.guestId);
                const booking = bookingMap.get(folio.bookingId);
                return (
                  <FolioListItem
                    key={folio.id.toString()}
                    folio={folio}
                    guestName={guest?.name ?? "Unknown Guest"}
                    bookingDates={
                      booking
                        ? {
                            checkIn: booking.checkIn,
                            checkOut: booking.checkOut,
                          }
                        : undefined
                    }
                    isSelected={selectedFolioId === folio.id}
                    onClick={() => setSelectedFolioId(folio.id)}
                    index={i + 1}
                  />
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel — Invoice Detail */}
      <div className="flex-1 overflow-hidden flex flex-col bg-background">
        {selectedFolio ? (
          <InvoicePanel
            folio={selectedFolio}
            hotelName={currentHotel?.name ?? "Hotel"}
            hotelAddress={currentHotel?.address ?? ""}
            hotelPhone={currentHotel?.phone ?? ""}
            hotelEmail={currentHotel?.email ?? ""}
            guestName={selectedGuest?.name ?? "Guest"}
            guestEmail={selectedGuest?.email ?? ""}
            guestPhone={selectedGuest?.phone ?? ""}
            guestAddress={selectedGuest?.address ?? ""}
            bookingId={selectedFolio.bookingId}
            checkIn={selectedBooking?.checkIn}
            checkOut={selectedBooking?.checkOut}
            roomNumber={selectedRoom?.number ?? "—"}
            roomType={selectedRoom?.roomType ?? "—"}
            onUpdateFolio={updateFolio}
          />
        ) : (
          <div
            className="flex-1 flex flex-col items-center justify-center text-center p-8"
            data-ocid="billing.invoice.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Receipt className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              No Folio Selected
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Select a folio from the list to view the invoice details, record
              payments, and manage charges.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

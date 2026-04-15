import { GuestTag } from "@/backend";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHotelStore } from "@/store/useHotelStore";
import type { Guest } from "@/types/index";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ALL_TAGS = Object.values(GuestTag);

const TAG_COLORS: Record<string, string> = {
  [GuestTag.VIP]: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  [GuestTag.Corporate]: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  [GuestTag.Regular]:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  [GuestTag.New]: "bg-violet-500/15 text-violet-400 border-violet-500/25",
};

type GuestFormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  tags: GuestTag[];
  preferences: string;
  notes: string;
};

const emptyForm = (): GuestFormState => ({
  name: "",
  email: "",
  phone: "",
  country: "India",
  address: "",
  tags: [],
  preferences: "",
  notes: "",
});

function guestToForm(g: Guest): GuestFormState {
  return {
    name: g.name,
    email: g.email,
    phone: g.phone,
    country: g.country,
    address: g.address,
    tags: [...g.tags],
    preferences: g.preferences,
    notes: g.notes,
  };
}

export function ManagementGuestsTab() {
  const guests = useHotelStore((s) => s.guests);
  const addGuest = useHotelStore((s) => s.addGuest);
  const updateGuest = useHotelStore((s) => s.updateGuest);
  const removeGuest = useHotelStore((s) => s.removeGuest);

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editGuest, setEditGuest] = useState<Guest | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [form, setForm] = useState<GuestFormState>(emptyForm());

  const filtered = guests.filter(
    (g) =>
      !search ||
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setForm(emptyForm());
    setShowAdd(true);
  };
  const openEdit = (g: Guest) => {
    setForm(guestToForm(g));
    setEditGuest(g);
  };
  const closeModals = () => {
    setShowAdd(false);
    setEditGuest(null);
  };

  const toggleTag = (tag: GuestTag) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag)
        ? f.tags.filter((t) => t !== tag)
        : [...f.tags, tag],
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.email.trim()) return toast.error("Email is required");
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
        notes: form.notes,
      });
      toast.success("Guest updated");
    } else {
      const maxId = guests.reduce((m, g) => (g.id > m ? g.id : m), 0n);
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
        createdAt: BigInt(Date.now()),
      });
      toast.success("Guest added");
    }
    closeModals();
  };

  const GuestFormFields = () => (
    <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
      <div className="col-span-2 space-y-1.5">
        <Label>Full Name</Label>
        <Input
          data-ocid="guest-form.name_input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Arjun Mehta"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input
          data-ocid="guest-form.email_input"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Phone</Label>
        <Input
          data-ocid="guest-form.phone_input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Country</Label>
        <Input
          data-ocid="guest-form.country_input"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Address</Label>
        <Input
          data-ocid="guest-form.address_input"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => (
            <div key={tag} className="flex items-center gap-1.5 cursor-pointer">
              <Checkbox
                id={`tag-${tag}`}
                data-ocid={`guest-form.tag_${tag.toLowerCase()}`}
                checked={form.tags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
              />
              <Label
                htmlFor={`tag-${tag}`}
                className="cursor-pointer font-normal"
              >
                {tag}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 space-y-1.5">
        <Label>Preferences</Label>
        <Textarea
          data-ocid="guest-form.preferences_textarea"
          value={form.preferences}
          onChange={(e) => setForm({ ...form, preferences: e.target.value })}
          rows={2}
        />
      </div>
      <div className="col-span-2 space-y-1.5">
        <Label>Notes</Label>
        <Textarea
          data-ocid="guest-form.notes_textarea"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={2}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4" data-ocid="management.guests_tab">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="management.guests_search_input"
            className="pl-9"
            placeholder="Search guests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          type="button"
          data-ocid="management.guests_add_button"
          onClick={openAdd}
          className="ml-auto gap-2"
        >
          <Plus className="w-4 h-4" /> Add Guest
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Tags",
                  "Stays",
                  "Loyalty",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
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
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                    data-ocid="management.guests_empty_state"
                  >
                    No guests found.
                  </td>
                </tr>
              ) : (
                filtered.map((g, idx) => (
                  <tr
                    key={String(g.id)}
                    data-ocid={`management.guest_row.${idx + 1}`}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {g.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {g.email}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {g.phone}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {g.tags.map((t) => (
                          <span
                            key={t}
                            className={`status-badge text-[10px] ${TAG_COLORS[t] ?? "bg-muted text-muted-foreground border-border"}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      —
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-amber-400">
                      {String(g.loyaltyPoints)} pts
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          data-ocid={`management.guest_edit_button.${idx + 1}`}
                          onClick={() => openEdit(g)}
                          className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          data-ocid={`management.guest_delete_button.${idx + 1}`}
                          onClick={() => setDeleteId(g.id)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent
          data-ocid="management.guest_add_dialog"
          className="sm:max-w-lg"
        >
          <DialogHeader>
            <DialogTitle>Add Guest</DialogTitle>
          </DialogHeader>
          <GuestFormFields />
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              data-ocid="management.guest_form_cancel_button"
              onClick={closeModals}
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="management.guest_form_submit_button"
              onClick={handleSubmit}
            >
              Add Guest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editGuest}
        onOpenChange={(o) => {
          if (!o) setEditGuest(null);
        }}
      >
        <DialogContent
          data-ocid="management.guest_edit_dialog"
          className="sm:max-w-lg"
        >
          <DialogHeader>
            <DialogTitle>Edit Guest</DialogTitle>
          </DialogHeader>
          <GuestFormFields />
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              data-ocid="management.guest_edit_cancel_button"
              onClick={closeModals}
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="management.guest_edit_submit_button"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteId(null);
        }}
      >
        <AlertDialogContent data-ocid="management.guest_delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Guest?</AlertDialogTitle>
            <AlertDialogDescription>
              Guest record will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="management.guest_delete_cancel_button"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="management.guest_delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteId !== null) {
                  removeGuest(deleteId);
                  toast.success("Guest deleted");
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

import { StaffRole, StaffStatus } from "@/backend";
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
import { Switch } from "@/components/ui/switch";
import { useHotelStore } from "@/store/useHotelStore";
import type { Staff } from "@/types/index";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ROLES = Object.values(StaffRole);

type StaffFormState = {
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  hotelId: string;
  isActive: boolean;
};

const emptyForm = (defaultHotelId = ""): StaffFormState => ({
  name: "",
  email: "",
  phone: "",
  role: StaffRole.FrontDesk,
  hotelId: defaultHotelId,
  isActive: true,
});

function staffToForm(s: Staff): StaffFormState {
  return {
    name: s.name,
    email: s.email,
    phone: s.phone,
    role: s.role,
    hotelId: String(s.hotelId),
    isActive: s.status === StaffStatus.Active,
  };
}

export function ManagementStaffTab() {
  const hotels = useHotelStore((s) => s.hotels);
  const staff = useHotelStore((s) => s.staff);
  const addStaff = useHotelStore((s) => s.addStaff);
  const updateStaff = useHotelStore((s) => s.updateStaff);
  const removeStaff = useHotelStore((s) => s.removeStaff);

  const [hotelFilter, setHotelFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editMember, setEditMember] = useState<Staff | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [form, setForm] = useState<StaffFormState>(emptyForm());

  const filtered =
    hotelFilter === "all"
      ? staff
      : staff.filter((s) => String(s.hotelId) === hotelFilter);
  const hotelName = (id: bigint) =>
    hotels.find((h) => h.id === id)?.name ?? "Unknown";

  const openAdd = () => {
    setForm(emptyForm(hotels[0] ? String(hotels[0].id) : ""));
    setShowAdd(true);
  };
  const openEdit = (m: Staff) => {
    setForm(staffToForm(m));
    setEditMember(m);
  };
  const closeModals = () => {
    setShowAdd(false);
    setEditMember(null);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.email.trim()) return toast.error("Email is required");
    if (!form.hotelId) return toast.error("Select a hotel");

    const status = form.isActive ? StaffStatus.Active : StaffStatus.Inactive;
    if (editMember) {
      updateStaff({
        ...editMember,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        status,
      });
      toast.success("Staff updated");
    } else {
      const maxId = staff.reduce((m, s) => (s.id > m ? s.id : m), 0n);
      addStaff({
        id: maxId + 1n,
        hotelId: BigInt(form.hotelId),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        status,
      });
      toast.success("Staff member added");
    }
    closeModals();
  };

  const handleToggle = (m: Staff) => {
    updateStaff({
      ...m,
      status:
        m.status === StaffStatus.Active
          ? StaffStatus.Inactive
          : StaffStatus.Active,
    });
  };

  const StaffFormFields = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 space-y-1.5">
        <Label>Full Name</Label>
        <Input
          data-ocid="staff-form.name_input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Ravi Menon"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input
          data-ocid="staff-form.email_input"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="email@hotel.in"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Phone</Label>
        <Input
          data-ocid="staff-form.phone_input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+91 98000 00000"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Role</Label>
        <Select
          value={form.role}
          onValueChange={(v) => setForm({ ...form, role: v as StaffRole })}
        >
          <SelectTrigger data-ocid="staff-form.role_select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Property</Label>
        <Select
          value={form.hotelId}
          onValueChange={(v) => setForm({ ...form, hotelId: v })}
        >
          <SelectTrigger data-ocid="staff-form.hotel_select">
            <SelectValue placeholder="Select hotel" />
          </SelectTrigger>
          <SelectContent>
            {hotels.map((h) => (
              <SelectItem key={String(h.id)} value={String(h.id)}>
                {h.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex items-center gap-3">
        <Switch
          data-ocid="staff-form.active_switch"
          checked={form.isActive}
          onCheckedChange={(v) => setForm({ ...form, isActive: v })}
        />
        <Label>Active</Label>
      </div>
    </div>
  );

  return (
    <div className="space-y-4" data-ocid="management.staff_tab">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={hotelFilter} onValueChange={setHotelFilter}>
          <SelectTrigger
            data-ocid="management.staff_hotel_filter"
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
        <Button
          type="button"
          data-ocid="management.staff_add_button"
          onClick={openAdd}
          className="ml-auto gap-2"
        >
          <Plus className="w-4 h-4" /> Add Staff
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Name", "Email", "Role", "Property", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-muted-foreground"
                    data-ocid="management.staff_empty_state"
                  >
                    No staff found.
                  </td>
                </tr>
              ) : (
                filtered.map((m, idx) => (
                  <tr
                    key={String(m.id)}
                    data-ocid={`management.staff_row.${idx + 1}`}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {m.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {m.email}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={m.role} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[160px]">
                      {hotelName(m.hotelId)}
                    </td>
                    <td className="px-4 py-3">
                      <Switch
                        data-ocid={`management.staff_active_toggle.${idx + 1}`}
                        checked={m.status === StaffStatus.Active}
                        onCheckedChange={() => handleToggle(m)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          data-ocid={`management.staff_edit_button.${idx + 1}`}
                          onClick={() => openEdit(m)}
                          className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          data-ocid={`management.staff_delete_button.${idx + 1}`}
                          onClick={() => setDeleteId(m.id)}
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
          data-ocid="management.staff_add_dialog"
          className="sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle>Add Staff Member</DialogTitle>
          </DialogHeader>
          <StaffFormFields />
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              data-ocid="management.staff_form_cancel_button"
              onClick={closeModals}
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="management.staff_form_submit_button"
              onClick={handleSubmit}
            >
              Add Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editMember}
        onOpenChange={(o) => {
          if (!o) setEditMember(null);
        }}
      >
        <DialogContent
          data-ocid="management.staff_edit_dialog"
          className="sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
          </DialogHeader>
          <StaffFormFields />
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              data-ocid="management.staff_edit_cancel_button"
              onClick={closeModals}
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="management.staff_edit_submit_button"
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
        <AlertDialogContent data-ocid="management.staff_delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Staff Member?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="management.staff_delete_cancel_button"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="management.staff_delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteId !== null) {
                  removeStaff(deleteId);
                  toast.success("Staff member removed");
                  setDeleteId(null);
                }
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

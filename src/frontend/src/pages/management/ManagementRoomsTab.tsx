import { RoomStatus, RoomType } from "@/backend";
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
import type { Room } from "@/types/index";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ROOM_TYPES = Object.values(RoomType);
const ROOM_STATUSES = Object.values(RoomStatus);

type RoomFormState = {
  number: string;
  floor: string;
  roomType: RoomType;
  status: RoomStatus;
  pricePerNight: string;
  capacity: string;
  isActive: boolean;
};

const emptyForm = (): RoomFormState => ({
  number: "",
  floor: "1",
  roomType: RoomType.Standard,
  status: RoomStatus.Clean,
  pricePerNight: "3500",
  capacity: "2",
  isActive: true,
});

function roomToForm(r: Room): RoomFormState {
  return {
    number: r.number,
    floor: String(r.floor),
    roomType: r.roomType,
    status: r.status,
    pricePerNight: String(r.pricePerNight),
    capacity: String(r.capacity),
    isActive: r.isActive,
  };
}

export function ManagementRoomsTab() {
  const hotels = useHotelStore((s) => s.hotels);
  const rooms = useHotelStore((s) => s.rooms);
  const addRoom = useHotelStore((s) => s.addRoom);
  const updateRoom = useHotelStore((s) => s.updateRoom);
  const removeRoom = useHotelStore((s) => s.removeRoom);

  const [hotelFilter, setHotelFilter] = useState<string>("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [form, setForm] = useState<RoomFormState>(emptyForm());

  const filteredRooms =
    hotelFilter === "all"
      ? rooms
      : rooms.filter((r) => String(r.hotelId) === hotelFilter);

  const hotelName = (id: bigint) =>
    hotels.find((h) => h.id === id)?.name ?? "Unknown";

  const openAdd = () => {
    setForm(emptyForm());
    setShowAdd(true);
  };
  const openEdit = (r: Room) => {
    setForm(roomToForm(r));
    setEditRoom(r);
  };
  const closeModals = () => {
    setShowAdd(false);
    setEditRoom(null);
  };

  const handleSubmit = () => {
    const price = Number.parseFloat(form.pricePerNight);
    const cap = Number.parseInt(form.capacity, 10);
    const floor = Number.parseInt(form.floor, 10);
    if (!form.number.trim()) return toast.error("Room number is required");
    if (Number.isNaN(price) || price <= 0) return toast.error("Invalid price");

    if (editRoom) {
      updateRoom({
        ...editRoom,
        number: form.number.trim(),
        floor: BigInt(floor),
        roomType: form.roomType,
        status: form.status,
        pricePerNight: price,
        capacity: BigInt(cap),
        isActive: form.isActive,
      });
      toast.success("Room updated");
    } else {
      const newHotelId =
        hotelFilter !== "all" ? BigInt(hotelFilter) : (hotels[0]?.id ?? 1n);
      const maxId = rooms.reduce((m, r) => (r.id > m ? r.id : m), 0n);
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
        isActive: form.isActive,
      });
      toast.success("Room added");
    }
    closeModals();
  };

  const handleToggleActive = (room: Room) => {
    updateRoom({ ...room, isActive: !room.isActive });
  };

  const RoomFormFields = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label>Room Number</Label>
        <Input
          data-ocid="room-form.number_input"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
          placeholder="e.g. 101"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Floor</Label>
        <Input
          data-ocid="room-form.floor_input"
          type="number"
          min={1}
          max={10}
          value={form.floor}
          onChange={(e) => setForm({ ...form, floor: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Room Type</Label>
        <Select
          value={form.roomType}
          onValueChange={(v) => setForm({ ...form, roomType: v as RoomType })}
        >
          <SelectTrigger data-ocid="room-form.type_select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROOM_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Status</Label>
        <Select
          value={form.status}
          onValueChange={(v) => setForm({ ...form, status: v as RoomStatus })}
        >
          <SelectTrigger data-ocid="room-form.status_select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROOM_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Price / Night (₹)</Label>
        <Input
          data-ocid="room-form.price_input"
          type="number"
          min={0}
          value={form.pricePerNight}
          onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Capacity</Label>
        <Input
          data-ocid="room-form.capacity_input"
          type="number"
          min={1}
          max={10}
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />
      </div>
      <div className="col-span-2 flex items-center gap-3">
        <Switch
          data-ocid="room-form.active_switch"
          checked={form.isActive}
          onCheckedChange={(v) => setForm({ ...form, isActive: v })}
        />
        <Label>Active</Label>
      </div>
    </div>
  );

  return (
    <div className="space-y-4" data-ocid="management.rooms_tab">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={hotelFilter} onValueChange={setHotelFilter}>
          <SelectTrigger
            data-ocid="management.rooms_hotel_filter"
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
          data-ocid="management.rooms_add_button"
          onClick={openAdd}
          className="ml-auto gap-2"
        >
          <Plus className="w-4 h-4" /> Add Room
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {[
                  "Room #",
                  "Hotel",
                  "Floor",
                  "Type",
                  "Status",
                  "Price/Night",
                  "Capacity",
                  "Active",
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
              {filteredRooms.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-muted-foreground"
                    data-ocid="management.rooms_empty_state"
                  >
                    No rooms found.
                  </td>
                </tr>
              ) : (
                filteredRooms.map((room, idx) => (
                  <tr
                    key={String(room.id)}
                    data-ocid={`management.room_row.${idx + 1}`}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-medium text-foreground">
                      {room.number}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[150px]">
                      {hotelName(room.hotelId)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {String(room.floor)}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {room.roomType}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={room.status} />
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ₹{room.pricePerNight.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {String(room.capacity)}
                    </td>
                    <td className="px-4 py-3">
                      <Switch
                        data-ocid={`management.room_active_toggle.${idx + 1}`}
                        checked={room.isActive}
                        onCheckedChange={() => handleToggleActive(room)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          data-ocid={`management.room_edit_button.${idx + 1}`}
                          onClick={() => openEdit(room)}
                          className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          data-ocid={`management.room_delete_button.${idx + 1}`}
                          onClick={() => setDeleteId(room.id)}
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

      {/* Add Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent
          data-ocid="management.room_add_dialog"
          className="sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle>Add Room</DialogTitle>
          </DialogHeader>
          <RoomFormFields />
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              data-ocid="management.room_form_cancel_button"
              onClick={closeModals}
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="management.room_form_submit_button"
              onClick={handleSubmit}
            >
              Add Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={!!editRoom}
        onOpenChange={(o) => {
          if (!o) setEditRoom(null);
        }}
      >
        <DialogContent
          data-ocid="management.room_edit_dialog"
          className="sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
          </DialogHeader>
          <RoomFormFields />
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              data-ocid="management.room_edit_cancel_button"
              onClick={closeModals}
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="management.room_edit_submit_button"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteId(null);
        }}
      >
        <AlertDialogContent data-ocid="management.room_delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Room?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="management.room_delete_cancel_button"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="management.room_delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteId !== null) {
                  removeRoom(deleteId);
                  toast.success("Room deleted");
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

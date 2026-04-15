import {
  BookingStatus,
  RoomStatus,
  StaffStatus,
  SyncStatus,
  TaskStatus,
} from "@/backend";
import type {
  CreateBookingArgs,
  CreateChannelConfigArgs,
  CreateGuestArgs,
  CreateHousekeepingTaskArgs,
  CreateRoomArgs,
  CreateStaffArgs,
  UpdateBookingArgs,
  UpdateChannelConfigArgs,
  UpdateGuestArgs,
  UpdateHousekeepingTaskArgs,
  UpdateRoomArgs,
} from "@/backend";
import { useHotelStore } from "@/store/useHotelStore";
import type {
  AnalyticsData,
  Booking,
  ChannelConfig,
  Folio,
  Guest,
  Hotel,
  HousekeepingTask,
  Room,
  Staff,
} from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ── Hotels ────────────────────────────────────────────────────────────────────
export function useHotels() {
  const storeHotels = useHotelStore((s) => s.hotels);
  return useQuery<Hotel[]>({
    queryKey: ["hotels"],
    queryFn: () => storeHotels,
    initialData: storeHotels,
  });
}

// ── Rooms ─────────────────────────────────────────────────────────────────────
export function useRooms(hotelId?: bigint) {
  const store = useHotelStore();
  const fallback = hotelId
    ? store.rooms.filter((r) => r.hotelId === hotelId)
    : store.rooms;
  return useQuery<Room[]>({
    queryKey: ["rooms", hotelId?.toString()],
    queryFn: () => fallback,
    initialData: fallback,
  });
}

// ── Guests ────────────────────────────────────────────────────────────────────
export function useGuests() {
  const storeGuests = useHotelStore((s) => s.guests);
  return useQuery<Guest[]>({
    queryKey: ["guests"],
    queryFn: () => storeGuests,
    initialData: storeGuests,
  });
}

// ── Bookings ──────────────────────────────────────────────────────────────────
export function useBookings(hotelId?: bigint) {
  const store = useHotelStore();
  const fallback = hotelId
    ? store.bookings.filter((b) => b.hotelId === hotelId)
    : store.bookings;
  return useQuery<Booking[]>({
    queryKey: ["bookings", hotelId?.toString()],
    queryFn: () => fallback,
    initialData: fallback,
  });
}

// ── Staff ─────────────────────────────────────────────────────────────────────
export function useStaff(hotelId?: bigint) {
  const store = useHotelStore();
  const fallback = hotelId
    ? store.staff.filter((s) => s.hotelId === hotelId)
    : store.staff;
  return useQuery<Staff[]>({
    queryKey: ["staff", hotelId?.toString()],
    queryFn: () => fallback,
    initialData: fallback,
  });
}

// ── Housekeeping Tasks ────────────────────────────────────────────────────────
export function useHousekeepingTasks(hotelId?: bigint) {
  const store = useHotelStore();
  const fallback = hotelId
    ? store.housekeepingTasks.filter((t) => t.hotelId === hotelId)
    : store.housekeepingTasks;
  return useQuery<HousekeepingTask[]>({
    queryKey: ["tasks", hotelId?.toString()],
    queryFn: () => fallback,
    initialData: fallback,
  });
}

// ── Folios ────────────────────────────────────────────────────────────────────
export function useFolios(hotelId?: bigint) {
  const store = useHotelStore();
  const fallback = hotelId
    ? store.folios.filter((f) => f.hotelId === hotelId)
    : store.folios;
  return useQuery<Folio[]>({
    queryKey: ["folios", hotelId?.toString()],
    queryFn: () => fallback,
    initialData: fallback,
  });
}

// ── Channel Configs ───────────────────────────────────────────────────────────
export function useChannelConfigs(hotelId?: bigint) {
  const store = useHotelStore();
  const fallback = hotelId
    ? store.channelConfigs.filter((c) => c.hotelId === hotelId)
    : store.channelConfigs;
  return useQuery<ChannelConfig[]>({
    queryKey: ["channels", hotelId?.toString()],
    queryFn: () => fallback,
    initialData: fallback,
  });
}

// ── Analytics ─────────────────────────────────────────────────────────────────
export function useAnalytics(hotelId?: bigint) {
  const store = useHotelStore();
  const fallback = store.analyticsData.find((a) => a.hotelId === hotelId);
  return useQuery<AnalyticsData | null>({
    queryKey: ["analytics", hotelId?.toString()],
    queryFn: () => fallback ?? null,
    initialData: fallback ?? null,
  });
}

// ── Booking Mutations ─────────────────────────────────────────────────────────
export function useCreateBooking() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: CreateBookingArgs) => {
      const newBooking: Booking = {
        ...args,
        id: BigInt(Date.now()),
        createdAt: BigInt(Date.now()),
        actualCheckIn: undefined,
        actualCheckOut: undefined,
      };
      store.addBooking(newBooking);
      return newBooking;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

export function useUpdateBooking() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: UpdateBookingArgs) => {
      const existing = store.bookings.find((b) => b.id === args.id);
      if (existing) store.updateBooking({ ...existing, ...args });
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

export function useCheckIn() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (id: bigint) => {
      const booking = store.bookings.find((b) => b.id === id);
      if (booking)
        store.updateBooking({
          ...booking,
          status: BookingStatus.CheckedIn,
          actualCheckIn: BigInt(Date.now()),
        });
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

export function useCheckOut() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (id: bigint) => {
      const booking = store.bookings.find((b) => b.id === id);
      if (booking)
        store.updateBooking({
          ...booking,
          status: BookingStatus.CheckedOut,
          actualCheckOut: BigInt(Date.now()),
        });
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

// ── Guest Mutations ───────────────────────────────────────────────────────────
export function useCreateGuest() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: CreateGuestArgs) => {
      const newGuest: Guest = {
        ...args,
        id: BigInt(Date.now()),
        createdAt: BigInt(Date.now()),
        loyaltyPoints: 0n,
      };
      store.addGuest(newGuest);
      return newGuest;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["guests"] }),
  });
}

export function useUpdateGuest() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: UpdateGuestArgs) => {
      const existing = store.guests.find((g) => g.id === args.id);
      if (existing) store.updateGuest({ ...existing, ...args });
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["guests"] }),
  });
}

// ── Room Mutations ────────────────────────────────────────────────────────────
export function useCreateRoom() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: CreateRoomArgs) => {
      const newRoom: Room = {
        ...args,
        id: BigInt(Date.now()),
        status: RoomStatus.Clean,
        isActive: true,
      };
      store.addRoom(newRoom);
      return newRoom;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rooms"] }),
  });
}

export function useUpdateRoom() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: UpdateRoomArgs) => {
      const existing = store.rooms.find((r) => r.id === args.id);
      if (existing) store.updateRoom({ ...existing, ...args });
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rooms"] }),
  });
}

// ── Staff Mutations ───────────────────────────────────────────────────────────
export function useCreateStaff() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: CreateStaffArgs) => {
      const newMember: Staff = {
        ...args,
        id: BigInt(Date.now()),
        status: StaffStatus.Active,
      };
      store.addStaff(newMember);
      return newMember;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  });
}

// ── Task Mutations ────────────────────────────────────────────────────────────
export function useCreateTask() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: CreateHousekeepingTaskArgs) => {
      const newTask: HousekeepingTask = {
        ...args,
        id: BigInt(Date.now()),
        status: TaskStatus.Pending,
        createdAt: BigInt(Date.now()),
        completedAt: undefined,
      };
      store.addTask(newTask);
      return newTask;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: UpdateHousekeepingTaskArgs) => {
      const existing = store.housekeepingTasks.find((t) => t.id === args.id);
      if (existing) store.updateTask({ ...existing, ...args });
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

// ── Channel Mutations ─────────────────────────────────────────────────────────
export function useCreateChannelConfig() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: CreateChannelConfigArgs) => {
      const newConfig: ChannelConfig = {
        ...args,
        id: BigInt(Date.now()),
        syncStatus: SyncStatus.Synced,
        isActive: true,
        lastSync: BigInt(Date.now()),
      };
      store.addChannelConfig(newConfig);
      return newConfig;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["channels"] }),
  });
}

export function useUpdateChannelConfig() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (args: UpdateChannelConfigArgs) => {
      const existing = store.channelConfigs.find((c) => c.id === args.id);
      if (existing) store.updateChannelConfig({ ...existing, ...args });
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["channels"] }),
  });
}

// Re-export enums for convenience
export { BookingStatus, RoomStatus, TaskStatus, SyncStatus, StaffStatus };

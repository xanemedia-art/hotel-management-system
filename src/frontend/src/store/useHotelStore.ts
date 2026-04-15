import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  sampleActivityFeed,
  sampleAnalytics,
  sampleBookings,
  sampleChannelConfigs,
  sampleFolios,
  sampleGuests,
  sampleHotels,
  sampleHousekeepingTasks,
  sampleRooms,
  sampleStaff,
} from "../data/sampleData";
import type {
  ActivityFeedItem,
  AnalyticsData,
  Booking,
  ChannelConfig,
  Folio,
  Guest,
  Hotel,
  HousekeepingTask,
  Room,
  Staff,
} from "../types/index";

interface HotelStoreState {
  hotels: Hotel[];
  rooms: Room[];
  guests: Guest[];
  bookings: Booking[];
  staff: Staff[];
  housekeepingTasks: HousekeepingTask[];
  folios: Folio[];
  channelConfigs: ChannelConfig[];
  analyticsData: AnalyticsData[];
  activityFeed: ActivityFeedItem[];
  selectedHotelId: bigint;
  isDarkMode: boolean;
  sidebarCollapsed: boolean;
}

interface HotelStoreActions {
  setSelectedHotel: (id: bigint) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  addRoom: (room: Room) => void;
  updateRoom: (room: Room) => void;
  removeRoom: (id: bigint) => void;
  addGuest: (guest: Guest) => void;
  updateGuest: (guest: Guest) => void;
  removeGuest: (id: bigint) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (booking: Booking) => void;
  removeBooking: (id: bigint) => void;
  addStaff: (member: Staff) => void;
  updateStaff: (member: Staff) => void;
  removeStaff: (id: bigint) => void;
  addTask: (task: HousekeepingTask) => void;
  updateTask: (task: HousekeepingTask) => void;
  removeTask: (id: bigint) => void;
  addFolio: (folio: Folio) => void;
  updateFolio: (folio: Folio) => void;
  addChannelConfig: (config: ChannelConfig) => void;
  updateChannelConfig: (config: ChannelConfig) => void;
  removeChannelConfig: (id: bigint) => void;
  addHotel: (hotel: Hotel) => void;
  updateHotel: (hotel: Hotel) => void;
  removeHotel: (id: bigint) => void;
}

interface HotelStoreSelectors {
  currentHotel: () => Hotel | undefined;
  currentRooms: () => Room[];
  currentBookings: () => Booking[];
  currentStaff: () => Staff[];
  currentGuests: () => Guest[];
  currentTasks: () => HousekeepingTask[];
  currentFolios: () => Folio[];
  currentChannelConfigs: () => ChannelConfig[];
  currentAnalytics: () => AnalyticsData | undefined;
}

type HotelStore = HotelStoreState & HotelStoreActions & HotelStoreSelectors;

export const useHotelStore = create<HotelStore>()(
  persist(
    (set, get) => ({
      hotels: sampleHotels,
      rooms: sampleRooms,
      guests: sampleGuests,
      bookings: sampleBookings,
      staff: sampleStaff,
      housekeepingTasks: sampleHousekeepingTasks,
      folios: sampleFolios,
      channelConfigs: sampleChannelConfigs,
      analyticsData: sampleAnalytics,
      activityFeed: sampleActivityFeed,
      selectedHotelId: 1n,
      isDarkMode: true,
      sidebarCollapsed: false,

      setSelectedHotel: (id) => set({ selectedHotelId: id }),
      toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

      addRoom: (room) => set((s) => ({ rooms: [...s.rooms, room] })),
      updateRoom: (room) =>
        set((s) => ({
          rooms: s.rooms.map((r) => (r.id === room.id ? room : r)),
        })),
      removeRoom: (id) =>
        set((s) => ({ rooms: s.rooms.filter((r) => r.id !== id) })),

      addGuest: (guest) => set((s) => ({ guests: [...s.guests, guest] })),
      updateGuest: (guest) =>
        set((s) => ({
          guests: s.guests.map((g) => (g.id === guest.id ? guest : g)),
        })),
      removeGuest: (id) =>
        set((s) => ({ guests: s.guests.filter((g) => g.id !== id) })),

      addBooking: (booking) =>
        set((s) => ({ bookings: [...s.bookings, booking] })),
      updateBooking: (booking) =>
        set((s) => ({
          bookings: s.bookings.map((b) => (b.id === booking.id ? booking : b)),
        })),
      removeBooking: (id) =>
        set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) })),

      addStaff: (member) => set((s) => ({ staff: [...s.staff, member] })),
      updateStaff: (member) =>
        set((s) => ({
          staff: s.staff.map((m) => (m.id === member.id ? member : m)),
        })),
      removeStaff: (id) =>
        set((s) => ({ staff: s.staff.filter((m) => m.id !== id) })),

      addTask: (task) =>
        set((s) => ({ housekeepingTasks: [...s.housekeepingTasks, task] })),
      updateTask: (task) =>
        set((s) => ({
          housekeepingTasks: s.housekeepingTasks.map((t) =>
            t.id === task.id ? task : t,
          ),
        })),
      removeTask: (id) =>
        set((s) => ({
          housekeepingTasks: s.housekeepingTasks.filter((t) => t.id !== id),
        })),

      addFolio: (folio) => set((s) => ({ folios: [...s.folios, folio] })),
      updateFolio: (folio) =>
        set((s) => ({
          folios: s.folios.map((f) => (f.id === folio.id ? folio : f)),
        })),

      addChannelConfig: (config) =>
        set((s) => ({ channelConfigs: [...s.channelConfigs, config] })),
      updateChannelConfig: (config) =>
        set((s) => ({
          channelConfigs: s.channelConfigs.map((c) =>
            c.id === config.id ? config : c,
          ),
        })),
      removeChannelConfig: (id) =>
        set((s) => ({
          channelConfigs: s.channelConfigs.filter((c) => c.id !== id),
        })),

      addHotel: (hotel) => set((s) => ({ hotels: [...s.hotels, hotel] })),
      updateHotel: (hotel) =>
        set((s) => ({
          hotels: s.hotels.map((h) => (h.id === hotel.id ? hotel : h)),
        })),
      removeHotel: (id) =>
        set((s) => ({ hotels: s.hotels.filter((h) => h.id !== id) })),

      currentHotel: () =>
        get().hotels.find((h) => h.id === get().selectedHotelId),
      currentRooms: () =>
        get().rooms.filter((r) => r.hotelId === get().selectedHotelId),
      currentBookings: () =>
        get().bookings.filter((b) => b.hotelId === get().selectedHotelId),
      currentStaff: () =>
        get().staff.filter((s) => s.hotelId === get().selectedHotelId),
      currentGuests: () => get().guests,
      currentTasks: () =>
        get().housekeepingTasks.filter(
          (t) => t.hotelId === get().selectedHotelId,
        ),
      currentFolios: () =>
        get().folios.filter((f) => f.hotelId === get().selectedHotelId),
      currentChannelConfigs: () =>
        get().channelConfigs.filter((c) => c.hotelId === get().selectedHotelId),
      currentAnalytics: () =>
        get().analyticsData.find((a) => a.hotelId === get().selectedHotelId),
    }),
    {
      name: "hms-store",
      partialize: (state) => ({
        selectedHotelId: state.selectedHotelId,
        isDarkMode: state.isDarkMode,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
      storage: {
        getItem: (name) => {
          try {
            const str = localStorage.getItem(name);
            if (!str) return null;
            return JSON.parse(str, (_key, val) => {
              if (typeof val === "string" && /^\d+n$/.test(val)) {
                return BigInt(val.slice(0, -1));
              }
              return val;
            });
          } catch {
            // Malformed persisted data — clear and fall back to fresh state
            localStorage.removeItem(name);
            return null;
          }
        },
        setItem: (name, value) => {
          localStorage.setItem(
            name,
            JSON.stringify(value, (_key, val) =>
              typeof val === "bigint" ? `${val}n` : val,
            ),
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

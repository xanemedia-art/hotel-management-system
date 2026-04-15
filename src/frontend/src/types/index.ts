// Re-export backend types with friendlier aliases
export type {
  HotelView as Hotel,
  RoomView as Room,
  GuestView as Guest,
  BookingView as Booking,
  StaffView as Staff,
  HousekeepingTaskView as HousekeepingTask,
  FolioView as Folio,
  FolioCharge,
  Payment,
  ChannelConfigView as ChannelConfig,
  AnalyticsData,
  MonthlyRevenue,
  MonthlyOccupancy,
  RevenueByRoomType,
  EntityId,
  Timestamp,
} from "../backend";

// Frontend-only types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "FrontDesk" | "Housekeeping";
  hotelId: string;
  avatar?: string;
}

export interface ActivityFeedItem {
  id: string;
  type:
    | "booking"
    | "checkin"
    | "checkout"
    | "housekeeping"
    | "payment"
    | "guest";
  message: string;
  detail?: string;
  timestamp: Date;
  hotelId: string;
  icon?: string;
}

export type NavRoute =
  | "/"
  | "/reservations"
  | "/front-desk"
  | "/housekeeping"
  | "/billing"
  | "/channel-manager"
  | "/reports"
  | "/guest-crm"
  | "/settings"
  | "/management";

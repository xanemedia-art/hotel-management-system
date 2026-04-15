import List "mo:core/List";
import Common "types/common";
import HotelTypes "types/hotel";
import RoomTypes "types/room";
import GuestTypes "types/guest";
import BookingTypes "types/booking";
import StaffTypes "types/staff";
import HousekeepingTypes "types/housekeeping";
import BillingTypes "types/billing";
import ChannelTypes "types/channel";
import Seed "lib/seed";
import HotelApi "mixins/hotel-api";
import RoomApi "mixins/room-api";
import GuestApi "mixins/guest-api";
import BookingApi "mixins/booking-api";
import StaffApi "mixins/staff-api";
import HousekeepingApi "mixins/housekeeping-api";
import BillingApi "mixins/billing-api";
import ChannelApi "mixins/channel-api";
import AnalyticsApi "mixins/analytics-api";

actor {
  let hotels = List.empty<HotelTypes.Hotel>();
  let rooms = List.empty<RoomTypes.Room>();
  let guests = List.empty<GuestTypes.Guest>();
  let bookings = List.empty<BookingTypes.Booking>();
  let staff = List.empty<StaffTypes.Staff>();
  let tasks = List.empty<HousekeepingTypes.HousekeepingTask>();
  let folios = List.empty<BillingTypes.Folio>();
  let channels = List.empty<ChannelTypes.ChannelConfig>();

  // Shared counter for all entity IDs
  let idCounter : Common.Counter = { var value : Nat = 0 };

  // Seed sample data on first deployment (only if empty)
  if (hotels.isEmpty()) {
    idCounter.value := Seed.populate(hotels, rooms, guests, bookings, staff, tasks, folios, channels, idCounter.value);
  };

  include HotelApi(hotels, idCounter);
  include RoomApi(rooms, idCounter);
  include GuestApi(guests, idCounter);
  include BookingApi(bookings, idCounter);
  include StaffApi(staff, idCounter);
  include HousekeepingApi(tasks, idCounter);
  include BillingApi(folios, idCounter);
  include ChannelApi(channels, idCounter);
  include AnalyticsApi(bookings, rooms);
};

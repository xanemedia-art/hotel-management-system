import List "mo:core/List";
import BookingTypes "../types/booking";
import RoomTypes "../types/room";
import AnalyticsTypes "../types/analytics";
import Common "../types/common";
import AnalyticsLib "../lib/analytics";

mixin (
  bookings : List.List<BookingTypes.Booking>,
  rooms : List.List<RoomTypes.Room>,
) {
  public query func getAnalyticsData(
    hotelId : Common.EntityId,
    fromMonth : Nat,
    fromYear : Nat,
    toMonth : Nat,
    toYear : Nat,
  ) : async AnalyticsTypes.AnalyticsData {
    AnalyticsLib.compute(hotelId, bookings, rooms, fromMonth, fromYear, toMonth, toYear);
  };
};

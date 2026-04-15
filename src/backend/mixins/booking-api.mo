import List "mo:core/List";
import BookingTypes "../types/booking";
import Common "../types/common";
import BookingLib "../lib/booking";

mixin (
  bookings : List.List<BookingTypes.Booking>,
  idCounter : Common.Counter,
) {
  public query func getBookings() : async [BookingTypes.BookingView] {
    BookingLib.getAll(bookings);
  };

  public query func getBooking(id : Common.EntityId) : async ?BookingTypes.BookingView {
    BookingLib.getById(bookings, id);
  };

  public query func getBookingsByHotel(hotelId : Common.EntityId) : async [BookingTypes.BookingView] {
    BookingLib.getByHotel(bookings, hotelId);
  };

  public query func getBookingsByGuest(guestId : Common.EntityId) : async [BookingTypes.BookingView] {
    BookingLib.getByGuest(bookings, guestId);
  };

  public func createBooking(args : BookingTypes.CreateBookingArgs) : async BookingTypes.BookingView {
    let booking = BookingLib.create(idCounter.value, args);
    idCounter.value += 1;
    bookings.add(booking);
    BookingLib.toView(booking);
  };

  public func updateBooking(args : BookingTypes.UpdateBookingArgs) : async Bool {
    BookingLib.update(bookings, args);
  };

  public func updateBookingStatus(id : Common.EntityId, status : Common.BookingStatus) : async Bool {
    BookingLib.updateStatus(bookings, id, status);
  };

  public func checkInBooking(id : Common.EntityId) : async Bool {
    BookingLib.checkIn(bookings, id);
  };

  public func checkOutBooking(id : Common.EntityId) : async Bool {
    BookingLib.checkOut(bookings, id);
  };

  public func deleteBooking(id : Common.EntityId) : async Bool {
    BookingLib.delete(bookings, id);
  };
};

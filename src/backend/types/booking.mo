import Common "common";

module {
  public type Booking = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    guestId : Common.EntityId;
    var roomId : Common.EntityId;
    var guestName : Text;
    var guestPhone : Text;
    var guestEmail : Text;
    var checkIn : Common.Timestamp;
    var checkOut : Common.Timestamp;
    var numGuests : Nat;
    var source : Common.BookingSource;
    var status : Common.BookingStatus;
    var earlyCheckIn : Bool;
    var lateCheckOut : Bool;
    var notes : Text;
    createdAt : Common.Timestamp;
    var actualCheckIn : ?Common.Timestamp;
    var actualCheckOut : ?Common.Timestamp;
  };

  public type BookingView = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    guestId : Common.EntityId;
    roomId : Common.EntityId;
    guestName : Text;
    guestPhone : Text;
    guestEmail : Text;
    checkIn : Common.Timestamp;
    checkOut : Common.Timestamp;
    numGuests : Nat;
    source : Common.BookingSource;
    status : Common.BookingStatus;
    earlyCheckIn : Bool;
    lateCheckOut : Bool;
    notes : Text;
    createdAt : Common.Timestamp;
    actualCheckIn : ?Common.Timestamp;
    actualCheckOut : ?Common.Timestamp;
  };

  public type CreateBookingArgs = {
    hotelId : Common.EntityId;
    guestId : Common.EntityId;
    roomId : Common.EntityId;
    guestName : Text;
    guestPhone : Text;
    guestEmail : Text;
    checkIn : Common.Timestamp;
    checkOut : Common.Timestamp;
    numGuests : Nat;
    source : Common.BookingSource;
    status : Common.BookingStatus;
    earlyCheckIn : Bool;
    lateCheckOut : Bool;
    notes : Text;
  };

  public type UpdateBookingArgs = {
    id : Common.EntityId;
    roomId : Common.EntityId;
    guestName : Text;
    guestPhone : Text;
    guestEmail : Text;
    checkIn : Common.Timestamp;
    checkOut : Common.Timestamp;
    numGuests : Nat;
    source : Common.BookingSource;
    status : Common.BookingStatus;
    earlyCheckIn : Bool;
    lateCheckOut : Bool;
    notes : Text;
    actualCheckIn : ?Common.Timestamp;
    actualCheckOut : ?Common.Timestamp;
  };
};

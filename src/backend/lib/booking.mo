import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/booking";

module {
  public func toView(b : Types.Booking) : Types.BookingView {
    {
      id = b.id;
      hotelId = b.hotelId;
      guestId = b.guestId;
      roomId = b.roomId;
      guestName = b.guestName;
      guestPhone = b.guestPhone;
      guestEmail = b.guestEmail;
      checkIn = b.checkIn;
      checkOut = b.checkOut;
      numGuests = b.numGuests;
      source = b.source;
      status = b.status;
      earlyCheckIn = b.earlyCheckIn;
      lateCheckOut = b.lateCheckOut;
      notes = b.notes;
      createdAt = b.createdAt;
      actualCheckIn = b.actualCheckIn;
      actualCheckOut = b.actualCheckOut;
    };
  };

  public func create(nextId : Nat, args : Types.CreateBookingArgs) : Types.Booking {
    {
      id = nextId;
      hotelId = args.hotelId;
      guestId = args.guestId;
      var roomId = args.roomId;
      var guestName = args.guestName;
      var guestPhone = args.guestPhone;
      var guestEmail = args.guestEmail;
      var checkIn = args.checkIn;
      var checkOut = args.checkOut;
      var numGuests = args.numGuests;
      var source = args.source;
      var status = args.status;
      var earlyCheckIn = args.earlyCheckIn;
      var lateCheckOut = args.lateCheckOut;
      var notes = args.notes;
      createdAt = Time.now();
      var actualCheckIn = null;
      var actualCheckOut = null;
    };
  };

  public func getAll(bookings : List.List<Types.Booking>) : [Types.BookingView] {
    bookings.map<Types.Booking, Types.BookingView>(toView).toArray();
  };

  public func getById(bookings : List.List<Types.Booking>, id : Common.EntityId) : ?Types.BookingView {
    switch (bookings.find(func(b : Types.Booking) : Bool { b.id == id })) {
      case (?b) ?toView(b);
      case null null;
    };
  };

  public func getByHotel(bookings : List.List<Types.Booking>, hotelId : Common.EntityId) : [Types.BookingView] {
    bookings.filter(func(b : Types.Booking) : Bool { b.hotelId == hotelId })
      .map<Types.Booking, Types.BookingView>(toView).toArray();
  };

  public func getByGuest(bookings : List.List<Types.Booking>, guestId : Common.EntityId) : [Types.BookingView] {
    bookings.filter(func(b : Types.Booking) : Bool { b.guestId == guestId })
      .map<Types.Booking, Types.BookingView>(toView).toArray();
  };

  public func update(bookings : List.List<Types.Booking>, args : Types.UpdateBookingArgs) : Bool {
    switch (bookings.find(func(b : Types.Booking) : Bool { b.id == args.id })) {
      case null false;
      case (?b) {
        b.roomId := args.roomId;
        b.guestName := args.guestName;
        b.guestPhone := args.guestPhone;
        b.guestEmail := args.guestEmail;
        b.checkIn := args.checkIn;
        b.checkOut := args.checkOut;
        b.numGuests := args.numGuests;
        b.source := args.source;
        b.status := args.status;
        b.earlyCheckIn := args.earlyCheckIn;
        b.lateCheckOut := args.lateCheckOut;
        b.notes := args.notes;
        b.actualCheckIn := args.actualCheckIn;
        b.actualCheckOut := args.actualCheckOut;
        true;
      };
    };
  };

  public func updateStatus(bookings : List.List<Types.Booking>, id : Common.EntityId, status : Common.BookingStatus) : Bool {
    switch (bookings.find(func(b : Types.Booking) : Bool { b.id == id })) {
      case null false;
      case (?b) { b.status := status; true };
    };
  };

  public func checkIn(bookings : List.List<Types.Booking>, id : Common.EntityId) : Bool {
    switch (bookings.find(func(b : Types.Booking) : Bool { b.id == id })) {
      case null false;
      case (?b) {
        b.status := #CheckedIn;
        b.actualCheckIn := ?Time.now();
        true;
      };
    };
  };

  public func checkOut(bookings : List.List<Types.Booking>, id : Common.EntityId) : Bool {
    switch (bookings.find(func(b : Types.Booking) : Bool { b.id == id })) {
      case null false;
      case (?b) {
        b.status := #CheckedOut;
        b.actualCheckOut := ?Time.now();
        true;
      };
    };
  };

  public func delete(bookings : List.List<Types.Booking>, id : Common.EntityId) : Bool {
    let before = bookings.size();
    let kept = bookings.filter(func(b : Types.Booking) : Bool { b.id != id });
    bookings.clear();
    bookings.addAll(kept.values());
    bookings.size() < before;
  };
};

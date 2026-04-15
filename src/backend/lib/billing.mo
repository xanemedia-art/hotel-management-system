import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/billing";

module {
  public func toView(f : Types.Folio) : Types.FolioView {
    {
      id = f.id;
      bookingId = f.bookingId;
      guestId = f.guestId;
      hotelId = f.hotelId;
      charges = f.charges;
      payments = f.payments;
      status = f.status;
    };
  };

  public func create(nextId : Nat, args : Types.CreateFolioArgs) : Types.Folio {
    {
      id = nextId;
      bookingId = args.bookingId;
      guestId = args.guestId;
      hotelId = args.hotelId;
      var charges = [];
      var payments = [];
      var status = #Open;
    };
  };

  public func getById(folios : List.List<Types.Folio>, id : Common.EntityId) : ?Types.FolioView {
    switch (folios.find(func(f : Types.Folio) : Bool { f.id == id })) {
      case (?f) ?toView(f);
      case null null;
    };
  };

  public func getByBooking(folios : List.List<Types.Folio>, bookingId : Common.EntityId) : ?Types.FolioView {
    switch (folios.find(func(f : Types.Folio) : Bool { f.bookingId == bookingId })) {
      case (?f) ?toView(f);
      case null null;
    };
  };

  public func getByHotel(folios : List.List<Types.Folio>, hotelId : Common.EntityId) : [Types.FolioView] {
    folios.filter(func(f : Types.Folio) : Bool { f.hotelId == hotelId })
      .map<Types.Folio, Types.FolioView>(toView).toArray();
  };

  public func addCharge(folios : List.List<Types.Folio>, chargeId : Nat, args : Types.AddChargeArgs) : Bool {
    switch (folios.find(func(f : Types.Folio) : Bool { f.id == args.folioId })) {
      case null false;
      case (?f) {
        let charge : Types.FolioCharge = {
          id = chargeId;
          description = args.description;
          amount = args.amount;
          category = args.category;
          date = Time.now();
        };
        f.charges := f.charges.concat([charge]);
        true;
      };
    };
  };

  public func addPayment(folios : List.List<Types.Folio>, paymentId : Nat, args : Types.AddPaymentArgs) : Bool {
    switch (folios.find(func(f : Types.Folio) : Bool { f.id == args.folioId })) {
      case null false;
      case (?p) {
        let payment : Types.Payment = {
          id = paymentId;
          amount = args.amount;
          method = args.method;
          date = Time.now();
          referenceId = args.referenceId;
        };
        p.payments := p.payments.concat([payment]);
        true;
      };
    };
  };

  public func settle(folios : List.List<Types.Folio>, id : Common.EntityId) : Bool {
    switch (folios.find(func(f : Types.Folio) : Bool { f.id == id })) {
      case null false;
      case (?f) { f.status := #Settled; true };
    };
  };
};

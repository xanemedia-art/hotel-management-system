import List "mo:core/List";
import BillingTypes "../types/billing";
import Common "../types/common";
import BillingLib "../lib/billing";

mixin (
  folios : List.List<BillingTypes.Folio>,
  idCounter : Common.Counter,
) {
  public query func getFolio(id : Common.EntityId) : async ?BillingTypes.FolioView {
    BillingLib.getById(folios, id);
  };

  public query func getFolioByBooking(bookingId : Common.EntityId) : async ?BillingTypes.FolioView {
    BillingLib.getByBooking(folios, bookingId);
  };

  public query func getFoliosByHotel(hotelId : Common.EntityId) : async [BillingTypes.FolioView] {
    BillingLib.getByHotel(folios, hotelId);
  };

  public func createFolio(args : BillingTypes.CreateFolioArgs) : async BillingTypes.FolioView {
    let folio = BillingLib.create(idCounter.value, args);
    idCounter.value += 1;
    folios.add(folio);
    BillingLib.toView(folio);
  };

  public func addFolioCharge(args : BillingTypes.AddChargeArgs) : async Bool {
    let chargeId = idCounter.value;
    idCounter.value += 1;
    BillingLib.addCharge(folios, chargeId, args);
  };

  public func addFolioPayment(args : BillingTypes.AddPaymentArgs) : async Bool {
    let paymentId = idCounter.value;
    idCounter.value += 1;
    BillingLib.addPayment(folios, paymentId, args);
  };

  public func settleFolio(id : Common.EntityId) : async Bool {
    BillingLib.settle(folios, id);
  };
};

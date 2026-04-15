import Common "common";

module {
  public type FolioCharge = {
    id : Common.EntityId;
    description : Text;
    amount : Float;
    category : Common.ChargeCategory;
    date : Common.Timestamp;
  };

  public type Payment = {
    id : Common.EntityId;
    amount : Float;
    method : Common.PaymentMethod;
    date : Common.Timestamp;
    referenceId : Text;
  };

  public type Folio = {
    id : Common.EntityId;
    bookingId : Common.EntityId;
    guestId : Common.EntityId;
    hotelId : Common.EntityId;
    var charges : [FolioCharge];
    var payments : [Payment];
    var status : Common.FolioStatus;
  };

  public type FolioView = {
    id : Common.EntityId;
    bookingId : Common.EntityId;
    guestId : Common.EntityId;
    hotelId : Common.EntityId;
    charges : [FolioCharge];
    payments : [Payment];
    status : Common.FolioStatus;
  };

  public type CreateFolioArgs = {
    bookingId : Common.EntityId;
    guestId : Common.EntityId;
    hotelId : Common.EntityId;
  };

  public type AddChargeArgs = {
    folioId : Common.EntityId;
    description : Text;
    amount : Float;
    category : Common.ChargeCategory;
  };

  public type AddPaymentArgs = {
    folioId : Common.EntityId;
    amount : Float;
    method : Common.PaymentMethod;
    referenceId : Text;
  };
};

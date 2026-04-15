import Common "common";

module {
  public type Guest = {
    id : Common.EntityId;
    var name : Text;
    var email : Text;
    var phone : Text;
    var address : Text;
    var country : Text;
    var tags : [Common.GuestTag];
    var loyaltyPoints : Nat;
    var notes : Text;
    var preferences : Text;
    createdAt : Common.Timestamp;
  };

  public type GuestView = {
    id : Common.EntityId;
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
    country : Text;
    tags : [Common.GuestTag];
    loyaltyPoints : Nat;
    notes : Text;
    preferences : Text;
    createdAt : Common.Timestamp;
  };

  public type CreateGuestArgs = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
    country : Text;
    tags : [Common.GuestTag];
    notes : Text;
    preferences : Text;
  };

  public type UpdateGuestArgs = {
    id : Common.EntityId;
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
    country : Text;
    tags : [Common.GuestTag];
    loyaltyPoints : Nat;
    notes : Text;
    preferences : Text;
  };
};

import Common "common";

module {
  public type ChannelConfig = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    var channel : Common.OTAChannel;
    var isActive : Bool;
    var baseRate : Float;
    var rateOverride : ?Float;
    var lastSync : ?Common.Timestamp;
    var syncStatus : Common.SyncStatus;
    var overbookingProtection : Bool;
  };

  public type ChannelConfigView = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    channel : Common.OTAChannel;
    isActive : Bool;
    baseRate : Float;
    rateOverride : ?Float;
    lastSync : ?Common.Timestamp;
    syncStatus : Common.SyncStatus;
    overbookingProtection : Bool;
  };

  public type CreateChannelConfigArgs = {
    hotelId : Common.EntityId;
    channel : Common.OTAChannel;
    baseRate : Float;
    rateOverride : ?Float;
    overbookingProtection : Bool;
  };

  public type UpdateChannelConfigArgs = {
    id : Common.EntityId;
    isActive : Bool;
    baseRate : Float;
    rateOverride : ?Float;
    syncStatus : Common.SyncStatus;
    overbookingProtection : Bool;
  };
};

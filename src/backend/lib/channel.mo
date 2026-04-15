import List "mo:core/List";
import Common "../types/common";
import Types "../types/channel";

module {
  public func toView(c : Types.ChannelConfig) : Types.ChannelConfigView {
    {
      id = c.id;
      hotelId = c.hotelId;
      channel = c.channel;
      isActive = c.isActive;
      baseRate = c.baseRate;
      rateOverride = c.rateOverride;
      lastSync = c.lastSync;
      syncStatus = c.syncStatus;
      overbookingProtection = c.overbookingProtection;
    };
  };

  public func create(nextId : Nat, args : Types.CreateChannelConfigArgs) : Types.ChannelConfig {
    {
      id = nextId;
      hotelId = args.hotelId;
      var channel = args.channel;
      var isActive = true;
      var baseRate = args.baseRate;
      var rateOverride = args.rateOverride;
      var lastSync = null;
      var syncStatus = #OutOfSync;
      var overbookingProtection = args.overbookingProtection;
    };
  };

  public func getById(configs : List.List<Types.ChannelConfig>, id : Common.EntityId) : ?Types.ChannelConfigView {
    switch (configs.find(func(c : Types.ChannelConfig) : Bool { c.id == id })) {
      case (?c) ?toView(c);
      case null null;
    };
  };

  public func getByHotel(configs : List.List<Types.ChannelConfig>, hotelId : Common.EntityId) : [Types.ChannelConfigView] {
    configs.filter(func(c : Types.ChannelConfig) : Bool { c.hotelId == hotelId })
      .map<Types.ChannelConfig, Types.ChannelConfigView>(toView).toArray();
  };

  public func update(configs : List.List<Types.ChannelConfig>, args : Types.UpdateChannelConfigArgs) : Bool {
    switch (configs.find(func(c : Types.ChannelConfig) : Bool { c.id == args.id })) {
      case null false;
      case (?c) {
        c.isActive := args.isActive;
        c.baseRate := args.baseRate;
        c.rateOverride := args.rateOverride;
        c.syncStatus := args.syncStatus;
        c.overbookingProtection := args.overbookingProtection;
        true;
      };
    };
  };

  public func delete(configs : List.List<Types.ChannelConfig>, id : Common.EntityId) : Bool {
    let before = configs.size();
    let kept = configs.filter(func(c : Types.ChannelConfig) : Bool { c.id != id });
    configs.clear();
    configs.addAll(kept.values());
    configs.size() < before;
  };
};

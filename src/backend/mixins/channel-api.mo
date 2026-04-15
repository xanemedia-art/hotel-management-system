import List "mo:core/List";
import ChannelTypes "../types/channel";
import Common "../types/common";
import ChannelLib "../lib/channel";

mixin (
  channels : List.List<ChannelTypes.ChannelConfig>,
  idCounter : Common.Counter,
) {
  public query func getChannelConfigs() : async [ChannelTypes.ChannelConfigView] {
    channels.map<ChannelTypes.ChannelConfig, ChannelTypes.ChannelConfigView>(ChannelLib.toView).toArray();
  };

  public query func getChannelConfig(id : Common.EntityId) : async ?ChannelTypes.ChannelConfigView {
    ChannelLib.getById(channels, id);
  };

  public query func getChannelConfigsByHotel(hotelId : Common.EntityId) : async [ChannelTypes.ChannelConfigView] {
    ChannelLib.getByHotel(channels, hotelId);
  };

  public func createChannelConfig(args : ChannelTypes.CreateChannelConfigArgs) : async ChannelTypes.ChannelConfigView {
    let config = ChannelLib.create(idCounter.value, args);
    idCounter.value += 1;
    channels.add(config);
    ChannelLib.toView(config);
  };

  public func updateChannelConfig(args : ChannelTypes.UpdateChannelConfigArgs) : async Bool {
    ChannelLib.update(channels, args);
  };

  public func deleteChannelConfig(id : Common.EntityId) : async Bool {
    ChannelLib.delete(channels, id);
  };
};

import List "mo:core/List";
import HousekeepingTypes "../types/housekeeping";
import Common "../types/common";
import HousekeepingLib "../lib/housekeeping";

mixin (
  tasks : List.List<HousekeepingTypes.HousekeepingTask>,
  idCounter : Common.Counter,
) {
  public query func getHousekeepingTasks() : async [HousekeepingTypes.HousekeepingTaskView] {
    HousekeepingLib.getAll(tasks);
  };

  public query func getHousekeepingTask(id : Common.EntityId) : async ?HousekeepingTypes.HousekeepingTaskView {
    HousekeepingLib.getById(tasks, id);
  };

  public query func getHousekeepingTasksByHotel(hotelId : Common.EntityId) : async [HousekeepingTypes.HousekeepingTaskView] {
    HousekeepingLib.getByHotel(tasks, hotelId);
  };

  public func createHousekeepingTask(args : HousekeepingTypes.CreateHousekeepingTaskArgs) : async HousekeepingTypes.HousekeepingTaskView {
    let task = HousekeepingLib.create(idCounter.value, args);
    idCounter.value += 1;
    tasks.add(task);
    HousekeepingLib.toView(task);
  };

  public func updateHousekeepingTask(args : HousekeepingTypes.UpdateHousekeepingTaskArgs) : async Bool {
    HousekeepingLib.update(tasks, args);
  };

  public func updateHousekeepingTaskStatus(id : Common.EntityId, status : Common.TaskStatus) : async Bool {
    HousekeepingLib.updateStatus(tasks, id, status);
  };

  public func deleteHousekeepingTask(id : Common.EntityId) : async Bool {
    HousekeepingLib.delete(tasks, id);
  };
};

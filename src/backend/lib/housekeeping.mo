import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/housekeeping";

module {
  public func toView(t : Types.HousekeepingTask) : Types.HousekeepingTaskView {
    {
      id = t.id;
      hotelId = t.hotelId;
      roomId = t.roomId;
      assignedStaffId = t.assignedStaffId;
      status = t.status;
      priority = t.priority;
      createdAt = t.createdAt;
      completedAt = t.completedAt;
      notes = t.notes;
    };
  };

  public func create(nextId : Nat, args : Types.CreateHousekeepingTaskArgs) : Types.HousekeepingTask {
    {
      id = nextId;
      hotelId = args.hotelId;
      var roomId = args.roomId;
      var assignedStaffId = args.assignedStaffId;
      var status = #Pending;
      var priority = args.priority;
      createdAt = Time.now();
      var completedAt = null;
      var notes = args.notes;
    };
  };

  public func getAll(tasks : List.List<Types.HousekeepingTask>) : [Types.HousekeepingTaskView] {
    tasks.map<Types.HousekeepingTask, Types.HousekeepingTaskView>(toView).toArray();
  };

  public func getById(tasks : List.List<Types.HousekeepingTask>, id : Common.EntityId) : ?Types.HousekeepingTaskView {
    switch (tasks.find(func(t : Types.HousekeepingTask) : Bool { t.id == id })) {
      case (?t) ?toView(t);
      case null null;
    };
  };

  public func getByHotel(tasks : List.List<Types.HousekeepingTask>, hotelId : Common.EntityId) : [Types.HousekeepingTaskView] {
    tasks.filter(func(t : Types.HousekeepingTask) : Bool { t.hotelId == hotelId })
      .map<Types.HousekeepingTask, Types.HousekeepingTaskView>(toView).toArray();
  };

  public func update(tasks : List.List<Types.HousekeepingTask>, args : Types.UpdateHousekeepingTaskArgs) : Bool {
    switch (tasks.find(func(t : Types.HousekeepingTask) : Bool { t.id == args.id })) {
      case null false;
      case (?t) {
        t.roomId := args.roomId;
        t.assignedStaffId := args.assignedStaffId;
        t.status := args.status;
        t.priority := args.priority;
        t.notes := args.notes;
        t.completedAt := args.completedAt;
        true;
      };
    };
  };

  public func updateStatus(tasks : List.List<Types.HousekeepingTask>, id : Common.EntityId, status : Common.TaskStatus) : Bool {
    switch (tasks.find(func(t : Types.HousekeepingTask) : Bool { t.id == id })) {
      case null false;
      case (?t) {
        t.status := status;
        if (status == #Done) { t.completedAt := ?Time.now() };
        true;
      };
    };
  };

  public func delete(tasks : List.List<Types.HousekeepingTask>, id : Common.EntityId) : Bool {
    let before = tasks.size();
    let kept = tasks.filter(func(t : Types.HousekeepingTask) : Bool { t.id != id });
    tasks.clear();
    tasks.addAll(kept.values());
    tasks.size() < before;
  };
};

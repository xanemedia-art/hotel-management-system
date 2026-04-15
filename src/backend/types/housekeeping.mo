import Common "common";

module {
  public type HousekeepingTask = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    var roomId : Common.EntityId;
    var assignedStaffId : ?Common.EntityId;
    var status : Common.TaskStatus;
    var priority : Nat; // 1=low, 2=medium, 3=high
    createdAt : Common.Timestamp;
    var completedAt : ?Common.Timestamp;
    var notes : Text;
  };

  public type HousekeepingTaskView = {
    id : Common.EntityId;
    hotelId : Common.EntityId;
    roomId : Common.EntityId;
    assignedStaffId : ?Common.EntityId;
    status : Common.TaskStatus;
    priority : Nat;
    createdAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    notes : Text;
  };

  public type CreateHousekeepingTaskArgs = {
    hotelId : Common.EntityId;
    roomId : Common.EntityId;
    assignedStaffId : ?Common.EntityId;
    priority : Nat;
    notes : Text;
  };

  public type UpdateHousekeepingTaskArgs = {
    id : Common.EntityId;
    roomId : Common.EntityId;
    assignedStaffId : ?Common.EntityId;
    status : Common.TaskStatus;
    priority : Nat;
    notes : Text;
    completedAt : ?Common.Timestamp;
  };
};

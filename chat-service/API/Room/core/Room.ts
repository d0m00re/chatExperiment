import * as entity from "./Entity";

abstract class RoomAbs {
    abstract findAllRoom() : Promise<any>;
    abstract create(data: entity.IRoomCreateOne) : Promise<any>;
}

export default RoomAbs;
import * as entity from "./Entity";

abstract class RoomMessageAbs {
    abstract findAllRoomMsg(roomId : string) : Promise<any>;
    abstract findOneRoomMsg(roomId : string) : Promise<any>;
    abstract create(data: entity.ICreateMsg) : Promise<any>;
}

export default RoomMessageAbs;

import * as types from "./types";
import Room from "./Room";

// link socket io service inside for base socket io function
// so link ws

interface IUserJoinRoom {
  roomName : string;
}

interface IUserSendMsg {

}

interface IUserLeaveRoom {

}

interface IUserCreateRoom {

}

class GlobalRoomsManagement {
    private _roomList : Room[];
  
    constructor() {
      this._roomList = [];
    }

    // CORE FUNCTION
    userJoinRoom(data : IUserJoinRoom) : boolean {
      // join room
    
      // create room if unknown
      if (!this.isRoomExistWtName(data.roomName)) {
        this.createRoom(data.roomName);
      }
      return true;
    }

    userSendMsg(data : IUserSendMsg) : boolean {
      return false;
    }

    userLeaveRoom(data : IUserLeaveRoom) : boolean{
      return false;
    }

    userCreateRoom(data : IUserCreateRoom) : boolean{
      return false;
    }
    //

    // OTHER UTILITY FUNCTION
    getRoomIndex(uuid : string) {
      let room = this._roomList.findIndex(room => room.uuid === uuid);
      return room;
    }

    getRoomIndexWtName(name : string) {
        let roomIndex = this._roomList.findIndex(room => room.roomName === name);
        return roomIndex;
    }

    getRoomWtName(name : string) {
      let index = this.getRoomIndexWtName(name);

      if (index === -1) return undefined;
      return this._roomList[index];
    }
  
    room(uuid : string) {
      let room = this._roomList.find(room => room.uuid === uuid);
      return room;
    }
  
    createRoom(name : string) {
      let room = new Room(name);
  
      this._roomList.push(room);
    }

    isRoomExistWtUuid(uuid : string) {
        return this.getRoomIndex(uuid) !== -1;
    }

    isRoomExistWtName(name : string) {
        return this.getRoomIndexWtName(name) !== -1;
    }
  
    deleteRoom(uuid : string) {
      let index = this.getRoomIndex(uuid);
    
      if (index === -1) return false;
      this._roomList = this._roomList.filter((e, i) => i !== index);
      return true;
    }

    addMsgToRoom(roomName : string, msg : string, username : string) {
        let indexRoom = this.getRoomIndexWtName(roomName);
        this._roomList[indexRoom].pushMessage({
            username : username,
            message : msg,
        });
    }

    getAllRoom() {
        return this._roomList.filter(e => e.roomName);
    }
  }

export default GlobalRoomsManagement;
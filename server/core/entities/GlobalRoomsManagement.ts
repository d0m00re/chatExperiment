
import * as types from "./types";
import Room from "./Room";

class GlobalRoomsManagement {
    private _roomList : Room[];
  
    constructor() {
      this._roomList = [];
    }
  
    getRoomIndex(uuid : string) {
      let room = this._roomList.findIndex(room => room.uuid === uuid);
      return room;
    }

    getRoomIndexWtName(name : string) {
        let room = this._roomList.findIndex(room => room.roomName === name);
      return room;
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
        console.log("Add msg to room")
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
import * as types from "./types";
import { v4 as uuidv4 } from 'uuid';

// i room function
class Room {
  roomName : string;
  uuid : string;
  messageList : types.IMessage[];

  constructor(roomName: string) {
    this.roomName = roomName;
    this.messageList = [];
    this.uuid = uuidv4()
  }

  pushMessage(msg : types.IMessageInput) {
    let message = {...msg, time : new Date(), uuid : uuidv4()}
    this.messageList.push(message)
  }
}

export default Room;
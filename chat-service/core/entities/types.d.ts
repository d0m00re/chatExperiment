import {IMessage, IRoom, TAction} from "@lib/sharedTypes/chatRoom.d";

export interface IMsg {
    msg : string;
    typeObj : TAction;
    username : string;
    roomName : string;
}

export interface IMessageInput {
    username : string;
    message : string;
}
  
export {
    IMessage,
    IRoom,
    TAction
}
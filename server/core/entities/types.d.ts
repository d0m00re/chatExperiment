export type TAction = 'msg' | 'join' | 'leave';

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
  
  
export interface IMessage {
    uuid : string;
    username : string;
    message : string;
    time : Date;
}
  
  // i message function
  
export interface IRoom {
    roomName : string;
    messageList : IMessage[]
}
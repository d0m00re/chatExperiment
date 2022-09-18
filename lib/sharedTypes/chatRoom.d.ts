type TAction = 'msg' | 'file' | 'audio' | 'video' | 'join' | 'leave';

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

export {
    TAction,
    IMessage,
    IRoom
}
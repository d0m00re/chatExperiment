export type TAction = 'msg' | 'file' | 'audio' | 'video' | 'join' | 'leave' | 'roomHistory';

export interface IGetOutputRoomElem {
    roomName: string,
    uuid: string,
    messageList: any[] // todo rework
}

export interface IMsgElem {
    id: string;
    objData: string;
    typeObj: TAction;
}
//

export interface Props {
    url: string;
}

export interface ITmpElem {
    message : string;
    time : string;
    username : string;
    uuid : string;
}

export interface ITmpMsgListReceive {
    action : string;
    messageList : ITmpElem[];
}

/*
SR : socket receive
*/
export interface I_SR_CreateRoom {
    id : string;
    roomname : string;
    owner : string;
}
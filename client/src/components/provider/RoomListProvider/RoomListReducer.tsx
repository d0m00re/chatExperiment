import { v4 as uuidv4 } from 'uuid';
//import * as sharedTypes from "@lib/sharedTypes/chatRoom";

export interface IMessage {
    uuid : string;
    username : string;
    message : string;
    time : Date;
}

export interface IMessageAdd extends IMessage {
    roomName ?: string;
}
  
  // i message function
  
export interface IRoom {
    roomName : string;
    messageList : IMessage[]
}

const makeEmptyIRoom = (roomName : string) : IRoom => {
    return ({
        roomName : roomName,
        messageList : []
    });
}

type TActionType =  'HELLO_WOLRD' |
                    'ADD_ROOM' |
                    'SET_ROOM_SELECT' |
                    'ADD_MSG' |
                    'SET_ROOM_LIST' |
                    'ADD_MSG_TO_ROOM' | 
                    'ADD_ONE_MSG_TO_ROOM';

// action

export interface IHelloWorld {};
export interface IAddRoom {roomName : string};
export interface IAddMessageToRoom {props : IMessage};

export interface ISetRoomSelect {roomId : number}
export interface IAddMsg {msg : string}


export interface ISetRoomList {rooms : IRoom[]}
//export interface ISetRoomList {room : IRoom}
/*
action	"msg"
msg	"gghjhjhj"
typeObj	"msg"
username	"jack lapiquette"
roomName	"random"
*/
interface IAddOneMsgToRoom {
    username : string;
    msg : string;
    roomName : string;
}

export interface IAddOneToRoom {room : IAddOneMsgToRoom};

export enum E_ACTION {
    HELLO_WOLRD = "HELLO_WORLD",
    ADD_ROOM = "ADD_ROOM",
    SET_ROOM_SELECT = "SET_ROOM_SELECT",
    ADD_MSG = "ADD_MSG",
    SET_ROOM_LIST = "SET_ROOM_LIST",
    ADD_MSG_TO_ROOM = "ADD_MSG_TO_ROOM",
    ADD_ONE_MSG_TO_ROOM = "ADD_ONE_MSG_TO_ROOM"
}

export type IActionReducer =
    {type : E_ACTION.HELLO_WOLRD, payload : null}
    | {type : E_ACTION.ADD_ROOM, payload : IAddRoom}
    | {type : E_ACTION.SET_ROOM_SELECT, payload : ISetRoomSelect}
    | {type : E_ACTION.ADD_MSG, payload : IAddMsg}
    | {type : E_ACTION.SET_ROOM_LIST, payload : ISetRoomList}
    | {type : E_ACTION.ADD_MSG_TO_ROOM, payload : IMessageAdd}
    | {type : E_ACTION.ADD_ONE_MSG_TO_ROOM, payload : IAddOneMsgToRoom}

    //ADD_MSG_LIST_TO_ROOM
export const recordActionRoomList: Record<TActionType, string> = {
    HELLO_WOLRD : "HELLO_WORLD",
    ADD_ROOM: "ADD_ROOM",
    ADD_MSG_TO_ROOM: "ADD_MSG_TO_ROOM",
    SET_ROOM_SELECT: "SET_ROOM_SELECT",
    SET_ROOM_LIST: "SET_ROOM_LIST",
    ADD_MSG: "ADD_MSG",
    ADD_ONE_MSG_TO_ROOM : "ADD_ONE_MSG_TO_ROOM"
}

export interface IState {
    roomList : IRoom[];//string[];
    roomSelect : number;
}

export interface IStateWtDispatch extends IState{
    dispatch ?: React.Dispatch<IActionReducer>;
}

export const makeEmptyRoom = () : IState => ({
    roomList : [],//[makeEmptyIRoom("general"), makeEmptyIRoom("cat"), makeEmptyIRoom("chirac")],
    roomSelect : -1
});

export const roomListReducer = (state : IState, action : IActionReducer) : IState => {
    console.log("=== ACTION ===")
    console.log(action)
    switch (action.type) {
        case E_ACTION.HELLO_WOLRD: {
            console.log("Hello world");
            return state;
        }

        case E_ACTION.ADD_ROOM: {
            console.log("* reducer : ADD_ROOM")
            return {
                ...state,
                roomList : [...state.roomList, makeEmptyIRoom(action.payload.roomName)]
            }
        }
        case E_ACTION.SET_ROOM_SELECT: {
            console.log("* reducer : SET_ROOM_SELECT")
            return {
                ...state,
                roomSelect : action.payload.roomId
            }
        }

        case E_ACTION.SET_ROOM_LIST: {
            console.log("* reducer : SET_ROOM_LIST : ")

            return {
                ...state,
                roomList : action.payload.rooms
            }
        }

        // use onyl for one message/
        case E_ACTION.ADD_MSG_TO_ROOM: {
            console.log("* reducer : ADD_MSG_TO_ROOM : ")
 
            let roomIndex = state.roomList.findIndex(e => e.roomName === action.payload.roomName)
            
            if (roomIndex === -1) {return state;}
            delete action.payload.roomName;

            
            let newState = {...state};
            console.log("-> init size msg : ", newState.roomList[roomIndex].messageList.length)
            newState.roomList[roomIndex] = {...newState.roomList[roomIndex],
                                messageList : [
                                    ...newState.roomList[roomIndex].messageList,
                                    //@ts-ignore - todo rework protocol
                                    {...action.payload, message : action.payload?.msg ?? action.payload?.message}]};
            console.log("-> after size msg : ", newState.roomList[roomIndex].messageList.length)

            return (newState);
        }

        /*
        **  action	"msg"
        **  msg	"gghjhjhj"
        **  typeObj	"msg"
        **  username	"jack lapiquette"
        **  roomName	"random"
        */
        case E_ACTION.ADD_ONE_MSG_TO_ROOM: {
            console.log("ADD_ONE_MSG_TO_ROOM : ")
           // return state;
            let roomIndex = state.roomList.findIndex(e => e.roomName === action.payload.roomName)
            
           // if (roomIndex === -1) {return state;}
           // delete action.payload.roomName;
            
            let newState = {...state};
            console.log("-> init size msg : ", newState.roomList[roomIndex].messageList.length)

            newState.roomList[roomIndex] =
                {
                    ...newState.roomList[roomIndex],
                    messageList : [
                        ...newState.roomList[roomIndex].messageList,
                        {
                            uuid : "xxx",
                            username : action.payload.username,
                            message : action.payload.msg,
                            time : new Date()
                        }
                    ]
                };
                console.log("-> final size msg : ", newState.roomList[roomIndex].messageList.length)

            return (newState);
        }

        default:
            return state;
    }
}
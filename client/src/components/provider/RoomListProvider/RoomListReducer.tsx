import { v4 as uuidv4 } from 'uuid';

type TActionType = 'ADD_ROOM' | 'SET_ROOM_SELECT' | 'ADD_MSG';

// action
export interface IAddRoom {roomName : string};
export interface ISetRoomSelect {roomId : number}
export interface IAddMsg {msg : string}

export enum E_ACTION {
    ADD_ROOM = "ADD_ROOM",
    SET_ROOM_SELECT = "SET_ROOM_SELECT",
    ADD_MSG = "ADD_MSG"
}

export type IActionReducer = 
    {type : E_ACTION.ADD_ROOM, payload : IAddRoom}
    | {type : E_ACTION.SET_ROOM_SELECT, payload : ISetRoomSelect}
    | {type : E_ACTION.ADD_MSG, payload : IAddMsg}

/*
interface IAction {
    type : TActionType;
    payload : any;
} 
*/
/*
export const ActionRoomList = {
    ADD_ROOM: "ADD_ROOM",
    SET_ROOM_SELECT: "SET_ROOM_SELECT",
    ADD_MSG: "ADD_MSG"
}
*/
export const recordActionRoomList: Record<TActionType, string> = {
    ADD_ROOM: "ADD_ROOM",
    SET_ROOM_SELECT: "SET_ROOM_SELECT",
    ADD_MSG: "ADD_MSG"
}

export interface IState {
    roomList : string[];
    roomSelect : number;
}

export interface IStateWtDispatch extends IState{
    dispatch ?: React.Dispatch<IActionReducer>;
}

export const makeEmptyRoom = () : IState => ({
    roomList : ["coucou", 'john', 'jack'],
    roomSelect : 1
});

export const roomListReducer = (state : IState, action : IActionReducer) : IState => {
    switch (action.type) {
        case E_ACTION.ADD_ROOM: {
            return {
                ...state,
                roomList : [...state.roomList, action.payload.roomName]
            }
        }
        case E_ACTION.SET_ROOM_SELECT: {
            console.log("SET ROOM SELECT : ", {
                ...state,
                roomSelect : action.payload.roomId
            })
            return {
                ...state,
                roomSelect : action.payload.roomId
            }
        }
        default:
            return state;
    }
}
import { useState, useContext, createContext, useReducer } from 'react'

import { roomListReducer, makeEmptyRoom, IStateWtDispatch } from './RoomListReducer';

export const RoomListContext = createContext<IStateWtDispatch>({
  //roomName : "room1"
    roomList : [],
    roomSelect : -1,
  //  dispatch : null
});

function RoomListProvider(props : any) {
  const [roomList, dispatch] = useReducer(roomListReducer, makeEmptyRoom())
    
    return (
        <RoomListContext.Provider value={{...roomList, dispatch }}>
            {props.children}
        </RoomListContext.Provider>
    )
}

export default RoomListProvider;
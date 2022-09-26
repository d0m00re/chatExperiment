import { useState, useContext, createContext, useReducer } from 'react'

import { roomListReducer, makeEmptyRoom, IStateWtDispatch } from './RoomListReducer';

export const RoomListContext = createContext<IStateWtDispatch>({
    roomList : [],
    roomSelect : -1,
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
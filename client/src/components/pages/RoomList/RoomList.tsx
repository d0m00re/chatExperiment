import React, { ReactElement, useContext, useEffect,  useState, useRef } from 'react'
import ChannelChatV2 from "./../../random/ChannelChatV2";
import NavBar from "./../../templates/NavBar";

import RoomListProvider, { RoomListContext } from "./../../provider/RoomListProvider/RoomListProvider";
import { E_ACTION } from "./../../provider/RoomListProvider/RoomListReducer";
import useEffectOnce from "./../../hooks/useEffectOnce";

function MainRoomList() {
    const {
        roomList,
        roomSelect,
        dispatch,
    } = useContext(RoomListContext)

    /*
    ** populate rooms
    */
    const populate = () => {
        console.log('populate')
        if (!dispatch) return;
        dispatch({
            type: E_ACTION.ADD_ROOM,
            payload: { roomName: 'Ripper' }
        });
    }

    useEffectOnce(() => {
            populate();
    });

    return (
        <div className="flexRow">
            <p style={{ color: "red" }}> room select : {roomSelect}</p>
            <p style={{ color: "red" }}> {dispatch ? "exist" : "dont"}</p>

            <NavBar
                selectID={roomSelect}
                setSelectID={(id: number) => dispatch && dispatch({
                    type: E_ACTION.SET_ROOM_SELECT,
                    payload: { roomId: id }
                })}
                nameList={roomList.map(e => e.roomName)} />
            <ChannelChatV2 />
        </div>
    )
}

function RoomList(): ReactElement {
    return (
        <RoomListProvider>
            <MainRoomList />
        </RoomListProvider>

    )
}

export default RoomList

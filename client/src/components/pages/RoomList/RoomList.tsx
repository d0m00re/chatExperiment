import React, { ReactElement, useContext } from 'react'
import ChannelChatV2 from "./../../random/ChannelChatV2";
import NavBar from "./../../templates/NavBar";

import RoomListProvider, {RoomListContext} from "./../../provider/RoomListProvider/RoomListProvider";
import {E_ACTION} from "./../../provider/RoomListProvider/RoomListReducer";
interface Props {
    
}

function MainRoomList() {
    const {
        roomList,
        roomSelect,
        dispatch,
    } = useContext(RoomListContext)
    return (
        <div className="flexRow">
            <p style={{color : "red"}}> room select : {roomSelect}</p>
            <p style={{color : "red"}}> {dispatch ? "exixt" : "dont"}</p>

            <NavBar
                selectID= {roomSelect}
                setSelectID= {(id : number) => dispatch && dispatch({
                    type : E_ACTION.SET_ROOM_SELECT,
                    payload : {roomId : id}
                })}
                nameList= {roomList} />
          <ChannelChatV2 />
        </div>
    )
}

function RoomList({}: Props): ReactElement {
    return (
        <RoomListProvider>
            <MainRoomList />
        </RoomListProvider>

    )
}

export default RoomList

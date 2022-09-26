import { ReactElement, useContext } from 'react'
import ChannelChatV3 from "./../../random/ChannelChatV3";
import NavBar from "./../../templates/NavBar";
 
import RoomListProvider, { RoomListContext } from "./../../provider/RoomListProvider/RoomListProvider";
import { E_ACTION } from "./../../provider/RoomListProvider/RoomListReducer";

function MainRoomList() {
    const {
        roomList,
        roomSelect,
        dispatch,
    } = useContext(RoomListContext)
    return (
        <main>
            <section>
                <p style={{ color: "red" }}> room select : {roomSelect}</p>
            </section>
            <section className="flexRow">
            <button onClick={() => {dispatch({
                type : E_ACTION.HELLO_WOLRD, payload : null
            })}}>hello world</button>
            <NavBar
                selectID={roomSelect}
                //  select room
                setSelectID={(id: number) => dispatch && dispatch({
                    type: E_ACTION.SET_ROOM_SELECT,
                    payload: { roomId: id }
                })}
                nameList={roomList.map(e => e.roomName)} />
            <ChannelChatV3 />
        </section>
        </main>
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

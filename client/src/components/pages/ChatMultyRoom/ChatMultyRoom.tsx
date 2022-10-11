import { ReactElement, useContext } from 'react'
import ChannelChatV3 from "../../random/ChannelChatV3";
import NavBar from "../../templates/NavBar";
 
import { RoomListContext } from "../../provider/RoomListProvider/RoomListProvider";
import { E_ACTION } from "../../provider/RoomListProvider/RoomListReducer";

import CreateRoom from './CreateRoom/CreateRoom';

import useChatRoomSocket from "./../../hooks/chatRoom/useChatRoomSocket";

interface IMainRoomList {
    socket : WebSocket;
    setMsgList : any;
    userInfo : any;
    msgList : any;
    info : any;
    setUserInfo : any;
}

function RoomChannel(props : IMainRoomList) {
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
                // join room : 
                
                //  select room
                setSelectID={(id: number) => dispatch && dispatch({
                    type: E_ACTION.SET_ROOM_SELECT,
                    payload: { roomId: id }
                })}
                nameList={roomList.map(e => e.roomName)} />
            <ChannelChatV3
                    setMsgList = {props.setMsgList}
                    socket = {props.socket}
                    userInfo = {props.userInfo}
                    roomList = {roomList}
                    roomSelect = {roomSelect}
                    msgList = {props.msgList}
                    info = {props.info}
                    setUserInfo = {props.setUserInfo}
            />
        </section>
        </main>
    )
}

function ChatMultyRoom(): ReactElement {
    const {socket,
        setMsgList,
        userInfo,
        msgList,
        setUserInfo,
        info,
        createARoom} = useChatRoomSocket({url : 'http://localhost:9002'});   

    return (
        <>
            <CreateRoom createARoom={createARoom}/>
            <RoomChannel 
                socket={socket}
                setMsgList={setMsgList}

                userInfo={userInfo}
                msgList={msgList}
                info={info}
                setUserInfo={setUserInfo}
            />
        </>
    )
}

export default ChatMultyRoom;

import React, { useEffect, useContext, useState } from 'react'
import useEffectOnce from './../../hooks/useEffectOnce';
import { RoomListContext } from "./../../provider/RoomListProvider/RoomListProvider";
import {IActionReducer, E_ACTION} from './../../provider/RoomListProvider/RoomListReducer';
import ChatNetwork, {C_URL_WEBSOCKET} from './../../../NetworkAdapter/Chat.network';
import * as types from './useChatRoomSocket.d';
import io from "socket.io-client";

interface IEvent {
    typeObj : 'create-room' | 'room-msg' | 'room-list' | 'room-history',
    data : any;
}

interface IEventCreateRoom {
    owner : string | null;
    roomName : string;
    users : string[]
}

function useChatRoomSocket(props: types.Props) {
    const [socket, setSocket] = useState<any>();
    const [info, setInfo] = useState({ online: false });
    const [userInfo, setUserInfo] = useState(
        {
            username: 'jack lapiquette',
            roomName: 'room1'
        });

    const [msgList, setMsgList] = useState<types.IMsgElem[]>([])
    const { roomList, roomSelect, dispatch } = useContext(RoomListContext)

    // init- populate
    useEffectOnce(() => {
        let token = localStorage.getItem('token', )

        console.log("useChatRoomSocket :  useEffectOnce : ", token)
        // @ts-ignore
        const _socket = io(props.url,
                        {
                            extraHeaders: {
                                "x-access-token" : token
                            }
                        }
                );//, "socket token auth");
        setSocket(_socket);

        _socket.on('connect', () => {
            console.log("user is connected")
        })

        _socket.on('event', (msg : IEvent) => {
            console.log("Msg : ")
            console.log(msg)
            switch(msg.typeObj) {
                case 'create-room':
                    let createRoom : IEventCreateRoom = msg.data;
                    console.log("create room : ", createRoom)
                break;
                case 'room-msg':
                    console.log("msg")
                break;
                case 'room-history':
                    console.log('room history')
                    console.log(msg)
                break;
                case 'room-list':
                    console.log("room-list")
                    console.log(msg)
                break;
                default:

                break; 
            }
        })

        getRoomList(dispatch);

        // socket operation
        /*
        _socket.onopen = () => {
            // now we are connected
            getRoomList(dispatch)

            setInfo(old => ({ online: true }))

            _socket.onclose = () => {
                // now we are connected
                console.log("socket.onclose")
                setInfo(old => ({ online: true }))
            };

            _socket.onmessage = (message) => {
                console.log("socket.onmessage")
                let msg = message.data;

                msg = JSON.parse(msg);

                switch (msg.action) {
                
                    case 'roomHistory': {
                        console.log("\tuseChatSocket : roomHistory")
                        let tmpRemoveThisSheetLater : types.ITmpMsgListReceive = msg;

                        //let parseData: IMsgElem[] = msgList.messageList.map(elem => ({ typeObj: 'room-msg', id: elem.uuid, objData: elem.message }))
                        // j ai pas eu derreur car not ppass by action function
                     //   if (dispatch)
                     //      dispatch({type : E_ACTION.ADD_MSG_TO_ROOM, payload : msg.messageList});
                        break;
                    }
                    case 'room-msg': {
                        console.log("useChatSocket : msg: ")                        
                        const payload = {
                            msg : msg.msg,
                            username : msg.username,
                            roomName : msg.roomName
                        }
                         if (!!dispatch)
                             dispatch({type : E_ACTION.ADD_ONE_MSG_TO_ROOM, payload : payload});
                         break;
                    }
                }
            }
        };
        */
    })

    // update room message
    const getHistoryRoom = (roomName: string) => {
        console.log("History room : ", roomName);
        return ChatNetwork.getHistoryRoom(roomName);
    }

    const getRoomList = (dispatch : React.Dispatch<IActionReducer> | undefined) => {
        ChatNetwork.getRoomList()
        .then((resp) => {
            let data : types.IGetOutputRoomElem[] = resp.data;
            console.log("dispatch : ", data)
            if (dispatch)
                dispatch({type : E_ACTION.SET_ROOM_LIST, payload : {rooms : data}})
        })
        .catch(err => {
            console.log("error request : ", err)
        })
    }

    const createARoom = (roomName : string) => {
        console.log("create a room")
        socket.emit("event", {
            typeObj : 'create-room',
            roomName
        })
    }

    // feature : join server socket room
    useEffect(() => {
        let room = roomList[roomSelect];

        if (room)
        {
            getHistoryRoom(room.roomName);
            socket &&
            socket.emit("event",
                        {typeObj : "room-join",
                        roomName : room.roomName,
                        roomId : room.uuid})
            /*
            socket.send(JSON.stringify({
                typeObj: 'join',
                roomName: room.roomName//'room1'
            }))
            */
        }
        else {
            console.error("room not found : " , roomSelect)
        }
    }, [roomSelect])

    return {
        setMsgList,
        socket,
        userInfo,
        msgList,
        setUserInfo,
        info,
        getHistoryRoom,
        roomList,
        roomSelect,
        createARoom,
        getRoomList
    };
}

export default useChatRoomSocket

import React, { ReactElement, useEffect, useContext, useState } from 'react'
import useEffectOnce from './../../hooks/useEffectOnce';
import RoomListProvider, { RoomListContext } from "./../../provider/RoomListProvider/RoomListProvider";
import {IActionReducer, E_ACTION} from './../../provider/RoomListProvider/RoomListReducer';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
//

type TAction = 'msg' | 'file' | 'audio' | 'video' | 'join' | 'leave' | 'roomHistory';

// room history data

interface IHistoryMsg {
    message: string;
    time: string;
    username: string;
    uuid: string;
}

interface IHistoryMsgElem {
    action: TAction;
    messageList: IHistoryMsg[]
}
//

interface IMsgElem {
    id: string;
    objData: string;
    typeObj: TAction;
}
//

interface Props {
    url: string;
}

interface IMakeMsgElem {
    objData: string;
    typeObj: TAction;
}

const makeMsgElem = (props: IMakeMsgElem): IMsgElem => {
    return {
        id: uuidv4(),
        objData: props.objData,
        typeObj: props.typeObj
    };
}

//'ws://localhost:9002'
function useChatRoomSocket(props: Props) {
    const [socket, setSocket] = useState<WebSocket>();
    const [info, setInfo] = useState({ online: false });
    const [userInfo, setUserInfo] = useState(
        {
            username: 'jack lapiquette',
            roomName: 'room1'
        });

    const [msgList, setMsgList] = useState<IMsgElem[]>([])
    const { roomList, roomSelect, dispatch } = useContext(RoomListContext)

    useEffectOnce(() => {
        const _socket = new WebSocket('ws://localhost:9002');
        setSocket(_socket);

        // socket operation
        _socket.onopen = () => {
            // now we are connected
            console.log("connection open")

            //
            let _roomList = getRoomList(dispatch)

            //socket.send('some text') // send some text to server
            setInfo(old => ({ online: true }))

            /*
            _socket.send(JSON.stringify({
                typeObj: 'join',
                roomName: 'room1'
            }))
            */

            _socket.onclose = () => {
                // now we are connected
                console.log("connection close")
                setInfo(old => ({ online: true }))
            };

            _socket.onmessage = (message) => {
                console.log("Message receive : ", message)
                let msg = message.data;

                msg = JSON.parse(msg);
                //roomHistory
                switch (msg.action) {
                    case 'roomHistory': {
                        console.log("useChatroomSocket roomHistory: ")
                        let msgList: IHistoryMsgElem = msg;//JSON.parse(msg);
                        let parseData: IMsgElem[] = msgList.messageList.map(elem => ({ typeObj: 'msg', id: elem.uuid, objData: elem.message }))
                        if (dispatch)
                            dispatch({type : E_ACTION.ADD_MSG_TO_ROOM, payload : msg});

                        setMsgList(old => ([
                            ...old,
                            ...parseData
                        ]))

                        break;
                    }
                    case 'msg': {
                        console.log("useChatroomSocket msg: ")
                         if (dispatch)
                            dispatch({type : E_ACTION.ADD_MSG_TO_ROOM, payload : msg});
                      //  setMsgList(old => ([
                      //      ...old,
                      //      makeMsgElem({ objData: msg.msg, typeObj: 'msg' })
                      //  ]))
                        break;
                    }
                }
            }

        };
    })

    // update room message
    const getHistoryRoom = (roomname: string) => {
        console.log("History room : ", roomname);
        axios.get(`http://localhost:9002/roomHistory?roomname=${roomname}`)
            .then(resp => {
                console.log("server response")
                console.log(resp)
            })
            .catch(err => {
                console.log("error request : ", err)
            })
    }

    const getRoomList = (dispatch : React.Dispatch<IActionReducer> | undefined) => {
        axios.get(`http://localhost:9002/roomList`)
            .then(resp => {
                console.log("roomlist : server resp")
                console.log(resp.data)
                console.log(typeof(resp.data))
                if (dispatch)
                    dispatch({type : E_ACTION.SET_ROOM_LIST, payload : {rooms : resp.data}})
            })
            .catch(err => {
                console.log("error request : ", err)
            })
    }

    useEffect(() => {
        let roomname = roomList[roomSelect];
        getHistoryRoom(roomname.roomName);
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
        roomSelect
    };
}

export default useChatRoomSocket

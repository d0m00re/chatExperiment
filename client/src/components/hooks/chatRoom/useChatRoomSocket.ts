import React, { useEffect, useContext, useState } from 'react'
import useEffectOnce from './../../hooks/useEffectOnce';
import { RoomListContext } from "./../../provider/RoomListProvider/RoomListProvider";
import {IActionReducer, E_ACTION} from './../../provider/RoomListProvider/RoomListReducer';
import ChatNetwork, {C_URL_WEBSOCKET} from './../../../NetworkAdapter/Chat.network';
type TAction = 'msg' | 'file' | 'audio' | 'video' | 'join' | 'leave' | 'roomHistory';

interface IGetOutputRoomElem {
    roomName: string,
    uuid: string,
    messageList: any[] // todo rework
}

interface IMsgElem {
    id: string;
    objData: string;
    typeObj: TAction;
}
//

interface Props {
    url: string;
}

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

    // init- populate
    useEffectOnce(() => {
        console.log("useChatRoomSocket :  useEffectOnce")
        const _socket = new WebSocket(C_URL_WEBSOCKET);
        setSocket(_socket);

        // socket operation
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

                //roomHistory
                interface ITmpElem {
                    message : string;
                    time : string;
                    username : string;
                    uuid : string;
                }
                interface ITmpMsgListReceive {
                    action : string;
                    messageList : ITmpElem[];
                }

                switch (msg.action) {
                
                    case 'roomHistory': {
                        console.log("\tuseChatSocket : roomHistory")
                        let tmpRemoveThisSheetLater : ITmpMsgListReceive = msg;

                        //let parseData: IMsgElem[] = msgList.messageList.map(elem => ({ typeObj: 'msg', id: elem.uuid, objData: elem.message }))
                        // j ai pas eu derreur car not ppass by action function
                     //   if (dispatch)
                     //      dispatch({type : E_ACTION.ADD_MSG_TO_ROOM, payload : msg.messageList});
                        break;
                    }
                    case 'msg': {
                        console.log("useChatSocket : msg: ")                        
                        const payload = {
                            msg : msg.msg,
                            username : msg.username,
                            roomName : msg.roomName
                        }
                         if (!!dispatch)
                         {
                             console.log("dispatch : ADD_ONE_MSG_TO_ROOM", payload)
                             console.log("pourquoi tu trigger deux fois l mupdate fdp")
                             // wtf call 2 times 
                             dispatch({type : E_ACTION.ADD_ONE_MSG_TO_ROOM, payload : payload});
                         }
                         break;
                    }
                }
            }

        };
    })

    // update room message
    const getHistoryRoom = (roomName: string) => {
        console.log("History room : ", roomName);
        return ChatNetwork.getHistoryRoom(roomName);
    }

    const getRoomList = (dispatch : React.Dispatch<IActionReducer> | undefined) => {
        ChatNetwork.getRoomList()
        .then((resp) => {
            let data : IGetOutputRoomElem[] = resp.data;
            console.log("dispatch : ", data)
            if (dispatch)
                dispatch({type : E_ACTION.SET_ROOM_LIST, payload : {rooms : data}})
        })
        .catch(err => {
            console.log("error request : ", err)
        })
    }

    useEffect(() => {
        let room = roomList[roomSelect];

        if (room)
        {
            getHistoryRoom(room.roomName);
            socket &&
            socket.send(JSON.stringify({
                typeObj: 'join',
                roomName: room.roomName//'room1'
            }))
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
        roomSelect
    };
}

export default useChatRoomSocket

import React, { ReactElement, useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import useChatRoomSocket from "./../../hooks/chatRoom/useChatRoomSocket";

//import {TAction} from "@lib/sharedTypes/chatRoom.d";
//const socket = new WebSocket('ws://localhost:9002');
//

interface Props { }

type TAction = 'msg' | 'file' | 'audio' | 'video' | 'join' | 'leave' | 'roomHistory';

interface IMsgElem {
    id: string;
    objData: string;
    typeObj: TAction;
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

function ChannelChatV3({ }: Props): ReactElement {
    const bottomRef = useRef<any>(null);
    const [msg, setMsg] = useState("");
    const {socket, setMsgList, userInfo, msgList, setUserInfo, info} = useChatRoomSocket({url : 'ws://localhost:9002'});

    const sendMsg = (e: any) => {
        e.preventDefault();
        console.log("send msg : ")
        setMsgList(old => ([...old, makeMsgElem({ objData: msg, typeObj: 'msg' })]));
        socket?.send(JSON.stringify({
            msg: msg,
            typeObj: 'msg',
            username: userInfo.username,
            roomName: userInfo.roomName
        }));
        console.log(socket)
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgList])

    return (
        <section className="flexColumn">
            {
                (info.online) ? <p>connected</p> : <p>unconnected</p>
            }
            <input
                type="text"
                value={userInfo.username}
                onChange={(e) => setUserInfo(old => ({ ...old, username: e.target.value }))}
            />
            <input
                type="text"
                value={userInfo.roomName}
                onChange={(e) => setUserInfo(old => ({ ...old, roomName: e.target.value }))}
            />
            <form>
                <section className="flexColumn cardChat overflowY breakAll">
                    {
                        msgList.map(e => <div className="w800">{e.objData}</div>)
                    }
                    <div ref={bottomRef} />
                </section>
                <input
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button onClick={sendMsg} type="submit">Send message test</button>
            </form>
        </section>
    )
}

export default ChannelChatV3;

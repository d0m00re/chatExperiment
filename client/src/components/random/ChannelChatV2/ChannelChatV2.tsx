import React, { ReactElement, useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
//import {TAction} from "@lib/sharedTypes/chatRoom.d";
const socket = new WebSocket('ws://localhost:9002');

interface Props { }

type TAction = 'msg' | 'file' | 'audio' | 'video' | 'join' | 'leave' | 'roomHistory';

// room history data

interface IHistoryMsg {
    message : string;
    time : string;
    username : string;
    uuid : string;
}

interface IHistoryMsgElem {
    action : TAction;
    messageList : IHistoryMsg[]
}
//

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

function MinimalChat({ }: Props): ReactElement {
    const bottomRef = useRef<any>(null);
    const [info, setInfo] = useState({ online: false });
    const [msg, setMsg] = useState('');
    const [userInfo, setUserInfo] = useState(
        {
            username: 'jack lapiquette',
            roomName: 'room1'
        });

    const [msgList, setMsgList] = useState<IMsgElem[]>([])

    useEffect(() => {
        socket.onopen = () => {
            // now we are connected
            console.log("connection open")

            //socket.send('some text') // send some text to server
            setInfo(old => ({ online: true }))

            socket.send(JSON.stringify({
                typeObj: 'join',
                roomName: 'room1'
            }))
        };

        socket.onclose = () => {
            // now we are connected
            console.log("connection close")
            setInfo(old => ({ online: true }))
        };

        socket.onmessage = (message) => {
            console.log("Message receive : ", message)
            let msg = message.data;

            msg = JSON.parse(msg);
            console.log("Data : ", msg)
            console.log(msg.action)
            //roomHistory
            switch (msg.action) {
                case 'roomHistory': {
                    let msgList : IHistoryMsgElem = msg;//JSON.parse(msg);
                    let parseData : IMsgElem[] = msgList.messageList.map(elem => ({typeObj : 'msg', id : elem.uuid, objData : elem.message}))
                    
                    console.log("INJECT HISTORY")
                    console.log([
                        ...parseData
                    ])

                    setMsgList(old => ([
                        ...old,
                        ...parseData
                    ]))
                    
                    break;
                }
                case 'msg': {
                    console.log("Msg : ", msg)
                    console.log(makeMsgElem({ objData: msg.msg, typeObj: 'msg' }));
                    console.log("----")
                    setMsgList(old => ([
                        ...old,
                        makeMsgElem({ objData: msg.msg, typeObj: 'msg' })
                    ]))
                    break;
                }
            }
        }
    }, []);

    const sendMsg = (e: any) => {
        e.preventDefault();
        console.log("send msg : ")
        setMsgList(old => ([...old, makeMsgElem({ objData: msg, typeObj: 'msg' })]));
        socket.send(JSON.stringify({
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
                <button onClick={sendMsg} type="submit">Send message</button>
            </form>
        </section>
    )
}

export default MinimalChat

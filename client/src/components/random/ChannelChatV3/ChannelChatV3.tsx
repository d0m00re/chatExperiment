import React, { ReactElement, useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

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

interface IChannelChatV3 {
    setMsgList : any;
    socket : any;
    userInfo : any;
    roomList : any;
    roomSelect : any;
    msgList : any;
    info : any;
    setUserInfo : any;
}

function ChannelChatV3(props : IChannelChatV3): ReactElement {
    const bottomRef = useRef<any>(null);
    const [msg, setMsg] = useState("");

    const sendMsg = (e: any) => {
        e.preventDefault();
        props.setMsgList(old => ([...old, makeMsgElem({ objData: msg, typeObj: 'msg' })]));
        props.socket?.send(JSON.stringify({
            msg: msg,
            typeObj: 'msg',
            username: props.userInfo.username,
            roomName: props.roomList[props.roomSelect].roomName//userInfo.roomName
        }));
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [props.msgList])


    return ( 
        <section className="flexColumn">
            {
                (props.info.online) ? <p>connected</p> : <p>unconnected</p>
            }
            <input
                type="text"
                value={props.userInfo.username}
                onChange={(e) => props.setUserInfo(old => ({ ...old, username: e.target.value }))}
            />
            <input
                type="text"
                value={props.userInfo.roomName}
                onChange={(e) => props.setUserInfo(old => ({ ...old, roomName: e.target.value }))}
            />
            <form>
                <section className="flexColumn cardChat overflowY breakAll">
                    {(props.roomList && props.roomSelect > -1 && props.roomList[props.roomSelect] && props.roomList.length > props.roomSelect) &&
                        props.roomList[props.roomSelect].messageList.map(e => <div className="w800">{e.username} : {e.message}</div>)
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

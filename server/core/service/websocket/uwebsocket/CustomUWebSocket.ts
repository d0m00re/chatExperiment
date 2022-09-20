import uws from 'uWebSockets.js';

export type UwsWebsocket = uws.WebSocket

interface ISendMsgToRoom {
    roomname : string;
    msg : string;
    isBinary : string;
}

interface IJoinRoom {
    roomname : string
}

interface ILeaveRoom {
    roomname : string
}

class CustomUWebSocket {
    private _client : UwsWebsocket;

    constructor(client : UwsWebsocket) {
        this._client = client;
    }

    get client() : UwsWebsocket {return this._client ?? null}
    set client(client : UwsWebsocket) {this._client = client}

    joinRoom(props : IJoinRoom) {
        this._client.subscribe(props.roomname);
    }

    sendMsgToRoom(props : ISendMsgToRoom) {
        this._client.publish(props.roomname, props.msg, false);
    }

    leaveRoom(props : ILeaveRoom) {
        this._client.unsubscribe(props.roomname);

    }
}
export default CustomUWebSocket;
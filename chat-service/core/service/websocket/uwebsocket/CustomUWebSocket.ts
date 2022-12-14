import uws from 'uWebSockets.js';

export type UwsWebsocket = uws.WebSocket

interface ISendMsgToRoom {
    roomName : string;
    msg : string;
    isBinary : string;
}

interface IJoinRoom {
    roomName : string
}

interface ILeaveRoom {
    roomName : string
}

class CustomUWebSocket {
    private _client : UwsWebsocket;

    constructor(client : UwsWebsocket) {
        this._client = client;
    }

    get client() : UwsWebsocket {return this._client ?? null}
    set client(client : UwsWebsocket) {this._client = client}

    joinRoom(props : IJoinRoom) {
        this._client.subscribe(props.roomName);
    }

    sendMsgToRoom(props : ISendMsgToRoom) {
        this._client.publish(props.roomName, props.msg, false);
    }

    leaveRoom(props : ILeaveRoom) {
        this._client.unsubscribe(props.roomName);

    }
}
export default CustomUWebSocket;
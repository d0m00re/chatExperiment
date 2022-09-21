import uws from 'uWebSockets.js';
import GlobalRoomsManagement from "./../../../entities/GlobalRoomsManagement";
import * as types from "./../../../entities/types";

// todo : first decoupling phase
// todo : let only socket function without logic

function arrayBufferToString(buffer: ArrayBuffer) {
    const b = Buffer.from(buffer);
    return b.toString();
  }

function arrayBufferToJSon(buffer: ArrayBuffer) {
    let str = arrayBufferToString(buffer);
    console.log(str)
    return (str)
  }

//
const socketOnMessage = (globalRoomManagement : GlobalRoomsManagement, ws : uws.WebSocket, message : ArrayBuffer) => {
    /* Ok is false if backpressure was built up, wait for drain */
    console.log("websocket - onMessage")
    console.log("message receive", message)
    console.log(arrayBufferToJSon(message))
    
    //console.log(message.toString())
    ///let ok = ws.send(message, isBinary);
    let data: types.IMsg = JSON.parse(arrayBufferToJSon(message));
    
    switch (data.typeObj) {
      case 'join':
        console.log('An user join : ' +data.roomName )
        globalRoomManagement.userJoinRoom(data);
        let dataReturn = globalRoomManagement.getRoomWtName(data.roomName)
        ws.subscribe(data.roomName);
        // send back socket data
        ws.send(JSON.stringify({action : "roomHistory", ...dataReturn}));
        break;
      case 'leave':
        console.log("leave : ", data.roomName)
        globalRoomManagement.userLeaveRoom({});
        ws.unsubscribe(data.roomName);
        break;
      case 'msg':
        globalRoomManagement.userSendMsg({});

        // send back msg
        console.log("msg : ", data.username, " -: ", data.roomName, ' -> data.msg', data.msg);
        //ws.send(JSON.stringify(data), false);
        // add msg to room
        globalRoomManagement.addMsgToRoom(data.roomName, data.msg, data.username);
        // send back to client with uuid
        ws.send(JSON.stringify({action : 'msg', ...data}), false);
        // send back to all other client who subscribe in this room
        ws.publish(data.roomName, JSON.stringify({action : 'msg', ...data}), false);
        break;
    }
}

const socketOnOpen = (globalRoomManagement : GlobalRoomsManagement, ws : uws.WebSocket) => {
    console.log('websocket - onOpen');
    return 1;
}

const socketOnDrain = (globalRoomManagement : GlobalRoomsManagement, ws : uws.WebSocket) => {
    console.log('websocket - onDrain');
    return 1;
}

const socketOnClose = (globalRoomManagement : GlobalRoomsManagement, ws : uws.WebSocket) => {
    console.log('websocket - onClose');
    return 1;
}

export {
    socketOnMessage,
    socketOnOpen,
    socketOnDrain,
    socketOnClose
}
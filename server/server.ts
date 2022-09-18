/* Non-SSL is simply App() */
import uws from 'uWebSockets.js';
import { v4 as uuidv4 } from 'uuid';
import GlobalRoomsManagement from "./core/entities/GlobalRoomsManagement";
import * as types from "./core/entities/types";

//

//const room = new Room("room1");
let globalRoomManagement = new GlobalRoomsManagement();

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
const socketOnMessage = (ws : uws.WebSocket, message : ArrayBuffer) => {
/* Ok is false if backpressure was built up, wait for drain */
console.log("message receive", message)
console.log(arrayBufferToJSon(message))

//console.log(message.toString())
///let ok = ws.send(message, isBinary);
let data: types.IMsg = JSON.parse(arrayBufferToJSon(message));

switch (data.typeObj) {
  case 'join':
    // join room
    console.log("join : ", data.roomName);

    // create room if unknown
    if (!globalRoomManagement.isRoomExistWtName(data.roomName)) {
      console.log("Room creation : ", data.roomName);
      globalRoomManagement.createRoom(data.roomName);
    }
    ws.subscribe(data.roomName);
    break;
  case 'leave':
    console.log("leave : ", data.roomName)
    ws.unsubscribe(data.roomName);
    break;
  case 'msg':
    // send back msg
    console.log("msg : ", data.username, " -: ", data.roomName, ' -> data.msg', data.msg);
    //ws.send(JSON.stringify(data), false);
    // add msg to room
    globalRoomManagement.addMsgToRoom(data.roomName, data.msg, data.username);

    ws.publish("room1", JSON.stringify(data), false);
    break;
}
}
//

console.log(uws)

uws
  .App()
  .get('/', (res: any, req: any) => {
    res.writeStatus('200 OK')
      .writeHeader('IsExample', 'Yes')
      .end('Hello there!');
  })
  .get('/roomList', (res: any, req: any) => {
    let getAllRoomList = globalRoomManagement.getAllRoom();

    res.writeStatus('200 OK')
      .writeHeader('IsExample', 'Yes')
      .end(JSON.stringify(getAllRoomList));
  })
  .ws('/*', {
    open: (ws) => {
      console.log('A WebSocket connected!');
    },
    message: (ws, message, isBinary) => {
      socketOnMessage(ws, message);
    },
    drain: (ws) => {
      console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
    },
    close: (ws, code, message) => {
      console.log('WebSocket closed');
    }
  }).get('/*', (res, req) => {

    /* It does Http as well */
    res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there! Pickle');

  }).listen(9002, (listenSocket) => {

    if (listenSocket) {
      console.log('Listening to port 9002');
    }

  });
/* Non-SSL is simply App() */
import uws from 'uWebSockets.js';
import { v4 as uuidv4 } from 'uuid';
import GlobalRoomsManagement from "./core/entities/GlobalRoomsManagement";
import * as types from "./core/entities/types";
import * as socketCore from "./core/service/websocket/uwebsocket";
//

//const room = new Room("room1");
let globalRoomManagement = new GlobalRoomsManagement();

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
      socketCore.socketOnOpen(globalRoomManagement, ws);
    },
    message: (ws, message, isBinary) => {
      socketCore.socketOnMessage(globalRoomManagement, ws, message);
    },
    drain: (ws) => {
      socketCore.socketOnDrain(globalRoomManagement, ws);
    },
    close: (ws, code, message) => {
      socketCore.socketOnClose(globalRoomManagement, ws);
    }
  }).get('/*', (res, req) => {

    /* It does Http as well */
    res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there! Pickle');

  }).listen(9002, (listenSocket) => {

    if (listenSocket) {
      console.log('Listening to port 9002');
    }

  });
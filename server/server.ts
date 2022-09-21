/* Non-SSL is simply App() */
import uws, {HttpResponse, HttpRequest} from 'uWebSockets.js';
import { v4 as uuidv4 } from 'uuid';
import GlobalRoomsManagement from "./core/entities/GlobalRoomsManagement";
import * as types from "./core/entities/types";
import * as socketCore from "./core/service/websocket/uwebsocket";
//

//const room = new Room("room1");
let globalRoomManagement = new GlobalRoomsManagement();
globalRoomManagement.createRoom("general")
globalRoomManagement.createRoom("random")
globalRoomManagement.createRoom("project")
globalRoomManagement.createRoom("cat picture")
globalRoomManagement.createRoom("tech")
globalRoomManagement.createRoom("react")
globalRoomManagement.createRoom("nodejs")
globalRoomManagement.createRoom("ux-ui")



//

function setCorsHeaders(response : any) {
  // You can change the below headers as they're just examples
  response.writeHeader("Access-Control-Allow-Origin", "*");
  response.writeHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.writeHeader("Access-Control-Allow-Headers", "origin, content-type, accept, x-requested-with");
  response.writeHeader("Access-Control-Max-Age", "3600");
}

console.log(uws)

uws
  .App()
  .get('/', (res: any, req: any) => {
    setCorsHeaders(res);
    res.writeStatus('200 OK')
      .writeHeader('IsExample', 'Yes')
      .end('Hello there!');
  })
  .get('/roomList', (res: any, req: any) => {
    setCorsHeaders(res);

    let getAllRoomList = globalRoomManagement.getAllRoom();

    res.writeStatus('200 OK')
      .writeHeader('IsExample', 'Yes')
      .end(JSON.stringify(getAllRoomList));
  })
  .get('/roomHistory', (res : HttpResponse, req : HttpRequest) => {
    setCorsHeaders(res);
    let roomname = req.getQuery('roomname');
    let room = globalRoomManagement.getRoomWtName(roomname);
    // if nothing found
    console.log("ROOM : ")
    console.log(room)
    if (roomname.length === 0 || !room) {
      return res.writeStatus('400')
      .writeHeader('IsExample', 'Yes')
      .end('toom history test');
    }
    //console.log(res.getQuery())

    // retrieve room history 
    // todo : last 20 messages pagination
    //let room = globalRoomManagement.getRoomWtName("");

    res.writeStatus('200 OK')
      .writeHeader('IsExample', 'Yes')
      .end(JSON.stringify(room));
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
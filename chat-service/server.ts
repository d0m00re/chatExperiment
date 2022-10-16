import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from 'dotenv';
import cors from 'cors';
import sendResponse from './expressUtils/sendResponse'

import RoomDb from './API/Room/db';
import RoomMessageDb from './API/RoomMessage/db';

import * as jwt from './core/service/jwt';

dotenv.config()
import * as moongoose from './config/database'
moongoose.connect()


/*
let globalRoomManagement = new GlobalRoomsManagement()
globalRoomManagement.createRoom("general")
globalRoomManagement.createRoom("random")
globalRoomManagement.createRoom("project")
globalRoomManagement.createRoom("cat picture")
globalRoomManagement.createRoom("tech")
globalRoomManagement.createRoom("react")
globalRoomManagement.createRoom("nodejs")
globalRoomManagement.createRoom("ux-ui")
*/
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {origin: "*"}});

interface IEvent {
  typeObj : 'create-room' | 'room-msg' | 'room-list' | 'room-history' | 'room-join' | 'room-send-msg';
  roomName : string;
  roomId ?: string;
  msg ?: string;
}

app.use(express.json())
app.use(cors())

app.get('/', (req : any, res : any) => {
  return sendResponse({res, status : 200, data : "Hello world"})

})

app.get('/roomList', async (req: any, res: any) => {
  console.log("/roomList")

  let getAllRoomList = await RoomDb.findAllRoom();//globalRoomManagement.getAllRoom()
  return sendResponse({res, status : 200, data : getAllRoomList})
})

app.get('/roomHistory', async (req : any, res : any) => {
  console.log("/roomQuery");
  
  console.log(req.query);

  let id = req.query.id;

  if (!id)
    return sendResponse({res, status : 404, data : "nothing"})

  try {
    let dataRoom = await RoomMessageDb.findOneRoomMsg(id);
    let dataMsgList = await RoomMessageDb.findAllRoomMsg(id);
    console.log(dataRoom)
    console.log(dataMsgList)
    return sendResponse({res, status : 200, data : {
      room : dataRoom,
      msgList : dataMsgList
    }})
  }
  catch(e) {
    return sendResponse({res, status : 404, data : "room not found"})

  }
})

io.on("connection",  (socket) => {
  let _token = socket.handshake.headers['x-access-token'];
  let token = '';
  if (typeof(_token) !== 'string') {
    console.log("user not log")
  }
  else
    token = _token;
  let getUserInfo = jwt.decodeToken(token);
  console.log("CONNECTION extra headers")
  console.log(getUserInfo)
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('event', async (event : IEvent) => {
    switch(event.typeObj) {
      case 'create-room':
        console.log("create room")
        let resp = await RoomDb.create({roomName : event.roomName, owner : getUserInfo?.user_id})
        if (resp) {
          console.log("success")
          console.log(resp)
          socket.emit('event', {typeObj : 'create-room', data : resp})
        }
        else {
          console.log("error")
          console.log(resp);
          socket.emit('event', {typeObj : 'error', msg : 'impossible to create a room, please contact us'})
        }
        
      break;
      case 'room-msg': // next goal
        console.log("msg")
        console.log(event)
      break;
      // receive msg
      case 'room-send-msg':
        console.log('receive msg : ')
        console.log(event)
        console.log("attach msg to room")
        console.log(getUserInfo)
        if (!getUserInfo?.user_id) return ;
        let data = {
          roomId : event.roomId ?? "",
          userId : getUserInfo?.user_id ?? "",
          msg : event.msg ?? "",
          email : getUserInfo.email ?? ""
        }
        await RoomMessageDb.create(data);

        // send msg to room :
        
        // go go go
      break;
      case 'room-list':
        console.log("msg")
        console.log(event)
      break;
      case 'room-history':
        console.log("room-history")
        console.log(event)

       // console.log(await roomDb.)
        //socket.emit('event', {type})
      break;
      case 'room-join':
        console.log("room-join : ");
        console.log(event)
        // add room auth check
        if (event.roomId) {
          console.log("* user joinroom : ", event.roomId)
          let data = await RoomMessageDb.findOneRoomMsg(event.roomId)
          socket.join(event.roomId);
          // send all room information
          socket.emit('event', {typeObj : 'room-history', ...data})
        }
      break;
      default :
        console.log("no event found")
        console.log(event)
      break;
    }
  });
});

httpServer.listen(9002);

/*


uws
  .App()
  .get('/', (res: any, req: any) => {
    setCorsHeaders(res);
    res.writeStatus('200 OK')
      .writeHeader('IsExample', 'Yes')
      .end('Hello there!');
  })
  .get('/roomList', (res: any, req: any) => {
    console.log("/roomList");

    setCorsHeaders(res);

    let getAllRoomList = globalRoomManagement.getAllRoom();

    res.writeStatus('200 OK')
      .writeHeader('IsExample', 'Yes')
      .end(JSON.stringify(getAllRoomList));
  })
  .get('/roomHistory', (res : HttpResponse, req : HttpRequest) => {
    console.log("/roomHistory");
    setCorsHeaders(res);
    
    let roomName = req.getQuery('roomName');
    let room = globalRoomManagement.getRoomWtName(roomName);
    // if nothing found
    if (roomName.length === 0 || !room) {
      return res.writeStatus('400')
      .writeHeader('IsExample', 'Yes')
      .end('toom history test');
    }

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

    res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there! Pickle');

  }).listen(9002, (listenSocket) => {

    if (listenSocket) {
      console.log('Listening to port 9002');
    }
  });
  */
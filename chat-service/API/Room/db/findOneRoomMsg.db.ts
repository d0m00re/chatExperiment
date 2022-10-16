import RoomMessageModel from './../Model/room.model';

/*
** de base on utilise 
{
    roomName : string;
    uuid : string; // _id?
    messageList
}
*/
// reencode interface for proposing generic interface
const findOneRoomMsg =  async (roomId : string) => {
    let roomData = await RoomMessageModel.findById(roomId);
    return roomData;
}
export default findOneRoomMsg;
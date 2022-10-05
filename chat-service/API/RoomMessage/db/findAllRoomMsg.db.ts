import RoomMessageModel from '../Model/roomMessage.model';

/*
** de base on utilise 
{
    roomName : string;
    uuid : string; // _id?
    messageList
}
*/
// reencode interface for proposing generic interface
const findAllRoomMsg =  async () => {
    let roomData = await RoomMessageModel.find();

    return roomData;
    /*
    let roomListEncode = roomData.map(elem => ({
        roomId : elem.roomId,
        uuid : elem._id,
        messageList : []
    }))
    */

   // return roomListEncode;
}
export default findAllRoomMsg;
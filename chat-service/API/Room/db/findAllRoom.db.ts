import RoomModel from './../Model/room.model';

/*
** de base on utilise 
{
    roomName : string;
    uuid : string; // _id?
    messageList
}
*/
// reencode interface for proposing generic interface
const findAllRoom =  async () => {
    let roomData = await RoomModel.find();

    let roomListEncode = roomData.map(elem => ({
        roomName : elem.roomName,
        uuid : elem._id,
        messageList : []
    }))

    return roomListEncode;
}
export default findAllRoom;
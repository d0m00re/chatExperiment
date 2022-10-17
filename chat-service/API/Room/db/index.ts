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
interface IRoomCreateOne {
    roomName : string;
    owner ?: string;
    users ?: string[];
}

class Room {
    findAllRoom =  async () => {
        let roomData = await RoomModel.find();
    
        let roomListEncode = roomData.map(elem => ({
            roomName : elem.roomName,
            uuid : elem._id,
            messageList : []
        }))
    
        return roomListEncode;
    }

    find =  async (roomId : string) => {
        let roomData = await RoomModel.findById(roomId);
        return roomData;
    }

    create =  (props : IRoomCreateOne) => {
        return RoomModel.create({
            roomName : props.roomName ?? null,
            owner : props.owner ?? null,
            users: props.users ?? [], // sanitize: convert email to lowercase
        });
    }
}

export default new Room();
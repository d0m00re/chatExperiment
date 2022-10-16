import RoomMessageAbs from './../core/AdapterInterface/RoomMessage';
import RoomMessageModel from '../Model/roomMessage.model';

interface ICreateMsg{
        roomId: string;
        userId: string;
        msg: string;
        email: string;
}

class IRoomMessage extends RoomMessageAbs{
    findAllRoomMsg =  async (roomId : string) => {
        let roomData = await RoomMessageModel.find({roomId});
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

    findOneRoomMsg =  async (roomId : string) => {
        let roomData = await RoomMessageModel.findById(roomId);
        return roomData;
    }

    create = async (data: ICreateMsg) => {
        return RoomMessageModel.create(data);
    }
}

export default new IRoomMessage();
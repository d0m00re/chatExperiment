import RoomDb from './../../../Room/db';
import RoomMessageDb from './../../../RoomMessage/db';

// todo : replace by allSttled
const getRoomData = async (uuid : string) => {
    try {
        let dataRoom = await RoomDb.find(uuid);
        let dataMsgList = await RoomMessageDb.findAllRoomMsg(uuid);
        return {
            room : dataRoom,
            msgList : dataMsgList
        }
    }
    catch(e) {
        return undefined;
    }
}

export default getRoomData;
import RoomModel from './../Model/room.model';

interface IRoomCreateOne {
    roomName : string;
    owner ?: string;
    users ?: string[];
}

const roomCreateOne =  (props : IRoomCreateOne) => {
    return RoomModel.create({
        roomName : props.roomName ?? null,
        owner : props.owner ?? null,
        users: props.users ?? [], // sanitize: convert email to lowercase
    });
}

export default roomCreateOne;
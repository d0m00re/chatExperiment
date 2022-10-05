import RoomMessageModel from '../Model/roomMessage.model';

interface IRoomMessageCreateOne {
    roomId : string;
    userId : string;
    msg : string;
}

const roomMessageCreateOne =  (props : IRoomMessageCreateOne) => {
    return RoomMessageModel.create({
        roomId : props.roomId ?? null,
        userId : props.userId ?? null,
        msg: props.msg ?? '' // sanitize: convert email to lowercase
    });
}

export default roomMessageCreateOne;
interface IRoomMessage {
    uuid : string;
    user : string;
    owner : string;
}

interface ICreateMsg{
    roomId: string;
    userId: string;
    msg: string;
    email: string;
}

export {
    IRoomMessage,
    ICreateMsg
}
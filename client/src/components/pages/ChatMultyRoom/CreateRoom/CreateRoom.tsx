import { useState } from 'react';
import ApiChat from './../../../../NetworkAdapter/Chat.network';

interface ICreateRoom {
    createARoom : (roomName: string) => void;
}

const CreateRoom = (props : ICreateRoom) => {
    const [roomname, setRoomname] = useState("");

    const updateRoomName = (e) => {
        setRoomname(e.target.value);
    }

    const onUpdateServer = (e) => {
        e.preventDefault();
        props.createARoom(roomname);

        /*
        console.log("on update server")
        setRoomname("");
        ApiChat.postCreateRoom({roomname})
        .then(resp => {
            console.log("Create Room : ");
            console.log(resp)
        })
        .catch(err => {
            console.log("Error create room")
            console.log(err);
        })
        */
    } 

    return (
        <section>
            <form onSubmit={onUpdateServer} className="flexColumn">
            <label>Room name :</label>
            <input
                type="text"
                name="roomname"
                value={roomname}
                onChange={updateRoomName} />
            <button>Create</button>
            </form>
        </section>
    )
}

export default CreateRoom;

import React, { ReactElement, useContext, useEffect,  useState, useRef } from 'react'
import ChannelChatV2 from "./../../random/ChannelChatV2";
import NavBar from "./../../templates/NavBar";

import RoomListProvider, { RoomListContext } from "./../../provider/RoomListProvider/RoomListProvider";
import { E_ACTION } from "./../../provider/RoomListProvider/RoomListReducer";

export const useEffectOnce = ( effect : any )=> {

    const destroyFunc = useRef<any>();
    const effectCalled = useRef(false);
    const renderAfterCalled = useRef(false);
    const [val, setVal] = useState(0);
  
    if (effectCalled.current) {
        renderAfterCalled.current = true;
    }
  
    useEffect( ()=> {
  
        // only execute the effect first time around
        if (!effectCalled.current) { 
          destroyFunc.current = effect();
          effectCalled.current = true;
        }
  
        // this forces one render after the effect is run
        setVal(val => val + 1);
  
        return ()=> {
          // if the comp didn't render since the useEffect was called,
          // we know it's the dummy React cycle
          if (!renderAfterCalled.current) { return; }
          if (destroyFunc.current) { destroyFunc.current(); }
        };
    }, []);
  };
  

interface Props {

}

function MainRoomList() {
    const {
        roomList,
        roomSelect,
        dispatch,
    } = useContext(RoomListContext)

    /*
    ** populate rooms
    */
    const populate = () => {
        console.log('populate')
        if (!dispatch) return;
        dispatch({
            type: E_ACTION.ADD_ROOM,
            payload: { roomName: 'Ripper' }
        });
    }

    useEffectOnce(() => {
            populate();
    });

    return (
        <div className="flexRow">
            <p style={{ color: "red" }}> room select : {roomSelect}</p>
            <p style={{ color: "red" }}> {dispatch ? "exist" : "dont"}</p>

            <NavBar
                selectID={roomSelect}
                setSelectID={(id: number) => dispatch && dispatch({
                    type: E_ACTION.SET_ROOM_SELECT,
                    payload: { roomId: id }
                })}
                nameList={roomList.map(e => e.roomName)} />
            <ChannelChatV2 />
        </div>
    )
}

function RoomList({ }: Props): ReactElement {
    return (
        <RoomListProvider>
            <MainRoomList />
        </RoomListProvider>

    )
}

export default RoomList

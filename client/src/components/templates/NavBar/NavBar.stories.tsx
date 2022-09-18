import React, {useState} from "react";
import NavBar from "./NavBar";

export const World = () => {
    const [id, setId] = useState(0);
    
    return <NavBar
        selectID = {id}
        setSelectID = {setId}
        nameList = {["room1", "room2", "room3"]}
    />
}
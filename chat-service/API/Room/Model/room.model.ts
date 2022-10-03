import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomName : { type : String, default : null},
    owner : {type : String, default : null},
    users : {type : Array<String>, default : []}
})

//export default roomSchema;
export default mongoose.model("room", roomSchema);
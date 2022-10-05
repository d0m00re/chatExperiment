import mongoose, {Schema, model} from "mongoose";

const roomMessageSchema = new mongoose.Schema({
    roomId : { type : Schema.Types.ObjectId, ref : "room"},
    userId : {type : String, default : null},
    msg : {type : String, default : null}
})

//export default roomSchema;
export default mongoose.model("roomMessage", roomMessageSchema);
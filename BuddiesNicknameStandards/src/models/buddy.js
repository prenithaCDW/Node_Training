import mongoose from "mongoose";

const buddySchema=new mongoose.Schema({
    employeeID:{
        type:String,
        required:true,
        unique:true,
    },
    realName:{
        type:String,
        required:true,
    },
    nickName:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    hobbies:[String],
},{timestamps:true});

export default mongoose.model("Buddy", buddySchema);
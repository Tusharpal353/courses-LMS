import mongoose from "mongoose";



const userschema= new mongoose.Schema({
    username:{  type:  String},
    email:{type:String,required:true,unique:true},
    password : {type:String,required:true}
})

const User = mongoose.models.User || mongoose.model("User",userschema)
export default User
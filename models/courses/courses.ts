import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    duration:{type:Number},
    instructor:{type:String},
})

const courses = mongoose.models.Courses ||  mongoose.model("Courses",courseSchema)
export default courses
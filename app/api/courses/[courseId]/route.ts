import dbConnect from "@/lib/db";
import courses from "@/models/courses/courses";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}) {
    await dbConnect()


    const courseId = new mongoose.Types.ObjectId(params.courseId)
    const course = await courses.findById(courseId)
    console.log(course)
    return NextResponse.json({
        course,
        message:"this is the backend"
    })
    
}

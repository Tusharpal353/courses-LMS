import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Courses from '@/models/courses/courses';

export  async function GET(req:NextRequest){
    await dbConnect()
    const courses = await Courses.find()
        return NextResponse.json({
            courses,
            message:"courses fetched"
        }
        )
  
}
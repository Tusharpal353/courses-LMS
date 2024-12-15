/* // @ts-ignore

import dbConnect from "@/lib/db";
import courses from "@/models/courses/courses";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { courseId: any } }): Promise<any> {
  await dbConnect();

  const courseId = new mongoose.Types.ObjectId(params.courseId);
  const course = await courses.findById(courseId);
  console.log(course);  

  return NextResponse.json({
    course,
    message: "this is the backend"
  });
}


 */
import dbConnect from "@/lib/db";
import courses from "@/models/courses/courses";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();

  // Validate courseId
  if (!mongoose.Types.ObjectId.isValid(params.courseId)) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  const courseId = new mongoose.Types.ObjectId(params.courseId);
  const course = await courses.findById(courseId);

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({
    course,
    message: "this is the backend"
  });
}
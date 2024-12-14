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

/* 
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Course from "@/models/courses/courses";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { courseId } = req.query; // Change `id` to `courseId` to match your folder structure

  await dbConnect();

  if (!courseId || typeof courseId !== "string") {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  switch (method) {
    // Update course
    case "PUT":
      try {
        const { title, description, duration, instructor } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
          courseId, // Use courseId from the query
          { title, description, duration, instructor },
          { new: true } // Return the updated document
        );

        if (!updatedCourse) {
          return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
      } catch (error) {
        res.status(500).json({ error: "Failed to update the course", details: error.message });
      }
      break;

    // Delete course
    case "DELETE":
      try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
          return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully", course: deletedCourse });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete the course", details: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
 */
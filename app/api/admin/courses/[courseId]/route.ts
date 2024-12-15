import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/courses/courses';
import { ObjectId } from 'mongodb';

/* export async function DELETE(req: NextRequest, context: { params: { courseId: string } }) {
    const { courseId } = context.params;
  
    await dbConnect();
  
    try {
      const deletedCourse = await Course.findByIdAndDelete(courseId);
  
      if (!deletedCourse) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Course deleted successfully" });
    } catch (error: any) {
      return NextResponse.json(
        { error: "Failed to delete the course", details: error.message },
        { status: 500 }
      );
    }
  }
 */

  

// Fixing the type for `params` in context
export async function DELETE(req: NextRequest, context: { params: { courseId: string } }) {
  const { courseId } = context.params;

  await dbConnect();

  try {
    // Ensure courseId is valid
    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // Convert string courseId to ObjectId
    const courseObjectId = new ObjectId(courseId);

    // Attempt to delete the course by its ID
    const deletedCourse = await Course.findByIdAndDelete(courseObjectId);

    if (!deletedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete the course", details: error.message },
      { status: 500 }
    );
  }
}
Key
  
export async function PUT(req: NextRequest) {
  try {
    // Extract the courseId from the URL
    const { pathname } = req.nextUrl;
    const courseId = pathname.split("/").pop(); // Get the last part of the URL

    // Parse the request body
    const { title, description, duration, instructor } = await req.json();

    // Connect to the database
    await dbConnect();

    // Update the course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description, duration, instructor },
      { new: true } // Return the updated document
    );

    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error: any) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update the course", details: error.message },
      { status: 500 }
    );
  }
}

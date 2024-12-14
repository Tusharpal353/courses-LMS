import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/courses/courses';

export async function DELETE(req: NextRequest, { params }: { params: { courseId: string } }) {
  const { courseId } = params;

  await dbConnect();

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete the course", details: error.message }, { status: 500 });
  }
}


export async function PUT(
    req: NextRequest,
    context: { params: { courseId: string } } // Use "context" as the second argument, matching Next.js conventions
  ) {
    const { courseId } = context.params;
  
    const { title, description, duration, instructor } = await req.json();
  
    await dbConnect();
  
    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { title, description, duration, instructor },
        { new: true }
      );
  
      if (!updatedCourse) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }
  
      return NextResponse.json({
        message: 'Course updated successfully',
        course: updatedCourse,
      });
    } catch (error: any) {
      console.error('Error updating course:', error);
      return NextResponse.json(
        { error: 'Failed to update the course', details: error.message },
        { status: 500 }
      );
    }
  }
  

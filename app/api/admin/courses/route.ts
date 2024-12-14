import { NextRequest, NextResponse } from "next/server";

import Courses from "@/models/courses/courses"; // Make sure this model is correctly imported
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { title, description, duration, instructor } = await req.json();

    // Create a new course
    const newCourse = new Courses({
      title,
      description,
      duration,
      instructor,
    });

    // Save the new course to the database
    await newCourse.save();

    // Return a success response
    return NextResponse.json({ message: "Course created successfully" }, { status: 201 });

  } catch (error: any) {
    // Log the error for debugging
    console.error(error);

    // Return an error response
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

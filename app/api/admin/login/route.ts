import User from "@/models/users/user";
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 404 });
    }

    // Check if the password is correct (assuming password is stored in plain text)
    if (password !== user.password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Check if the user has an admin role
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied: Admins only" },
        { status: 403 }
      );
    }

    // Return a success message
    return NextResponse.json(
      { message: "Admin login successful", user: { id: user.id, email: user.email, role: user.role } },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message, status: 500 },
      { status: 500 }
    );
  }
}

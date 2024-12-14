

import User from "@/models/users/user";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return NextResponse.json(
        { error: "User doesn't exist in DB. Try a new email." }
      );
    }

    // Direct plain text password comparison
    if (password !== userExists.password) {
      return NextResponse.json({
        error: "Password is not correct",
      });
    }

    const token = jwt.sign(
      {
        id: userExists.id,
        email: userExists.email,
        role: userExists.role,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
      status: 500,
    });
  }
}

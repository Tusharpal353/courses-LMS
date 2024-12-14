/* import User from "@/models/users/user";
import connectToDb from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: NextRequest) {
  try {
    connectToDb();
    const { username, email, password } = await req.json();
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({
        error: "user already exists in db try new mail",
      });
    }


    const hasedPassword = await bcrypt.hash(password,10)
    const newUser = new User({
      username,
      email,
      password:hasedPassword,
    });
    await newUser.save();
    return NextResponse.json({
      message: "user created",
      status: 201,
    });
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
      status: 500,
    });
  }
}
 */

import User from "@/models/users/user";
import connectToDb from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectToDb();
    const { username, email, password } = await req.json();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({
        error: "User already exists in DB. Try a new email.",
      });
    }

    const newUser = new User({
      username,
      email,
      password, // Saving the password as plain text
    });

    await newUser.save();

    return NextResponse.json({
      message: "User created",
      status: 201,
    });
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
      status: 500,
    });
  }
}

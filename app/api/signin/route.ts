import User from "@/models/users/user"
import connectToDb from "@/lib/db"
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Signin from '../../signin/page';
const SECRET_KEY = process.env.JWT_SECRET

export async function POST(req:NextRequest) {
    try {
       await connectToDb()
        const {email,password}= await req.json()
        const userExists = await User.findOne({email})
        if(!userExists){
            return NextResponse.json(
              {  error:"user dont exists in db try new mail"}
            )
        }

        const isPasswordValid = await bcrypt.compare(password,userExists.password)


        if(!isPasswordValid){
                return NextResponse.json({
                    error:"password is not correct"
                })
        }
        const token = jwt.sign(
            {
                id:userExists.id,
                email:userExists.email,
                role:userExists.role
            },
            SECRET_KEY,
            {
                expiresIn:"1h"
            }
        )




        return NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
          );

      
        
    } catch (err:any) {
        return NextResponse.json({
            error:err.message,
            status:500
        })
        
    }
    
}

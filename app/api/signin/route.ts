import User from "@/models/users/user"
import connectToDb from "@/lib/db"
import { NextResponse, NextRequest } from 'next/server';


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

        if(userExists.password !== password){
                return NextResponse.json({
                    error:"password is not correct"
                })
        }
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

import User from "@/models/users/user"
import connectToDb from "@/lib/db"
import { NextResponse, NextRequest } from 'next/server';


export async function POST(req:NextRequest) {
    try {
        connectToDb()
        const {username,email,password}= await req.json()
        const userExists = await User.findOne({email})
        if(userExists){
            return NextResponse.json(
              {  error:"user already exists in db try new mail"}
            )
        }
        const newUser = new User({
                username,email,password
        })
        await newUser.save( )
return NextResponse.json({
    message:"user created",
    status:201  
})
        
    } catch (err:any) {
        return NextResponse.json({
            error:err.message,
            status:500
        })
        
    }
    
}

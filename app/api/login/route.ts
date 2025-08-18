import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";


export async function POST(request : NextRequest){

    const {email , password } = await request.json() ;

    if(!email || !password){
        return NextResponse.json(
            {message : "fill missing credentials"},
            {status : 401}
        )
    }

    const connected = await connectToDatabase() ;
    if(!connected){
        console.log("connection to database not established")
        return NextResponse.json({
            message :"Internal error"
        },
    {
        status : 500
    })
    }

    try {
        const user = await User.findOne({email}) ;
        if(!user){
            return NextResponse.json(
            {message : "No user found , please sign up"},
            {status : 401}
        ) 
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password) ;
        if(!isPasswordCorrect){
            return NextResponse.json(
            {message : "bad credentials"},
            {status : 401}
        )
        }

        const token = generateToken({email}) ;
        
        const response = NextResponse.json(
            {message : "Logged in"},
            {status : 200}
        ) ;


        response.cookies.set("token", token, {
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge : 60 * 60 * 24 * 7,
            path : "/"
        })


        return response


    }
    
    catch(Error){
        console.log("Login error : ", Error)
        return NextResponse.json(
            {message : "Internal error"},
            {status : 500}
        )
    }
}
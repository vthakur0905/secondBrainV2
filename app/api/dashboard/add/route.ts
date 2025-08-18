import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { contentModel } from "@/models/Content";
import jwt from "jsonwebtoken" ;


import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest){
    try {
        const token = request.cookies.get("token")?.value ;
        
        if(!token){
            return NextResponse.json(
                {message : "please login first"},
                {status :  401}
            )
        }
    
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined in environment variables");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) ;
        console.log(decoded)
        
        const userData = verifyToken(token) ;
    
    
    
        await connectToDatabase();
    
    
    
        if(!userData){
            return NextResponse.json(
                {message : "not authorized"},
                {status : 401}
            )
        }
    
        
        const {link, type, title, tags, description} = await request.json() ;

        const tagsArray: string[] = tags.split(',').map((tag: string) => tag.trim());

        
        if (typeof userData !== "object" || userData === null || !("email" in userData)) {
            return NextResponse.json({
                message: "enter email"
            })
        }

        await contentModel.create({
            userId : userData.email,
            link,
            type,
            title,
            tags : tagsArray,
            description
        })
    
    
    
        return NextResponse.json(
            { message: "successfully created content", user: userData },
            { status: 200 }
        )
    
    } catch (error) {
        console.log("error in creating : ", error)
        return NextResponse.json(
            {message : "error occurred"},
            {status : 500}
        )
    }
}


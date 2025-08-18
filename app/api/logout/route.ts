
import { NextResponse } from "next/server";


export async function POST(){
    const response = NextResponse.json({
        message : "logged out successfully"
    })


    response.cookies.set("token", "", {
        httpOnly : true ,
        expires : new Date(0), 
        path : "/"
    })

    return response 
}
import { contentModel } from "@/models/Content";
import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(request : NextRequest){
    const token = request.cookies.get("token")?.value ;

    if(!token || !verifyToken(token)){
        return NextResponse.json(
            {message : "unauthorized"},
            {status : 500}
        )
    }

    const body = await request.json() as { id?: string } ;
    const contentId = body?.id ;

    if(!contentId){
        return NextResponse.json(
            {message : "content id missing"},
            {status : 400}
        )
    }

    await connectToDatabase() ;

    try {
        await contentModel.findByIdAndDelete(contentId) ;
        return NextResponse.json({ message: "Content deleted successfully" }, { status: 200 });


    }catch(_error){
        return NextResponse.json({ message: "Error deleting content" }, { status: 500 });

    }

}
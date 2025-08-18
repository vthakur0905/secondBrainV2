import { connectToDatabase } from "@/lib/db";
import { contentModel } from "@/models/Content";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "please login first" }, { status: 401 });
  }

  
  const isTokenVerified = verifyToken(token);

  if (!isTokenVerified || typeof isTokenVerified === "string") {
    return NextResponse.json(
      {
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  if (!("email" in isTokenVerified) || !isTokenVerified.email) {
    return NextResponse.json({
        message : "no email found "
    })
  }

  const userId  =  isTokenVerified.email ;

  await connectToDatabase() ;
  const userContent = await contentModel.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json(
    {
      message: "returned all content",
      data: userContent,
    },
    {
      status: 200,
    }
  );

}

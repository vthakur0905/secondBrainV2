import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { connectToDatabase } from "@/lib/db";
import { contentModel } from "@/models/Content";

export async function GET(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	if (!token) {
		return NextResponse.json({ message: "please login first" }, { status: 401 });
	}

	const verified = verifyToken(token);
	if (!verified || typeof verified === "string" || !("email" in verified) || !verified.email) {
		return NextResponse.json({ message: "unauthorized" }, { status: 401 });
	}

	await connectToDatabase();
	const items = await contentModel.find({ userId: verified.email }).sort({ createdAt: -1 });
	return NextResponse.json({ message: "ok", data: items }, { status: 200 });
}



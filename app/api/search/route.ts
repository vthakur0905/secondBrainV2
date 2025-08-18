import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { connectToDatabase } from "@/lib/db";
import { contentModel } from "@/models/Content";

export async function GET(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	if (!token) {
		return NextResponse.json({ message: "please login first" }, { status: 401 });
	}

	const searchParams = request.nextUrl.searchParams;
	const q = (searchParams.get("q") || "").trim();
	if (!q) {
		return NextResponse.json({ message: "missing query" }, { status: 400 });
	}

	const verified = verifyToken(token);
	if (!verified || typeof verified === "string" || !("email" in verified) || !verified.email) {
		return NextResponse.json({ message: "unauthorized" }, { status: 401 });
	}

	await connectToDatabase();

	// Split into terms by commas and whitespace, ignore empties
	const rawTerms = q.split(/[,\s]+/g).map(t => t.trim()).filter(Boolean);
	const regexTerms = rawTerms.map(t => new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

	// Broad match: tags OR title OR description
	const items = await contentModel.find({
		userId: verified.email,
		$or: [
			{ tags: { $elemMatch: { $in: regexTerms } } },
			{ title: { $in: regexTerms } },
			{ description: { $in: regexTerms } },
		],
	}).lean();

	// Lightweight scoring based on tag matches and title/description hits
	const scored = items.map((doc: any) => {
		const tags: string[] = Array.isArray(doc.tags) ? doc.tags : [];
		let score = 0;
		for (const r of regexTerms) {
			if (tags.some(tag => r.test(tag))) score += 3; // prioritize tag hits
			if (r.test(doc.title || "")) score += 2;
			if (r.test(doc.description || "")) score += 1;
		}
		return { ...doc, _score: score };
	});

	const sorted = scored.sort((a, b) => b._score - a._score);

	return NextResponse.json({ message: "ok", data: sorted }, { status: 200 });
}



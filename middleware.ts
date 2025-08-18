import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/dashboard")) {
		if (!token) {
			const url = request.nextUrl.clone();
			url.pathname = "/login";
			return NextResponse.redirect(url);
		}
	}

	if ((pathname === "/login" || pathname === "/register") && token) {
		const url = request.nextUrl.clone();
		url.pathname = "/dashboard/home";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login", "/register"],
};



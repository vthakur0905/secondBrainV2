import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!code || !email) {
      return NextResponse.json(
        { message: "Missing email or code" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "account does not exist" },
        { status: 400 }
      );
    }

    if (user.verifyCode !== code) {
      return NextResponse.json(
        { message: "Invalid or expired code" },
        { status: 400 }
      );
    }

    user.mailVerified = true;
    // user.verifyCode = null;
    // user.verifyCodeExpiry = null;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Verification error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

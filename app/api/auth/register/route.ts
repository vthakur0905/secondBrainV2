import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

function generateVerificationCode(){
    const code = Math.floor(100000 + Math.random() * 900000);
    return code ;
}

export async function POST(request : NextRequest){
    try {
        const {name , email, password} = await request.json() ;


        if(!name || !email || !password) {
            return NextResponse.json(
                {
                    message : "please fill details"
                },
                {
                    status :400
                }
            )
        }

        await connectToDatabase() ;

        const existingUser = await User.findOne({email}) ;
        if(existingUser){
            return NextResponse.json(
                {message : "email already in use"},
                {status : 400}
            )
            
        } 

        const verifyCode = generateVerificationCode() ;
        console.log(verifyCode) ;

        const verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);


        await User.create({
            name ,
            email,
            password,
            verifyCode,
            verifyCodeExpiry
        })

        


        return NextResponse.json(
            { message: "user Created" },
            { status: 200 }
        );


        
    }
    catch (_error){
        return NextResponse.json(
            { message: "some error occured" },
            { status: 500 }
        );
    }
}
import jwt from "jsonwebtoken" ;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;

export function generateToken(payload : object){
    if(!JWT_SECRET_KEY){
        throw new Error("jwt secret key not defined")
    }
    return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn : "7d" })
}

export function verifyToken(token: string){
    if(!JWT_SECRET_KEY || !token){
        throw new Error("Key fields missing")
    }

    try{
        return jwt.verify(token, JWT_SECRET_KEY) ;
    }catch(error){
        console.log("error in token verification : " + error)
        return ("error caught in token verification")
    }
}

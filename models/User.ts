import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs" ;
import { userInput } from "@/schema/User";


export interface UserInterface extends userInput {
    _id? : mongoose.Types.ObjectId ;
    createdAt? : Date ;
    mailVerified : boolean ;
    verifyCode : Number ;
    verifyCodeExpiry: Date ;
}

const userSchema = new Schema<UserInterface> (
    {
        name : {
            type : String, required : true 
        },
        email : {
            type : String, required : true , unique : true 
        }, 
        password : {
            type : String, required : true 
        },
        mailVerified : {
            type : Boolean, default : false
        },
        verifyCode : {
            type : Number , required : true 
        },
        verifyCodeExpiry : {
            type : Date , required : true
        }
    },
    {
        timestamps :  true
    }
    
)

userSchema.pre('save', async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10) ;
    }
    
    next() ;

})



const User = models?.User || model<UserInterface>("User", userSchema) ;

export default User ;
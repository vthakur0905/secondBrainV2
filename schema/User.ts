import {z} from "zod" ;

export const UserZodSchema = z.object({
	name : z.string() , 
	email : z.string().email() ,
	password : z.string().min(6) 
})

export type userInput = z.infer<typeof UserZodSchema> ;
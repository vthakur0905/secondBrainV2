
import {z} from "zod" ;
type contentType = "image" | "video" | "audio" | "article" | "tweet" ;

export const ContentZodValidation = z.object({
    link : z.url() , 
    type : z.enum(["image" , "video" , "audio" , "article" , "tweet"]), 
    title : z.string(),
    description : z.string().optional() , 
    tags: z.array(z.string()),
    timeStamp: z.coerce.date(),  
    vector: z.array(z.number())

}) 

export type contentInput = z.infer<typeof ContentZodValidation> ;
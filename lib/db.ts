import mongoose from "mongoose"

let cachedConnection = global.mongoose ; 

if(!cachedConnection) {
    cachedConnection = global.mongoose = {connection : null , promise : null}
}

export const connectToDatabase = async () => {
    const MONGODB_URI = process.env.MONGODB_URI ;
    if(!MONGODB_URI){
        throw new Error("please define mongo db uri ")
    }
    if(cachedConnection.connection){
        return cachedConnection.connection
    }

    if(!cachedConnection.promise){
        const options = {
            bufferCommands : true ,
            maxPoolSize : 10
        }

        cachedConnection.promise =  mongoose.connect(MONGODB_URI, options).then(() => mongoose.connection)
    }

    try {
        cachedConnection.connection = await cachedConnection.promise 
    } catch (error) {

        cachedConnection.promise = null;
        throw error ;
        
    }
    

    return cachedConnection.connection ;
    

}
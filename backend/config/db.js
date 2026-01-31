import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY");
        
    } catch (error) {
        console.log("error in MONGO DB CONNECTION")
    }
}

export default connectDb;
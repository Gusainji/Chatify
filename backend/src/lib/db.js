import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const { MONGO_URI } = process.env;
        if(!MONGO_URI) throw new Error("MONGO_URI not safe");

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected',conn.connection.host);
        
    } catch (error) {
        console.log("Error connection mongoose",error);
        process.exit(1);  //1status code for failure and 0 for success
        
    }
}
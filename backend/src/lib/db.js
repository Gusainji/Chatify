import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected',conn.connection.host);
        
    } catch (error) {
        console.log("Error connection mongoose",error);
        process.exit(1);  //1status code for failure and 0 for success
        
    }
}
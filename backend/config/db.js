import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB is Connected SuccessFully : ${conn.connection.host}`)
    } catch (error) {
        console.log(`MongoDB Connection Failed: ${error.message}`)
    }
}

export default connectDB
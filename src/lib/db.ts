import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!

if(!MONGO_URI) { throw new Error('uri is empty')}

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectDB = async () => {

    if(cached.conn) return cached.conn
    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI).then((m)=>m)
    }

    cached.conn = await cached.promise;
    (global as any).mongoose = cached;
    return cached.conn
}
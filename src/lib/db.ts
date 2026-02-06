import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URI) {
        return console.log("MONGODB_URI is not defined");
    }

    if (isConnected) {
        return console.log("Database already connected");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "notemaster",
        });

        isConnected = true;
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
};
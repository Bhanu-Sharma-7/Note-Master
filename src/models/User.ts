import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        minlenght: [8, "Password must be at least 8 characters"],
        required: [true, "Password is required"],
    },
    image: {
        type: String,
    },
}, { timestamps: true })

const User = models.User || model('User', UserSchema)
export default User
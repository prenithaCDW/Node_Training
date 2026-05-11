import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
    },
    tokenState: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.model("user", userSchema);
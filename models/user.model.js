const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dlsnvevxk/image/upload/v1595681654/avatar/profile%20icon.png.png",
        required: true
    },
    age: {
           type: Number,
           min: 18
       },
    genre: {
           type: String,
           enum: ['Male', 'Female']
       },
    calendar: [Date],
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);
module.exports = User;


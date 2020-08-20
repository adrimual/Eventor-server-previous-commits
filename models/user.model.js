const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 4
        },
        avatar: {
            type: String,
            default: "avatar.png"
        },
        personDetails: {
            type: Schema.Types.ObjectId,
            ref: "Person"
        },
        createdEvents: [{
            type: Schema.Types.ObjectId,
            ref: "Event"
        }]
})

const User = mongoose.model("User", userSchema);
module.exports = User;
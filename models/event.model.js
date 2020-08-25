const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
           owner: {type: Schema.Types.ObjectId, ref: "User"},
            name: {
                type: String,
                required: true,
                maxlength: 40,
                minlength: 2,
                unique: true,
            },
            avatar: {
                type: String,
                default: "avatar.png"
            },
            comments: {
                type: [{
                    message: String,
                    owner: {
                        type: Schema.Types.ObjectId,
                        ref: "User"
                    }
                }],
                default: []
            },
            pictures: {
                type: [String],
                default: []
            },
            description: {
                type: String,
                required: true,
                maxlength: 500
            },
            startTime: {
                type: Date,
                required: true
            },
            endTime: {
                type: Date,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            participants: [{
                type: Schema.Types.ObjectId,
                ref: "User"
            }]
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
        age: {
                type: Number,
                min: 18
            },
            genre: {
                type: String,
                enum: ['Male', 'Female']
            },
            vehicle: {
                type: [String],
                enum: ["motorbike, car"],
                minlength: 1,
            },
            events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
            calendar: [Date],
})

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
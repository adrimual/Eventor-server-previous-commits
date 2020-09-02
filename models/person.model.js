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
            calendar: [Date],
}, {
    timestamps:true
})

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
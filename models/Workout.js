const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    day: {
        type: Date,
        default: Date.now(),
    },
    exercises: [
        {
            name: {
                type: String,
                trim: true, 
                required: "Enter name of your workout",
            },
            type : {
                type: String,
                required: "What type of excersise?"
            },
            weight: {
                type: Number, 
            },
            sets: {
                type: Number,
            },
            reps: {
                type: Number, 
            },
            duration: {
                type: Number,
                trim: true,
                required: "How long was it?",
            },
            distance: {
                type: Number,
            }
        }
    ]

});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
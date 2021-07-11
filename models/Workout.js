const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day:{
        type: Date,
        default: Date.now(),
    },
    exercises:[
        {
            type:{
                type: String,
                trim: true,
                required: "What type of excersise?"
            },
            name:{
                type: String,
                trim:true, 
                required: "Enter name of your workout",
            },
            duration:{
                type: Number,
                trim: true,
                required: "How long was it?",
            },
            weight:{
                type:Number, 
            },
            reps:{
                type:Number, 
            },
            sets:{
                type:Number,
            },
            distance:{
                type:Number,
            }
        }
    ]

});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
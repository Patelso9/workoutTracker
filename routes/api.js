const router = require("express").Router();
const Exercise = require("../models/exercise");

//add new exercise
router.post('/api/exercise', ({ body }, res) => {
    console.log('API POST /api/exercise', body)
    Exercise.create(body)
    .then(dbExercise => {
        res.json(dbExercise)
    }).catch(err => res.status(400).json(err))
});

//update workout
router.put('/api/exercise:id', ({ body, params }, res) => {
    console.log('API PUT /api/exercise:id',params.id)
    Exercise.findByIdAndUpdate(params.id, { $push: { exercises: body } })
    .then((dbExercise) => {
        res.json(dbExercise)
    })
})

//see all workouts
router.get('/api/excercise', ({ body }, res) =>{
    console.log('API GET /api/exercis', body)
    Exercise.aggregate([
        { $addFields:{
            totalDuration: {$sum: "excercises.duration"},
            totalWeight: {$sum: "excercises.weight"},
        }}
    ])
    .then((dbExercise) => {
        console.log('added fields', totalDuration, totalWeight)
        res.json(dbExercise)
    }).catch(err => res.status(400).json(err))
})

module.exports = router;
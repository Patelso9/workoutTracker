const router = require("express").Router();
const Workout = require("../models/Workout");

//add new exercise
router.post('/api/workouts', (req, res) => {
    console.log('API POST /api/workouts', res)
    Workout.create()
    .then(dbWorkout => {
        res.json(dbWorkout)
    }).catch(err => res.status(400).json(err))
});

//update workout
router.put('/api/workouts:id', ({ body, params }, res) => {
    console.log('API PUT /api/workouts:id',params.id)
    Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } })
    .then((dbWorkout) => {
        res.json(dbWorkout)
    }).catch(err => res.status(400).json(err))
})

//find workout by ID
router.get('/api/workouts/:id', ({ params }, res) => {
    console.log('API GET /api/workouts/:id',params.id)
    Workout.findById (params.id)
    .sort({ _id: -1 })
    .then((dbWorkout) => {
        res.json(dbWorkout)
    }).catch(err => res.status(400).json(err))
})

//see all workouts
router.get('/api/workouts', (req, res) =>{
    // console.log('API GET /api/workouts', dbWorkout)
    Workout.aggregate([
        { $addFields:{
            totalDuration: {$sum: "excercises.duration"},
            totalWeight: {$sum: "excercises.weight"},
        }}
    ])
    .then((dbWorkout) => {
        console.log('added fields', totalDuration, totalWeight)
        res.json(dbWorkout)
    }).catch(err => res.status(400).json(err))
})

//see all workouts in a range
router.get('/api/workouts/range', (req, res) =>{
    console.log('API GET /api/workouts/range')
    Workout.aggregate([
        { $addFields:{
            totalDuration: {$sum: "excercises.duration"},
            totalWeight: {$sum: "excercises.weight"},
        }}
    ]).sort({_id: -1}).limit(7)
    .then((dbWorkout) => {
        console.log('added fields', totalDuration, totalWeight)
        res.json(dbWorkout)
    }).catch(err => res.status(400).json(err))
})

//delete by id
router.delete('/api/workouts/:id', ({ params }, res) =>{
    console.log('API DELETE /api/workouts/:id', params.id)
    Workout.findByIdAndDelete(params.id)
    .then(() => {
        console.log('deleted fields', params.id)
        return res.json(true)
    }).catch(err => res.status(400).json(err))
})

module.exports = router;
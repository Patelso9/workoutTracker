const router = require("express").Router();
const db = require("../models");

//get all workouts--- WORKING
router.get('/api/workouts', ({ body }, res) =>{
    console.log('API GET /api/workouts')

    db.Workout.find({})
    .then(dbWorkout => {
        console.log('Get all workouts')

        dbWorkout.forEach(workout=> {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout)
    })
    .catch(err => {
        console.log('err loading API GET /api/workouts', dbWorkout)
        res.status(400).json(err)
    })

})

//add new exercise --??
router.post('/api/workouts', ({ body }, res) => {
    console.log('API POST /api/workouts')

    db.Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => res.status(400).json(err))
});

//update workout --??
router.put('/api/workouts:id', ({ body, params }, res) => {
    console.log('API PUT /api/workouts:id')
    // let id = params.id
    db.Workout.findOneAndUpdate(
        { _id: params.id },
        { $push: { exercises: body } },
        { 
            new: true,
            runValidators: true
        }
    )
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => res.status(400).json(err))
})


//see all workouts in a range
router.get('/api/workouts/range', (req, res) =>{
    console.log('API GET /api/workouts/range')

    db.Workout.aggregate([
        { $addFields:{
            totalDuration: {$sum: req.body.totalDuration},
            // totalWeight: {$sum: 'excercises.weight'},
        }}
    ])
    .sort({_id: -1}).limit(7)
    .then((data) => {
        console.log('all workouts in ranga', data)
        res.json(data)
    })
    .catch(err => res.status(400).json(err))
})

//delete by id
router.delete('/api/workouts/:id', (req, res) =>{
    console.log('API DELETE /api/workouts/:id')

    db.Workout.findByIdAndDelete(req.params.id)
    .then(() => {
        console.log('deleted fields', params.id)
        return res.json(true)
    }).catch(err => res.status(400).json(err))
})

module.exports = router;





//----------------------------OLD CODE----------------------------//

    //-----GET all workouts, did not work---------//
    // Workout.aggregate([
    //     { $addFields:{
    //         totalDuration: {$sum: "excercises.duration"},
    //         totalWeight: {$sum: "excercises.weight"},
    //     }}
    // ])
    
        // console.log('added fields', dbWorkout)  



    // --------find workout by ID-------------
// router.get('/api/workouts/:id', ({ params }, res) => {
//     console.log('API GET /api/workouts/:id')
//     Workout.findById (params.id)
//     .sort({ _id: -1 })
//     .then((dbWorkout) => {
//         res.json(dbWorkout)
//     }).catch(err => res.status(400).json(err))
// })
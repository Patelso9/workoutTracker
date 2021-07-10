const router = require("express").Router();
const path = require("path");

//localhost:300/api/exercise
router.get('/excercise', (req, res) => {
    res.sendFile(path.join(_dirname, "../public/index.html"))
});


//localhost:300/api/exercise/excercise
router.get('/excercise', (req, res) => {
    res.sendFile(path.join(_dirname, "../public/exercise.html"))
});

//localhost:300/api/exercise/stats
router.get('/stats', (req, res) => {
    res.sendFile(path.join(_dirname, "../public/stats.html"))
});

module.exports = router;
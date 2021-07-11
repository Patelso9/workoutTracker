const router = require("express").Router();
const path = require("path");

//localhost:300/
router.get('/', (req, res) => {
    console.log ('html GET /')
    res.sendFile(path.join(_dirname, '../public/index.html'))
});


//localhost:300/excercise
router.get('/excercise', (req, res) => {
    console.log ('html GET /exercise')
    res.sendFile(path.join(_dirname, '../public/exercise.html'))
});

//localhost:300/stats
router.get('/stats', (req, res) => {
    console.log ('html GET /stats')
    res.sendFile(path.join(_dirname, '../public/stats.html'))
});

module.exports = router;
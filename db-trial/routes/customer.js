var express = require('express');
const router = express.Router()

router.post('/customer/profile', function (req, res) {
    res.render('profile');
});
router.post('/customer/recommendations', function (req, res) {
    res.render('recommendations');
});
router.post('/customer/feedback', function (req, res) {
    res.render('feedback');
});


module.exports= router;
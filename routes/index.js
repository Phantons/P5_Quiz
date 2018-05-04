var express = require('express');
var router = express.Router();
const {models} = require("../models/index");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/credits', function (req, res, next) {
   res.render('credits', {title: 'Credits'});
});

router.get('/quizzes', function (req, res, next) {
    let quizzesToHTML = [];

    models.quiz.findAll().then(quizzes => {
        quizzesToHTML = quizzes;
    })
    .then(() => res.render('quizzes', {title: 'Quizzes', quizzes: quizzesToHTML}))
    .catch(err => console.log(err));
});

module.exports = router;

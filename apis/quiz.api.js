const quizApi=require('express').Router();
const quizController=require('../controllers/quiz/quiz.controller');
// const {jwtAuthentication}=require('../middleware/passport.middleware');

quizApi.post('/contribute/add-quiz',quizController.postContributedQuiz);

quizApi.get('/search-quiz',quizController.getSearchQuiz);

module.exports=quizApi;
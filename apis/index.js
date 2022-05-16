const express=require('express');
const router=express.Router();
require('express-async-errors');
const vocabulary=require('./vocabulary.route');
const words=require('./word.api');
const categorys=require('./category.api');
const quizs=require('./quiz.api');
const news=require('./news.api');

router.use('/vocabularys',vocabulary);
// router.use('/words',words);
// router.use('/categorys',categorys);
// router.use('/quizs',quizs);
// router.use('/news',news)

module.exports=router;
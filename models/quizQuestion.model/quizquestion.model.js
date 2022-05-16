const mongoose=require('mongoose');

const quizQuestionSchema=mongoose.Schema({
    category:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    type:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    difficulty:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    question:{
        type:String,
        required:true,
        trim:true,
        maxLength:500
    },
    correct_answer:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    incorrect_answer:[
        {
            type: String,
            maxLength: 200,
        }
    ]
},{timestamp:true});

const quizModel=mongoose.model('quiz',quizQuestionSchema,'quizs');

module.exports=quizModel;
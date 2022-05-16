const QuizModel=require('../models/quizQuestion.model/quizquestion.model');

exports.createNewQuiz=async(quizInfo)=>{
    try {
        const newWord=await QuizModel.create({...quizInfo});
        console.log(quizInfo);
        if(newWord){
            return true;
        }
        return false;
    } catch (error) {
        
        throw error;
    }
};

exports.searchQuiz=async (category='',limit=5,select='')=>{
    try { 
        const regex=new RegExp(`${category}`,'gi');
        // console.log(regex);
        const list=await QuizModel.find({category:regex}).limit(limit);
        return list;
    } catch (error) {
        throw error;
    }
};

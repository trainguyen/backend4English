const mongoose=require('mongoose');

const newsSchema=mongoose.Schema({
    newsTitle:{
        type:String,
        required:true,
        trim:true,
        maxLength:200
    },
    newsImage:{
        type:String,
        required:true,
        trim:true 
    },
    newsContent:[
        {
            type: String, 
        }
    ],
    newsType:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    author:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    publishing_company:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    }
},{timestamp:true});

const newsModel=mongoose.model('new',newsSchema,'news');

module.exports=newsModel;
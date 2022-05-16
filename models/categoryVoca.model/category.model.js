const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
    category_en:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    category_vi:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    categoryThumb:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    key_search:{
        type:String,
        require:true,
        trim:true,
        maxLength:50
    }
});

const CategoryModel=mongoose.model('category',categorySchema,'categorys');

module.exports=CategoryModel;
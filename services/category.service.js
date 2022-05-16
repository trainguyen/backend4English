const CategoryModel=require('../models/categoryVoca.model/category.model');

exports.CreateNewCategory=async(categoryInfo)=>{
    try {
        const newCategory=await CategoryModel.create({...categoryInfo});
        console.log(newCategory);
        if(newCategory){
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

exports.searchCategory=async(category='',limit=5,select='')=>{
    try {
        const regex=new RegExp(`${category}`,'gi');

        const list=await CategoryModel.find({word:regex}).limit(8);
        return list;
    } catch (error) {
        throw error;
    }
}
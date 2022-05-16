const WordModel=require('../models/vocabulary.model/word.model_test');

exports.createNewWord=async(wordInfo)=>{
    try {
        const newWord=await WordModel.create({...wordInfo});
        console.log(wordInfo);
        if(newWord){
            return true;
        }
        return false;
    } catch (error) {
        
        throw error;
    }
};


exports.searchWord=async (word='',limit=5,select='')=>{
    try { 
        const regex=new RegExp(`${word}`,'gi');
        // console.log(regex);
        const list=await WordModel.find({word:regex}).limit(limit);
        return list;
    } catch (error) {
        throw error;
    }
};

exports.searchWordbyCategory=async (category='',limit=5,select='')=>{
    try { 
        const regex=new RegExp(`${category}`,'gi');
        // console.log(regex);
        // console.log({category:regex});
        const list=await WordModel.find({category:regex});
        console.log(list);
        return list;
    } catch (error) {
        throw error;
    }
};


exports.getWordDetail = async (word = '') => {
    try {
      const res = await WordModel.findOne({ word });
  
      return res;
    } catch (error) {
      throw error;
    }
  };

exports.getFavoriteList=async (rawFavorites=[])=>{
    try {
        if(!Array.isArray(rawFavorites)||rawFavorites.length===0){
            return [];
        } 

        let list=[];
        for(let word of rawFavorites){
            const regex=new RegExp(`^${word}.*`,'gi');
            const wordDetails=await WordModel.findOne({word:regex}).select(
                '-_id type word mean phonetic picture',
            );
        }
        if(wordDetails){
            list.push(wordDetails);
        }

        return list;
    } catch (error) {
        throw error;
    }
}
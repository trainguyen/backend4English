const newsModel=require('../models/news.model/news.model');

exports.createNewNews=async(newsInfo)=>{
    try {
        const newNews=await newsModel.create({...newsInfo});
        console.log(newsInfo);
        if(newNews){
            return true;
        }
        return false;
    } catch (error) {
        
        throw error;
    }
};


exports.searchNews=async (News='',limit=5,select='')=>{
    try { 
        const regex=new RegExp(`${News}`,'gi');
        // console.log(regex);
        const list=await newsModel.find({newTitle:regex}).limit(limit);
        return list;
    } catch (error) {
        throw error;
    }
};

exports.searchNewsbyCategory=async (category='',limit=5,select='')=>{
    try { 
        const regex=new RegExp(`${category}`,'gi');
        // console.log(regex);
        // console.log({category:regex});
        const list=await newsModel.find({newsType:regex});
        console.log(list);
        return list;
    } catch (error) {
        throw error;
    }
};


exports.getNewsDetail = async (News = '') => {
    try {
      const res = await WordModel.findOne({ News });
  
      return res;
    } catch (error) {
      throw error;
    }
  };

exports.getFavoriteNewsList=async (rawFavorites=[])=>{
    try {
        if(!Array.isArray(rawFavorites)||rawFavorites.length===0){
            return [];
        } 

        let list=[];
        for(let word of rawFavorites){
            const regex=new RegExp(`^${word}.*`,'gi');
            const NewsDetails=await newsModel.findOne({word:regex}).select(
                '-_id type word mean phonetic picture',
            );
        }
        if(NewsDetails){
            list.push(NewsDetails);
        }

        return list;
    } catch (error) {
        throw error;
    }
}
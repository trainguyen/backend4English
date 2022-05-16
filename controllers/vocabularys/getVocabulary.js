const {Vocabulary}=require('../../models/vocabulary.model/index.model');
const errorJson=require('../../utils/error');
require('dotenv').config();

module.exports=async(req,res)=>{
    try{
        let vocabulary=await Vocabulary.find().sort({_id:-1}).limit(50).catch((e)=>{
            return res.status(500).errorJson(errorJson(e,'An interval server error occurred while getting foods from db.'))
        });

        vocabulary.length>=1?res.status(200).send(vocabulary):res.status(404).send([]);
        
    }catch(err){
        return res.status(500).errorJson(errorJson(err,'An interval server error occurred'));
    }
}
const {Vocabulary} = require('../../models/vocabulary.model/vocabulary.model');

module.exports=async(req,res)=>{
    try { 
        const regex=new RegExp(req.body.words,'i'); 
        const results=await Vocabulary.find({'words':{$regex:regex}})
        console.log(results);
        results.length >= 1 ? res.status(200).send(results):res.status(200).send({'msg':'Not found.'})
    } catch (err) {
        console.log(err)
        res.status(401)
        res.send('Unexpected Error')
    }
}
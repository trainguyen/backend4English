const {Vocabulary} = require('../../models/vocabulary.model/vocabulary.model');

module.exports=async(req,res)=>{
    try { 
        // console.log(req.query);
        // console.log(req.body.word);
        const regex=new RegExp(req.body.category,'i'); 
        console.log(regex);
        const results=await Vocabulary.find({'category':{$regex:regex}}).limit(100) ;
        // console.log(results);
        results.length >= 1 ? res.status(200).send(results):res.status(200).send({'msg':'Not found.'})
    } catch (err) {
        console.log(err)
        res.status(401)
        res.send('Unexpected Error')
    }
}
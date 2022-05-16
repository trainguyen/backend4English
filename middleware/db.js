const mongoose=require('mongoose');
require('dotenv').config();

const db=()=>{
    mongoose.connect(process.env.db,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log('Mongodb Connected Successfully');
    })
    .catch(err=>{
        console.log('Mongodb Connection Error ==> '+err);
    })
    mongoose.Promise=global.Promise;
};

module.exports={db}
const {default:mongoose}=require('mongoose');
const moongoose=require('mongoose');
const {NUM_OF_SPECIALTY,NUM_OF_TOPIC} = require('../../constant');

const vocabularySchema=mongoose.Schema({
    word:{
        type:String,
        // required:true,
        trim:true,
        maxLength:50
    },
    mean:{
        type:String,
        // required:true,
        trim:true,
        maxLength:100
    },
    type:{
        type:String,
        enum:['','n','adj','adv','v','con','pre','pro','det'],
        default:''
    },
    level:{
        type:String,
        // required:true,
        enum:['0','A1','A2','B1','B2','C1','C2'],
        default:'0'
    },
    phonetic:[
        {
          type: String,
          maxLength: 200,
        },
      ],
    examples: [
        {
          type: String,
          maxLength: 200,
        },
      ],
    //link picture source
    picture: {
        type: String,
        trim: true,
        default: null,
      }, 
      quiz_question: {
        type: String,
        trim: true,
        default: null,
      }, 
      options: [{type:String,maxLength:150}],
      answer_index: {
        type: String,
        trim: true,
        default: null,
      }, 
      specialty:{
          type:String,
          enum:Array.from({length:NUM_OF_SPECIALTY},(_,key)=>key.toString()),
          default:'0'
      },
      topic:[
          {
              type:String,
              enum:Array.from({length:NUM_OF_TOPIC},(_,key)=>key.toString())
          }
      ],
      synonyms:[{type:String,maxLength:50}],
      antonyms:[{type:String,maxLength:50}], 
      note:{
          type:String,
          trim:true,
          maxLength:150
      },
      ischecked:{
          type:Boolean,
          default:false
      },
      category:{
          type:String,
          trim:true,
          maxLength:50
      }
      ,
      audio:[
        {
          type: String,
          maxLength: 200,
        },
      ],
},{timestamp:true});

const Vocabulary=mongoose.model('Vocabulary',vocabularySchema);

module.exports={
    Vocabulary:Vocabulary,
    vocabularySchema:vocabularySchema
}
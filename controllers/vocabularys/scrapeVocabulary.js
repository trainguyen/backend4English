// const {Vocabulary}=require('../../models/vocabulary/vocabulary.model');
const axios=require('axios');
const cheerio=require('cheerio');
const translate = require('translate');
const { Vocabulary } = require('../../models/vocabulary.model/index.model');
// import {google} from "@https://www.google.com/jsapi";
const {google} = require('googleapis');

 
const getListLinks=async ()=>{

    url='https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000'; 

    var listLinks=[];

    let html=await axios.get(url); 
    let $=await cheerio.load(html.data); 

    let getCountWords=$('.top-g');
    
    let getCountAllWord=getCountWords.find('li').length;

    let test=getCountWords.find('li').eq(0).find('div').find('div').attr('data-src-mp3');

    // console.log(getCountWords.find('li').eq(0).find('div').text());
     
    for(let i=0;i<10;i++){
        listLinks.push($('.top-g > li').eq(i).find('a').text()+"|"+"https://www.oxfordlearnersdictionaries.com"+$('.top-g > li').eq(i).find('a').attr('href')
        +"|"+"https://www.oxfordlearnersdictionaries.com"+
        getCountWords.find('li').eq(i).find('div').find('div').eq(0).attr('data-src-mp3')+"|"+getCountWords.find('li').eq(0).find('div').text().trim()
        +"|"+$('.top-g > li').eq(i).find('span').eq(0).text()+
        "|"+"https://www.oxfordlearnersdictionaries.com"+getCountWords.find('li').eq(i).find('div').find('div').eq(1).attr('data-src-mp3'));

        // listLinks.push("https://www.oxfordlearnersdictionaries.com"+$('.top-g > li').eq(i).find('a').attr('href'));

    }
    // console.log(listLinks);
    return listLinks;
}

// getListLinks();
 
const scrapePages=async (listLinks)=>{
    var loop_datas={'datas':[]}; 

    var listUrl=await getListLinks(); //listLinks;
    // console.log(listUrl)
    // var url='https://www.oxfordlearnersdictionaries.com/definition/english/abandon_1'

    for(let index=0 ; index < listUrl.length ;index++){

        let html=await axios.get(listUrl[index].split('|')[1]);
        let $=await cheerio.load(html.data); 

        let word=listUrl[index].split('|')[0];
        let word_translate;
          if(word.length!=0){
            const text = await translate(word, "vi");
            word_translate=text; 
           } 
        // console.log(word)

        let level=listUrl[index].split('|')[3];
        // console.log(level)

        let type=listUrl[index].split('|')[4];
        // console.log(type)

        let audio_uk=listUrl[index].split('|')[2];

        let audio_us=listUrl[index].split('|')[5];

        var arr_audio=[audio_uk,audio_us];
        // console.log(arr_audio)

          let getphons=$('.phonetics').find('.phons_br').eq(0).find('span').text();
        //   console.log('getphons'+getphons)

          let getphons_us=$('.phonetics').find('.phons_n_am').eq(0).find('span').text();
        //   console.log('getphons_us'+getphons_us)
 
        var arr_phonetic=[getphons,getphons_us];
        // console.log(arr_phonetic); 

          let note=$('.senses_multiple').find('li').eq(0).find('.def').text();
          let note_translate;
          if(note.length!=0){
            const text = await translate(note, "vi");
            note_translate=text; 
           } 
        //   console.log(note);

        let examples=$('.senses_multiple').find('li').eq(0).find('.examples').find('li').eq(0).text();
        //   console.log(examples);
 
          //example question
          let quiz_question=examples.replace(word,'______');
        //   console.log(examples.replace(word,'______'));
        let examples_translate;
       if(examples.length!=0){
        const text = await translate(examples, "vi");
        examples_translate=text; 
        var arr_examples=[examples,examples_translate];
        // console.log(arr_examples)
       }  
  
       let options,answer_index;
      await fetch('https://random-word-api.herokuapp.com/word?number=3')
        .then(response => response.json())
        .then(data => { 
          var randomItem = Math.floor(Math.random()*data.length);  
          data.splice( randomItem, 0, word );
          options=data;
          answer_index=randomItem;
          // console.log(data)
          // console.log(randomItem);
        } 
        );
        
        

     var  arr_word_voca ={  'word':word,
                            'mean':word_translate,
                            'type':type,
                            'level':level,
                            'phonetic':arr_phonetic,
                            'examples':arr_examples,
                            "picture":"",
                            "quiz_question":quiz_question,
                            "options":options,
                            "answer_index":answer_index,
                            "specialty":"0",
                            "topic":[],
                            "synonyms":[],
                            "antonyms":[],
                            "ischecked":true,
                            'note':note,
                            'audio':arr_audio,  
                            "category":level, 
                        } 
  
    loop_datas['datas'].push(arr_word_voca);  

    }
    // console.log(loop_datas['datas'].length);
    // console.log(loop_datas['datas']);
    return loop_datas['datas'];

}

// scrapePages();

const getListwords=
module.exports = async (req,res)=>{
    var listwords,listLinks;
    listLinks=await getListLinks();

    listwords=await scrapePages(listLinks); 

    console.log(listwords);

    if(listwords.length>1){
        const result=await Vocabulary.collection.insertMany(listwords,{ordered:true});

        return res.status(200).send( {'msg': result.insertedCount + " documents were inserted."} )
    } 
}

// getListwords();
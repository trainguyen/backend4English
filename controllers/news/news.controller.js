

const {createNewNews,
    searchNews,
    searchNewsbyCategory,
 getWordDetail,
 getFavoriteList,
}=require('../../services/news.service');

exports.postContributeNews=async(req,res,next)=>{
 console.log(req.body);
 try {
     const {picture,word,type,...rest}=req.body;

     console.log(req.body);
     //check existence of word
     // const isExist=await isExistWord(word,type);
     // if(isExist){
     //     return res
     //         .status(409)
     //         .json({message:`Từ "${word} (${type})" đã tồn tại trong từ điển`});
     // }

     // let puctureUrl=null;
     // if(picture){
     //     puctureUrl=await uploadImage(picture, 'dynonary/words');
     // }

     // create the new word
     const isCreateSuccess = await createNewNews({
     word,
     type,
     picture: null,
     isChecked: false,
     ...rest,
   });

   if (isCreateSuccess) {
     return res.status(200).json({ message: 'Tạo từ mới thành công' });
   }
   return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
 } catch (error) {
     console.error('POST CONTRIBUTE WORD ERROR: ', error);
     return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
 }
}

exports.getSearchNews=async (req,res)=>{
 try {
     const {newsTitle,isCompact = false}=req.query;
     const list=await searchNews(
        newsTitle,
         2,
         isCompact=='true'
         ?'-_id word'
         : '-_id type word mean phonetic picture',
     )
     return res.status(200).json({packList:list});
 } catch (error) {
     console.error('GET SEARCH WORD ERROR: ',error);
     return res.status(503).json({message:'Lỗi dịch vụ, thử lại sau'});
 }
}

exports.getNewsbyCategory=async (req,res)=>{
 try {
     const {newsType,isCompact = false}=req.query;  
     console.log(req.query);
     console.log(newsType);
     const list=await searchNewsbyCategory(
        newsType,
         8,
         isCompact=='true'
         ?'-_id word'
         : '-_id type word mean phonetic picture',
     )
     return res.status(200).json({packList:list});
 } catch (error) {
     console.error('GET SEARCH WORD ERROR: ',error);
     return res.status(503).json({message:'Lỗi dịch vụ, thử lại sau'});
 }
}
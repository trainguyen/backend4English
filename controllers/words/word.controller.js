

const {createNewWord,
       searchWord,
       searchWordbyCategory,
    getWordDetail,
    getFavoriteList,
}=require('../../services/word.service');

exports.postContributeWord=async(req,res,next)=>{
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
        const isCreateSuccess = await createNewWord({
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

exports.getSearchWord=async (req,res)=>{
    try {
        const {word,isCompact = false}=req.query;
        const list=await searchWord(
            word,
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

exports.getWordbyCategory=async (req,res)=>{
    try {
        const {word,isCompact = false}=req.query;  
        console.log(req.query);
        console.log(word);
        const list=await searchWordbyCategory(
            word,
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
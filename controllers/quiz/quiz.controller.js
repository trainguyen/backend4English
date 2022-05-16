const {createNewQuiz,
    searchQuiz} =require('../../services/quiz.service');

exports.postContributedQuiz=async(req,res,next)=>{
    try {
        const {category,type,difficulty,question,correct_answer,incorrect_answer}=req.body;

        //check exsistence of word

        //create the words
        const isCreateSuccess=await createNewQuiz({
            category,
            type,
            difficulty,
            question,
            correct_answer,
            incorrect_answer
        });

        if(isCreateSuccess){
            return res.status(200).json({message:'Tạo loại từ mới thành công'});
        }

        return res.status(503).json({message:'Lỗi dịch vụ, thử lại sau'});
    } catch (error) {
        console.error('POST CONTRIBUTE CATEGORY ERROR:',error);
        return res.status(503).json({message:'Lỗi dịch vụ, thử lại sau'});
    }
}

exports.getSearchQuiz=async(req,res)=>{
    try {
        const {category,isCompact=false}=req.query;
        const list=await searchQuiz(
            category,
            8,
            isCompact=='true'
            ?'-_id category':
            '-_id type category mean phoetic picture',
        )
        return res.status(200).json({results:list});
    } catch (error) {
        console.error('GET SEARCH CATEGORY ERROR: ',error);
        return res.status(503).json({message:'Lỗi dịch vụ, thử lại sau'});
    }
}
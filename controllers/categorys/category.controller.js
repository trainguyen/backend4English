const {CreateNewCategory,
    searchCategory} =require('../../services/category.service');

exports.postContributedCategory=async(req,res,next)=>{
    try {
        const {categoryThumb,category_en,category_vi,key_search}=req.body;

        //check exsistence of word

        //create the words
        const isCreateSuccess=await CreateNewCategory({
            category_en,
            category_vi,
            categoryThumb,
            key_search
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

exports.getSearchCategory=async(req,res)=>{
    try {
        const {category_en,isCompact=false}=req.query;
        const list=await searchCategory(
            category_en,
            8,
            isCompact=='true'
            ?'-_id category':
            '-_id type category mean phoetic picture',
        )
        return res.status(200).json({packList:list});
    } catch (error) {
        console.error('GET SEARCH CATEGORY ERROR: ',error);
        return res.status(503).json({message:'Lỗi dịch vụ, thử lại sau'});
    }
}
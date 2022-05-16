const categoryApi=require('express').Router();
const categoryController=require('../controllers/categorys/category.controller');
// const {jwtAuthentication}=require('../middleware/passport.middleware');

categoryApi.post('/contribute/add-category',categoryController.postContributedCategory);

categoryApi.get('/search-category',categoryController.getSearchCategory);

module.exports=categoryApi;
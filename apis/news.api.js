const NewsApi=require('express').Router();
const newsController=require('../controllers/news/news.controller');
// const {jwtAuthentication}=require('../middleware/passport.middleware');

NewsApi.post('/contribute/add-news',newsController.postContributeNews);

NewsApi.get('/search-news',newsController.getSearchNews);

NewsApi.get('/search-news-by-category',newsController.getNewsbyCategory);

module.exports=NewsApi;
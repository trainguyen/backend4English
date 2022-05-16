const wordApi=require('express').Router();
const wordController=require('../controllers/words/word.controller');
// const vocabularyController=require('../controllers/vocabularys/scrapeVocabulary');
// const {jwtAuthentication}=require('../middleware/passport.middleware');

// wordApi.get('/scrape',vocabularyController.scrapeVocabulary);

wordApi.post('/contribute/add-word',wordController.postContributeWord);

wordApi.get('/search-word',wordController.getSearchWord);

wordApi.get('/search-word-by-category',wordController.getWordbyCategory);

module.exports=wordApi;
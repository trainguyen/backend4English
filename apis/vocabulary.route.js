const express = require('express');
const router=express.Router();
const vocabularyController=require('../controllers/vocabularys');

router.get('/',vocabularyController.getVocabulary);
router.post('/search',vocabularyController.searchVocabulary);
router.get('/scrape',vocabularyController.scrapeVocabulary);

module.exports=router;
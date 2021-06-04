const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');
const validator = require('express-joi-validation').createValidator({})


router.post('/',validator.body(articleController.articleSchema), articleController.createArticle)
      .get('/', articleController.getArticle)


router
    .delete('/:articleId', validator.params(articleController.idSchema), articleController.removeArticle)
    .put('/:articleId', validator.params(articleController.idSchema),validator.body(articleController.updateArticleSchema), articleController.updateArticle)

module.exports = router;
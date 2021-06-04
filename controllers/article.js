const Joi = require('joi-oid')
const articleService = require('../services/article.service')

const articleSchema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string(),
    description: Joi.string().required(),
    owner: Joi.objectId().required(),
    category: Joi.string().valid('sport','game','history').required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),

  });
  
  const idSchema = Joi.object({
    articleId: Joi.objectId().required()
  });

  const updateArticleSchema = Joi.object({
    title: Joi.string(),
    subtitle: Joi.string(),
    description: Joi.string(),
    category: Joi.string().valid('sport','game','history'),
  });

  async function createArticle(req, res, next) {
    try {
      const data = req.body
      const result = await articleService.createArticle(data)
      return res.status(201).json(result);
  } catch (error) {
      next(error)
  }
  }

  async function getArticle(req,res,next){
    try{
      const filter = req.query;
      const result = await articleService.getArticle(filter)
      return res.status(200).json(result)
    }
    catch(e){
      next(e);
    }
  }

  async function updateArticle(req,res,next){
    try{
      const articleId = req.params.articleId;
      const payload = req.body;
      const result = await articleService.updateArticle(articleId, payload);
      return res.status(200).json(result)
    }
    catch(e){
      next(e)
    }
  }

  async function removeArticle(req, res, next) {
    try {
        const articleId = req.params.articleId;
        const result = await articleService.removeArticle(articleId);
        return res.status(200).json({ delete: 'Article was deleted' })
    }
    catch (e) {
        next(e);
    }
  }

  module.exports = {
    createArticle,
    updateArticle,
    removeArticle,
    getArticle,
    articleSchema,
    idSchema,
    updateArticleSchema
  };
const Joi = require('joi-oid')
const userService = require('../services/user.service')

const userSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  role: Joi.string().valid('admin','writer','quest'),
  createdAt: Joi.date(),
  numberOfArticles: Joi.number(),
  nickname: Joi.string()
});

const idSchema = Joi.object({
  userId: Joi.objectId().required()
});

const updateUserSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  role: Joi.string().valid('admin','writer','quest'),
})

async function createUser(req, res, next) {
  try {
    const data = req.body
    const result = await userService.createUser(data)
    return res.status(201).json(result);
} catch (error) {
    next(error)
}
}

async function getUserArticles(req,res,next){
  try{
    const userId = req.params.userId;
    const result = await userService.getUserArticles(userId)
    return res.status(200).json(result)
  }
  catch(e){
    next(e);
  }
}

async function getUser(req,res,next){
  try{
    const userId = req.params.userId;
    const result = await userService.getUser(userId)
    return res.status(200).json(result)
  }
  catch(e){
    next(e);
  }
}

async function removeUser(req, res, next) {
  try {
      const userId = req.params.userId;
      const result = await userService.removeUser(userId);
      return res.status(200).json({ delete: 'User was deleted' })
  }
  catch (e) {
      next(e);
  }
}

async function updateUser(req, res, next) {
  try {
      const userId = req.params.userId;
      const payload = req.body;
      const result = await userService.updateUser(userId, payload);
      return res.status(200).json(result)
  }
  catch (e) {
      next(e)
  }
}
module.exports = {
  createUser,
  updateUser,
  removeUser,
  getUserArticles,
  getUser,
  userSchema,
  idSchema,
  updateUserSchema
};

const { badRequest } = require('../config/errorHelper');
const User = require('../models/user')
const Article = require('../models/article')


async function createUser(data) {
    const existingUser = await User.findOne({nickname: data.nickname});
    if (existingUser) {
        throw badRequest(`User with nickname -${existingUser.nickname}- already exists`);
    }
    return await User.create(data)
}

async function getUserArticles(userId){
    const user = await User.findById(userId).populate('articles', 'title subtitle category createdAt updatedAt');
    if (!user) {
        throw badRequest('User not exists')
    }
    return user;
}

async function getUser(userId){
    const user = await User.findById(userId);
    if (!user) {
        throw badRequest('User not exists')
    }
    return user;
}

async function removeUser(userId) {
    const user = User.findById(userId)
    if(!user){
        throw badRequest('User not exists');
    }
    await Article.deleteMany({owner : userId});
    return await User.deleteOne({_id:userId});
}

async function updateUser(userId, payload) {
    const user = await User.findByIdAndUpdate(userId,payload);
    if (!user) {
        throw badRequest('User not exists')
    }
    return user;
}


module.exports = {
    createUser,
    removeUser,
    updateUser,
    getUserArticles,
    getUser
}


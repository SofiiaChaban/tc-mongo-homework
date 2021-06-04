const { badRequest } = require('../config/errorHelper');
const Article = require('../models/article')
const User = require('../models/user')


async function createArticle(data) {
    const targetUser = await User.findOne({_id: data.owner});
    if (!targetUser) {
        throw badRequest('No user found');
    }
    const article = await Article.create(data);
    targetUser.articles.push(article._id);
    targetUser.numberOfArticles+=1;
    await targetUser.save();
    return article;
}


async function removeArticle(articleId) {
    const targetArticle = await Article.findOne({_id: articleId});
    if (!targetArticle) {
        throw badRequest('article not exists')
    }
    const targetUser = await User.findOne({_id: targetArticle.owner});
    if (!targetUser) {
        throw badRequest('No user found');
    }
    targetUser.numberOfArticles-=1;
    targetUser.articles.remove(articleId)
    await targetUser.save();
    return await Article.findByIdAndRemove(articleId);
}

async function updateArticle(articleId, payload) {
    payload['updatedAt'] = new Date()
    const article = await Article.findByIdAndUpdate(articleId,payload);
    if (!article) {
        throw badRequest('article not exists')
    }
    article.updatedAt = new Date()
    await article.save();
    return article;
}

async function getArticle(filters) {
    const articles = await Article.find(filters);
    if(!articles.length){
        throw badRequest('Articles not exist');
    }
    return articles;
}


module.exports = {
    createArticle,
    removeArticle,
    updateArticle,
    getArticle
}

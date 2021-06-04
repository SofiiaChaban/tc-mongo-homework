const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;



const UserSchema = new Schema({
    firstname: {type:String,min:4,max:50,required:true},
    lastname: {type:String,min:3,max:60,required:true},
    role:{
        type: String,
        enum: ['admin','writer','quest']
    },
    createdAt: {type: Date, default: new Date()},
    numberOfArticles: {type:Number, default:0},
    articles: [{type:ObjectId,ref:"Article"}],
    nickname: {type:String}
});

module.exports = mongoose.model('User', UserSchema);
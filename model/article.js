//创建集合
//引入mongoose模块

const mongoose = require('mongoose')

//创建集合规则
//1.集合名称
//2.集合规则

const articleSchema = new mongoose.Schema({
        title: {
            type: String,
            maxlength: 20,
            minlength: 5,
            require: [true, '请填写文章标题']
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, '请传递作者']

        },
        publishDate: {
            type: Date,
            default: Date.now
        },
        cover: {
            type: String,
            default: null
        },
        content: {
            type: String,
            minlength: 5

        }


    })
    //使用规则创建学生文章集合
const Article = mongoose.model('Article', articleSchema)


//将集合规则为模块成员进行导出
module.exports = {
    Article
}
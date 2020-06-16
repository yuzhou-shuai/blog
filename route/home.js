//引用express框架
const express = require('express')
    //创建博客展示页面路由
const home = express.Router()

const { Article } = require('../model/article')
const { Comment } = require('../model/comment')

//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page')

//博客前台展示页面
home.get('/', async(req, res) => {
    // 获取页码值
    const page = req.query.page;

    // 从数据库中查询数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();

    // res.send('欢迎来到博客首页')
    // 渲染模板并传递数据
    res.render('home/default.html', {
        result: result
    });
})


//博客前台文章详情展示页面
home.get('/article', async(req, res) => {
    //获取客户端传过来的id
    const id = req.query.id
        //查询文章详细信息
    let article = await Article.findOne({ _id: id }).populate('author')

    //查询评论信息
    let comment = await Comment.find({ aid: id }).populate('uid')

    res.render('home/article', {
        article,
        comment
    })
})


//评论路由
home.post('/comment', async(req, res) => {



    const { content, uid, aid } = req.body

    //将评论信息存储在评论集合中
    await Comment.create({

        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    })
    res.redirect('/home/article?id=' + aid)
})



//实现退出功能
home.get('/logout', (req, res) => {
    //删除session
    req.session.destroy(function() {
        //删除cookie
        res.clearCookie('connect.sid')
            //清除模板中的用户信息
        req.app.locals.userInfo = null
            //重定向到登录页面
        res.redirect('/admin/login')
    })

})








//将模块路由导出
module.exports = home
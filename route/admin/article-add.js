//导入formidable模块
const formidable = require('formidable')

const path = require('path')

const { Article } = require('../../model/article')



module.exports = (req, res) => {
    //1.创建表单解析对象
    const form = new formidable.IncomingForm()
        //2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
        //3.保留上传文件的后缀
    form.keepExtensions = true
        //4.解析表单
    form.parse(req, async(err, fields, files) => {
        //1.err错误对象，如果表单解析失败，err里面存储错误信息，如果表单解析成功将会是null
        //2.fields对象类型，保存普通表单数据
        //3.files对象类型，保存与上传文件相关的数据

        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })
        res.redirect('/admin/article')
    })


}
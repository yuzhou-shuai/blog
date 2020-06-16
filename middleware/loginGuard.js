module.exports = (req, res, next) => {
    //判断用户访问的是否是登录页面
    //判断用户的的登录状态
    //判断是否生成session下的username

    if (req.url != '/login' && !req.session.username) {
        if (req.url == '/register') {
            return next()
        }
        //如果用户不是登录的，重定向到登录页面
        res.redirect('/admin/login')
    } else {
        //如果是普通用户登录则不能进入管理后台
        if (req.session.role == 'normol') {
            //重定向回到博客首页
            return res.redirect('/home/')
        }

        //用户是登录状态，放行

        next()

    }
}
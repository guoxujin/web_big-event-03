$(function () {

    // 点击 注册按钮
    $('#link_reg').on('click', function () {
        $('.login-box').hide().next('div').show()
    });

    // 点击 登录按钮
    $('#link_login').on('click', function () {
        $('.reg-box').hide().prev('.login-box').show()
    });

    


})
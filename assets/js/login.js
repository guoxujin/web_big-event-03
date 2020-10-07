$(function () {

    // 点击去注册按钮
    $('#link_reg').on('click', function () {
        $('.login-box').hide().next('div').show()
    })

    // 点击登录按钮
    $('#link_login').on('click', function () {
        $('.reg-box').hide().prev().show();
    })


    // ----------------------------- 表单校验 ---------------------------
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repwd: function (value) {

            var pwd = $('.reg-box [name=password]').val();

            if (pwd !== value) {
                return '两次密码不一致,请确认密码'
            }
        }

    });

    // ---------------------------- 注册功能 ------------------------------
    $('#form_reg').on('submit', function (e) {

        e.preventDefault();

        $.ajax({
            url:'/api/reguser',
            type:'post',
            data: {
                username: $('#form_reg [name=username]').val(),
                password:  $('#form_reg [name=password]').val(),
            },
            success: function(res){
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                
                layer.msg('注册成功')
                $('#link_login').click();
                $('#form_reg .layui-input').val('')
            }
        });
    })

    // --------------------------- 登录功能 --------------------------------
    $('#form_login').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url:'/api/login',
            type:'post',
            data: $(this).serialize(),
            success: function(res){
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }

                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    })

})
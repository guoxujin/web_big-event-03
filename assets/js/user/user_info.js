$(function () {
    // -------------------------- 整体表单验证 ---------------------------
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '请输入1到6位的昵称'
            }
        }
    })


    // 
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        });
    }


    // 重置功能
    $('#btnReset').on('click', function (e) {
        e.preventDefault()

        initUserInfo()
    })


    // 修改功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')

                window.parent.getUserInfo();
            }
        });
    })

})
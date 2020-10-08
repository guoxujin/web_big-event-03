$(function () {

    getUserInfo();

    // --------------------------- 退出功能 ------------------------------
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')

            location.href = '/login.html'

            layer.close(index);
        });

    })

})

// 渲染用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {

            // 失败给出提示
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')

            }


            // 成功后渲染到页面
            renderAvatar(res.data)
            // console.log(res);
        },
        // complete: function (res) {
        //     console.log(res);
        //     // responseJSON   "身份认证失败！"
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                
        //         localStorage.removeItem('token')

        //         location.href = '/login.html'

        //     }
        // }
    });

};

function renderAvatar(user) {
    var name = user.nickname || user.username

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-tavtar').hide()
    } else {
        $('.layui-nav-img').hide()

        var first = name[0].toUpperCase()

        $('.text-tavtar').html(first).show()
    }
}
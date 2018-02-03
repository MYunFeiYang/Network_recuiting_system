function login() {
    let user = {};
    user.login_type = $('#login_type').val();
    user.nickname = $('#login_nickname').val();
    user.password = $('#login_password').val();
    $.ajax({
        url: '/public?public=login',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            confirm_box_c = $("#confirm_login_box");
            if (data.msg === "login_fail") {
                confirm_box_c.html("用户名或密码错误");
                confirm_box_c.attr('class', 'alert-warning');
            }
            else if (data.msg === "login_success") {
                $("#close_login").click();
                login_session("login");
                window.parent.location.reload();
            }
        },
        fail: function () {

        }
    })
}

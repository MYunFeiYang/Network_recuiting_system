"use strict";
let user;
let email;

function setCookie(c_name, value, expireDays) {
    let existDate = new Date();
    existDate.setDate(existDate.getDate() + expireDays);
    document.cookie = c_name + "=" + value +
        ((expireDays === null) ? "" : ";expires=" + existDate.toGMTString());
}

function resetPassword() {
    let user = {};
    email = document.getElementById("email").value;
    user.email = email;
    $.ajax({
        url: '/public?public=resetPassword',
        data: user,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            let confirm_box = document.getElementById("confirm_box");
            if (data.msg === "email_not_exist") {
                confirm_box.setAttribute("class", "alert-warning");
                confirm_box.innerHTML = "该邮箱未注册";
                return;
            } else if (data.msg !== "") {
                confirm_box.setAttribute("class", "alert-warning");
                confirm_box.innerHTML = "注意接收重置密码邮件";
                document.getElementById("basic-addon1").innerHTML = "请输入验证码";
                if (document.cookie.indexOf("user")!==-1) {
                    let user_string = document.cookie.split(";")[0].split("=")[1];
                    user = JSON.parse(user_string);
                } else {
                    user = {};
                }
                user.code = data.msg;
                setCookie("user", JSON.stringify(user), 180);
                document.getElementById("btu_resetPassword").setAttribute("onclick","check_code()");
                document.getElementById("email").value = "";
            }
        },
        fail: function (data) {
            alert(data);
        },
    });
}

function check_code() {
    user = JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    let code = document.getElementById("email").value;
    let confirm_box = document.getElementById("confirm_box");
    if (code === user.code) {
        confirm_box.setAttribute("class", "alert-success");
        confirm_box.innerHTML = "验证码正确";
        document.getElementById("group_reset").innerHTML = "" +
            "<span class=\"input-group-addon\" id=\"basic-addon1\">密码</span>\n" +
            "<input type=\"password\" id=\"password\" class=\"form-control\" aria-describedby=\"basic-addon1\">\n" +
            "<span class=\"input-group-addon\" id=\"basic-addon1\">确认密码</span>\n" +
            "<input type=\"password\" id=\"password2\" class=\"form-control\" aria-describedby=\"basic-addon1\">\n";
        let btu_resetPassword = document.getElementById("btu_resetPassword");
        btu_resetPassword.innerHTML = "确认";
        btu_resetPassword.setAttribute("onclick","updatePassword()");
    }
    else {
        confirm_box.setAttribute("class", "alert-warning");
        confirm_box.innerHTML = "验证码错误";
    }
}

function updatePassword() {
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let confirm_box = document.getElementById("confirm_box");
    if (password !== password2) {
        confirm_box.setAttribute("class", "alert-warning");
        confirm_box.innerHTML = "密码不一致";
    } else {
        confirm_box.setAttribute("class", "alert-success");
        confirm_box.innerHTML = "密码通过";
        if (document.cookie.indexOf("user")!==-1) {
            let user_string = document.cookie.split(";")[0].split("=")[1];
            let user = JSON.parse(user_string);
            user.password = password;
            setCookie("user", JSON.stringify(user), 180);
            $.ajax({
                url: '/public?public=updatePassword',
                data: user,
                type: 'POST',
                dataType: 'JSON',
                success: function (data) {
                    let confirm_box = document.getElementById("confirm_box");
                    if (data.msg === "updatePassword_success") {
                        confirm_box.setAttribute("class", "alert-success");
                        confirm_box.innerHTML = "密码修改成功";
                        document.getElementById("btu_resetPassword").innerHTML = "<a href='index.html' style='color: white'>返回登录</a>"
                    }
                },
                fail: function () {

                }

            })
        }
    }
}

function close_parent(obj) {
    obj.parentNode.style.display = "none";
}
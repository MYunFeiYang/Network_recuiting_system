"use strict";
let n_confirm_box_c;
let o_user;
let c_nickname;
let c_password;
let c_name;
let c_con_password;
let c_email;
let c_telephone;
let check_status;
//检测邮箱是否已注册
function check_email(obj) {
    o_user = {};
    c_email = obj.value;
    o_user.email = c_email;
    $.ajax({
        url: '/public?public=checkemail',
        data: o_user,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            n_confirm_box_c = obj.nextElementSibling;
            if (data.msg === "email_exist") {
                n_confirm_box_c.setAttribute("style", "color:red");
                n_confirm_box_c.innerHTML = "请邮箱已被注册";
                return check_status=false;
            } else {
                n_confirm_box_c.innerHTML = "";
                n_confirm_box_c.classList.add("glyphicon");
                n_confirm_box_c.classList.add("glyphicon-ok");
                n_confirm_box_c.setAttribute("style", "color:blue");
                return check_status=true;
            }
        },
    });
}
//正则匹配用户名是否符合要求
function reg_username(obj) {
    let uPattern = /^[\u4e00-\u9fff\w]{5,16}$/;
    c_nickname = obj.value;
    n_confirm_box_c = obj.nextElementSibling;
    if (uPattern.test(c_nickname)) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.classList.add("glyphicon");
        n_confirm_box_c.classList.add("glyphicon-ok");
        n_confirm_box_c.setAttribute("style", "color:blue");
        return check_status=true;
    } else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "5-16位由字母、数字、_或汉字";
        return check_status=false;
    }
}
//正则匹配密码是否符合要求
function reg_pwd(obj) {
    c_password = obj.value;
    let reg = /^[A-Za-z0-9]{6,20}$/;
    n_confirm_box_c = obj.nextElementSibling;
    if (reg.test(c_password)) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.classList.add("glyphicon");
        n_confirm_box_c.classList.add("glyphicon-ok");
        n_confirm_box_c.setAttribute("style", "color:blue");
        return check_status=true;
    } else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "密码必须是6到20位数字字母组合";
        return check_status=false;
    }
}
//正则匹配姓名是否胡乱输入
function reg_name(obj) {
    c_name = obj.value;
    let reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
    n_confirm_box_c = obj.nextElementSibling;
    if (reg.test(c_name)) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.classList.add("glyphicon");
        n_confirm_box_c.classList.add("glyphicon-ok");
        n_confirm_box_c.setAttribute("style", "color:blue");
        return check_status=true;
    } else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "请输入你的真实姓名";
        return check_status=false;
    }
}
//正则匹配电话号码是否符合要求
function reg_telephone(obj) {
    c_telephone = obj.value;
    let mPattern = /^1[3|4|5|8][0-9]\d{4,8}$/;
    n_confirm_box_c = obj.nextElementSibling;
    if (mPattern.test(c_telephone)) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.classList.add("glyphicon");
        n_confirm_box_c.classList.add("glyphicon-ok");
        n_confirm_box_c.setAttribute("style", "color:blue");
        return check_status=true;
    } else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.innerHTML = "手机号不完整或前七位不正确";
        return check_status=false;
    }
}
//正则匹配邮箱是否符合要求
function reg_email(obj) {
    c_email = obj.value;
    let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    n_confirm_box_c = obj.nextElementSibling;
    if (ePattern.test(c_email)) {
        check_email(obj)
    } else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "请输入正确email邮箱";
        return check_status=false;
    }
}
//验证两次密码是否一致
function conf_pwd(obj, id) {
    c_con_password = obj.value;
    c_password = document.getElementById(id).value;
    n_confirm_box_c = obj.nextElementSibling;
    if (c_password === c_con_password) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.classList.add("glyphicon");
        n_confirm_box_c.classList.add("glyphicon-ok");
        n_confirm_box_c.setAttribute("style", "color:blue");
        return check_status=true;
    }
    else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "两次密码不一致";
        return check_status=false;
    }
}

$(document).ready(function () {
    $("form .row:last").mouseenter(function () {
        if (check_status){
            $("form input").each(function () {
                if ($(this).val()===""||$(this).val()===null){
                    return;
                }
                $(this).attr("disabled",false);
            })
        }
    })
})

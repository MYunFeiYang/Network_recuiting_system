"use strict";
let btu_register_status = false;
let n_confirm_box_c;
let o_user;
let c_nickname;
let c_password;
let c_name;
let c_industry;
let c_address;
let c_con_password;
let c_email;
let c_telephone;

function check_email(id, confirm_box) {
    o_user = {};
    c_email = document.getElementById(id).value;
    o_user.email = c_email;
    $.ajax({
        url: '/public?public=checkemail',
        data: o_user,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            n_confirm_box_c = document.getElementById(confirm_box);
            if (data.msg === "email_exist") {
                n_confirm_box_c.setAttribute("style", "color:red");
                n_confirm_box_c.innerHTML = "请邮箱已被注册";
                return btu_register_status = false;
            } else {
                n_confirm_box_c.innerHTML = "";
                n_confirm_box_c.classList.add("glyphicon");
                n_confirm_box_c.classList.add("glyphicon-ok");
                n_confirm_box_c.setAttribute("style", "color:blue");
                return btu_register_status = true;
            }
        },
        fail: function (data) {
            alert(data);
        },
    });
}

function reg_username(nickname, confirm_box) {
    let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    c_nickname = document.getElementById(nickname).value;
    n_confirm_box_c = document.getElementById(confirm_box);
    if (uPattern.test(c_nickname)) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.classList.add("glyphicon");
        n_confirm_box_c.classList.add("glyphicon-ok");
        n_confirm_box_c.setAttribute("style", "color:blue");
        return btu_register_status = true;
    } else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "4到16位（字母，数字，下划线，减号）";
        return btu_register_status = false
    }
}

function reg_pwd(password, confirm_box) {
    c_password = document.getElementById(password).value;
    let reg = /^[A-Za-z0-9]{6,20}$/;
    n_confirm_box_c = document.getElementById(confirm_box);
    if (reg.test(c_password)) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.classList.add("glyphicon");
        n_confirm_box_c.classList.add("glyphicon-ok");
        n_confirm_box_c.setAttribute("style", "color:blue");
        return btu_register_status = true;
    } else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "密码必须是6到20位数字字母组合";
        return btu_register_status = false;
    }
}

function reg_telephone(telephone, confirm_box) {
    c_telephone = document.getElementById(telephone).value;
    let mPattern = /^1[3|4|5|8][0-9]\d{4,8}$/;
    n_confirm_box_c = document.getElementById(confirm_box);
    if (mPattern.test(c_telephone)) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.classList.add("glyphicon");
        n_confirm_box_c.classList.add("glyphicon-ok");
        n_confirm_box_c.setAttribute("style", "color:blue");
        return btu_register_status = true;
    } else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.innerHTML = "手机号不完整或前七位不正确";
        return btu_register_status = false;
    }
}

function reg_email(email, confirm_box) {
    c_email = document.getElementById(email).value;
    let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    n_confirm_box_c = document.getElementById(confirm_box);
    if (ePattern.test(c_email)) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "请验证邮箱是否存在";
        return btu_register_status = true;
    } else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "请输入email邮箱";
        return btu_register_status = false;
    }
}

function conf_pwd(password, confirm_password, confirm_box) {
    c_password = document.getElementById(password).value;
    c_con_password = document.getElementById(confirm_password).value;
    n_confirm_box_c = document.getElementById(confirm_box);
    //alert(confirm_password);
    if (c_password === c_con_password) {
        n_confirm_box_c.innerHTML = "";
        n_confirm_box_c.classList.add("glyphicon");
        n_confirm_box_c.classList.add("glyphicon-ok");
        n_confirm_box_c.setAttribute("style", "color:blue");
        return btu_register_status = true;
    }
    else {
        n_confirm_box_c.setAttribute("style", "color:red");
        n_confirm_box_c.innerHTML = "两次密码不一致";
        return btu_register_status = false;
    }
}

function btu_disable_person(reg_btu, check_box) {
    c_name = document.getElementById("person_name").value;
    if (btu_register_status && c_name !== "") {
        document.getElementById(check_box).innerHTML = "信息已填写完整";
        document.getElementById(check_box).setAttribute("class", "alert-success");
    }
    else {
        document.getElementById(reg_btu).setAttribute("disabled", "disabled");
        document.getElementById(check_box).innerHTML = "请先填完注册信息";
        document.getElementById(check_box).setAttribute("class", "alert-warning");
    }
}

function btu_disable_enterprise(reg_btu, check_box) {
    c_name = document.getElementById("enterprise_name").value;
    c_industry = document.getElementById("enterprise_industry").value;
    c_address = document.getElementById("enterprise_address").value;
    if (btu_register_status && c_name !== "" && c_industry !== "" && c_address !== "") {
        document.getElementById(check_box).innerHTML = "信息已填写完整";
        document.getElementById(check_box).setAttribute("class", "alert-success");
    } else {
        document.getElementById(reg_btu).setAttribute("disabled", "disabled");
        document.getElementById(check_box).innerHTML = "请先填完注册信息";
        document.getElementById(check_box).setAttribute("class", "alert-warning");
    }
}

function btu_able(reg_btu) {
    document.getElementById(reg_btu).removeAttribute("disabled");
}

function btu_disable_person_modify(reg_btu, check_box) {
    if (btu_register_status) {
        document.getElementById(check_box).innerHTML = "信息已填写完整";
        document.getElementById(check_box).setAttribute("class", "alert-success");
    }
    else {
        document.getElementById(reg_btu).setAttribute("disabled", "disabled");
        document.getElementById(check_box).innerHTML = "请先填完注册信息";
        document.getElementById(check_box).setAttribute("class", "alert-warning");
    }
}

function btu_disable_enterprise_modify(reg_btu, check_box) {
    if (btu_register_status) {
        document.getElementById(check_box).innerHTML = "信息已填写完整";
        document.getElementById(check_box).setAttribute("class", "alert-success");
    } else {
        document.getElementById(reg_btu).setAttribute("disabled", "disabled");
        document.getElementById(check_box).innerHTML = "请先填完注册信息";
        document.getElementById(check_box).setAttribute("class", "alert-warning");
    }
}

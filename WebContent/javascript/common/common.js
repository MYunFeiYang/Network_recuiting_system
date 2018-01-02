"use strict";
let confirm_box_c;
let logout;
let logout_a;
let chat;
let chat_a;
let head_sculpture;
let head_sculpture_a;
function register_person() {
    let user = {};
    user.nickname = $("#person_nickname").val();
    user.password = $("#person_password").val();
    user.name = $("#person_name").val();
    user.telephone = $("#person_telephone").val();
    user.email = $("#person_email").val();
    $.ajax({
        url: "/person?person=register",
        data: user,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            confirm_box_c = $("#confirm_person_box");
            if (data.msg === "assessing") {
                confirm_box_c.html("账号在审核，您可以先登录");
                confirm_box_c.attr("class", "alert-success");
                setTimeout(function () {
                    window.location.href = "../../index.jsp"
                }, 3000);
            } else {
                confirm_box_c.html("用户名和密码已存在");
                confirm_box_c.attr("class", "alert-warning");
            }
        },
        fail: function (data) {
            alert(data);
        },
    });
}

function register_enterprise() {
    let company = {};
    company.nickname = $("#enterprise_nickname").val();
    company.password = $("#enterprise_password").val();
    company.name = $("#enterprise_name").val();
    company.industry = $("#enterprise_industry").val();
    company.telephone = $("#enterprise_telephone").val();
    company.email = $("#enterprise_email").val();
    company.address = $("#enterprise_address").val();
    $.ajax({
        url: "/enterprise?enterprise=register",
        data: company,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            confirm_box_c = $("#confirm_enterprise_box");
            if (data.msg === "assessing") {
                confirm_box_c.html("账号在审核，您可以先登录");
                confirm_box_c.attr('class', 'alert-success');
                setTimeout(function () {
                    window.location.href = "../../index.jsp"
                }, 3000);
            } else {
                confirm_box_c.html("该用户名和密码已存在");
                confirm_box_c.attr('class', 'alert-warning');
            }
        },
        fail: function (data) {
            alert(data);
        },
    });
}

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
                login_session('login');
            }
        },
        fail: function () {

        }
    })
}

function get_head_picture(user) {
    $.ajax({
        url: '/public?public=getHeadPicture',
        data: user,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.email !== undefined) {
                show_head_picture(data)
            }
        }
    })
}

function show_head_picture(data) {
    let email = data.email;
    let fileType = data.fileType;
    let fileName = data.fileName;
    let src = "/resource/files" + "/" + email + "/" + fileType + "/" + fileName;
    $("#head_picture").attr("src",src);
    $("#head_picture").removeClass("hidden");

}

function close_login() {
    $("#close_login").click();
}

function login_session(data) {
    let user = {};
    user.login = data;
    user.nickname = $("#login_nickname").val();
    user.password = $("#login_password").val();
    user.login_type = $("#login_type").val();
    $.ajax({
        url: '/public?public=loginSession',
        async: true,
        data: user,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            login_session_result(data)
        },
        fail: function (data) {
            alert(data);
        },
    });
}

function login_session_result(data) {
    if (data !== null) {
        get_head_picture(data);
        init_user(data.nickname);
        let user_center = $("#user_center");
        head_sculpture = document.createElement("li");
        head_sculpture_a = document.createElement("a");
        chat = document.createElement("li");
        chat_a = document.createElement("a");
        logout = document.createElement("li");
        logout_a = document.createElement("a");
        head_sculpture.append(head_sculpture_a);
        head_sculpture_a.text = "修改头像";
        head_sculpture_a.setAttribute("data-toggle", "modal");
        head_sculpture_a.setAttribute("data-target", "#head_sculpture");
        head_sculpture_a.setAttribute("onclick", "close_nav();userType='person'");
        head_sculpture_a.innerHTML="修改头像<img src=\"image/common/head.png\" style=\"width:20px;height: 20px;float: right\">";
        chat.append(chat_a);
        chat_a.text = "问道空间";
        chat_a.setAttribute("data-href", "webchat.html");
        chat_a.setAttribute("onclick", "close_nav();return change_iframe_src(this)");
        chat_a.innerHTML="问道空间<img src=\"image/common/chat.png\" style=\"width:20px;height: 20px;float: right\">";
        logout.append(logout_a);
        logout_a.text = "退出";
        logout_a.setAttribute("style", "color:red !important");
        logout_a.setAttribute("onclick", "login_session('delete')");
        logout_a.setAttribute("href", "index.jsp");
        logout_a.innerHTML="退出<img src=\"image/common/logout.png\" style=\"width:20px;height: 20px;float: right\">";
        if (data.login_type === "person") {
            let person_center = document.createElement("li");
            user_center.append(head_sculpture,person_center,chat,logout);
            let person_center_a = document.createElement("a");
            person_center.append(person_center_a);
            person_center_a.text = "个人中心";
            person_center_a.setAttribute("data-href", "person.html");
            person_center_a.setAttribute("onclick", "close_nav();change_iframe_src(this)");
            person_center_a.innerHTML="个人中心<img src=\"image/person/person.png\" style=\"width:20px;height: 20px;float: right\">";
        }
        else if (data.login_type === "enterprise") {
            let enterprise_center = document.createElement("li");
            let enterprise_center_a = document.createElement("a");
            user_center.append(head_sculpture,enterprise_center,chat,logout);
            enterprise_center.append(enterprise_center_a);
            enterprise_center_a.setAttribute("data-href", "enterprise.html");
            enterprise_center_a.setAttribute("onclick", "close_nav();change_iframe_src(this)");
            enterprise_center_a.innerHTML="企业中心<img src=\"image/enterprise/enterprise.png\" style=\"width:20px;height: 20px;float: right\">";
        }
        else if (data.login_type === "admin") {
            let admin = document.createElement("li");
            let admin_a = document.createElement("a");
            user_center.append(admin,chat,logout);
            admin.append(admin_a);
            admin_a.setAttribute("data-href", "admin.html");
            admin_a.setAttribute("onclick", "close_nav();change_iframe_src(this)");
            admin_a.innerHTML="后台管理<img src=\"image/common/admin.png\" style=\"width:20px;height: 20px;float: right\">";
        }
    }
}

function init_user(nickname) {
    $("#register_btu").html("");
    $("#login_btu").html(nickname);
    $("#user_center").html("");
}

function change_iframe_src(obj) {
    $("iframe:first").attr("src",obj.getAttribute("data-href"));
}

function change_theme(obj) {
    $("#background").attr("src",obj.src);
}

function response_background() {
    if (document.body.offsetHeight > document.body.offsetWidth) {
        document.all.background.src = "image/theme/1.jpg";
        let img = document.all.theme.getElementsByTagName("img");
        for (let i = 0; i < img.length; i++) {
            img[i].src = "image/theme/" + (i + 1) + ".jpg";
        }
    }
}

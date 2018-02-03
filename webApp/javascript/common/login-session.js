"use strict";
let confirm_box_c;
let logout;
let logout_a;
let chat;
let chat_a;
let head_sculpture;
let head_sculpture_a;
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
        head_sculpture_a.setAttribute("onclick", "userType='person'");
        head_sculpture_a.innerHTML="修改头像<i class=''></i>";
        chat.append(chat_a);
        chat_a.text = "问道空间";
        chat_a.setAttribute("href", "webchat.html");
        chat_a.setAttribute("target","myiframe");
        chat_a.innerHTML="问道空间<i class='fa-comments'></i>";
        logout.append(logout_a);
        logout_a.text = "退出";
        logout_a.setAttribute("style", "color:red !important");
        logout_a.setAttribute("onclick", "login_session('delete')");
        logout_a.setAttribute("href", "index.jsp");
        logout_a.innerHTML="退出<i class=''></i>";
        if (data.login_type === "person") {
            let person_center = document.createElement("li");
            user_center.append(head_sculpture,person_center,chat,logout);
            let person_center_a = document.createElement("a");
            person_center.append(person_center_a);
            person_center_a.text = "个人中心";
            person_center_a.setAttribute("href", "person.html");
            person_center_a.setAttribute("target","myiframe");
            person_center_a.innerHTML="个人中心<i class=''></i>";
        }
        else if (data.login_type === "enterprise") {
            let enterprise_center = document.createElement("li");
            let enterprise_center_a = document.createElement("a");
            user_center.append(head_sculpture,enterprise_center,chat,logout);
            enterprise_center.append(enterprise_center_a);
            enterprise_center_a.setAttribute("href", "enterprise.html");
            enterprise_center_a.setAttribute("target","myiframe");
            enterprise_center_a.innerHTML="企业中心<i class=''></i>";
        }
        else if (data.login_type === "admin") {
            let admin = document.createElement("li");
            let admin_a = document.createElement("a");
            user_center.append(admin,chat,logout);
            admin.append(admin_a);
            admin_a.setAttribute("href", "admin.html");
            admin_a.setAttribute("target","myiframe");
            admin_a.innerHTML="后台管理<i class=''></i>";
        }
    }
}

function init_user(nickname) {
    $("#register_btu").html("");
    $("#login_btu").html(nickname);
    $("#user_center").html("");
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
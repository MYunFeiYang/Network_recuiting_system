"use strict";
let confirm_box_c;
function setCookie(c_name, value, expireDays) {
    let existDate = new Date();
    existDate.setDate(existDate.getDate() + expireDays);
    document.cookie = c_name + "=" + value +
        ((expireDays === null) ? "" : ";expires=" + existDate.toGMTString());
}

function register_person() {
    let user = {};
    user.nickname = document.getElementById("person_nickname").value;
    user.password = document.getElementById("person_password").value;
    user.name = document.getElementById("person_name").value;
    user.telephone = document.getElementById("person_telephone").value;
    user.email = document.getElementById("person_email").value;
    $.ajax({
        url: "/person?person=register",
        data: user,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            confirm_box_c = document.getElementById("confirm_person_box");
            if (data.msg === "assessing") {
                confirm_box_c.innerHTML = "账号在审核，您可以先登录";
                confirm_box_c.setAttribute("class", "alert-success");
                setTimeout(function () {
                    window.location.href = "../../index.jsp"
                }, 3000);
            } else {
                confirm_box_c.innerHTML = "用户名和密码已存在";
                confirm_box_c.setAttribute("class", "alert-warning");
            }
        },
        fail: function (data) {
            alert(data);
        },
    });
}

function register_enterprise() {
    let company = {};
    company.nickname = document.getElementById("enterprise_nickname").value;
    company.password = document.getElementById("enterprise_password").value;
    company.name = document.getElementById("enterprise_name").value;
    company.industry = document.getElementById("enterprise_industry").value;
    company.telephone = document.getElementById("enterprise_telephone").value;
    company.email = document.getElementById("enterprise_email").value;
    company.address = document.getElementById("enterprise_address").value;
    $.ajax({
        url: "/enterprise?enterprise=register",
        data: company,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            confirm_box_c = document.getElementById("confirm_enterprise_box");
            if (data.msg === "assessing") {
                confirm_box_c.innerHTML = "账号在审核，您可以先登录";
                confirm_box_c.setAttribute('class', 'alert-success');
                setTimeout(function () {
                    window.location.href = "../../index.jsp"
                }, 3000);
            } else {
                confirm_box_c.innerHTML = "该用户名和密码已存在";
                confirm_box_c.setAttribute('class', 'alert-warning');
            }
        },
        fail: function (data) {
            alert(data);
        },
    });
}

function login() {
    let user = {};
    user.login_type = document.getElementById('login_type').value;
    user.nickname = document.getElementById('login_nickname').value;
    user.password = document.getElementById('login_password').value;
    $.ajax({
        url: '/public?public=login',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            confirm_box_c = document.getElementById("confirm_login_box");
            if (data.msg === "login_fail") {
                confirm_box_c.innerHTML = "用户名或密码错误";
                confirm_box_c.setAttribute('class', 'alert-warning');
            }
            else if (data.msg === "login_success") {
                document.getElementById("close_login").click();
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
            if (data!==null){
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
    document.all.head_picture.src = src;
    document.all.head_picture.classList.remove("hidden");

}

function close_login() {
    document.getElementById("close_login").click();
}

function login_session(data) {
    let user = {};
    user.login = data;
    user.nickname = document.getElementById("login_nickname").value;
    user.password = document.getElementById("login_password").value;
    user.login_type = document.getElementById("login_type").value;
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
        let user_center = document.getElementById("user_center");
        if (data.login_type === "person") {
            let head_sculpture = document.createElement("li");
            let head_sculpture_a = document.createElement("a");
            user_center.appendChild(head_sculpture);
            head_sculpture.appendChild(head_sculpture_a);
            head_sculpture_a.text = "修改头像";
            head_sculpture_a.setAttribute("data-toggle", "modal");
            head_sculpture_a.setAttribute("data-target", "#head_sculpture");
            head_sculpture_a.setAttribute("onclick", "close_nav();userType='person'");
            let modify_resume = document.createElement("li");
            let modify_resume_a = document.createElement("a");
            user_center.appendChild(modify_resume);
            modify_resume.appendChild(modify_resume_a);
            modify_resume_a.text = "个人中心";
            modify_resume_a.href = "person.html";
            modify_resume_a.setAttribute("onclick", "close_nav();return change_iframe_src(this)");
            let chat = document.createElement("li");
            user_center.appendChild(chat);
            let chat_a = document.createElement("a");
            chat.appendChild(chat_a);
            chat_a.text = "问道空间";
            chat_a.href = "webchat.html";
            chat_a.setAttribute("onclick", "close_nav();return change_iframe_src(this)");
            let li1 = document.createElement("li");
            user_center.appendChild(li1);
            let log_out = document.createElement("a");
            li1.appendChild(log_out);
            log_out.text = "退出";
            log_out.setAttribute("style", "color:red !important");
            log_out.setAttribute("onclick", "login_session('delete')");
            log_out.setAttribute("href", "index.jsp");
        }
        else if (data.login_type === "enterprise") {
            let head_sculpture = document.createElement("li");
            let head_sculpture_a = document.createElement("a");
            user_center.appendChild(head_sculpture);
            head_sculpture.appendChild(head_sculpture_a);
            head_sculpture_a.text = "修改头像";
            head_sculpture_a.setAttribute("data-toggle", "modal");
            head_sculpture_a.setAttribute("data-target", "#head_sculpture");
            head_sculpture_a.setAttribute("onclick", "close_nav();userType='enterprise'");
            let modify_job = document.createElement("li");
            let modify_job_a = document.createElement("a");
            user_center.appendChild(modify_job);
            modify_job.appendChild(modify_job_a);
            modify_job_a.text = "企业中心";
            modify_job_a.href = "enterprise.html";
            modify_job_a.setAttribute("onclick", "close_nav();return change_iframe_src(this)");
            let chat = document.createElement("li");
            user_center.appendChild(chat);
            let chat_a = document.createElement("a");
            chat.appendChild(chat_a);
            chat_a.text = "问道空间";
            chat_a.href = "webchat.html";
            chat_a.setAttribute("onclick", "close_nav();return change_iframe_src(this)");
            let li1 = document.createElement("li");
            user_center.appendChild(li1);
            let log_out = document.createElement("a");
            li1.appendChild(log_out);
            log_out.text = "退出";
            log_out.setAttribute("style", "color:red !important");
            log_out.setAttribute("onclick", "login_session('delete')");
            log_out.setAttribute("href", "index.jsp");
        }
        else if (data.login_type === "admin") {
            let admin = document.createElement("li");
            user_center.appendChild(admin);
            let admin_a = document.createElement("a");
            admin.appendChild(admin_a);
            admin_a.text = "后台管理";
            admin_a.href = "admin.html";
            admin_a.setAttribute("onclick", "close_nav();return change_iframe_src(this)");
            let chat = document.createElement("li");
            user_center.appendChild(chat);
            let chat_a = document.createElement("a");
            chat.appendChild(chat_a);
            chat_a.text = "问道空间";
            chat_a.href = "webchat.html";
            chat_a.setAttribute("onclick", "close_nav();return change_iframe_src(this)");
            let li1 = document.createElement("li");
            user_center.appendChild(li1);
            let log_out = document.createElement("a");
            li1.appendChild(log_out);
            log_out.text = "退出";
            log_out.setAttribute("style", "color:red !important");
            log_out.setAttribute("onclick", "login_session('delete')");
            log_out.setAttribute("href", "index.jsp");
        }
    }
}

function init_user(nickname) {
    document.getElementById("register_btu").innerHTML = "";
    document.getElementById("login_btu").text = nickname;
    let user_center = document.getElementById("user_center");
    user_center.innerHTML = "";
}

function change_iframe_src(obj) {
    document.getElementsByTagName("iframe")[0].src = obj.href;
    return false;
}

// quick query
function complete_content() {
    let query = {};
    let content = document.getElementById("search-con").value;
    if (content !== "") {
        query.content = content;
        $.ajax({
            url: "/public?public=query",
            data: query,
            type: "POST",
            dataType: "JSON",
            success: function (data) {
                show_preselected_search(data)
            },
            fail: function () {

            }
        })
    }
}

function show_preselected_search(data) {
    let div = document.getElementById("preselected_search");
    div.style.display = "block";
    div.innerHTML = "";
    let ul = document.createElement("ul");
    div.appendChild(ul);
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        ul.appendChild(li);
        let a = document.createElement("a");
        a.text = data[i].company;
        li.appendChild(a);
        li.onclick = add_preselected_search_to_search(i);
    }
}

function add_preselected_search_to_search(i) {
    let a = document.getElementById("preselected_search").children[0].children[i].children[0];
    document.getElementById("search-con").value = a.text;
}

function query() {
    close_preselected_search();
    let search_con = document.getElementById("search-con").value;
    let search = {};
    search.content = search_con;
    $.ajax({
        url: "/public?public=query",
        data: search,
        type: "POST",
        dataType: "JSON",
        success: function () {

        },
        fail: function () {

        }
    })
}
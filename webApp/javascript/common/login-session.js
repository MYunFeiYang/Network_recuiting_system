"use strict";
let confirm_box_c;
let logout;
let logout_a;
let chat;
let chat_a;
let head_sculpture;
let head_sculpture_a;

function login_session(data, user) {
    user.login = data;
    $.ajax({
        url: '/public?public=loginSession',
        async: true,
        data: user,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            login_session_result(data);
        },
        fail: function () {

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
        head_sculpture_a.innerHTML = "修改头像<i class=''></i>";
        chat.append(chat_a);
        chat_a.text = "问道空间";
        chat_a.setAttribute("href", "webchat.html");
        chat_a.setAttribute("target", "myiframe");
        chat_a.innerHTML = "问道空间<i class='fa fa-comments'></i>";
        logout.append(logout_a);
        logout_a.text = "退出";
        logout_a.setAttribute("style", "color:red !important");
        let user0 = {};
        logout_a.onclick = function () {
            login_session('delete', user0);
            window.location.reload();
        }
        logout_a.innerHTML = "退出<i class='glyphicon glyphicon-log-out'></i>";
        if (data.login_type === "person") {
            let person_center = document.createElement("li");
            user_center.append(head_sculpture, person_center, chat, logout);
            let person_center_a = document.createElement("a");
            person_center.append(person_center_a);
            person_center_a.text = "个人中心";
            person_center_a.setAttribute("href", "person.html");
            person_center_a.setAttribute("target", "myiframe");
            person_center_a.innerHTML = "个人中心<i class=''></i>";
            $("#myiframe").attr("src", "show_job_and_resume.html?type=person");
        }
        else if (data.login_type === "enterprise") {
            let enterprise_center = document.createElement("li");
            let enterprise_center_a = document.createElement("a");
            user_center.append(head_sculpture, enterprise_center, chat, logout);
            enterprise_center.append(enterprise_center_a);
            enterprise_center_a.setAttribute("href", "enterprise.html");
            enterprise_center_a.setAttribute("target", "myiframe");
            enterprise_center_a.innerHTML = "企业中心<i class=''></i>";
            $("#myiframe").attr("src", "show_job_and_resume.html?type=enterprise");
        }
        else if (data.login_type === "admin") {
            let admin = document.createElement("li");
            let admin_a = document.createElement("a");
            user_center.append(admin, chat, logout);
            admin.append(admin_a);
            admin_a.setAttribute("href", "admin.html");
            admin_a.setAttribute("target", "myiframe");
            admin_a.innerHTML = "后台管理<i class=''></i>";
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
    $("#head_picture").attr("src", src);
    $("#head_picture").removeClass("hidden");

}

function job_reg() {
    $.ajax({
        url: "/person?person=jobReg",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data !== null) {
                show_jobs(data)
            }
        }
    })
}

function resume_reg() {
    $.ajax({
        url: "/enterprise?enterprise=resumeReg",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data !== null) {
                show_resumes(data)
            }
        }
    })
}

function show_jobs(data) {
    $("#job_and_resume").html(`<thead>
        <tr>
            <td>姓名</td>
            <td>城市</td>
            <td>行业</td>
            <td>岗位类型</td>
            <td>投递时间</td>
            <td>有效时间</td>
            <td>电话</td>
            <td>邮箱</td>
        </tr>
        </thead>
         <tbody>

        </tbody>`)
    for (var item of data) {
        $("#job_and_resume tbody:first").append(`<tr>
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.industry}</td>
            <td>${item.position}</td>
            <td>${item.publish_time}</td>
            <td>${item.effective_time}</td>
            <td>${item.telephone}</td>
            <td>${item.email}</td>
        </tr>`)
    }
}
function show_resumes(data) {
    $("#job_and_resume").html(`<thead>
        <tr>
            <td>姓名</td>
            <td>性别</td>
            <td>年龄</td>
            <td>学校</td>
            <td>专业</td>
            <td>毕业时间</td>
            <td>籍贯</td>
            <td>教育程度</td>
            <td>电话</td>
            <td>邮箱</td>
        </tr>
        </thead>
         <tbody>

        </tbody>`)
    for (var item of data) {
        console.table(item)
        $("#job_and_resume tbody:first").append(`<tr>
            <td>${item.name}</td>
            <td>${item.sex}</td>
            <td>${item.age}</td>
            <td>${item.collage}</td>
            <td>${item.specialty}</td>
            <td>${item.graduation_data}</td>
            <td>${item.origin}</td>
            <td>${item.degree}</td>
            <td>${item.telephone}</td>
            <td>${item.email}</td>
        </tr>`)
    }
}


function modify_user() {
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    var telephone = user.telephone;
    var nickname=document.getElementById("nickname").value;
    var password=document.getElementById("password").value;
    var email=document.getElementById("job_email").value;
    var modify_user={};
    modify_user.telephone=telephone;
    modify_user.nickname=nickname;
    modify_user.password=password;
    modify_user.email=email;
    modify_user_ajax(modify_user);
}

function modify_user_ajax(user) {
    $.ajax({
        url: 'http://localhost:8080/Network_recuiting_system/modify_user.do',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            modify_user_result(data);
        },
        fail: function () {

        }
    })
}

function modify_user_result(data) {
    var confirm_info_box=document.getElementById("confirm_info_box");
    if (data.msg=="modify_user_success"){
        confirm_info_box.innerHTML="信息修改成功";
        confirm_info_box.setAttribute("class","alert-success");
    }else {
        confirm_info_box.innerHTML="信息修改失败";
        confirm_info_box.setAttribute("class","alert-warning");
    }
}


function init_resume() {
    document.getElementById("resume").style.display = "block";
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    init_resume_ajax(user);
}

function init_resume_ajax(user) {
    $.ajax({
        url: 'http://localhost:8080/Network_recuiting_system/init_resume.do',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            init_resume_result(data);
        },
        fail: function () {

        }
    })
}

function init_resume_result(data) {
    document.getElementById("name").value = data.name;
    document.getElementById("telephone").value = data.telephone;
    document.getElementById("email").value = data.email;
}

function add_resume() {
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    var nickname = user.nickname;
    var password = user.password;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var sex = document.getElementById("sex").value;
    var origin = document.getElementById("origin").value;
    var collage = document.getElementById("collage").value;
    var specialty = document.getElementById("specialty").value;
    var degree = document.getElementById("degree").value;
    var admission_data = document.getElementById("admission_data").value;
    var graduation_data = document.getElementById("graduation_data").value;
    var telephone = document.getElementById("telephone").value;
    var email = document.getElementById("email").value;
    var confirm_resume_box = document.getElementById("confirm_resume_box");
    if (age == "") {
        confirm_resume_box.innerHTML = "请输入年龄";
        confirm_resume_box.setAttribute("class", "alert-warning");
    } else if (origin == "") {
        confirm_resume_box.innerHTML = "请输入籍贯";
        confirm_resume_box.setAttribute("class", "alert-warning");
    } else if (collage == "") {
        confirm_resume_box.innerHTML = "请输入毕业学校";
        confirm_resume_box.setAttribute("class", "alert-warning");
    } else if (specialty == "") {
        confirm_resume_box.innerHTML = "请输入专业";
        confirm_resume_box.setAttribute("class", "alert-warning");
    }  else if (admission_data == "") {
        confirm_resume_box.innerHTML = "请输入入学时间";
        confirm_resume_box.setAttribute("class", "alert-warning");
    } else if(graduation_data == "")
    {
        confirm_resume_box.innerHTML = "请输入毕业时间";
        confirm_resume_box.setAttribute("class", "alert-warning");
    }else {
        confirm_resume_box.innerHTML = "通过验证";
        confirm_resume_box.setAttribute("class", "alert-success");
        var resume = {};
        resume.nickname = nickname;
        resume.password = password;
        resume.name = name;
        resume.age = age;
        resume.sex = sex;
        resume.origin = origin;
        resume.collage = collage;
        resume.specialty = specialty;
        resume.degree = degree;
        resume.admission_data = admission_data;
        resume.graduation_data = graduation_data;
        resume.telephone = telephone;
        resume.email = email;
        add_resume_ajax(resume);
    }
}

function add_resume_ajax(data) {
    $.ajax({
        url: 'http://localhost:8080/Network_recuiting_system/add_resume.do',
        data: data,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            add_resume_result(data);
        },
        fail: function () {

        }
    })
}

function add_resume_result(data) {
    if (data.msg=="add_resume_success"){
        alert("简历添加成功");
    }
}


function browse_resume() {
    document.getElementById("add_resume").style.display = "none";
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    browse_resume_ajax(user);
}

function browse_resume_ajax(user) {
    $.ajax({
        url: 'http://localhost:8080/Network_recuiting_system/init_resume.do',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            browse_resume_result();
        },
        fail: function () {

        }
    })
}

function browse_resume_result(data) {
    document.getElementById("name").value = data.name;
    document.getElementById("telephone").value = data.telephone;
    document.getElementById("email").value = data.email;
}
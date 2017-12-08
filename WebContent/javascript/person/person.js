function register_person() {
    let user={};
    user.nickname=document.getElementById("person_nickname").value;
    user.password=document.getElementById("person_password").value;
    user.name=document.getElementById("person_name").value;
    user.telephone=document.getElementById("person_telephone").value;
    user.email=document.getElementById("person_email").value;
    //alert(JSON.stringify(user));
    ajax_register(user);
}
function ajax_register(user) {
    $.ajax({
        url:"/person?person=register",
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            register_result(data);
            //setTimeout('register_success(data)', 3000);
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function register_result(data) {
    if (data.msg=="success"){
        let div=document.getElementById("register-person");
        div.getElementsByClassName("modal-content")[0].innerHTML="注册成功";
    }
}
function modify_user_person() {
    document.getElementById("myregister-person").innerHTML="修改个人注册信息";
    document.getElementById("person_name_group").style.display="none";
    document.getElementById("person_email_group").style.display="none";
    document.getElementById("person_reg_btu").value="提交修改";
    document.getElementById("person_reg_btu").setAttribute("onmouseover","btu_disable_person_modify")
    document.getElementById("person_reg_btu").setAttribute("onclick","modify_person()");
}
function modify_person() {
    let nickname=document.getElementById("person_nickname").value;
    let password=document.getElementById("person_password").value;
    let telephone=document.getElementById("person_telephone").value;
    let modify_user={};
    modify_user.telephone=telephone;
    modify_user.nickname=nickname;
    modify_user.password=password;
    modify_person_ajax(modify_user);
}
function modify_person_ajax(user) {
    $.ajax({
        url: '/person?person=modifyUser',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            modify_person_result(data,"confirm_person_box");
        },
        fail: function () {

        }
    })
}
function modify_person_result(data,confirm_info_box) {
    let confirm_info_box=document.getElementById(confirm_info_box);
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
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    init_resume_ajax(user);
}
function init_resume_ajax(user) {
    $.ajax({
        url: '/person?person=initResume',
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
    document.getElementById("resume_name").value = data.name;
    document.getElementById("telephone").value = data.telephone;
    document.getElementById("resume_email").value = data.email;
}
function add_resume() {
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    let nickname = user.nickname;
    let password = user.password;
    let name = document.getElementById("resume_name").value;
    let age = document.getElementById("age").value;
    let sex = document.getElementById("sex").value;
    let origin = document.getElementById("origin").value;
    let collage = document.getElementById("collage").value;
    let specialty = document.getElementById("specialty").value;
    let degree = document.getElementById("degree").value;
    let admission_data = document.getElementById("admission_data").value;
    let graduation_data = document.getElementById("graduation_data").value;
    let telephone = document.getElementById("telephone").value;
    let email = document.getElementById("resume_email").value;
    let confirm_resume_box = document.getElementById("confirm_resume_box");
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
        let resume = {};
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
        url: '/person?person=addResume',
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
    let confirm_resume_box=document.getElementById("confirm_resume_box")
    if (data.msg=="add_resume_success"){
        confirm_resume_box.innerHTML="简历添加成功";
        confirm_resume_box.setAttribute("class","alert-success");
    }else {
        confirm_resume_box.innerHTML="简历添加失败";
        confirm_resume_box.setAttribute("class","alert-warning");
    }
}
function browse_resume() {
    document.getElementById("add_resume").style.display = "none";
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    browse_resume_ajax(user);
}
function browse_resume_ajax(user) {
    $.ajax({
        url: '/person?person=browseResume',
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
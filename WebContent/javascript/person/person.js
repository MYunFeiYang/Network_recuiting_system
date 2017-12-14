"use strict";
let n_confirm_box_p;
function register_person() {
    let user={};
    user.nickname=document.getElementById("person_nickname").value;
    user.password=document.getElementById("person_password").value;
    user.name=document.getElementById("person_name").value;
    user.telephone=document.getElementById("person_telephone").value;
    user.email=document.getElementById("person_email").value;
    $.ajax({
        url:"/person?person=register",
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            if (data.msg==="success"){
                n_confirm_box_p=document.getElementById("register-person");
                n_confirm_box_p.getElementsByClassName("modal-content")[0].innerHTML="注册成功";
            }
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function modify_user_person() {
    document.getElementById("myregister-person").innerHTML="修改个人注册信息";
    document.getElementById("person_name_group").style.display="none";
    document.getElementById("person_email_group").style.display="none";
    document.getElementById("person_reg_btu").value="提交修改";
    document.getElementById("person_reg_btu").setAttribute("onmouseover","btu_disable_person_modify");
    document.getElementById("person_reg_btu").setAttribute("onclick","modify_person");
}
function modify_person() {
    let nickname=document.getElementById("person_nickname").value;
    let password=document.getElementById("person_password").value;
    let telephone=document.getElementById("person_telephone").value;
    let modify_user={};
    modify_user.telephone=telephone;
    modify_user.nickname=nickname;
    modify_user.password=password;
    $.ajax({
        url: '/person?person=modifyUser',
        data: modify_user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            n_confirm_box_p=document.getElementById(confirm_info_box);
            if (data.msg==="modify_user_success"){
                n_confirm_box_p.innerHTML="信息修改成功";
                n_confirm_box_p.setAttribute("class","alert-success");
            }else {
                n_confirm_box_p.innerHTML="信息修改失败";
                n_confirm_box_p.setAttribute("class","alert-warning");
            }
        },
        fail: function () {

        }
    })
}
function init_resume() {
    document.getElementById("resume").style.display = "block";
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    $.ajax({
        url: '/person?person=initResume',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            if (data.length>0) {
                document.getElementById("resume_name").value = data.name;
                document.getElementById("telephone").value = data.telephone;
                document.getElementById("resume_email").value = data.email;
            }
        },
        fail: function () {

        }
    })
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
    n_confirm_box_p = document.getElementById("n_confirm_box_p");
    if (age === "") {
        n_confirm_box_p.innerHTML = "请输入年龄";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else if (origin === "") {
        n_confirm_box_p.innerHTML = "请输入籍贯";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else if (collage === "") {
        n_confirm_box_p.innerHTML = "请输入毕业学校";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else if (specialty === "") {
        n_confirm_box_p.innerHTML = "请输入专业";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    }  else if (admission_data === "") {
        n_confirm_box_p.innerHTML = "请输入入学时间";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else if(graduation_data === "")
    {
        n_confirm_box_p.innerHTML = "请输入毕业时间";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    }else {
        n_confirm_box_p.innerHTML = "通过验证";
        n_confirm_box_p.setAttribute("class", "alert-success");
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
        $.ajax({
            url: '/person?person=addResume',
            data: resume,
            type: 'POST',
            dataType: 'JSON',
            success: function (data) {
                n_confirm_box_p=document.getElementById("n_confirm_box_p");
                if (data.msg==="add_resume_success"){
                    n_confirm_box_p.innerHTML="简历添加成功";
                    n_confirm_box_p.setAttribute("class","alert-success");
                }else {
                    n_confirm_box_p.innerHTML="简历添加失败";
                    n_confirm_box_p.setAttribute("class","alert-warning");
                }
            },
            fail: function () {

            }
        })
    }
}
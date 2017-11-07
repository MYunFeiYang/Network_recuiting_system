window.onload=function () {
    init_user();
}
function init_user() {
    var user_string=document.cookie.split(";")[0].split("=")[1];
    var user=JSON.parse(user_string);
    var nickname=user.nickname;
    document.getElementById("login").innerHTML=nickname;
    document.getElementById("login_out").innerHTML="<a href='index.html'>退出登录</a>";
}
function init_resume() {
    document.getElementById("resume").style.display="block";
    var user_string=document.cookie.split(";")[0].split("=")[1];
    var user=JSON.parse(user_string);
    init_resume_ajax(user);
}
function init_resume_ajax(user) {
    $.ajax({
        url:'http://localhost:8080/Network_recuiting_system/init_resume.do',
        data:user,
        type:'POST',
        dataType:'JSON',
        success:function (data) {
            init_resume_result(data);
        },
        fail:function () {

        }
    })
}
function init_resume_result(data) {
    document.getElementById("name").value=data.name;
    document.getElementById("telephone").value=data.telephone;
    document.getElementById("email").value=data.email;
}
function modify_resume() {
    document.getElementById("add_resume").style.display="none";
    var user_string=document.cookie.split(";")[0].split("=")[1];
    var user=JSON.parse(user_string);
    modify_resume_ajax(user);
}
function modify_resume_ajax(user) {
    $.ajax({
        url:'http://localhost:8080/Network_recuiting_system/init_resume.do',
        data:user,
        type:'POST',
        dataType:'JSON',
        success:function (data) {
            modify_resume_result(data);
        },
        fail:function () {

        }
    })
}
function modify_resume_result(data) {
    document.getElementById("name").value=data.name;
    document.getElementById("telephone").value=data.telephone;
    document.getElementById("email").value=data.email;
}

function browse_resume() {
    document.getElementById("add_resume").style.display="none";
    var user_string=document.cookie.split(";")[0].split("=")[1];
    var user=JSON.parse(user_string);
    browse_resume_ajax(user);
}
function browse_resume_ajax(user) {
    $.ajax({
        url:'http://localhost:8080/Network_recuiting_system/init_resume.do',
        data:user,
        type:'POST',
        dataType:'JSON',
        success:function (data) {
            browse_resume_result();
        },
        fail:function () {

        }
    })
}
function browse_resume_result(data) {
    document.getElementById("name").value=data.name;
    document.getElementById("telephone").value=data.telephone;
    document.getElementById("email").value=data.email;
}
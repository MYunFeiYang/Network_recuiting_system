
function login() {
    var user={};
    user.login_type=document.getElementById('login_type').value;
    user.nickname=document.getElementById('nickname').value;
    user.password=document.getElementById('password').value;
    //alert(JSON.stringify(user));
    login_ajax(user)
}
function login_ajax(data) {
    $.ajax({
        url:'http://localhost:8080/Network_recuiting_system/login.do',
        data:data,
        type:'POST',
        dataType:'JSON',
        success:function (data) {
            login_result(data);
        },
        fail:function () {

        }
    })
}
function login_result(data) {
    if(data.msg=="person_success"){
        location.href="login_success_person.html";
    }
    else if(data.msg=="enterprise_success"){
        location.href="login_success_enterprise.html";
    }
    else {
        document.getElementById("confirm_password_box").innerHTML="用户名或密码错误";
        document.getElementById("confirm_password_box").setAttribute('class','alert-warning');
    }
}
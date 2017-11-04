function login() {
    var user={};
    user.job_nickname=document.getElementById('job_nickname').value;
    user.job_password=document.getElementById('job_password').value;
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
            login_success(data);
        },
        fail:function () {

        }
    })
}
function login_success(data) {
    if(data.msg=="成功"){
        location.href="login_success_person.html";
    }
}
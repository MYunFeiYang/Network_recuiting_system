function reg_username() {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    var username=document.getElementById('job_nickname').value;
    if (uPattern.test(username)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="用户名通过";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="用户名须是4到16位（字母，数字，下划线，减号）";
        document.getElementById('reg_btu').setAttribute('disabled','disabled');
    }
}
function reg_pwd() {
    var password=document.getElementById("job_password").value;
    var reg = /^[A-Za-z0-9]{6,20}$/;
    if (reg.test(password)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="密码通过";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="密码必须是6到20位数字字母组合";
    }
}
function conf_pwd() {
    var password=document.getElementById("job_password").value;
    var confirm_password=document.getElementById("confirm_password").value;
    //alert(confirm_password);
    if(password==confirm_password){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="两次密码一致";
    }
    else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="两次密码不一致";
    }
}
function check_telephone(){

    var user={};
    var telephone=document.getElementById("job_telephone").value;
    user.telephone=telephone;
    ajax_check_telephone(user);
}
function reg_telephone() {
    var telephone=document.getElementById("job_telephone").value;
    var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (mPattern.test(telephone)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="手机号符合规范，验证是否注册";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="请输入11位规范手机号";
    }
}
function reg_email() {
    var email=document.getElementById("job_email").value;
    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (ePattern.test(email)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="邮箱通过";
        document.getElementById("reg_btu").removeAttribute('disabled');
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="请输入正确邮箱";
    }
}
function register() {
    var user={};
    user.job_nickname=document.getElementById("job_nickname").value;
    user.job_password=document.getElementById("job_password").value;
    user.job_name=document.getElementById("job_name").value;
    user.job_telephone=document.getElementById("job_telephone").value;
    user.job_email=document.getElementById("job_email").value;
    //alert(JSON.stringify(user));
    ajax_register(user);
}
function ajax_register(user) {
    $.ajax({
        url:"http://localhost:8080/Network_recuiting_system/register_person.do",
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            register_success(data);
            //setTimeout('register_success(data)', 3000);
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function ajax_check_telephone(user) {
    $.ajax({
        url:"http://localhost:8080/Network_recuiting_system/check_telephone.do",
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            check_telephone_result(data)
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function register_success(data) {
    if (data.msg=="成功"){
        location.href="index.html";
    }
}
function check_telephone_result(data) {
    if (data.msg=="成功"){
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="请手机号已被注册";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="该手机号通过验证";
    }
}
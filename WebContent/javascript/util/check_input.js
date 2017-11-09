function reg_username() {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    var username=document.getElementById("nickname").value;
    if (uPattern.test(username)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="用户名通过";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="用户名须是4到16位（字母，数字，下划线，减号）";
    }
}
function reg_pwd() {
    var password=document.getElementById("password").value;
    var reg = /^[A-Za-z0-9]{6,20}$/;
    if (reg.test(password)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="密码通过";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="密码必须是6到20位数字字母组合";
    }
}
function reg_telephone() {
    var telephone=document.getElementById("telephone").value;
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
    var email=document.getElementById("email").value;
    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (ePattern.test(email)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="邮箱通过";
        document.getElementById('reg_btu').removeAttribute('disabled');
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="请输入正确邮箱";
    }
}
function conf_pwd() {
    var password=document.getElementById("password").value;
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

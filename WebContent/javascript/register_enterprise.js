function reg_username() {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    var username=document.getElementById('com_nickname').value;
    if (uPattern.test(username)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="用户名通过";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="用户名须是4到16位（字母，数字，下划线，减号）";
    }
}
function reg_pwd() {
    var password=document.getElementById("com_password").value;
    var reg = /^[A-Za-z0-9]{6,20}$/;
    if (reg.test(password)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="密码通过";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="密码必须是6到20位数字字母组合";
    }
}
function reg_email() {
    var email=document.getElementById("com_email").value;
    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (ePattern.test(email)){
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="邮箱通过";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="请输入正确邮箱";
    }
}
function conf_pwd() {
    var password=document.getElementById("com_password").value;
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
function register() {
    var company={};
    company.com_nickname=document.getElementById("com_nickname").value;
    company.com_password=document.getElementById("com_password").value;
    company.com_name=document.getElementById("com_name").value;
    company.com_industry=document.getElementById("com_industry").value;
    company.com_telephone=document.getElementById("com_telephone").value;
    company.com_email=document.getElementById("com_email").value;
    company.com_address=document.getElementById("com_address").value;
    company.com_introduction=document.getElementById("com_introduction").value;
    //alert(JSON.stringify(company));
    ajax_register(company);
}
function ajax_register(company) {
    $.ajax({
        url:"http://localhost:8080/Network_recuiting_system/register_enterprise.do",
        data:company,
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
function register_success(data) {
    if (data.msg=="成功"){
        location.href="index.html";
    }
}
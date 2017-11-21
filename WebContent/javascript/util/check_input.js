
function reg_username(nickname,confirm_box) {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    var username=document.getElementById(nickname).value;
    var confirm=document.getElementById(confirm_box);
    if (uPattern.test(username)){
        confirm.setAttribute("class","alert-success");
        confirm.innerHTML="用户名通过";
    }else {
        confirm.setAttribute("class","alert-warning");
        confirm.innerHTML="用户名须是4到16位（字母，数字，下划线，减号）";
    }
}
function reg_pwd(password,confirm_box) {
    var password=document.getElementById(password).value;
    var reg = /^[A-Za-z0-9]{6,20}$/;
    var confirm=document.getElementById(confirm_box);
    if (reg.test(password)){
        confirm.setAttribute("class","alert-success");
        confirm.innerHTML="密码通过";
    }else {
        confirm.setAttribute("class","alert-warning");
        confirm.innerHTML="密码必须是6到20位数字字母组合";
    }
}
function reg_telephone(telephone,confirm_box) {
    var telephone=document.getElementById(telephone).value;
    var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    var confirm=document.getElementById(confirm_box);
    if (mPattern.test(telephone)){
        confirm.setAttribute("class","alert-success");
        confirm.innerHTML="手机号符合规范，验证是否注册";
    }else {
        confirm.setAttribute("class","alert-warning");
        confirm.innerHTML="请输入11位规范手机号";
    }
}
function reg_email(email,confirm_box) {
    var email=document.getElementById(email).value;
    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var confirm=document.getElementById(confirm_box);
    if (ePattern.test(email)){
        confirm.setAttribute("class","alert-success");
        confirm.innerHTML="邮箱通过";
    }else {
        confirm.setAttribute("class","alert-warning");
        confirm.innerHTML="请输入正确邮箱";
    }
}
function conf_pwd(password,confirm_password,confirm_box) {
    var password=document.getElementById(password).value;
    var confirm_password=document.getElementById(confirm_password).value;
    var confirm=document.getElementById(confirm_box);
    //alert(confirm_password);
    if(password==confirm_password){
        confirm.setAttribute("class","alert-success");
        confirm.innerHTML="两次密码一致";
    }
    else {
        confirm.setAttribute("class","alert-warning");
        confirm.innerHTML="两次密码不一致";
    }
}
function btu_disable_person(reg_btu,check_box){
	var nickname=document.getElementById("person_nickname").value;
	var password=document.getElementById("person_password").value;
	var confirm_password=document.getElementById("person_confirm_password").value;
	var name=document.getElementById("person_name").value;
	var telephone=document.getElementById("person_telephone").value;
	var email=document.getElementById("person_email").value;
	if(nickname==""||password==""||confirm_password==""||name==""||telephone==""||email==""){
	    document.getElementById(reg_btu).setAttribute("disabled","disabled");
        document.getElementById(check_box).innerHTML="请先填完注册信息";
        document.getElementById(check_box).setAttribute("class","alert-warning");
    }
}
function btu_disable_enterprise(reg_btu,check_box){
    var nickname=document.getElementById("enterprise_nickname").value;
    var password=document.getElementById("enterprise_password").value;
    var confirm_password=document.getElementById("confirm_enterprise_password").value;
    var name=document.getElementById("enterprise_name").value;
    var industry=document.getElementById("enterprise_industry").value;
    var telephone=document.getElementById("enterprise_telephone").value;
    var email=document.getElementById("enterprise_email").value;
    var address=document.getElementById("enterprise_address").value;
    if(nickname==""||password==""||confirm_password==""||name==""||industry==""||telephone==""||email==""||address==""){
        document.getElementById(reg_btu).setAttribute("disabled","disabled");
        document.getElementById(check_box).innerHTML="请先填完注册信息";
        document.getElementById(check_box).setAttribute("class","alert-warning");
    }
}
function btu_able(reg_btu,check_box) {
    document.getElementById(reg_btu).removeAttribute("disabled");
    document.getElementById(check_box).innerHTML="";
}
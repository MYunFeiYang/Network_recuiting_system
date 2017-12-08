"use strict";
let btu_register_status=false;
function check_email(id,confirm_box){
    let user={};
    let email=document.getElementById(id).value;
    user.email=email;
    ajax_check_email(user,confirm_box);
}
function ajax_check_email(user,confirm_box) {
    $.ajax({
        url:'/public?public=checkemail',
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            check_email_result(data,confirm_box)
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function check_email_result(data,confirm_box) {
    let confirm=document.getElementById(confirm_box);
    if (data.msg=="email_exist"){
        confirm.setAttribute("style","color:red");
        confirm.innerHTML="请邮箱已被注册";
        return btu_register_status=false;
    }else {
        confirm.innerHTML="";
        confirm.classList.add("glyphicon");
        confirm.classList.add("glyphicon-ok");
        confirm.setAttribute("style","color:blue");
        return btu_register_status=true;
    }
}
function reg_username(nickname,confirm_box) {
    let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    let username=document.getElementById(nickname).value;
    let confirm=document.getElementById(confirm_box);
    if (uPattern.test(username)){
        confirm.innerHTML="";
        confirm.classList.add("glyphicon");
        confirm.classList.add("glyphicon-ok");
        confirm.setAttribute("style","color:blue");
        return btu_register_status=true;
    }else {
        confirm.setAttribute("style","color:red");
        confirm.innerHTML="4到16位（字母，数字，下划线，减号）";
        return btu_register_status=false
    }
}
function reg_pwd(password,confirm_box) {
    let password=document.getElementById(password).value;
    let reg = /^[A-Za-z0-9]{6,20}$/;
    let confirm=document.getElementById(confirm_box);
    if (reg.test(password)){
        confirm.innerHTML="";
        confirm.classList.add("glyphicon");
        confirm.classList.add("glyphicon-ok");
        confirm.setAttribute("style","color:blue");
        return btu_register_status=true;
    }else {
        confirm.setAttribute("style","color:red");
        confirm.innerHTML="密码必须是6到20位数字字母组合";
        return btu_register_status=false;
    }
}
function reg_telephone(telephone,confirm_box) {
    let telephone=document.getElementById(telephone).value;
    let mPattern = /^1[3|4|5|8][0-9]\d{4,8}$/;
    let confirm=document.getElementById(confirm_box);
    if (mPattern.test(telephone)){
        confirm.innerHTML="";
        confirm.classList.add("glyphicon");
        confirm.classList.add("glyphicon-ok");
        confirm.setAttribute("style","color:blue");
        return btu_register_status=true;
    }else {
        confirm.setAttribute("style","color:red");
        confirm.innerHTML="";
        confirm.innerHTML="手机号不完整或前七位不正确";
        return btu_register_status=false;
    }
}
function reg_email(email,confirm_box) {
    let email=document.getElementById(email).value;
    let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let confirm=document.getElementById(confirm_box);
    if (ePattern.test(email)){
        confirm.innerHTML="";
        confirm.setAttribute("style","color:red");
        confirm.innerHTML="请验证邮箱是否存在";
        return btu_register_status=true;
    }else {
        confirm.setAttribute("style","color:red");
        confirm.innerHTML="请输入正确邮箱";
        return btu_register_status=false;
    }
}
function conf_pwd(password,confirm_password,confirm_box) {
    let password=document.getElementById(password).value;
    let confirm_password=document.getElementById(confirm_password).value;
    let confirm=document.getElementById(confirm_box);
    //alert(confirm_password);
    if(password==confirm_password){
        confirm.innerHTML="";
        confirm.classList.add("glyphicon");
        confirm.classList.add("glyphicon-ok");
        confirm.setAttribute("style","color:blue");
        return btu_register_status=true;
    }
    else {
        confirm.setAttribute("style","color:red");
        confirm.innerHTML="两次密码不一致";
        return btu_register_status=false;
    }
}
function btu_disable_person(reg_btu,check_box){
	let name=document.getElementById("person_name").value;
	if(btu_register_status&&name!=""){
        document.getElementById(check_box).innerHTML="信息已填写完整";
        document.getElementById(check_box).setAttribute("class","alert-success");
    }
    else {
        document.getElementById(reg_btu).setAttribute("disabled","disabled");
        document.getElementById(check_box).innerHTML="请先填完注册信息";
        document.getElementById(check_box).setAttribute("class","alert-warning");
    }
}
function btu_disable_enterprise(reg_btu,check_box){
    let name=document.getElementById("enterprise_name").value;
    let industry=document.getElementById("enterprise_industry").value;
    let address=document.getElementById("enterprise_address").value;
    if(btu_register_status&&name!=""&&industry!=""&&address!=""){
        document.getElementById(check_box).innerHTML="信息已填写完整";
        document.getElementById(check_box).setAttribute("class","alert-success");
    }else {
        document.getElementById(reg_btu).setAttribute("disabled","disabled");
        document.getElementById(check_box).innerHTML="请先填完注册信息";
        document.getElementById(check_box).setAttribute("class","alert-warning");
    }
}
function btu_able(reg_btu) {
    document.getElementById(reg_btu).removeAttribute("disabled");
}
function btu_disable_person_modify(reg_btu,check_box){
    if(btu_register_status){
        document.getElementById(check_box).innerHTML="信息已填写完整";
        document.getElementById(check_box).setAttribute("class","alert-success");
    }
    else {
        document.getElementById(reg_btu).setAttribute("disabled","disabled");
        document.getElementById(check_box).innerHTML="请先填完注册信息";
        document.getElementById(check_box).setAttribute("class","alert-warning");
    }
}
function btu_disable_enterprise_modify(reg_btu,check_box){
    if(btu_register_status){
        document.getElementById(check_box).innerHTML="信息已填写完整";
        document.getElementById(check_box).setAttribute("class","alert-success");
    }else {
        document.getElementById(reg_btu).setAttribute("disabled","disabled");
        document.getElementById(check_box).innerHTML="请先填完注册信息";
        document.getElementById(check_box).setAttribute("class","alert-warning");
    }
}

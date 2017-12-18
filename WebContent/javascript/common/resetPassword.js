"use strict";
function resetPassword() {
    let user;
    let email=document.getElementById("email").value;
    if (document.cookie!=="") {
        let user_string = document.cookie.split(";")[0].split("=")[1];
        user = JSON.parse(user_string);
        user.email=email;
        setCookie("user",JSON.stringify(user),180);
        updatePassword_ajax(user);
        user.email=email;
        ajax_resetPassword(user);
    }else {
        let confirm_box=document.getElementById("confirm_box");
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="请先尝试登录";
    }
}
function ajax_resetPassword(user) {
    $.ajax({
        url:'/public?public=resetPassword',
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            resetPassword_result(data)
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function resetPassword_result(data) {
    let confirm_box=document.getElementById("confirm_box");
    if (data.msg==="email_not_exist"){
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="该邮箱未注册";
    }else if(data.msg!=="") {
        confirm_box.setAttribute("class", "alert-warning");
        confirm_box.innerHTML = "注意接收重置密码邮件";
        document.getElementById("basic-addon1").innerHTML = "请输入验证码";
        if (document.cookie !== "") {
            let user_string = document.cookie.split(";")[0].split("=")[1];
            let user = JSON.parse(user_string);
            user.code = data.msg;
            setCookie("user",JSON.stringify(user),180);
            document.getElementById("btu_resetPassword").onclick=check_code();
            document.getElementById("email").value = "";
        }
    }
}
function check_code() {
    let user=JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    let code=document.getElementById("email").value;
    let confirm_box=document.getElementById("confirm_box");
    if (code===user.code){
        confirm_box.setAttribute("class","alert-success");
        confirm_box.innerHTML="验证码正确";
        document.getElementById("group_reset").innerHTML="" +
            "<span class=\"input-group-addon\" id=\"basic-addon1\">密码</span>\n" +
            "<input type=\"password\" id=\"password\" class=\"form-control\" aria-describedby=\"basic-addon1\">\n" +
            "<span class=\"input-group-addon\" id=\"basic-addon1\">确认密码</span>\n" +
            "<input type=\"password\" id=\"password2\" class=\"form-control\" aria-describedby=\"basic-addon1\">\n";
        let btu_resetPassword=document.getElementById("btu_resetPassword");
        btu_resetPassword.innerHTML="确认";
        btu_resetPassword.onclick=updatePassword();
    }
    else {
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="验证码错误";
    }
}
function updatePassword() {
    let password=document.getElementById("password").value;
    let password2=document.getElementById("password2").value;
    let confirm_box=document.getElementById("confirm_box");
    if (password!==password2){
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="密码不一致";
    }else {
        confirm_box.setAttribute("class","alert-success");
        confirm_box.innerHTML="密码通过";
        if (document.cookie!=="") {
            let user_string = document.cookie.split(";")[0].split("=")[1];
            let user = JSON.parse(user_string);
            user.password = password;
            setCookie("user",JSON.stringify(user),180);
            updatePassword_ajax(user);
        }
    }
}
function updatePassword_ajax(user) {
    $.ajax({
        url:'/public?public=updatePassword',
        data:user,
        type:'POST',
        dataType:'JSON',
        success:function (data) {
            updatePassword_result(data);
        },
        fail:function () {

        }

    })
}
function updatePassword_result(data) {
    let confirm_box=document.getElementById("confirm_box");
    if (data.msg==="updatePassword_success"){
        confirm_box.setAttribute("class","alert-success");
        confirm_box.innerHTML="密码修改成功";
        document.getElementById("other").innerHTML="";
        document.getElementById("btu_resetPassword").innerHTML="<a href='index.html' style='color: white'>返回登录</a>"
    }
}
function close_parent(obj) {
    obj.parentNode.style.display="none";
}
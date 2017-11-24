function setCookie(c_name,value,expireDays)
{
    var existDate=new Date();
    existDate.setDate(existDate.getDate()+expireDays);
    document.cookie=c_name+ "=" +value+
        ((expireDays==null) ? "" : ";expires="+existDate.toGMTString());
}
function login() {
    var user={};
    user.login_type=document.getElementById('login_type').value;
    user.nickname=document.getElementById('login_nickname').value;
    user.password=document.getElementById('login_password').value;
    //alert(JSON.stringify(user));
    login_ajax(user)
}
function login_ajax(data) {
    $.ajax({
        url:'/public?public=login',
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
        document.getElementById("close_login").click();
        login_session('login');
    }
    else if(data.msg=="enterprise_success"){
        document.getElementById("close_login").click();
        login_session('login');
    }
    else {
        document.getElementById("confirm_login_box").innerHTML="用户名或密码错误";
        document.getElementById("confirm_login_box").setAttribute('class','alert-warning');
    }
}
function login_session(data) {
    var user={};
    user.login=data;
    user.nickname=document.getElementById("login_nickname").value;
    user.password=document.getElementById("login_password").value;
    user.login_type=document.getElementById("login_type").value;
    ajax_login_session(user);
}
function ajax_login_session(data) {
    $.ajax({
        url:'/public?public=loginSession',
        async:true,
        data:data,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            login_session_result(data)
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function login_session_result(data) {
    init_user(data.nickname);
    if (data.nickname!="") {
        if (data.login_type=="person"){
            var person_btu=document.getElementById("person_btu")
            person_btu.setAttribute("onclick","show_div('person')");
        }else if(data.login_type="person"){
            var enterprise_btu=document.getElementById("enterprise_btu");
            enterprise_btu.setAttribute("onclick","show_div('enterprise')");
        }
    }
}
function init_user(nickname) {
    document.getElementById("vip").classList.remove("hidden");
    document.getElementById("register_btu").innerHTML="";
    document.getElementById("login_btu").text = nickname;
    var login_out=document.getElementById("login_out");
    login_out.innerHTML="";
    var a=document.createElement("a");
    a.text="退出登录";
    a.setAttribute("onclick","login_session('delete')");
    a.setAttribute("href","index.html");
    login_out.appendChild(a);
}
function query() {

}
function resetPassword() {
    if (document.cookie!="") {
        var user_string = document.cookie.split(";")[0].split("=")[1];
        var user = JSON.parse(user_string);
        var email=document.getElementById("email").value;
        user.email=email;
        setCookie("user",JSON.stringify(user),180)
        updatePassword_ajax(user);
    }else {
        var confirm_box=document.getElementById("confirm_box");
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="请先尝试登录";
        document.getElementById("other").innerHTML="<a class=\"btn btn-primary\" href='index.html'>返回登录</a>"
    }
    var email=document.getElementById("email").value;
    user.email=email;
    ajax_resetPassword(user);
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
    var confirm_box=document.getElementById("confirm_box");
    if (data.msg=="email_not_exist"){
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="该邮箱未注册";
        document.getElementById("other").innerHTML="<a class=\"btn btn-primary\" href='index.html'>返回注册</a>"
    }else if(data.msg!="") {
        confirm_box.setAttribute("class", "alert-warning");
        confirm_box.innerHTML = "注意接收重置密码邮件";
        document.getElementById("basic-addon1").innerHTML = "请输入验证码";
        if (document.cookie != "") {
            var user_string = document.cookie.split(";")[0].split("=")[1];
            var user = JSON.parse(user_string);
            user.code = data.msg;
            setCookie("user",JSON.stringify(user),180);
            document.getElementById("btu_resetPassword").setAttribute("onclick", "check_code()");
            document.getElementById("email").value = "";
        }
        else {
        return;
    }
    }
}
function check_code() {
    var user=JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    var code=document.getElementById("email").value;
    var confirm_box=document.getElementById("confirm_box");
    if (code==user.code){
        confirm_box.setAttribute("class","alert-success");
        confirm_box.innerHTML="验证码正确";
        document.getElementById("group_reset").innerHTML="" +
            "<span class=\"input-group-addon\" id=\"basic-addon1\">密码</span>\n" +
            "<input type=\"password\" id=\"password\" class=\"form-control\" aria-describedby=\"basic-addon1\">\n" +
            "<span class=\"input-group-addon\" id=\"basic-addon1\">确认密码</span>\n" +
            "<input type=\"password\" id=\"password2\" class=\"form-control\" aria-describedby=\"basic-addon1\">\n";
        var btu_resetPassword=document.getElementById("btu_resetPassword");
        btu_resetPassword.innerHTML="确认";
        btu_resetPassword.setAttribute("onclick","updatePassword()");
    }
    else {
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="验证码错误";
    }
}
function updatePassword() {
    var password=document.getElementById("password").value;
    var password2=document.getElementById("password2").value;
    var confirm_box=document.getElementById("confirm_box");
    if (password!=password2){
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="密码不一致";
    }else {
        confirm_box.setAttribute("class","alert-success");
        confirm_box.innerHTML="密码通过";
        if (document.cookie!="") {
            var user_string = document.cookie.split(";")[0].split("=")[1];
            var user = JSON.parse(user_string);
            user.password = password;
            setCookie("user",JSON.stringify(user),180)
            updatePassword_ajax(user);
        }else {
            return;
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
    var confirm_box=document.getElementById("confirm_box");
    if (data.msg=="updatePassword_success"){
        confirm_box.setAttribute("class","alert-success");
        confirm_box.innerHTML="密码修改成功";
        document.getElementById("other").innerHTML="";
        document.getElementById("btu_resetPassword").innerHTML="<a href='index.html' style='color: white'>返回登录</a>"
    }else {
        return;
    }
}
"use strict"
function setCookie(c_name,value,expireDays) {
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
    get_news(data.login_type);
    if (data.nickname!="") {
        init_user(data.nickname);
        var user_center=document.getElementById("user_center");
        var modify_user=document.getElementById("modify_user");
        if (data.login_type=="person"){
            modify_user.setAttribute("data-toggle","modal");
            modify_user.setAttribute("data-target","#register-person");
            modify_user.setAttribute("onclick","modify_user_person()");
            var add_resume=document.createElement("li");
            var add_resume_a=document.createElement("a");
            user_center.appendChild(add_resume);
            add_resume.appendChild(add_resume_a);
            add_resume_a.text="添加简历";
            add_resume_a.setAttribute("data-toggle","modal");
            add_resume_a.setAttribute("data-target","#resume");
            add_resume_a.setAttribute("onclick","init_resume()");
            var modify_resume=document.createElement("li");
            var modify_resume_a=document.createElement("a");
            user_center.appendChild(modify_resume);
            modify_resume.appendChild(modify_resume_a);
            modify_resume_a.text="修改简历";
            modify_resume_a.setAttribute("onclick","");
            var browse_resume=document.createElement("li");
            var browse_resume_a=document.createElement("a");
            user_center.appendChild(browse_resume);
            browse_resume.appendChild(browse_resume_a);
            browse_resume_a.text="浏览简历";
            browse_resume_a.setAttribute("onclick","browse_resume()");
            var upload_resume=document.createElement("li");
            var upload_resume_a=document.createElement("a");
            user_center.appendChild(upload_resume);
            upload_resume.appendChild(upload_resume_a);
            upload_resume_a.text="上传本地简历";
            upload_resume_a.setAttribute("data-toggle","modal");
            upload_resume_a.setAttribute("data-target","#upload");
            var chat=document.createElement("li");
            user_center.appendChild(chat)
            chat.innerHTML="<a onclick='change_frame_content(),closeInterval()'>问道空间</a>";
            var li1=document.createElement("li");
            user_center.appendChild(li1)
            var log_out=document.createElement("a");
            li1.appendChild(log_out);
            log_out.text="退出";
            log_out.setAttribute("style","color:red");
            log_out.setAttribute("onclick","login_session('delete')");
            log_out.setAttribute("href","index.html");
        }else if(data.login_type="person"){
            modify_user.setAttribute("data-toggle","modal");
            modify_user.setAttribute("data-target","#register-enterprise");
            modify_user.setAttribute("onclick","modify_user_enterprise()");
            var add_job=document.createElement("li");
            var add_job_a=document.createElement("a");
            user_center.appendChild(add_job);
            add_job.appendChild(add_job_a);
            add_job_a.text="发布招聘信息";
            add_job_a.setAttribute("data-toggle","modal");
            add_job_a.setAttribute("data-target","#jobs");
            add_job_a.setAttribute("onclick","init_job()");
            var modify_job=document.createElement("li");
            var modify_job_a=document.createElement("a");
            user_center.appendChild(modify_job);
            modify_job.appendChild(modify_job_a);
            modify_job_a.text="修改招聘信息";
            modify_job_a.setAttribute("onclick","");
            var browse_job=document.createElement("li");
            var browse_job_a=document.createElement("a");
            user_center.appendChild(browse_job);
            browse_job.appendChild(browse_job_a);
            browse_job_a.text="浏览招聘信息";
            browse_job_a.setAttribute("onclick","");
            var chat=document.createElement("li");
            user_center.appendChild(chat)
            chat.innerHTML="<a onclick='change_frame_content(),closeInterval()'>问道空间</a>";
            var li1=document.createElement("li");
            user_center.appendChild(li1)
            var log_out=document.createElement("a");
            li1.appendChild(log_out);
            log_out.text="退出";
            log_out.setAttribute("style","color:red");
            log_out.setAttribute("onclick","login_session('delete')");
            log_out.setAttribute("href","index.html");
        }
    }
}
function init_user(nickname) {
    document.getElementById("register_btu").innerHTML="";
    document.getElementById("login_btu").text = nickname;
    var user_center=document.getElementById("user_center");
    user_center.innerHTML="";
    var li2=document.createElement("li");
    var modify_user=document.createElement("a");
    user_center.appendChild(li2);
    li2.appendChild(modify_user);
    modify_user.setAttribute("id","modify_user");
    modify_user.text="修改注册信息"
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
function get_news(user_type) {
    var user={};
    user.user_type=user_type;
    $.ajax({
        url:"/public?public=get_news",
        data:user,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            show_news(data)
        },
        fail:function () {

        }
    })
}
function show_news(data) {
    document.getElementById("marquee").style.display="block";
    var ul=document.getElementById("marquee").children[0];
    ul.innerHTML="";
    for (var i=0;i<data.length;i++){
        var li=document.createElement("li");
        ul.appendChild(li);
        var a=document.createElement("a");
        li.appendChild(a);
        a.text=data[i].company;
        a.href=data[i].href;
        var span =document.createElement("span");
        span.setAttribute("class","glyphicon glyphicon-log-in");
        li.appendChild(span);
        span.setAttribute("style","float:right")
    }
}
function key_down_event(id) {
    document.getElementById(id).onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
            e = window.event;
        var code = e.charCode || e.keyCode;
        if (code == 13) {
            if (id=="login"){
                reset_user();
                login();
            } else if (id=="preselected_search"){
                query();
            }else {
                return;
            }
        }
    }
}
function direction_key_event(id) {
    document.getElementById(id).onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
            e = window.event;
        var code = e.charCode || e.keyCode;
        var inputs=document.getElementById(id).getElementsByTagName("input");
        var i=0;
        for(; i<inputs.length; i++)
        {
            if(inputs[i].id==document.activeElement.id) {
                break;
            }
        }
        if (code == 37) {//左方向键
            return;
        }else if (code==38){//上方向键
            if (i>0) {
                i--;
                inputs[i].focus();
            }
        }else if (code==39){//右方向键
            return;
        }else if (code==40){//下方向键
            if (i<inputs.length) {
                i++;
                inputs[i].focus();
            }
        }else {
            return;
        }
    }
    
}
function set_marquee_left() {
    var left=document.getElementById("left");
    var marquee=document.getElementById("marquee");
    left.getElementsByClassName("row")[0].appendChild(marquee);
    get_news("person");
}
function set_marquee_right() {
    var right=document.getElementById("right");
    var marquee=document.getElementById("marquee");
    right.getElementsByClassName("row")[0].appendChild(marquee);
    get_news("person");
}
function change_frame_content() {
    document.getElementById("main").style.display="none";
    var frame=document.getElementById("frame")
    frame.style.display="block";
    frame.innerHTML="<iframe style='position:relative;z-index: 999;opacity: 0.8;border: 10px solid white;' src=\"webchat.html\" width=\"100%\" height=\"500\" scrolling=\"auto\" frameborder=\"0\"> </iframe>";

}
"use strict";
function setCookie(c_name,value,expireDays) {
    let existDate=new Date();
    existDate.setDate(existDate.getDate()+expireDays);
    document.cookie=c_name+ "=" +value+
        ((expireDays==null) ? "" : ";expires="+existDate.toGMTString());
}
function login() {
    let user={};
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
    if(data.msg=="login_success"){
        document.getElementById("close_login").click();
        login_session('login');
    }
    else {
        document.getElementById("confirm_login_box").innerHTML="用户名或密码错误";
        document.getElementById("confirm_login_box").setAttribute('class','alert-warning');
    }
}
function login_session(data) {
    let user={};
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
    if (data.nickname!="") {
        init_user(data.nickname);
        let user_center=document.getElementById("user_center");
        if (data.login_type=="person"){
            let li2=document.createElement("li");
            let modify_user=document.createElement("a");
            user_center.appendChild(li2);
            li2.appendChild(modify_user);
            modify_user.text="修改注册信息";
            modify_user.setAttribute("data-toggle","modal");
            modify_user.setAttribute("data-target","#register-person");
            modify_user.setAttribute("onclick","modify_user_person()");
            let add_resume=document.createElement("li");
            let add_resume_a=document.createElement("a");
            user_center.appendChild(add_resume);
            add_resume.appendChild(add_resume_a);
            add_resume_a.text="添加简历";
            add_resume_a.setAttribute("data-toggle","modal");
            add_resume_a.setAttribute("data-target","#resume");
            add_resume_a.setAttribute("onclick","init_resume()");
            let modify_resume=document.createElement("li");
            let modify_resume_a=document.createElement("a");
            user_center.appendChild(modify_resume);
            modify_resume.appendChild(modify_resume_a);
            modify_resume_a.text="修改简历";
            modify_resume_a.setAttribute("data-toggle","modal");
            modify_resume_a.setAttribute("data-target","#resume");
            modify_resume_a.setAttribute("onclick","init_resume()");
            let upload_resume=document.createElement("li");
            let upload_resume_a=document.createElement("a");
            user_center.appendChild(upload_resume);
            upload_resume.appendChild(upload_resume_a);
            upload_resume_a.text="上传本地简历";
            upload_resume_a.setAttribute("data-toggle","modal");
            upload_resume_a.setAttribute("data-target","#upload");
            let chat=document.createElement("li");
            user_center.appendChild(chat);
            var chat_a=document.createElement("a");
            chat.appendChild(chat_a);
            chat_a.text="问道空间";
            chat_a.setAttribute("onclick","show_div('webchat');show_webchat();change_footer_position()");
            let li1=document.createElement("li");
            user_center.appendChild(li1);
            let log_out=document.createElement("a");
            li1.appendChild(log_out);
            log_out.text="退出";
            log_out.setAttribute("style","color:red");
            log_out.setAttribute("onclick","login_session('delete')");
            log_out.setAttribute("href","index.html");
        }
        else if(data.login_type=="enterprise"){
            let li2=document.createElement("li");
            let modify_user=document.createElement("a");
            user_center.appendChild(li2);
            li2.appendChild(modify_user);
            modify_user.text="修改注册信息";
            modify_user.setAttribute("data-toggle","modal");
            modify_user.setAttribute("data-target","#register-enterprise");
            modify_user.setAttribute("onclick","modify_user_enterprise()");
            let add_job=document.createElement("li");
            let add_job_a=document.createElement("a");
            user_center.appendChild(add_job);
            add_job.appendChild(add_job_a);
            add_job_a.text="发布招聘信息";
            add_job_a.setAttribute("data-toggle","modal");
            add_job_a.setAttribute("data-target","#jobs");
            add_job_a.setAttribute("onclick","init_job();get_address(infilling_address);get_job()");
            let modify_job=document.createElement("li");
            let modify_job_a=document.createElement("a");
            user_center.appendChild(modify_job);
            modify_job.appendChild(modify_job_a);
            modify_job_a.text="修改招聘信息";
            modify_job_a.setAttribute("data-toggle","modal");
            modify_job_a.setAttribute("data-target","#jobs");
            modify_job_a.setAttribute("onclick","function(){init_job();get_address(infilling_address);get_job()}");
            let chat=document.createElement("li");
            user_center.appendChild(chat);
            var chat_a=document.createElement("a");
            chat.appendChild(chat_a);
            chat_a.text="问道空间";
            chat_a.setAttribute("onclick","show_div('webchat');show_webchat();change_footer_position()");
            let li1=document.createElement("li");
            user_center.appendChild(li1);
            let log_out=document.createElement("a");
            li1.appendChild(log_out);
            log_out.text="退出";
            log_out.setAttribute("style","color:red");
            log_out.setAttribute("onclick","login_session('delete')");
            log_out.setAttribute("href","index.html");
        }
        else if(data.login_type=="admin"){
            show_div("admin");
            show_admin();
            let admin=document.createElement("li");
            user_center.appendChild(admin);
            let admin_a=document.createElement("a");
            admin.appendChild(admin_a);
            admin_a.text="后台管理";
            admin_a.setAttribute("onclick","show_div('admin');show_admin();change_footer_position()");
            let chat=document.createElement("li");
            user_center.appendChild(chat);
            var chat_a=document.createElement("a");
            chat.appendChild(chat_a);
            chat_a.text="问道空间";
            chat_a.setAttribute("onclick","show_div('webchat');show_webchat();change_footer_position()");
            let li1=document.createElement("li");
            user_center.appendChild(li1);
            let log_out=document.createElement("a");
            li1.appendChild(log_out);
            log_out.text="退出";
            log_out.setAttribute("style","color:red");
            log_out.setAttribute("onclick","login_session('delete')")
            log_out.setAttribute("href","index.html");
        }
    }
}
function init_user(nickname) {
    document.getElementById("register_btu").innerHTML="";
    document.getElementById("login_btu").text = nickname;
    let user_center=document.getElementById("user_center");
    user_center.innerHTML="";
}
function resetPassword() {
    let user;
    let email=document.getElementById("email").value;
    if (document.cookie!="") {
        let user_string = document.cookie.split(";")[0].split("=")[1];
        user = JSON.parse(user_string);
        user.email=email;
        setCookie("user",JSON.stringify(user),180);
        updatePassword_ajax(user);
    }else {
        let confirm_box=document.getElementById("confirm_box");
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="请先尝试登录";
        document.getElementById("other").innerHTML="<a class=\"btn btn-primary\" href='index.html'>返回登录</a>"
    }
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
    let confirm_box=document.getElementById("confirm_box");
    if (data.msg=="email_not_exist"){
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="该邮箱未注册";
        document.getElementById("other").innerHTML="<a class=\"btn btn-primary\" href='index.html'>返回注册</a>"
    }else if(data.msg!="") {
        confirm_box.setAttribute("class", "alert-warning");
        confirm_box.innerHTML = "注意接收重置密码邮件";
        document.getElementById("basic-addon1").innerHTML = "请输入验证码";
        if (document.cookie != "") {
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
    if (code==user.code){
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
    if (password!=password2){
        confirm_box.setAttribute("class","alert-warning");
        confirm_box.innerHTML="密码不一致";
    }else {
        confirm_box.setAttribute("class","alert-success");
        confirm_box.innerHTML="密码通过";
        if (document.cookie!="") {
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
    if (data.msg=="updatePassword_success"){
        confirm_box.setAttribute("class","alert-success");
        confirm_box.innerHTML="密码修改成功";
        document.getElementById("other").innerHTML="";
        document.getElementById("btu_resetPassword").innerHTML="<a href='index.html' style='color: white'>返回登录</a>"
    }
}
function key_down_event(id) {
    document.getElementById(id).onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
            e = window.event;
        let code = e.charCode || e.keyCode;
        if (code == 13) {
            if (id=="login"){
                reset_user();
                login();
            } else if (id=="preselected_search"){
                query();
            }
        }
    }
}
function direction_key_event(id) {
    document.getElementById(id).onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
            e = window.event;
        let code = e.charCode || e.keyCode;
        let inputs=document.getElementById(id).getElementsByTagName("input");
        let i=0;
        for(; i<inputs.length; i++)
        {
            if(inputs[i].id==document.activeElement.id) {
                break;
            }
        }
        if (code == 37) {//左方向键

        }else if (code==38){//上方向键
            if (i>0) {
                i--;
                inputs[i].focus();
            }
        }else if (code==39){//右方向键

        }else if (code==40){//下方向键
            if (i<inputs.length) {
                i++;
                inputs[i].focus();
            }
        }
    }
    
}
function show_webchat() {
    let webchat=document.getElementById("webchat");
    webchat.innerHTML="<iframe style='opacity: 0.8;height: 600px' marginheight='0' marginwidth='0' src=\"webchat.html\" width=\"100%\" height=\"500\" scrolling=\"auto\" frameborder=\"0\"> </iframe>";

}
function show_admin() {
    let admin=document.getElementById("admin");
    admin.innerHTML="<iframe style='opacity: 0.8;height: 600px' marginheight='0' marginwidth='0' src=\"admin.html\" width=\"100%\" height=\"500\" scrolling=\"auto\" frameborder=\"0\"> </iframe>";

}
function show_hotRecurit() {
    let hotRecurit=document.getElementById("hotRecurit");
    hotRecurit.innerHTML="<iframe style='opacity: 0.8;height: 600px' marginheight='0' marginwidth='0' src=\"public.html\" width=\"100%\" height=\"500\" scrolling=\"auto\" frameborder=\"0\"> </iframe>";

}
function show_div(id) {
    let mypanel=document.getElementsByClassName("mypanel");
    for (let i=0;i<mypanel.length;i++){
        mypanel[i].style.display="none";
    }
    document.getElementById(id).style.display="block";
}
// quick query
function complete_content(){
    let query={};
    let content=document.getElementById("search-con").value;
    if (content!=""){
        query.content=content;
        $.ajax({
            url:"/public?public=query",
            data:query,
            type:"POST",
            dataType:"JSON",
            success:function (data) {
                show_preselected_search(data)
            },
            fail:function () {

            }
        })
    }
}
function show_preselected_search(data) {
    let div=document.getElementById("preselected_search");
    div.style.display="block";
    div.innerHTML="";
    let ul=document.createElement("ul");
    div.appendChild(ul);
    for (let i=0;i<data.length;i++){
        let li=document.createElement("li");
        ul.appendChild(li);
        let a=document.createElement("a");
        a.text=data[i].company;
        li.appendChild(a);
        li.onclick=add_preselected_search_to_search(i);
    }
}
function add_preselected_search_to_search(i) {
    let a=document.getElementById("preselected_search").children[0].children[i].children[0];
    document.getElementById("search-con").value=a.text;
}
function close_preselected_search() {
    document.getElementById("preselected_search").style.display="none";
}
function query() {
    close_preselected_search();
    let search_con=document.getElementById("search-con").value;
    let search={};
    search.content=search_con;
    $.ajax({
        url:"/public?public=query",
        data:search,
        type:"POST",
        dataType:"JSON",
        success:function () {

        },
        fail:function () {

        }
    })
}

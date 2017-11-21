function check_telephone(telephone,confirm_box){
    var user={};
    var telephone=document.getElementById(telephone).value;
    user.telephone=telephone;
    ajax_check_telephone(user,confirm_box);
}
function ajax_check_telephone(user,confirm_box) {
    $.ajax({
        url:'/public?public=checkTelephone',
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            check_telephone_result(data,confirm_box)
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function check_telephone_result(data,confirm_box) {
    if (data.msg=="telephone_exist"){
        document.getElementById(confirm_box).setAttribute("class","alert-warning");
        document.getElementById(confirm_box).innerHTML="请手机号已被注册";
    }else {
        document.getElementById(confirm_box).setAttribute("class","alert-success");
        document.getElementById(confirm_box).innerHTML="该手机号通过验证";
    }
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
        login_session('login');
        location.href="index.html";
    }
    else if(data.msg=="enterprise_success"){
        login_session('login');
        location.href="index.html";
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
    if (data.nickname!="") {
        init_user();
        if (data.login_type=="person"){
            var person_btu=document.getElementById("person_btu")
            person_btu.setAttribute("onclick","show_div('person')");
        }else {
            var enterprise_btu=document.getElementById("enterprise_btu");
            enterprise_btu.setAttribute("onclick","show_div('enterprise')");
        }
    }
}
function init_user() {
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    var nickname = user.nickname;
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


function remember_user(nickname,password,telephone) {
    var user={};
    user.nickname=document.getElementById(nickname).value;
    user.password=document.getElementById(password).value;
    user.telephone=document.getElementById(telephone).value;
    var user_string=JSON.stringify(user);
    var data=new Date();
    data.setDate(data.getDate()+180);
    data.toDateString();
    document.cookie="user="+user_string+";expires="+data;
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
        url:'/login_session',
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
function show_user(nickname,password) {
    var user_string=document.cookie.split(";")[0].split("=")[1];
    var user=JSON.parse(user_string);
    //alert(user.nickname);
    document.getElementById(nickname).value=user.nickname;
    document.getElementById(password).value=user.password;
}

function init_user() {
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    var nickname = user.nickname;
    document.getElementById("login_btu").text = nickname;
    var login_out=document.getElementById("login_out");
    login_out.innerHTML="";
    var a=document.createElement("a");
    a.text="退出登录";
    a.setAttribute("onclick","login_session('delete')");
    a.setAttribute("href","index.html");
    login_out.appendChild(a);
}
function reset_user() {
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    var telephone=user.telephone;
    user.nickname=document.getElementById("nickname").value;
    user.password=document.getElementById("password").value;
    user.telephone=telephone;
    var user_string=JSON.stringify(user);
    var data=new Date();
    data.setDate(data.getDate()+180);
    data.toDateString();
    document.cookie="user="+user_string+";expires="+data;
}
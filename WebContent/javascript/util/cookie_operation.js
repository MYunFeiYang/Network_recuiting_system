
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
function remember_user_login() {
    var radio=document.getElementById('remember_user').checked;
    if (radio){
        var user_string = document.cookie.split(";")[0].split("=")[1];
        var user = JSON.parse(user_string);
        var telephone = user.telephone;
        user.nickname=document.getElementById('nickname').value;
        user.password=document.getElementById('password').value;
        user.telephone=telephone;
        var user_string=JSON.stringify(user);
        var data=new Date();
        data.setDate(data.getDate()+180);
        data.toDateString();
        document.cookie="user="+user_string+";expires="+data;
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
    document.getElementById("login_btu").innerHTML = nickname;
    document.getElementById("login_out").innerHTML = "<a href='index.html'>退出登录</a>";
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
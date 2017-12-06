function setCookie(c_name,value,expireDays)
{
    var existDate=new Date();
    existDate.setDate(existDate.getDate()+expireDays);
    document.cookie=c_name+ "=" +value+
        ((expireDays==null) ? "" : ";expires="+existDate.toGMTString());
}
function remember_user(nickname,password,email) {
    var user={};
    user.nickname=document.getElementById(nickname).value;
    user.password=document.getElementById(password).value;
    user.email=document.getElementById(email);
    setCookie("user",JSON.stringify(user),180);
}
function show_user(nickname,password) {
    if (document.cookie!="") {
        var user_string =document.cookie.split(";")[0].split("=")[1];
        var user = JSON.parse(user_string);
        document.getElementById(nickname).value = user.nickname;
        document.getElementById(password).value = user.password;
    }else {
        return;
    }
}
function reset_user() {
    var nickname=document.getElementById("login_nickname").value;
    var password=document.getElementById("login_password").value;
    if (document.cookie!="") {
        var user_string = document.cookie.split(";")[0].split("=")[1];
        var user = JSON.parse(user_string);
        user.nickname = nickname;
        user.password = password;
        setCookie("user",JSON.stringify(user),180);
    }else {
        var user={};
        user.nickname=nickname;
        user.password=password;
        setCookie("user",JSON.stringify(user),180);
    }
}
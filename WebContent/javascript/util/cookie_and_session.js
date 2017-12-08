function setCookie(c_name,value,expireDays)
{
    let existDate=new Date();
    existDate.setDate(existDate.getDate()+expireDays);
    document.cookie=c_name+ "=" +value+
        ((expireDays==null) ? "" : ";expires="+existDate.toGMTString());
}
function remember_user(nickname,password,email) {
    let user={};
    user.nickname=document.getElementById(nickname).value;
    user.password=document.getElementById(password).value;
    user.email=document.getElementById(email);
    setCookie("user",JSON.stringify(user),180);
}
function show_user(nickname,password) {
    if (document.cookie!="") {
        let user_string =document.cookie.split(";")[0].split("=")[1];
        let user = JSON.parse(user_string);
        document.getElementById(nickname).value = user.nickname;
        document.getElementById(password).value = user.password;
    }else {
        return;
    }
}
function reset_user() {
    let nickname=document.getElementById("login_nickname").value;
    let password=document.getElementById("login_password").value;
    if (document.cookie!="") {
        let user_string = document.cookie.split(";")[0].split("=")[1];
        let user = JSON.parse(user_string);
        user.nickname = nickname;
        user.password = password;
        setCookie("user",JSON.stringify(user),180);
    }else {
        let user={};
        user.nickname=nickname;
        user.password=password;
        setCookie("user",JSON.stringify(user),180);
    }
}

function remember_user(nickname,password,email) {
    var user={};
    user.nickname=document.getElementById(nickname).value;
    user.password=document.getElementById(password).value;
    user.email=document.getElementById(email).value;
    var user_string=JSON.stringify(user);
    var data=new Date();
    data.setDate(data.getDate()+180*24*3600*1000);
    document.cookie="user="+user_string+";expires="+data.toDateString();
}

function show_user(nickname,password) {
    if (document.cookie!="") {
        var user_string = document.cookie.split(";")[0].split("=")[1];
        var user = JSON.parse(user_string);
        //alert(user.nickname);
        document.getElementById(nickname).value = user.nickname;
        document.getElementById(password).value = user.password;
    }else {
        return
    }
}
function reset_user() {
    if (document.cookie!="") {
        var user_string = document.cookie.split(";")[0].split("=")[1];
        var user = JSON.parse(user_string);
        user.nickname = document.getElementById("login_nickname").value;
        user.password = document.getElementById("login_password").value;
        var user_string = JSON.stringify(user);
        var data = new Date();
        data.setDate(data.getDate() + 180*24*3600*1000);
        document.cookie = "user=" + user_string + ";expires=" + data.toDateString();
    }else {
        return
    }
}

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
        url:'/login',
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
        location.href="index.html";
    }
    else if(data.msg=="enterprise_success"){
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
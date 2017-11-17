
function register_enterprise() {
    var company={};
    company.nickname=document.getElementById("enterprise_nickname").value;
    company.password=document.getElementById("enterprise_password").value;
    company.name=document.getElementById("enterprise_name").value;
    company.industry=document.getElementById("enterprise_industry").value;
    company.telephone=document.getElementById("enterprise_telephone").value;
    company.email=document.getElementById("enterprise_email").value;
    company.address=document.getElementById("enterprise_address").value;
    ajax_register_enterprise(company);
}
function ajax_register_enterprise(company) {
    $.ajax({
        url:"http://localhost:8080/Network_recuiting_system/register_enterprise.do",
        data:company,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            register_result_enterprise(data);
            //setTimeout('register_success(data)', 3000);
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function register_result_enterprise(data) {
    if (data.msg=="成功"){
        location.href="index.html";
    }
}
function register_person() {
    var user={};
    user.nickname=document.getElementById("person_nickname").value;
    user.password=document.getElementById("person_password").value;
    user.name=document.getElementById("person_name").value;
    user.telephone=document.getElementById("person_telephone").value;
    user.email=document.getElementById("person_email").value;
    //alert(JSON.stringify(user));
    ajax_register_person(user);
}
function ajax_register_person(user) {
    $.ajax({
        url:"http://localhost:8080/Network_recuiting_system/register_person.do",
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            register_result_person(data);
            //setTimeout('register_success(data)', 3000);
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function register_result_person(data) {
    if (data.msg=="成功"){
        location.href="index.html";
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
        url:'http://localhost:8080/Network_recuiting_system/login.do',
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
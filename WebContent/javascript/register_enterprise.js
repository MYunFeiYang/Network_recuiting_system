function check_telephone(){
    var user={};
    var telephone=document.getElementById("telephone").value;
    user.telephone=telephone;
    ajax_check_telephone(user);
}

function ajax_check_telephone(user) {
    $.ajax({
        url:"http://localhost:8080/Network_recuiting_system/check_telephone_enterprise.do",
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            check_telephone_result(data)
        },
        fail:function (data) {
            alert(data);
        },
    });
}

function check_telephone_result(data) {
    if (data.msg=="成功"){
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="请手机号已被注册";
    }else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-success");
        document.getElementById("confirm_password_box").innerHTML="该手机号通过验证";
    }
}
function register() {
    var company={};
    company.com_nickname=document.getElementById("com_nickname").value;
    company.com_password=document.getElementById("com_password").value;
    company.com_name=document.getElementById("com_name").value;
    company.com_industry=document.getElementById("com_industry").value;
    company.com_telephone=document.getElementById("com_telephone").value;
    company.com_email=document.getElementById("com_email").value;
    company.com_address=document.getElementById("com_address").value;
    company.com_introduction=document.getElementById("com_introduction").value;
    //alert(JSON.stringify(company));
    ajax_register(company);
}
function ajax_register(company) {
    $.ajax({
        url:"http://localhost:8080/Network_recuiting_system/register_enterprise.do",
        data:company,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            register_success(data);
            //setTimeout('register_success(data)', 3000);
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function register_success(data) {
    if (data.msg=="成功"){
        location.href="index.html";
    }
}
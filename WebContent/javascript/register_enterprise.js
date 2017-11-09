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
    company.nickname=document.getElementById("nickname").value;
    company.password=document.getElementById("password").value;
    company.name=document.getElementById("name").value;
    company.industry=document.getElementById("industry").value;
    company.telephone=document.getElementById("telephone").value;
    company.email=document.getElementById("email").value;
    company.address=document.getElementById("address").value;
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
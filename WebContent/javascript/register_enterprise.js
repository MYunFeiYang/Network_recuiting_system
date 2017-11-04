function conf_pwd() {
    var password=document.getElementById("com_password").value;
    var confirm_password=document.getElementById("confirm_password").value;
    //alert(confirm_password);
    if(password==confirm_password){
        document.getElementById("confirm_password_box").innerHTML="两次密码一致";
    }
    else {
        document.getElementById("confirm_password_box").setAttribute("class","alert-warning");
        document.getElementById("confirm_password_box").innerHTML="两次密码不一致";
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
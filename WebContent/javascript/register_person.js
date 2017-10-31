function conf_pwd() {
    var password=document.getElementById("job_password").value;
    var confirm_password=document.getElementById("confirm_password").value;
    //alert(confirm_password);
    if(password==confirm_password){
        document.getElementById("confirm_password_box").innerHTML="两次密码一致";
    }
    else {
        document.getElementById("confirm_password_box").innerHTML="两次密码不一致";
    }
}
function register() {
    var user={};
    user.job_nickname=document.getElementById("job_nickname").value;
    user.job_password=document.getElementById("job_password").value;
    user.job_name=document.getElementById("job_name").value;
    user.job_telephone=document.getElementById("job_telephone").value;
    user.job_email=document.getElementById("job_email").value;
    //alert(JSON.stringify(user));
    ajax_register(JSON.stringify(user));
}
function ajax_register(user) {
    $.ajax({
        url:"http://localhost:8080/Network_recuiting_system/register_person.do",
        data:user,
        type:"POST",
        dataType:"JOSN",
        fail:function (result) {

        },
        success:function (result) {

        }

    });
}
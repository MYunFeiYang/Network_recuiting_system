"use strict";
let n_confirm_box_p;
function register_person() {
    let user={};
    user.nickname=document.getElementById("person_nickname").value;
    user.password=document.getElementById("person_password").value;
    user.name=document.getElementById("person_name").value;
    user.telephone=document.getElementById("person_telephone").value;
    user.email=document.getElementById("person_email").value;
    $.ajax({
        url:"/person?person=register",
        data:user,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            if (data.msg==="success"){
                n_confirm_box_p=document.getElementById("register-person");
                n_confirm_box_p.getElementsByClassName("modal-content")[0].innerHTML="注册成功";
            }
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function modify_user_person() {
    document.getElementById("myregister-person").innerHTML="修改个人注册信息";
    document.getElementById("person_name_group").style.display="none";
    document.getElementById("person_email_group").style.display="none";
    document.getElementById("person_reg_btu").value="提交修改";
    document.getElementById("person_reg_btu").setAttribute("onmouseover","btu_disable_person_modify");
    document.getElementById("person_reg_btu").setAttribute("onclick","modify_person");
}
function modify_person() {
    let nickname=document.getElementById("person_nickname").value;
    let password=document.getElementById("person_password").value;
    let telephone=document.getElementById("person_telephone").value;
    let modify_user={};
    modify_user.telephone=telephone;
    modify_user.nickname=nickname;
    modify_user.password=password;
    $.ajax({
        url: '/person?person=modifyUser',
        data: modify_user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            n_confirm_box_p=document.getElementById(confirm_info_box);
            if (data.msg==="modify_user_success"){
                n_confirm_box_p.innerHTML="信息修改成功";
                n_confirm_box_p.setAttribute("class","alert-success");
            }else {
                n_confirm_box_p.innerHTML="信息修改失败";
                n_confirm_box_p.setAttribute("class","alert-warning");
            }
        },
        fail: function () {

        }
    })
}
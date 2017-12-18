"use strict";
let confirm_box = "confirm_enterprise_box";
let n_confirm_box;
let success_info;
let fail_info;
function register_enterprise() {
    let company = {};
    company.nickname = document.getElementById("enterprise_nickname").value;
    company.password = document.getElementById("enterprise_password").value;
    company.name = document.getElementById("enterprise_name").value;
    company.industry = document.getElementById("enterprise_industry").value;
    company.telephone = document.getElementById("enterprise_telephone").value;
    company.email = document.getElementById("enterprise_email").value;
    company.address = document.getElementById("enterprise_address").value;
    $.ajax({
        url: "/enterprise?enterprise=register",
        data: company,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg==="assessing"){
                n_confirm_box_p=document.getElementById("register-enterprise");
                n_confirm_box_p.getElementsByClassName("modal-content")[0].innerHTML="正在审核中";
            }
        },
        fail: function (data) {
            alert(data);
        },
    });
}

function modify_user_enterprise() {
    document.getElementById("myregister-enterprise").innerHTML = "修改企业注册信息";
    document.getElementById("enterprise_telephone_group").style.display = "none";
    document.getElementById("reg_btu").value = "提交修改";
    document.getElementById("reg_btu").setAttribute("onclick","modify_enterprise()");
}

function modify_enterprise() {
    let nickname = document.getElementById("enterprise_nickname").value;
    let password = document.getElementById("enterprise_password").value;
    let name = document.getElementById("enterprise_name").value;
    let industry = document.getElementById("enterprise_industry").value;
    let telephone = document.getElementById("enterprise_telephone").value;
    let address = document.getElementById("enterprise_address").value;
    let modify_user = {};
    modify_user.telephone = telephone;
    modify_user.nickname = nickname;
    modify_user.name = name;
    modify_user.industry = industry;
    modify_user.address = address;
    modify_user.password = password;
    $.ajax({
        url: '/enterprise?enterprise=modifyUser',
        data: modify_user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            n_confirm_box = document.getElementById(confirm_box);
            if (data.msg === "modify_user_success") {
                success_info = "信息修改成功";
                n_confirm_box.innerHTML = success_info;
                n_confirm_box.setAttribute("class", "alert-success");
            } else {
                fail_info = "信息修改失败";
                n_confirm_box.innerHTML = fail_info;
                n_confirm_box.setAttribute("class", "alert-warning");
            }
        },
        fail: function () {

        }
    })
}

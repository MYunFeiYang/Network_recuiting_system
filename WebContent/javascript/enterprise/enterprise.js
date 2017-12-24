"use strict";
let confirm_box = "confirm_enterprise_box";
let n_confirm_box;
let success_info;
let fail_info;
let n_modify_enterprise;
let form_e;
let input_e;

function modify_enterprise_before_select() {
    let user = JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    $.ajax({
        url: "enterprise?enterprise=modifyEnterpriseBeforeSelect",
        data: user,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data !== null) {
                n_modify_enterprise = document.getElementById("modify-enterprise");
                form_e = n_modify_enterprise.getElementsByTagName("form")[0];
                input_e = form_e.getElementsByTagName('input');
                input_e[0].value = data.nickname;
                input_e[1].value = data.password;
                input_e[2].value = data.password;
                input_e[3].value = data.name;
                input_e[4].value = data.industry;
                input_e[5].value = data.email;
                input_e[6].value = data.telephone;
                input_e[7].value = data.address;
            }
        },
        fail: function () {

        }
    })
}

function modify_enterprise() {
    n_modify_enterprise = document.getElementById("modify-enterprise");
    form_e = n_modify_enterprise.getElementsByTagName("form")[0];
    input_e = form_e.getElementsByTagName('input');
    let user = JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    let modify_user = {};
    modify_user.nickname = input_e[0].value;
    modify_user.password = input_e[1].value;
    modify_user.name = input_e[3].value;
    modify_user.industry = input_e[4].value;
    modify_user.email = input_e[5].value;
    modify_user.telephone = input_e[6].value;
    modify_user.address = input_e[7].value;
    modify_user.oldnickname = user.nickname;
    modify_user.oldpassword = user.password;
    $.ajax({
        url: '/enterprise?enterprise=modifyUser',
        data: modify_user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            n_confirm_box = document.getElementById(confirm_box);
            if (data.msg === "modify_user_success") {
                n_confirm_box.classList.remove("hidden");
                success_info = "信息修改成功";
                n_confirm_box.innerHTML = success_info;
                n_confirm_box.setAttribute("class", "alert-success");
            } else {
                n_confirm_box.classList.remove("hidden");
                fail_info = "信息修改失败";
                n_confirm_box.innerHTML = fail_info;
                n_confirm_box.setAttribute("class", "alert-warning");
            }
        },
        fail: function () {

        }
    })
}

function clearData(obj) {
    obj.getElementsByTagName("form")[0].reset();
}
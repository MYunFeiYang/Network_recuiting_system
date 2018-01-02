"use strict";
let confirm_box_p;
let input;

function modify_person_before_select() {
    let user = JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    $.ajax({
        url: "/person?person=modifyUserBeforeSelect",
        data: user,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data !== null) {
                input = $("#modifyInfo form:first input");
                input[0].value = data.nickname;
                input[1].value = data.password;
                input[2].value = data.password;
                input[3].value = data.name;
                input[4].value = data.email;
                input[5].value = data.telephone;
            }
        }
    })
}

function modify_person(confirm_info_box) {
    input = $("#modifyInfo form:first input");
    let user = JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    let modify_user = {};
    modify_user.nickname = input[0].value;
    modify_user.password = input[1].value;
    modify_user.name = input[3].value;
    modify_user.telephone = input[4].value;
    modify_user.email = input[5].value;
    modify_user.oldnickname = user.nickname;
    modify_user.oldpassword = user.password;
    $.ajax({
        url: '/person?person=modifyUser',
        data: modify_user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            confirm_box_p = document.getElementById(confirm_info_box);
            if (data.msg === "modify_user_success") {
                confirm_box_p.classList.remove("hidden");
                confirm_box_p.innerHTML = "信息修改成功";
                confirm_box_p.setAttribute("class", "alert-success");
            } else {
                confirm_box_p.classList.remove("hidden");
                confirm_box_p.innerHTML = "信息修改失败";
                confirm_box_p.setAttribute("class", "alert-warning");
            }
        }
    })
}

function auto_match() {
    let user = JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    $.ajax({
        url: "/person?person=auto_match",
        data: user,
        type: "POST",
        dataType: "JSON",
        success: function () {

        }
    })
}

function clearData(obj) {
    obj.getElementsByTagName("form")[0].reset();
}
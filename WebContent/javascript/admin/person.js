"use strict";
let n_person_assess;
let assess;
let row;
let n_person;
let n_xuhao_p;
let n_nickname_p;
let n_password_p;
let n_name_p;
let n_email_p;
let n_telephone_p;
let n_time;
let n_operate_p;
let c_xuhao_p;
let c_nickname_p;
let c_password_p;
let c_name_p;
let c_telephone_p;
let c_email_p;
let c_time;
let ob_person = {};
let j = 0;

function get_register_person_count() {
    $.ajax({
        url: "/admin/person_assessment/registerCount",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            document.getElementsByClassName("leftMenu")[1].getElementsByClassName("badge")[0].innerText = data.count;
        },
        fail: function () {

        }
    })
}

function init_person_assessment() {
    $.ajax({
        url: "/admin/person_assessment/init",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.length > 0) {
                n_person_assess = document.getElementById("person_assess");
                n_person_assess.innerHTML = "";
                for (assess = 0; assess < data.length; assess++) {
                    row = document.createElement("tr");
                    n_person_assess.appendChild(row);
                    n_xuhao_p = document.createElement("td");
                    n_nickname_p = document.createElement("td");
                    n_password_p = document.createElement("td");
                    n_name_p = document.createElement("td");
                    n_email_p = document.createElement("td");
                    n_telephone_p = document.createElement("td");
                    n_operate_p = document.createElement("td");
                    row.appendChild(n_xuhao_p);
                    row.appendChild(n_nickname_p);
                    row.appendChild(n_password_p);
                    row.appendChild(n_name_p);
                    row.appendChild(n_telephone_p);
                    row.appendChild(n_email_p);
                    row.appendChild(n_operate_p);
                    c_xuhao_p = assess + 1;
                    c_nickname_p = data[assess].nickname;
                    c_password_p = data[assess].password;
                    c_name_p = data[assess].name;
                    c_telephone_p = data[assess].telephone;
                    c_email_p = data[assess].email;
                    n_xuhao_p.innerHTML = c_xuhao_p;
                    n_nickname_p.innerHTML = `<input type='text' readonly="readonly" class=\"form-conrowol input-sm\" value=${c_nickname_p}>`;
                    n_password_p.innerHTML = `<input type='text' readonly="readonly" class=\"form-conrowol input-sm\" value=${c_password_p}>`;
                    n_name_p.innerHTML = `<input type='text' readonly="readonly" class=\"form-conrowol input-sm\" value=${c_name_p}>`;
                    n_telephone_p.innerHTML = `<input type='text' readonly="readonly" class=\"form-conrowol input-sm\" value=${c_telephone_p}>`;
                    n_email_p.innerHTML = `<input type='text' readonly="readonly" class=\"form-conrowol input-sm\" value=${c_email_p}>`;
                    n_operate_p.innerHTML = `<button class=\"btn btn-info btn-sm\" onclick="pass_person_assessment(this)">通过</button>`;
                }
            }
        },
        fail: function () {

        }
    })
}

function pass_person_assessment(obj) {
    row = obj.parentNode.parentNode;
    c_nickname_p = row.childNodes[1].firstChild.value;
    c_password_p = row.childNodes[2].firstChild.value;
    ob_person.nickname = c_nickname_p;
    ob_person.password = c_password_p;
    $.ajax({
        url: "admin/person_assessment/pass",
        data: ob_person,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "person_assessment_pass") {
                row.classList.add("success");
            }
        },
        fail: function () {

        }
    })
}

function init_person_account() {
    $.ajax({
        url: "/admin/person_account/init",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            n_person = document.getElementById("person");
            n_person.innerHTML = "";
            if (data.length === 0) {
                add_row_p();
            } else {
                for (j = 0; j < data.length; j++) {
                    row = document.createElement("tr");
                    n_person.appendChild(row);
                    n_xuhao_p = document.createElement("td");
                    n_nickname_p = document.createElement("td");
                    n_password_p = document.createElement("td");
                    n_time = document.createElement("td");
                    n_operate_p = document.createElement("td");
                    row.appendChild(n_xuhao_p);
                    row.appendChild(n_nickname_p);
                    row.appendChild(n_password_p);
                    row.appendChild(n_time);
                    row.appendChild(n_operate_p);
                    c_nickname_p = data[j].nickname;
                    c_password_p = data[j].password;
                    c_time = data[j].login_time;
                    c_xuhao_p = (j + 1);
                    n_xuhao_p.innerHTML = c_xuhao_p;
                    n_nickname_p.innerHTML = `<input type='text' readonly="readonly" size="20" class=\"form-conrowol input-sm\" value=${c_nickname_p}>`;
                    n_password_p.innerHTML = `<input type='text' readonly="readonly" size="20" class=\"form-conrowol input-sm\" value=${c_password_p}>`;
                    n_time.innerHTML = `<input type='text' readonly="readonly" size="20" class=\"form-conrowol input-sm\" value=${c_time}>`;
                    n_operate_p.innerHTML = `<button class=\"btn btn-danger btn-sm\" onclick="delete_account_p(this)">删除</button><button class=\"btn btn-info btn-sm\" onclick="add_row_p()">新增</button>`;
                }
            }
        }
    })
}


function add_row_p() {
    n_person = document.getElementById("person");
    row = document.createElement("tr");
    n_person.appendChild(row);
    n_xuhao_p = document.createElement("td");
    n_nickname_p = document.createElement("td");
    n_password_p = document.createElement("td");
    n_time = document.createElement("td");
    n_operate_p = document.createElement("td");
    row.appendChild(n_xuhao_p);
    row.appendChild(n_nickname_p);
    row.appendChild(n_password_p);
    row.appendChild(n_time);
    row.appendChild(n_operate_p);
    c_xuhao_p = (++j);
    n_xuhao_p.innerHTML = c_xuhao_p;
    n_nickname_p.innerHTML = `<input type='text' size="20" class=\"form-conrowol input-sm\">`;
    n_password_p.innerHTML = `<input type='text' size="20" class=\"form-conrowol input-sm\">`;
    n_time.innerHTML = `<input type='text' size="20" class=\"form-conrowol input-sm\">`;
    n_operate_p.innerHTML = `<button class=\"btn btn-primary btn-sm\" onclick="add_account_p(this)">保存</button><button class=\"btn btn-danger btn-sm\" onclick="delete_account_p(this)">删除</button><button class=\"btn btn-info btn-sm\" onclick="add_row_p()">新增</button>`

}

function add_account_p(obj) {
    let row = obj.parentNode.parentNode;
    n_nickname_p = row.getElementsByTagName("input")[0];
    c_nickname_p = n_nickname_p.value;
    n_password_p = row.getElementsByTagName("input")[1];
    c_password_p = n_password_p.value;
    n_time = row.getElementsByTagName("input")[2];
    c_time = n_time.value;
    ob_person.nickname = c_nickname_p;
    ob_person.password = c_password_p;
    ob_person.login_time = c_time;
    $.ajax({
        url: "/admin/person_account/add",
        data: ob_person,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "add_person_account_success") {
                row.classList.add("success");
            } else {
                row.classList.add("warning");
            }
        }
    })
}

function delete_account_p(obj) {
    row = obj.parentNode.parentNode;
    c_nickname_p = row.childNodes[1].firstChild.value;
    c_password_p = row.childNodes[2].firstChild.value;
    ob_person.nickname = c_nickname_p;
    ob_person.password = c_password_p;
    $.ajax({
        url: "/admin/person_account/delete",
        data: ob_person,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "delete_account_success") {
                row.style.display = "none";
                j--;
            } else {
                row.classList.add("warning");
            }
        }
    })
}
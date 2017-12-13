"use strict";
let n_person;
let n_xuhao_p;
let n_nickname_p;
let n_password_p;
let n_time;
let n_operate_p;
let c_xuhao_p;
let c_nickname_p;
let c_password_p;
let c_time;
let ob_person = {};
let j = 0;

function init_person_account_ajax() {
    $.ajax({
        url: "/admin/person_account/init",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            init_person_account(data);
        },
        fail: function () {

        }
    })
}

function init_person_account(data) {
    n_person = document.getElementById("person");
    n_person.innerHTML = "";
    if (data.length===0){
        add_row_p();
    }else {
        for (j = 0; j < data.length; j++) {
            let tr = document.createElement("tr");
            n_person.appendChild(tr);
            n_xuhao_p = document.createElement("td");
            n_nickname_p = document.createElement("td");
            n_password_p = document.createElement("td");
            n_time = document.createElement("td");
            n_operate_p = document.createElement("td");
            tr.appendChild(n_xuhao_p);
            tr.appendChild(n_nickname_p);
            tr.appendChild(n_password_p);
            tr.appendChild(n_time);
            tr.appendChild(n_operate_p);
            c_nickname_p = data[j].nickname;
            c_password_p = data[j].password;
            c_time = data[j].login_time;
            c_xuhao_p = (j + 1);
            n_xuhao_p.innerHTML = c_xuhao_p;
            n_nickname_p.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_nickname_p}>`;
            n_password_p.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_password_p}>`;
            n_time.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_time}>`;
            n_operate_p.innerHTML = `<button class=\"btn btn-danger btn-sm\" onclick="delete_account_p(this)">删除</button><button class=\"btn btn-info btn-sm\" onclick="add_row_p()">新增</button>`;
        }
    }
}


function add_row_p() {
    n_person = document.getElementById("person");
    let row = document.createElement("tr");
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
    n_nickname_p.innerHTML = `<input type='text' class=\"form-control input-sm\">`;
    n_password_p.innerHTML = `<input type='text' class=\"form-control input-sm\">`;
    n_time.innerHTML = `<input type='text' class=\"form-control input-sm\">`;
    n_operate_p.innerHTML = `<button class=\"btn btn-primary btn-sm\" onclick="add_account_p(this)">保存</button><button class=\"btn btn-danger btn-sm\" onclick="delete_account_p(this)">删除</button><button class=\"btn btn-info btn-sm\" onclick="add_row_p()">新增</button>`

}

function add_account_p(obj) {
    let tr = obj.parentNode.parentNode;
    n_nickname_p = tr.getElementsByTagName("input")[0];
    c_nickname_p = n_nickname_p.value;
    n_password_p = tr.getElementsByTagName("input")[1];
    c_password_p = n_password_p.value;
    n_time = tr.getElementsByTagName("input")[2];
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
                tr.classList.add("success");
            } else {
                tr.classList.add("warning");
            }
        },
        fail: function () {

        }
    })
}

function delete_account_p(obj) {
    let tr = obj.parentNode.parentNode;
    n_nickname_p = tr.getElementsByTagName("input")[0];
    c_nickname_p = n_nickname_p.value;
    n_password_p = tr.getElementsByTagName("input")[1];
    c_password_p = n_password_p.value;
    n_time = tr.getElementsByTagName("input")[2];
    c_time = n_time.value;
    ob_person.nickname = c_nickname_p;
    ob_person.password = c_password_p;
    ob_person.login_time = c_time;
    $.ajax({
        url: "/admin/person_account/delete",
        data: ob_person,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "delete_account_success") {
                tr.style.display = "none";
                j--;
            } else {
                tr.classList.add("warning");
            }
        },
        fail: function () {

        }
    })
}


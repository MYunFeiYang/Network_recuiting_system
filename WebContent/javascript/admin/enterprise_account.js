"use strict";
let n_enterprise;
let n_xuhao_e;
let n_nickname_e;
let n_password_e;
let n_time_e;
let n_operate_e;
let c_xuhao_e;
let c_nickname_e;
let c_password_e;
let c_time_e;
let ob_enterprise = {};
let k = 0;

function init_enterprise_account_ajax() {
    $.ajax({
        url: "/admin/enterprise_account/init",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            init_enterprise_account(data);
        },
        fail: function () {

        }
    })
}

function init_enterprise_account(data) {
    n_enterprise = document.getElementById("enterprise");
    n_enterprise.innerHTML = "";
    if (data.length===0){
        add_row_e();
    }else {
        for (k = 0; k < data.length; k++) {
            let tr = document.createElement("tr");
            n_enterprise.appendChild(tr);
            n_xuhao_e = document.createElement("td");
            n_nickname_e = document.createElement("td");
            n_password_e = document.createElement("td");
            n_time_e = document.createElement("td");
            n_operate_e = document.createElement("td");
            tr.appendChild(n_xuhao_e);
            tr.appendChild(n_nickname_e);
            tr.appendChild(n_password_e);
            tr.appendChild(n_time_e);
            tr.appendChild(n_operate_e);
            c_nickname_e = data[k].nickname;
            c_password_e = data[k].password;
            c_time_e = data[k].login_time;
            c_xuhao_e = (k + 1);
            n_xuhao_e.innerHTML = c_xuhao_e;
            n_nickname_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control\" value=${c_nickname_e}>`;
            n_password_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control\" value=${c_password_e}>`;
            n_time_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control\" value=${c_time_e}>`;
            n_operate_e.innerHTML = `<button class=\"btn btn-danger\" onclick="delete_account_e(this)">删除</button><button class=\"btn btn-info\" onclick="add_row_e()">新增</button>`;
        }
    }
}


function add_row_e() {
    n_enterprise = document.getElementById("enterprise");
    let row = document.createElement("tr");
    n_enterprise.appendChild(row);
    n_xuhao_e = document.createElement("td");
    n_nickname_e = document.createElement("td");
    n_password_e = document.createElement("td");
    n_time_e = document.createElement("td");
    n_operate_e = document.createElement("td");
    row.appendChild(n_xuhao_e);
    row.appendChild(n_nickname_e);
    row.appendChild(n_password_e);
    row.appendChild(n_time_e);
    row.appendChild(n_operate_e);
    c_xuhao_e = (++k);
    n_xuhao_e.innerHTML = c_xuhao_e;
    n_nickname_e.innerHTML = `<input type='text' class=\"form-control\">`;
    n_password_e.innerHTML = `<input type='text' class=\"form-control\">`;
    n_time_e.innerHTML = `<input type='text' class=\"form-control\">`;
    n_operate_e.innerHTML = `<button class=\"btn btn-primary\" onclick="add_account_e(this)">保存</button><button class=\"btn btn-danger\" onclick="delete_admin_e(this)">删除</button><button class=\"btn btn-info\" onclick="add_row_e()">新增</button>`

}

function add_account_e(obj) {
    let tr = obj.parentNode.parentNode;
    n_nickname_e = tr.getElementsByTagName("input")[0];
    c_nickname_e = n_nickname_e.value;
    n_password_e = tr.getElementsByTagName("input")[1];
    c_password_e = n_password_e.value;
    n_time_e = tr.getElementsByTagName("input")[2];
    c_time_e = n_time_e.value;
    ob_enterprise.nickname = c_nickname_e;
    ob_enterprise.password = c_password_e;
    ob_enterprise.login_time = c_time_e;
    $.ajax({
        url: "/admin/enterprise_account/add",
        data: ob_enterprise,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "add_enterprise_account_success") {
                tr.classList.add("success");
            } else {
                tr.classList.add("warning");
            }
        },
        fail: function () {

        }
    })
}

function delete_account_e(obj) {
    let tr = obj.parentNode.parentNode;
    n_nickname_e = tr.getElementsByTagName("input")[0];
    c_nickname_e = n_nickname_e.value;
    n_password_e = tr.getElementsByTagName("input")[1];
    c_password_e = n_password_e.value;
    n_time_e = tr.getElementsByTagName("input")[2];
    c_time_e = n_time_e.value;
    ob_enterprise.nickname = c_nickname_e;
    ob_enterprise.password = c_password_e;
    ob_enterprise.login_time = c_time_e;
    $.ajax({
        url: "/admin/enterprise_account/delete",
        data: ob_enterprise,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "delete_account_success") {
                tr.style.display = "none";
                k--;
            } else {
                tr.classList.add("warning");
            }
        },
        fail: function () {

        }
    })
}


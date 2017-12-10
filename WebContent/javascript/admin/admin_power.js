"use strict";
let n_admin;
let n_xuhao;
let n_nickname;
let n_password;
let n_power;
let n_operate;
let c_xuhao;
let c_nickname;
let c_password;
let c_power;
let ob_admin = {};
let i = 0;

function init_admin_ajax() {
    $.ajax({
        url: "/admin/power/init",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            init_admin(data);
        },
        fail: function () {

        }
    })
}

function init_admin(data) {
    n_admin = document.getElementById("admin");
    if (data.length === 0) {
        add_row();
    } else {
        n_admin.innerHTML = "";
        for (i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            n_admin.appendChild(tr);
            n_xuhao = document.createElement("td");
            n_nickname = document.createElement("td");
            n_password = document.createElement("td");
            n_power = document.createElement("td");
            n_operate = document.createElement("td");
            tr.appendChild(n_xuhao);
            tr.appendChild(n_nickname);
            tr.appendChild(n_password);
            tr.appendChild(n_power);
            tr.appendChild(n_operate);
            c_nickname = data[i].nickname;
            c_password = data[i].password;
            c_power = data[i].power;
            c_xuhao = (i + 1);
            n_xuhao.innerHTML = c_xuhao;
            n_nickname.innerHTML = `<input type='text' readonly="readonly" class=\"form-control\" value=${c_nickname}>`;
            n_password.innerHTML = `<input type='text' readonly="readonly" class=\"form-control\" value=${c_password}>`;
            n_power.innerHTML = `<select class=\"form-control\"><option value='super'>超级管理员</option><option value='admin'>管理员</option></select>`;
            n_operate.innerHTML = `<button class=\"btn btn-primary\" onclick="modify_admin(this)">保存</button><button class=\"btn btn-danger\" onclick="delete_admin(this)">删除</button><button class=\"btn btn-info\" onclick="add_row()">新增</button>`
        }
    }
}

function modify_admin(obj) {
    let tr = obj.parentNode.parentNode;
    n_nickname = tr.getElementsByTagName("input")[0];
    c_nickname = n_nickname.value;
    n_password = tr.getElementsByTagName("input")[1];
    c_password = n_password.value;
    n_power = tr.getElementsByTagName("select")[0];
    c_power = n_power.value;
    ob_admin.nickname = c_nickname;
    ob_admin.password = c_password;
    ob_admin.power = c_power;
    $.ajax({
        url: "/admin/power/modify",
        data: ob_admin,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "modify_power_success") {
                tr.classList.add("success");
            } else {
                tr.classList.add("warning");
            }
        },
        fail: function () {

        }
    })
}

function add_row() {
    n_admin = document.getElementById("admin");
    let row = document.createElement("tr");
    n_admin.appendChild(row);
    n_xuhao = document.createElement("td");
    n_nickname = document.createElement("td");
    n_password = document.createElement("td");
    n_power = document.createElement("td");
    n_operate = document.createElement("td");
    row.appendChild(n_xuhao);
    row.appendChild(n_nickname);
    row.appendChild(n_password);
    row.appendChild(n_power);
    row.appendChild(n_operate);
    c_xuhao = (++i);
    n_xuhao.innerHTML = c_xuhao;
    n_nickname.innerHTML = `<input type='text' class=\"form-control\">`;
    n_password.innerHTML = `<input type='text' class=\"form-control\">`;
    n_power.innerHTML = `<select class=\"form-control\"><option value='super'>超级管理员</option><option value='admin'>管理员</option></select>`;
    n_operate.innerHTML = `<button class=\"btn btn-primary\" onclick="add_admin(this)">保存</button><button class=\"btn btn-danger\" onclick="delete_admin(this)">删除</button><button class=\"btn btn-info\" onclick="add_row()">新增</button>`

}

function add_admin(obj) {
    let tr = obj.parentNode.parentNode;
    n_nickname = tr.getElementsByTagName("input")[0];
    c_nickname = n_nickname.value;
    n_password = tr.getElementsByTagName("input")[1];
    c_password = n_password.value;
    n_power = tr.getElementsByTagName("select")[0];
    c_power = n_power.value;
    ob_admin.nickname = c_nickname;
    ob_admin.password = c_password;
    ob_admin.power = c_power;
    $.ajax({
        url: "/admin/power/add",
        data: ob_admin,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "add_power_success") {
                tr.classList.add("success");
            } else {
                tr.classList.add("warning");
            }
        },
        fail: function () {

        }
    })
}

function delete_admin(obj) {
    let tr = obj.parentNode.parentNode;
    n_nickname = tr.getElementsByTagName("input")[0];
    c_nickname = n_nickname.value;
    n_password = tr.getElementsByTagName("input")[1];
    c_password = n_password.value;
    n_power = tr.getElementsByTagName("select")[0];
    c_power = n_power.value;
    ob_admin.nickname = c_nickname;
    ob_admin.password = c_password;
    ob_admin.power = c_power;
    $.ajax({
        url: "/admin/power/delete",
        data: ob_admin,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "delete_power_success") {
                tr.style.display = "none";
                i--;
            } else {
                tr.classList.add("warning");
            }
        },
        fail: function () {

        }
    })
}


"use strict";
let n_enterprise;
let n_enterprise_assess;
let row_e;
let n_xuhao_e;
let n_nickname_e;
let n_password_e;
let n_name_e;
let n_industry;
let n_address;
let n_email_e;
let n_telephone_e;
let n_time_e;
let n_operate_e;
let assess_e;
let c_xuhao_e;
let c_nickname_e;
let c_password_e;
let c_name_e;
let c_industry_e;
let c_address_e;
let c_telephone_e;
let c_email_e;
let c_time_e;
let ob_enterprise = {};
let k = 0;
function init_enterprise_assessment() {
    $.ajax({
        url:"/admin/enterprise_assessment/init",
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            if (data.length>0){
                n_enterprise_assess=document.getElementById("enterprise_assess");
                n_enterprise_assess.innerHTML="";
                for (assess_e=0;assess_e<data.length;assess_e++){
                    row_e=document.createElement("tr");
                    n_enterprise_assess.appendChild(row_e);
                    n_xuhao_e=document.createElement("td");
                    n_nickname_e=document.createElement("td");
                    n_password_e=document.createElement("td");
                    n_name_e=document.createElement("td");
                    n_industry=document.createElement("td");
                    n_address=document.createElement("td");
                    n_email_e=document.createElement("td");
                    n_telephone_e=document.createElement("td");
                    n_operate_e=document.createElement("td");
                    row_e.appendChild(n_xuhao_e);
                    row_e.appendChild(n_nickname_e);
                    row_e.appendChild(n_password_e);
                    row_e.appendChild(n_name_e);
                    row_e.appendChild(n_industry);
                    row_e.appendChild(n_address);
                    row_e.appendChild(n_email_e);
                    row_e.appendChild(n_telephone_e);
                    row_e.appendChild(n_operate_e);
                    c_xuhao_e=assess_e+1;
                    c_nickname_e=data[assess_e].nickname;
                    c_password_e=data[assess_e].password;
                    c_name_e=data[assess_e].name;
                    c_industry_e=data[assess_e].industry;
                    c_address_e=data[assess_e].address;
                    c_email_e=data[assess_e].email;
                    c_telephone_e=data[assess_e].telephone;
                    n_xuhao_e.innerHTML = c_xuhao_e;
                    n_nickname_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_nickname_e}>`;
                    n_password_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_password_e}>`;
                    n_name_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_name_e}>`;
                    n_industry.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_industry_e}>`;
                    n_address.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_address_e}>`;
                    n_email_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_email_e}>`;
                    n_telephone_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_telephone_e}>`;
                    n_operate_e.innerHTML = `<button class=\"btn btn-info btn-sm\" onclick="pass_enterprise_assessment(this)">通过</button>`;
                }
            }
        },
        fail:function () {
            
        }
    })
}

function pass_enterprise_assessment(obj) {
    row_e=obj.parentNode.parentNode;
    c_nickname_e=row_e.childNodes[1].firstChild.value;
    c_password_e=row_e.childNodes[2].firstChild.value;
    ob_enterprise.nickname=c_nickname_e;
    ob_enterprise.password=c_password_e;
    $.ajax({
        url:"admin/enterprise_assessment/pass",
        data:ob_enterprise,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            if (data.msg==="enterprise_assessment_pass"){
                row_e.classList.add("success");
            }
        },
        fail:function () {

        }
    })
}
function init_enterprise_account() {
    $.ajax({
        url: "/admin/enterprise_account/init",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
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
                    n_nickname_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_nickname_e}>`;
                    n_password_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_password_e}>`;
                    n_time_e.innerHTML = `<input type='text' readonly="readonly" class=\"form-control input-sm\" value=${c_time_e}>`;
                    n_operate_e.innerHTML = `<button class=\"btn btn-danger btn-sm\" onclick="delete_account_e(this)">删除</button><button class=\"btn btn-info btn-sm\" onclick="add_row_e()">新增</button>`;
                }
            }
        },
        fail: function () {

        }
    })
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
    n_nickname_e.innerHTML = `<input type='text' class=\"form-control input-sm\">`;
    n_password_e.innerHTML = `<input type='text' class=\"form-control input-sm\">`;
    n_time_e.innerHTML = `<input type='text' class=\"form-control input-sm\">`;
    n_operate_e.innerHTML = `<button class=\"btn btn-primary btn-sm\" onclick="add_account_e(this)">保存</button><button class=\"btn btn-danger btn-sm\" onclick="delete_admin_e(this)">删除</button><button class=\"btn btn-info btn-sm\" onclick="add_row_e()">新增</button>`

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


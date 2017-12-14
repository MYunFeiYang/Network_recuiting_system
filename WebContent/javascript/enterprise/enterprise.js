"use strict";
let confirm_box = "confirm_enterprise_box";
let n_confirm_box;
let n_industry;
let n_address;
let n_position;
let c_name_e;
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
            if (data.msg === "success") {
                location.href = "index.html";
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

function init_job() {
    document.getElementById("jobs").style.display = "block";
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    $.ajax({
        url: '/enterprise?enterprise=initJob',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            if (data.length > 0) {
                document.getElementById("name").value = data.name;
                document.getElementById("address").value = data.address;
                document.getElementById("industry").value = data.industry;
                document.getElementById("email").value = data.email;
            }
        },
        fail: function () {

        }
    })
}

function get_address(address) {
    $.ajax({
        url: "/query/address",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            n_address = document.getElementById(address);
            for (let i = 1; i < data.length; i++) {
                let option = document.createElement("option");
                n_address.appendChild(option);
                option.value = data[i].text;
                option.innerHTML = data[i].text;
            }
        },
        fail: function () {

        }
    });
}

function get_industry(industry) {
    $.ajax({
        url: "/query/industry",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            n_industry = document.getElementById(industry);
            for (let i = 1; i < data.length; i++) {
                let option = document.createElement("option");
                n_industry.appendChild(option);
                option.value = data[i].text;
                option.innerHTML = data[i].text;
            }
        },
        fail: function () {

        }
    });
}

function get_position(industry,position) {
    let job = {};
    c_name_e = document.getElementById(industry).value;
    job.job_name = c_name_e;
    $.ajax({
        url: "/query/position",
        type: "POST",
        data: job,
        dataType: "JSON",
        success: function (data) {
            n_position = document.getElementById(position);
            n_position.innerHTML = "";
            for (let i = 1; i < data.length; i++) {
                let option = document.createElement("option");
                n_position.appendChild(option);
                option.value = data[i].position;
                option.innerHTML = data[i].position;
            }
        },
        fail: function () {

        }
    });
}

function add_job() {
    let job = {};
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    let nickname = user.nickname;
    let password = user.password;
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let industry = document.getElementById("industry").value;
    let job_name = document.getElementById("job").value;
    let number = document.getElementById("number").value;
    let salary = document.getElementById("salary").value;
    let publish_time = document.getElementById("publish_time").value;
    let effective_time = document.getElementById("effective_time").value;
    let email = document.getElementById("email").value;
    let telephone = document.getElementById("c_telephone").value;
    job.nickname = nickname;
    job.password = password;
    job.name = name;
    job.address = address;
    job.industry = industry;
    job.job_name = job_name;
    job.number = number;
    job.salary = salary;
    job.publish_time = publish_time;
    job.effective_time = effective_time;
    job.email = email;
    job.telephone = telephone;
    $.ajax({
        url: '/enterprise?enterprise=addJob',
        data: job,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            let confirm_job_box = document.getElementById("confirm_job_box");
            if (data.msg === "add_job_success") {
                confirm_job_box.innerHTML = "岗位发布成功";
                confirm_job_box.setAttribute("class", "alert-success");
            } else {
                confirm_job_box.innerHTML = "岗位发布失败";
                confirm_job_box.setAttribute("class", "alert-warning");
            }
        },
        fail: function () {

        }
    })

}
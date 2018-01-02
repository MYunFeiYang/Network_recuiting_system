"use strict";
let n_job;
let row;
let confirm_job_box;
let n_identification;
let n_name;
let n_number;
let n_salary;
let n_publish_time;
let n_effective_time;
let n_operate;
let c_identification;
let c_name;
let c_address;
let c_industry;
let c_position;
let c_number;
let c_salary;
let c_publish_time;
let c_effective_time;
let o_job;

function init_job() {
    $("#jobs").css("display:block");
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    $.ajax({
        url: '/enterprise?enterprise=initJob',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            if (data !== null) {
                $("#name").val(data.name);
                $("#address").val(data.address);
                $("#industry").val(data.industry);
                $("#email").val(data.email);
            }
        }
    })
}

function add_job() {
    let job = {};
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    let nickname = user.nickname;
    let password = user.password;
    let name = $("#name").val();
    let address = $("#address").val();
    let industry = $("#industry").val();
    let position = $("#position").val();
    let number = $("#number").val();
    let salary = $("#salary").val();
    let publish_time = $("#publish_time").val();
    let effective_time = $("#effective_time").val();
    let email = $("#email").val();
    let telephone = $("#c_telephone").val();
    confirm_job_box = $("#confirm_job_box");
    if (name === "") {
        confirm_job_box.removeClass("hidden");
        confirm_job_box.html("公司名称不能为空");
        confirm_job_box.attr("class", "alert-warning");
    } else if (number === "") {
        confirm_job_box.removeClass("hidden");
        confirm_job_box.html("招聘人数不能为空");
        confirm_job_box.attr("class", "alert-warning");
    } else if (effective_time === "") {
        confirm_job_box.removeClass("hidden");
        confirm_job_box.html("有效时间不能为空");
        confirm_job_box.attr("class", "alert-warning");
    } else {
        job.nickname = nickname;
        job.password = password;
        job.name = name;
        job.address = address;
        job.industry = industry;
        job.position = position;
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
                if (data.msg === "add_job_success") {
                    confirm_job_box.removeClass("hidden");
                    confirm_job_box.html("岗位发布成功");
                    confirm_job_box.attr("class", "alert-success");
                } else {
                    confirm_job_box.removeClass("hidden");
                    confirm_job_box.html("请不要发布重复的岗位");
                    confirm_job_box.attr("class", "alert-warning");
                }
            }
        })
    }

}

function get_job1() {
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    $.ajax({
        url: '/enterprise?enterprise=manageJob',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            n_job = $("#job");
            n_job.html("");
            n_job.parent().removeClass("hidden");
            for (let i = 0; i < data.length; i++) {
                row = document.createElement("tr");
                n_job.append(row);
                n_identification = document.createElement("td");
                n_name = document.createElement("td");
                n_address = document.createElement("td");
                n_industry = document.createElement("td");
                n_position = document.createElement("td");
                n_number = document.createElement("td");
                n_salary = document.createElement("td");
                n_publish_time = document.createElement("td");
                n_effective_time = document.createElement("td");
                n_operate = document.createElement("td");
                row.appendChild(n_identification);
                row.appendChild(n_name);
                row.appendChild(n_address);
                row.appendChild(n_industry);
                row.appendChild(n_position);
                row.appendChild(n_number);
                row.appendChild(n_salary);
                row.appendChild(n_publish_time);
                row.appendChild(n_effective_time);
                row.appendChild(n_operate);
                c_identification = data[i].identification;
                c_name = data[i].name;
                c_address = data[i].address;
                c_industry = data[i].industry;
                c_position = data[i].position;
                c_number = data[i].number;
                c_salary = data[i].salary;
                c_publish_time = data[i].publish_time;
                c_effective_time = data[i].effective_time;
                n_identification.innerHTML=`<input type="text" size="6" maxlength="20" disabled="disabled" value="${c_identification}">`;
                n_name.innerHTML=`<input type="text" size="6" maxlength="8" disabled="disabled" value="${c_name}">`;
                n_address.innerHTML=`<input type="text" size="3" maxlength="3" value="${c_address}">`;
                n_industry.innerHTML=`<input type="text" size="3" maxlength="5" disabled="disabled" value="${c_industry}">`;
                n_position.innerHTML=`<input type="text" size="10" maxlength="20" disabled="disabled" value="${c_position}">`;
                n_number.innerHTML=`<input type="text" size="10" maxlength="20" value="${c_number}">`;
                n_salary.innerHTML=`<input type="text" size="10" maxlength="20" value="${c_salary}">`;
                n_publish_time.innerHTML=`<input type="text" size="8" maxlength="8" disabled="disabled" value="${c_publish_time}">`;
                n_effective_time.innerHTML=`<input type="text" size="10" maxlength="20" value="${c_effective_time}">`;
                n_operate.innerHTML=`<button class="btn btn-primary btn-sm" onclick="modify_job(this)">保存</button><button class="btn btn-danger btn-sm" onclick="delete_job(this)">删除</button>`;
            }
        }
    })
}

function modify_job(obj) {
    row = obj.parentNode.parentNode;
    c_identification = row.children[0].firstChild.value;
    c_address = row.children[2].firstChild.value;
    c_number = row.children[5].firstChild.value;
    c_salary = row.children[6].firstChild.value;
    c_effective_time = row.children[8].firstChild.value;
    o_job = {};
    o_job.identification = c_identification;
    o_job.address = c_address;
    o_job.number = c_number;
    o_job.salary = c_salary;
    o_job.effective_time = c_effective_time;
    $.ajax({
        url: "/enterprise?enterprise=modifyJob",
        data: o_job,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "modify_job_success") {
                row.classList.add("success");
            } else {
                row.classList.add("warning");
            }
        }
    })
}

function delete_job(obj) {
    row = obj.parentNode.parentNode;
    c_identification = row.children[0].firstChild.value;
    o_job = {};
    o_job.identification = c_identification;
    $.ajax({
        url: "/enterprise?enterprise=deleteJob",
        data: o_job,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "delete_job_success") {
                row.classList.add("hidden");
            }
        }
    })
}
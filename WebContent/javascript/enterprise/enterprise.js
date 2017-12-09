"use strict";
function register_enterprise() {
    let company={};
    company.nickname=document.getElementById("enterprise_nickname").value;
    company.password=document.getElementById("enterprise_password").value;
    company.name=document.getElementById("enterprise_name").value;
    company.industry=document.getElementById("enterprise_industry").value;
    company.telephone=document.getElementById("enterprise_telephone").value;
    company.email=document.getElementById("enterprise_email").value;
    company.address=document.getElementById("enterprise_address").value;
    ajax_register_enterprise(company);
}
function ajax_register_enterprise(company) {
    $.ajax({
        url:"/enterprise?enterprise=register",
        data:company,
        async:true,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            register_result_enterprise(data);
            //setTimeout('register_success(data)', 3000);
        },
        fail:function (data) {
            alert(data);
        },
    });
}
function register_result_enterprise(data) {
    if (data.msg=="success"){
        location.href="index.html";
    }
}
function modify_user_enterprise() {
    document.getElementById("myregister-enterprise").innerHTML="修改企业注册信息";
    document.getElementById("enterprise_telephone_group").style.display="none";
    document.getElementById("reg_btu").value="提交修改";
    document.getElementById("reg_btu").onclick=modify_enterprise();
}
function modify_enterprise() {
    let nickname=document.getElementById("enterprise_nickname").value;
    let password=document.getElementById("enterprise_password").value;
    let name=document.getElementById("enterprise_name").value;
    let industry=document.getElementById("enterprise_industry").value;
    let telephone=document.getElementById("enterprise_telephone").value;
    let address=document.getElementById("enterprise_address").value;
    let modify_user={};
    modify_user.telephone=telephone;
    modify_user.nickname=nickname;
    modify_user.name=name;
    modify_user.industry=industry;
    modify_user.address=address;
    modify_user.password=password;
    modify_enterprise_ajax(modify_user);
}
function modify_enterprise_ajax(user) {
    $.ajax({
        url: '/enterprise?enterprise=modifyUser',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            modify_enterprise_result(data,"confirm_enterprise_box");
        },
        fail: function () {

        }
    })
}
function modify_enterprise_result(data,confirm_info_box) {
    let confirm_info_box=document.getElementById(confirm_info_box);
    if (data.msg=="modify_user_success"){
        confirm_info_box.innerHTML="信息修改成功";
        confirm_info_box.setAttribute("class","alert-success");
    }else {
        confirm_info_box.innerHTML="信息修改失败";
        confirm_info_box.setAttribute("class","alert-warning");
    }
}
function init_job() {
    document.getElementById("jobs").style.display = "block";
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    init_job_ajax(user);
}
function init_job_ajax(user) {
    $.ajax({
        url: '/enterprise?enterprise=initJob',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            init_job_result(data);
        },
        fail: function () {

        }
    })
}
function init_job_result(data) {
    document.getElementById("name").value = data.name;
    document.getElementById("address").value = data.address;
    document.getElementById("industry").value = data.industry;
    document.getElementById("email").value = data.email;
}
function infilling_address(data) {
    let address=document.getElementById("address");
    for (let i=1;i<data.length;i++){
        let option=document.createElement("option");
        address.appendChild(option);
        option.value=data[i].text;
        option.innerHTML=data[i].text;
    }
}
function get_job() {
    $.ajax({
        url:"/query/job",
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            infilling_job(data);
        },
        fail:function () {

        }
    });
}
function infilling_job(data) {
    let position=document.getElementById("industry");
    for (let i=1;i<data.length;i++){
        let option=document.createElement("option");
        position.appendChild(option);
        option.value=data[i].text;
        option.innerHTML=data[i].text;
    }
}
function get_position() {
    let job={};
    let name=document.getElementById("industry").value;
    job.job_name=name;
    $.ajax({
        url:"/query/position",
        type:"POST",
        data:job,
        dataType:"JSON",
        success:function (data) {
            infilling_position(data);
        },
        fail:function () {

        }
    });
}
function infilling_position(data) {
    let position=document.getElementById("job");
    for (let i=1;i<data.length;i++){
        let option=document.createElement("option");
        position.appendChild(option);
        option.value=data[i].position;
        option.innerHTML=data[i].position;
    }
}
function add_job() {
    let job={};
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    let telephone=user.telephone;
    let name=document.getElementById("name").value;
    let address=document.getElementById("address").value;
    let industry=document.getElementById("industry").value;
    let job_name=document.getElementById("job").value;
    let number=document.getElementById("number").value;
    let salary=document.getElementById("salary").value;
    let publish_time=document.getElementById("publish_time").value;
    let effective_time=document.getElementById("effective_time").value;
    let email=document.getElementById("email").value;
    job.telephone=telephone;
    job.name=name;
    job.address=address;
    job.industry=industry;
    job.job_name=job_name;
    job.number=number;
    job.salary=salary;
    job.publish_time=publish_time;
    job.effective_time=effective_time;
    job.email=email;
    add_job_ajax(job);
}
function add_job_ajax(job) {
    $.ajax({
        url: '/enetrprise?enterprise=addJob',
        data: job,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            add_job_result(data);
        },
        fail: function () {

        }
    })
}
function add_job_result(data) {
    let confirm_job_box=document.getElementById("confirm_job_box");
    if (data.msg=="add_job_success"){
        confirm_job_box.innerHTML="岗位发布成功";
        confirm_job_box.setAttribute("class","alert-success");
    }else {
        confirm_job_box.innerHTML="岗位发布失败";
        confirm_job_box.setAttribute("class","alert-warning");
    }
}
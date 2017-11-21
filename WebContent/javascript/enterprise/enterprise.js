function register_enterprise() {
    var company={};
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
    document.getElementById("reg_btu").setAttribute("onclick","modify_user");
}
function modify_user() {
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    var telephone = user.telephone;
    var nickname=document.getElementById("nickname").value;
    var password=document.getElementById("password").value;
    var email=document.getElementById("job_email").value;
    var modify_user={};
    modify_user.telephone=telephone;
    modify_user.nickname=nickname;
    modify_user.password=password;
    modify_user.email=email;
    modify_user_ajax(modify_user);
}
function modify_user_ajax(user) {
    $.ajax({
        url: '/enterprise?enterprise=modifyUser',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            modify_user_result(data);
        },
        fail: function () {

        }
    })
}
function modify_user_result(data) {
    var confirm_info_box=document.getElementById("confirm_info_box");
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
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
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
function add_job() {
    var job={};
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    var telephone=user.telephone;
    var name=document.getElementById("name").value;
    var address=document.getElementById("address").value;
    var industry=document.getElementById("industry").value;
    var job_name=document.getElementById("job").value;
    var number=document.getElementById("number").value;
    var salary=document.getElementById("salary").value;
    var publish_time=document.getElementById("publish_time").value;
    var effective_time=document.getElementById("effective_time").value;
    var email=document.getElementById("email").value;
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
    var confirm_job_box=document.getElementById("confirm_job_box")
    if (data.msg=="add_job_success"){
        confirm_job_box.innerHTML="岗位发布成功";
        confirm_job_box.setAttribute("class","alert-success");
    }else {
        confirm_job_box.innerHTML="岗位发布失败";
        confirm_job_box.setAttribute("class","alert-warning");
    }
}

function init_job() {
    document.getElementById("jobs").style.display = "block";
    var user_string = document.cookie.split(";")[0].split("=")[1];
    var user = JSON.parse(user_string);
    init_job_ajax(user);
}

function init_job_ajax(user) {
    $.ajax({
        url: 'http://localhost:8080/Network_recuiting_system/init_job.do',
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
        url: 'http://localhost:8080/Network_recuiting_system/add_job.do',
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
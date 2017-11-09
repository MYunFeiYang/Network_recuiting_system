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

}
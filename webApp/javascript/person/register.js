function register_person() {
    let user = {};
    user.nickname = $("#person_nickname").val();
    user.password = $("#person_password").val();
    user.name = $("#person_name").val();
    user.telephone = $("#person_telephone").val();
    user.email = $("#person_email").val();
    $.ajax({
        url: "/person?person=register",
        data: user,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            confirm_box_c = $("#confirm_person_box");
            if (data.msg === "assessing") {
                confirm_box_c.html("账号在审核，您可以先登录");
                confirm_box_c.attr("class", "alert-success");
                setTimeout(function () {
                    window.location.href = "../../index.jsp"
                }, 3000);
            } else {
                confirm_box_c.html("用户名和密码已存在");
                confirm_box_c.attr("class", "alert-warning");
            }
        },
        fail: function (data) {
            alert(data);
        },
    });
}
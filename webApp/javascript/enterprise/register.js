function register_enterprise() {
    let company = {};
    company.nickname = $("#enterprise_nickname").val();
    company.password = $("#enterprise_password").val();
    company.name = $("#enterprise_name").val();
    company.industry = $("#enterprise_industry").val();
    company.telephone = $("#enterprise_telephone").val();
    company.email = $("#enterprise_email").val();
    company.address = $("#enterprise_address").val();
    $.ajax({
        url: "/enterprise?enterprise=register",
        data: company,
        async: true,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            confirm_box_c = $("#confirm_enterprise_box");
            if (data.msg === "assessing") {
                confirm_box_c.html("账号在审核，您可以先登录");
                confirm_box_c.attr('class', 'alert-success');
                setTimeout(function () {
                    window.location.href = "../../index.html"
                }, 3000);
            } else {
                confirm_box_c.html("该用户名和密码已存在");
                confirm_box_c.attr('class', 'alert-warning');
            }
        },
        fail: function (data) {
            alert(data);
        },
    });
}
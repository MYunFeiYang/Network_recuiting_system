function init_admin() {
    $.ajax({
        url:"/admin/power/init",
        type:"POST",
        dataType:"JSON",
        success:function (data) {

        },
        fail:function () {

        }
    })
}
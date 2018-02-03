
function QQ() {
    if ($(window).width()>=768){
        $("#qq_btn").addClass('animated slideOutRight');
        $("#qq_con").addClass('animated slideInRight');
        $("#qq_close").removeClass('animated rotateOut');
        $("#qq_con").removeClass('animated slideOutRight');
    }
    $("#qq_con").css("display", "inline-block");
}

function hidden_QQ(obj) {
    if ($(window).width()>=768){
        $(obj).addClass('animated rotateOut');
        $(obj).parent().parent().addClass('animated slideOutRight');
        $("#qq_btn").removeClass('animated slideOutRight');
        $("#qq_con").removeClass('animated slideInRight');
    }
    setTimeout("$(\"#qq_con\").css(\"display\", \"none\");", 500)
}

function telephone() {
    if ($(window).width()>=768){
        $("#telephone_btn").addClass('animated slideOutRight');
        $("#telephone_con").addClass('animated slideInRight');
        $("#telephone_close").removeClass('animated rotateOut');
        $("#telephone_con").removeClass('animated slideOutRight');
    }
    $("#telephone_con").css("display", "inline-block");
}

function hidden_telephone(obj) {
    if ($(window).width()>=768){
        $(obj).addClass('animated rotateOut');
        $(obj).parent().parent().addClass('animated slideOutRight');
        $("#telephone_btn").removeClass('animated slideOutRight');
        $("#telephone_con").removeClass('animated slideInRight');
    }
    setTimeout("$(\"#telephone_con\").css(\"display\", \"none\");", 500);
}

function wechat() {
    $("#wechat .modal-body:first").html(`<img src="image/suspend/footer.png">`)
    if ($(window).width()>=768){
        $("#wechat_btn").addClass('animated slideOutRight');
    }
}

function wechat_close() {
    if ($(window).width()>=768){
        $("#wechat_btn").removeClass('animated slideOutRight');
    }
}
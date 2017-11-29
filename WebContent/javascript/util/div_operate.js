function show_div(div_id) {
    document.getElementById(div_id).style.display = "block";
}
function hidden_div(div_id) {
    document.getElementById(div_id).style.display = "none";
}
function open_search(target,width) {
    document.getElementById(target).style.width=width;
}
function close_search(target,width) {
    document.getElementById(target).style.width=width;
}
function modify_height() {
    var headerHeight=document.getElementsByTagName("nav")[0].offsetHeight+2;
    var footerHeight=document.getElementById("footer").offsetHeight+2;
    var lunbotu=document.getElementById("carousel-example-generic");
    lunbotu.style.top=headerHeight+"px";
    lunbotu.style.bottom=footerHeight+"px";
}
function change_footer_position(){
    var lunbotuHeight=document.getElementById("carousel-example-generic").offsetHeight;
    var bodyHeight=document.body.offsetHeight;
    if (bodyHeight>lunbotuHeight) {
        document.getElementById("footer").style.position = "relative";
        document.getElementById("carousel-example-generic").style.bottom="0px"
    }
}
function open_share() {
    document.getElementsByClassName("bdsharebuttonbox")[0].classList.remove("hidden");
}
function close_share() {
    document.getElementsByClassName("bdsharebuttonbox")[0].classList.add("hidden");

}
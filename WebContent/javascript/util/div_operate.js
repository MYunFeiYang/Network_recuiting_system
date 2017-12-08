"use strict";
function open_search(target,width) {
    document.getElementById(target).style.width=width;
}
function close_search(target,width) {
    document.getElementById("search-con").value="";
    document.getElementById(target).style.width=width;
}
function modify_height() {
    let headerHeight=document.getElementsByTagName("nav")[0].offsetHeight+2;
    let footerHeight=document.getElementById("footer").offsetHeight+2;
    let lunbotu=document.getElementById("carousel-example-generic");
    lunbotu.style.top=headerHeight+"px";
    lunbotu.style.bottom=footerHeight+"px";
}
function change_footer_position(){
    let lunbotuHeight=document.getElementById("carousel-example-generic").offsetHeight;
    let bodyHeight=document.body.offsetHeight;
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
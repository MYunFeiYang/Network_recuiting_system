"use strict";
function open_search(target,width) {
    document.getElementById(target).style.width=width;
}
function close_search(target,width) {
    document.getElementById("search-con").value="";
    document.getElementById(target).style.width=width;
}

function open_share() {
    document.getElementsByClassName("bdsharebuttonbox")[0].classList.remove("hidden");
}
function close_share() {
    document.getElementsByClassName("bdsharebuttonbox")[0].classList.add("hidden");

}
function modify_height() {
    let headerHeight=document.getElementsByTagName("nav")[0].offsetHeight+1;
    let footerHeight=document.getElementById("footer").offsetHeight+1;
    let iframe=document.getElementById("iframe");
    iframe.style.top=headerHeight+"px";
    iframe.style.bottom=footerHeight+"px";
}
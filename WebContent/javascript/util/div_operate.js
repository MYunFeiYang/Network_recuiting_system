"use strict";
function open_search(target,width) {
    document.getElementById(target).style.width=width;
}
function close_search() {
    document.getElementById("search-con").value="";
    document.getElementById("search-con").style.width="40px";
    document.getElementById("preselected_search").style.display="none";
}
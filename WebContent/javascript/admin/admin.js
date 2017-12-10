"use strict";
$(function(){
    $(".panel-heading").click(function(){
        /*切换折叠指示图标*/
        $(this).find("span").toggleClass("glyphicon-chevron-down");
        $(this).find("span").toggleClass("glyphicon-chevron-up");
    });
});
function change_div(id) {
    let table=document.getElementsByClassName("table");
    for (let i=0;i<table.length;i++){
        table[i].classList.add("hidden");
    }
    document.getElementById(id).classList.remove("hidden");
}
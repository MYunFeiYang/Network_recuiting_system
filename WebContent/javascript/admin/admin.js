"use strict";
let path;
let lis;
let li1;
let li2;
let a1;
$(function () {
    $(".panel-heading").click(function () {
        /*切换折叠指示图标*/
        $(this).find("span").toggleClass("glyphicon-chevron-down");
        $(this).find("span").toggleClass("glyphicon-chevron-up");
    });
});

function change_div(id) {
    let table = document.getElementsByClassName("table");
    for (let i = 0; i < table.length; i++) {
        table[i].classList.add("hidden");
    }
    document.getElementById(id).classList.remove("hidden");
}

function path_navigation(obj) {
    path = document.getElementsByClassName("breadcrumb")[0];
    lis = path.getElementsByTagName("li");
    for (let j = lis.length - 1; j > 1; j--) {
        path.removeChild(lis[j]);
    }
    if (obj.classList.contains("path1")) {
        li1 = document.createElement("li");
        path.appendChild(li1);
        li1.innerText = obj.innerText;
        li1.classList.add("active");
    }
    else if (obj.classList.contains("path2")) {
        li1 = document.createElement("li");
        li2 = document.createElement("li");
        a1 = document.createElement("a");
        li1.appendChild(a1);
        path.appendChild(li1);
        path.appendChild(li2);
        let li1_parent = obj.parentNode.parentNode.parentNode.parentNode;
        let h4 = li1_parent.getElementsByTagName("h4")[0];
        a1.text = h4.innerText;
        li2.innerText = obj.innerText;
        li2.classList.add("active");

    }
}
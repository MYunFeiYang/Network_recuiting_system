"use strict";
let mylist;
let mydiv;
let body_width;
function Carousel_figure(count) {
    body_width = document.body.offsetWidth;
    if (body_width <768) {
        mylist = document.getElementById("mylist");
        mydiv = mylist.children;
        for (let i = 0; i < mydiv.length; i++) {
            mydiv[i].classList.add("hidden");
        }
        mydiv[count].classList.remove("hidden");
        document.getElementsByClassName("btn_group")[0].classList.remove("hidden");
    }
}

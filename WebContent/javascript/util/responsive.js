"use strict";
let count=1;
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
        document.getElementById("btu_left").classList.remove("hidden");
        document.getElementById("btu_right").classList.remove("hidden");
    }
}

function mypre() {
    if (body_width < 768) {
        if (count > 0) {
            count--;
            Carousel_figure(count);
        }
    }
}

function mynext() {
    if (body_width <768) {
        if (mydiv.length - 1 > count) {
            count++;
            Carousel_figure(count);
        }
    }
}
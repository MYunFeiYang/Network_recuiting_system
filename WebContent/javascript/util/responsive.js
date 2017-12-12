"use strict";
let count=1;
let mylist ;
let mydiv ;

function Carousel_figure(count) {
    let body_width = document.body.offsetWidth;
    if (body_width <= 768) {
        mylist = document.getElementById("mylist");
        mydiv = mylist.children;
        for (let i = 0; i < mydiv.length; i++) {
            mydiv[i].classList.add("hidden");
        }
        mydiv[count].classList.remove("hidden");
    }
}

function mypre() {
    if (count > 0) {
        count--;
        Carousel_figure(count);
    }
}

function mynext() {
    if (mydiv.length-1 > count) {
        count++;
        Carousel_figure(count);
    }
}
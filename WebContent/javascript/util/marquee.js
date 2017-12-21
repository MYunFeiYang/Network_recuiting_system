"use strict";
let timer;

function marquee(target) {
    let ul = document.getElementById(target).getElementsByTagName("ul")[0];
    let liList = ul.getElementsByTagName("li");
    let ulOffset = ul.offsetTop;
    for (let i = 0; i < liList.length; i++) {
        let top = liList[i].style.top;
        top = top.replace(/\s+|px/gi, "");
        top -= 0.5;
        liList[i].style.top = top + "px";
        let liOffset = liList[i].offsetTop;
        let marginTop = ulOffset - liOffset;
        if (marginTop > 0) {
            let liText = liList[i].innerHTML;
            let removeLi = liList[i];
            removeLi.parentNode.removeChild(removeLi);
            let li = document.createElement("li");
            li.innerHTML = liText;
            let top = li.style.top;
            top = top.replace(/\s+|px/gi, "");
            top -= 1;
            li.style.top = top + "px";
            ul.appendChild(li);
        }
    }
}

function marquee_control() {
    timer = setInterval("marquee(\"marquee\")", 1000);
}

function closeInterval() {
    clearInterval(timer);
}



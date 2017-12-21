"use strict";
let brightness;
let div;

//显示遮罩
function cover(brightness) {
    if (typeof(div) === 'undefined') {
        div = document.createElement('div');
        div.setAttribute('style', 'position:fixed;top:0;left:0;outline:5000px solid;z-index:99999;');
        document.body.appendChild(div);
    } else {
        div.style.display = '';
    }
    div.style.outlineColor = 'rgba(0,0,0,' + brightness + ')';
}

function open_night() {
    cover(brightness = 0.3);
}

function close_night() {
    cover(brightness = 0);
}

function bigger() {
    if (brightness - 0.05 > 0.05)
        cover(brightness -= 0.05);
}

function smaller() {
    if (brightness + 0.05 < 0.95)
        cover(brightness += 0.05);

}

//事件监听
window.addEventListener('keydown', function (e) {
    if (e.altKey && e.keyCode === 90) { //Alt+Z:打开夜间模式
        cover(brightness = 0.3);
    }
    if (e.altKey && e.keyCode === 88) { //Alt+X:关闭
        cover(brightness = 0);
    }
    if (e.altKey && e.keyCode === 38) { //Alt+↑:增加亮度
        if (brightness - 0.05 > 0.05) cover(brightness -= 0.05);
    }
    if (e.altKey && e.keyCode === 40) { //Alt+↓:降低亮度
        if (brightness + 0.05 < 0.95) cover(brightness += 0.05);
    }
}, false);
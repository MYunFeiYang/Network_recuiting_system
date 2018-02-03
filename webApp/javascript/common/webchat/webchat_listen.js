"use strict";
let host = window.location.hostname;
let socket = new WebSocket(`ws://${host}/init`);

function init() {
    if (socket.readyState === 1) {

    } else {
        //创建一个连接，这里的参数是服务端的链接
        socket = new WebSocket(`ws://${host}/init`);
    }
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    socket.close();
};

function closeSocket() {
    socket.close();
}

//打开连接时触发
socket.onopen = function () {
    show_system_message_to_self("欢迎加入群聊");
    let nickname = getnickname();
    let msg = {
        "nickname": nickname,
    };
    socket.send(JSON.stringify(msg));
};
//收到消息时触发
socket.onmessage = function (evt) {
    //群聊信息（nickname，message）
    //在线列表（nickname，session）
    //聊天记录(record,nickname)
    let data = JSON.parse(evt.data);
    if (Object.prototype.toString.call(data) === "[object Array]") {
        if (evt.data.indexOf("record") != -1) {
            //聊天记录
            show_chat_record(data);
        } else {
            //展示在线列表
            show_online_list(data);
        }
    } else if (Object.prototype.toString.call(data) === "[object Object]") {
        if (data.nickname === undefined) {
            //系统消息
            show_system_message(data);
        } else {
            //群发消息
            show_chat_message(data);
        }

    }
    document.getElementById("show_content").scrollTop = document.getElementById("show_content").scrollHeight;
};
//关闭连接时触发
socket.onclose = function () {
    show_system_message_to_self("你已关闭连接");
};
//连接错误时触发
socket.onerror = function () {
    show_system_message_to_self("链接发生错误")
}


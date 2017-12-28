"use strict";
//向客户端发送消息，这里定义了一些参数用来设置消息的颜色字体，不过暂时没用到有兴趣的可以自己实现
let name;
let record;

function emit() {

    //encodeScript方法用来转义<>标签，防止脚本输入，方法内容在core.js里面
    let text = encodeScript($("#content").val());
    if (text === "") {

    } else {
        let nickname = getnickname();
        let msg = {
            "message": text,
            "nickname": nickname
        };
        msg = JSON.stringify(msg);
        //向服务端发送消息
        socket.send(msg);
        //将自己发送的消息内容静态加载到html上，服务端实现自己发送的消息不会推送给自己
        add_self_message(text);
        //将消息文本框清空
        $("#content").val("");
    }
}

//按下回车键时触发发送消息方法
document.onkeyup = function (e) {
    if (window.event)//如果window.event对象存在，就以此事件对象为准
        e = window.event;
    let code = e.charCode || e.keyCode;
    if (code === 13) {
        emit();
    }
};

//过滤信息
function encodeScript(data) {
    if (null === data || "" === data) {
        return "";
    }
    return data.replace("<", "&lt;").replace(">", "&gt;");
}

function getnickname() {
    let user = document.cookie.split(";")[0].split("=")[1];
    name = JSON.parse(user).nickname;
    return name;
}

function get_chat_record() {
    record = 1;
    let msg = {"record": record};
    socket.send(JSON.stringify(msg));
    record++;
}

function show_chat_record(data) {
    let nickname = getnickname();
    let show_content = document.getElementById("show_content");
    let a = show_content.getElementsByTagName("a")[0];
    for (let i = 0; i < data.length; i++) {
        if (data[i].nickname === nickname) {
            let div = document.createElement("div");
            show_content.insertBefore(div, a.nextSibling);
            div.setAttribute("class", "self");
            div.innerHTML = data[i].record;
        } else {
            let chatBox = document.createElement("div");
            show_content.insertBefore(chatBox, a.nextSibling);
            chatBox.setAttribute("class", "chatBox");
            let left = document.createElement("div");
            let right = document.createElement("div");
            chatBox.appendChild(left);
            chatBox.appendChild(right);
            left.setAttribute("style", "display: inline-block;");
            right.setAttribute("style", "display: inline-block;");
            let photo = document.createElement("span");
            let username = document.createElement("span");
            let message = document.createElement("span");
            left.appendChild(photo);
            right.appendChild(username);
            right.appendChild(message);
            photo.setAttribute("class", "glyphicon glyphicon-user photo");
            username.setAttribute("class", "username");
            message.setAttribute("class", "message");
            username.innerHTML = data[i].nickname;
            message.innerHTML = data[i].record;
        }
    }
}

function show_status() {
    let status = document.getElementById("status");
    if (socket.readyState === 0) {
        status.innerHTML = "登录中";
        status.style.color = "green"
    } else if (socket.readyState === 1) {
        status.innerHTML = "在线";
        status.style.color = "green";
    } else if (socket.readyState === 2) {
        status.innerHTML = "断开中";
        status.style.color = "red";
    } else if (socket.readyState === 3) {
        status.innerHTML = "离线";
        status.style.color = "red";
    }
}

function refresh_online_list() {
    let refresh = document.getElementById("refresh");
    refresh.style = "";
    refresh.style = "animation-name:go;\n" +
        "    animation-duration:2s;\n" +
        "    animation-iteration-count: 3;";
    let msg = {"refresh": ""};
    socket.send(JSON.stringify(msg));
}

function show_online_list(data) {
    let ul = document.getElementById("list");
    ul.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = `<span class="glyphicon glyphicon-user"></span><a>${data[i].nickname}</a><span style="float: right" class="glyphicon glyphicon-star-empty"></span>`
    }
}

function show_system_message(data) {
    let show_content = document.getElementById("show_content");
    let div = document.createElement("div");
    show_content.appendChild(div);
    let span = document.createElement("span");
    span.setAttribute("class", "message");
    span.innerHTML = data.message;
}

function show_chat_message(data) {
    let show_content = document.getElementById("show_content");
    let chatBox = document.createElement("div");
    show_content.appendChild(chatBox);
    chatBox.setAttribute("class", "chatBox");
    let left = document.createElement("div");
    let right = document.createElement("div");
    chatBox.appendChild(left);
    chatBox.appendChild(right);
    left.setAttribute("style", "display: inline-block;");
    right.setAttribute("style", "display: inline-block;");
    let photo = document.createElement("span");
    let username = document.createElement("span");
    let message = document.createElement("span");
    left.appendChild(photo);
    right.appendChild(username);
    right.appendChild(message);
    photo.setAttribute("class", "glyphicon glyphicon-user photo");
    username.setAttribute("class", "username");
    message.setAttribute("class", "message");
    username.innerHTML = data.nickname;
    message.innerHTML = data.message;
}

function add_self_message(text) {
    let show_content = document.getElementById("show_content");
    let div = document.createElement("div");
    show_content.appendChild(div);
    div.setAttribute("class", "self");
    div.innerHTML = text;
}

function show_system_message_to_self(text) {
    let show_content = document.getElementById("show_content");
    let div = document.createElement("div");
    show_content.appendChild(div);
    div.setAttribute("class", "system_message");
    div.innerHTML = text;
}
//创建一个连接，这里的参数是服务端的链接
var socket=new WebSocket("ws://localhost/init");
$(function () {
    //初始化加载listen方法
    listen();
});
function init() {
    if (socket.readyState==1) {
        alert("你已处于连接状态");
    } else {
        socket = new WebSocket("ws://localhost/init");
        $(function () {
            //重连接加载listen方法
            listen();
        });
    }
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    socket.close();
};

function closeSocket() {
    socket.close();
}

//向客户端发送消息，这里定义了一些参数用来设置消息的颜色字体，不过暂时没用到有兴趣的可以自己实现
function emit() {

    //encodeScript方法用来转义<>标签，防止脚本输入，方法内容在core.js里面
    var text = encodeScript($("#content").val());
    var msg = {
        "message": text,
    };
    msg = JSON.stringify(msg);
    //向服务端发送消息
    socket.send(msg);

    //将自己发送的消息内容静态加载到html上，服务端实现自己发送的消息不会推送给自己
    $("#show_content").append("<kbd style='float: right'>" + text + "</kbd><br/>");
    //将消息文本框清空
    $("#content").val("");
}

function listen() {
    //打开连接时触发
    socket.onopen = function () {
        var nickname = getnickname();
        var msg = {"nickname": nickname};
        socket.send(JSON.stringify(msg));
        $("#show_content").append("<kbd style='margin: 2px auto'>欢迎加入群聊!</kbd></br>");
    };
    //收到消息时触发
    socket.onmessage = function (evt) {
        var data = JSON.parse(evt.data);
        if (Object.prototype.toString.call(data) == "[object Array]") {
            show_online_list(data);
        } else if (Object.prototype.toString.call(data) == "[object Object]") {
            $("#show_content").append("<kbd style='float: left'>" + data.message + "</kbd></br>");
        }
        document.getElementById('show_content').scrollTop = document.getElementById('show_content').scrollHeight;
    };
    //关闭连接时触发
    socket.onclose = function (evt) {
        $("#show_content").append("<kbd style='margin: 2px auto;'>" + "你已关闭连接!" + "</kbd></br>");
    }
    //连接错误时触发
    socket.onerror = function (evt) {
        $("#show_content").append("<kbd style='margin: 2px auto'>" + "连接发生错误!" + "</kbd></br>");
    }
}

//按下回车键时触发发送消息方法
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
        emit();
    }
};

function encodeScript(data) {
    if (null == data || "" == data) {
        return "";
    }
    return data.replace("<", "&lt;").replace(">", "&gt;");
}

function show_online_list(data) {
    var ul = document.getElementById("list");
    ul.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement("li");
        ul.appendChild(li);
        li.setAttribute("style", "margin:5px;background-color:white;padding:5px");
        li.innerHTML = `<span class="glyphicon glyphicon-user"></span><a>${data[i].nickname}</a><span style="float: right" class="glyphicon glyphicon-earphone"></span>`
    }
}

function getnickname() {
    var user = document.cookie.split(";")[0].split("=")[1];
    var nickname = JSON.parse(user).nickname;
    return nickname;
}
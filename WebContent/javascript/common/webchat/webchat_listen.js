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

function listen() {
    //打开连接时触发
    socket.onopen = function () {
        var nickname = getnickname();
        var msg = {"nickname": nickname};
        socket.send(JSON.stringify(msg));
        $("#show_content").append("<div class='system_message col-md-4 col-md-offset-4'>欢迎加入群聊!</div>");
    };
    //收到消息时触发
    socket.onmessage = function (evt) {
        var data = JSON.parse(evt.data);
        if (Object.prototype.toString.call(data) == "[object Array]") {
            //展示在线列表
            show_online_list(data);
        } else if (Object.prototype.toString.call(data) == "[object Object]") {
            if (data.nickname==undefined){
                //系统消息
                show_system_message(data);
            }else {
                //群发消息
                show_chat_message(data);
            }

        }
        document.getElementById("show_content").scrollTop = document.getElementById("show_content").scrollHeight;
    };
    //关闭连接时触发
    socket.onclose = function (evt) {
        $("#show_content").append("<div class='system_message col-md-4 col-md-offset-4'>" + "你已关闭连接!" + "</div>");
    }
    //连接错误时触发
    socket.onerror = function (evt) {
        $("#show_content").append("<div class='system_message col-md-4 col-md-offset-4'>" + "连接发生错误!" + "</div>");
    }
}


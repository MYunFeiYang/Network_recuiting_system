//向客户端发送消息，这里定义了一些参数用来设置消息的颜色字体，不过暂时没用到有兴趣的可以自己实现
function emit() {

    //encodeScript方法用来转义<>标签，防止脚本输入，方法内容在core.js里面
    var text = encodeScript($("#content").val());
    if (text==""){
        return;
    }else {
        var nickname=getnickname();
        var msg = {
            "message": text,
            "nickname":nickname
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
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
        emit();
    }
};
//过滤信息
function encodeScript(data) {
    if (null == data || "" == data) {
        return "";
    }
    return data.replace("<", "&lt;").replace(">", "&gt;");
}

function getnickname() {
    var user = document.cookie.split(";")[0].split("=")[1];
    var nickname = JSON.parse(user).nickname;
    return nickname;
}
function refresh_online_list() {
    var refresh=document.getElementById("refresh");
    refresh.style="";
    refresh.style="animation-name:go;\n" +
        "    animation-duration:2s;\n" +
        "    animation-iteration-count: 3;";
    var msg={"refresh":refresh};
    socket.send(JSON.stringify(msg));
}
function show_status() {
    var status=document.getElementById("status");
    if (socket.readyState==0){
        status.innerHTML="登录中";
        status.style.color="green"
    }else if (socket.readyState==1){
        status.innerHTML="在线";
        status.style.color="green";
    }else if (socket.readyState==2){
        status.innerHTML="断开中";
        status.style.color="red";
    }else if (socket.readyState==3){
        status.innerHTML="离线";
        status.style.color="red";
    }
}
function show_online_list(data) {
    var ul = document.getElementById("list");
    ul.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = `<span class="glyphicon glyphicon-user"></span><a>${data[i].nickname}</a><span style="float: right" class="glyphicon glyphicon-star-empty"></span>`
    }
}
function show_system_message(data) {
    var show_content=document.getElementById("show_content");
    var div =document.createElement("div");
    show_content.appendChild(div);
    var span=document.createElement("span");
    span.setAttribute("class","message");
    span.innerHTML=data.message;
}
function show_chat_message(data) {
    var show_content = document.getElementById("show_content");
    var chatBox = document.createElement("div");
    show_content.appendChild(chatBox);
    chatBox.setAttribute("class","chatBox");
    var left=document.createElement("div");
    var right=document.createElement("div");
    chatBox.appendChild(left);
    chatBox.appendChild(right);
    left.setAttribute("style","display: inline-block;");
    right.setAttribute("style","display: inline-block;");
    var photo = document.createElement("span");
    var username = document.createElement("span");
    var message = document.createElement("span");
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
    var show_content=document.getElementById("show_content");
    var div=document.createElement("div");
    show_content.appendChild(div);
    div.setAttribute("class","self");
    div.innerHTML=text;
}
function show_system_message_to_self(text) {
    var show_content=document.getElementById("show_content");
    var div =document.createElement("div");
    show_content.appendChild(div);
    div.setAttribute("class","system_message");
    div.innerHTML=text;
}
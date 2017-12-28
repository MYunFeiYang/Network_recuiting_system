package service.common.webchat;

import net.sf.json.JSONObject;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

//@ServerEndpoint注解中的内容是用户客户端websocket的连接url,例如ws://127.0.0.1:80/websocket/ws,
//结构形式为“ws：//ip:端口/项目名/指定的url”
@ServerEndpoint("/init")
public class webChatServer {
    // 静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static final AtomicInteger onlineCount = new AtomicInteger(0);
    // concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
    private static CopyOnWriteArraySet<webChatServer> webSocketSet = new CopyOnWriteArraySet<>();
    // 与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    private String nickname;
    //在线列表
    private OnlineChatter onlineChatter=new OnlineChatter();
    //聊天记录
    private ChatRecord chatRecord=new ChatRecord();
    /*
    *使用@Onopen注解的表示当客户端链接成功后的回掉。参数Session是可选参数
    这个Session是WebSocket规范中的会话，表示一次会话。并非HttpSession
    */
    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        webSocketSet.add(this);
    }
    /*
         *使用@OnMessage注解的表示当客户端发送消息后的回掉，第一个参数表示用户发送的数据。参数Session是可选参数，与OnOpen方法中的session是一致的
         */
    @OnMessage
    public void onMessage(String message, Session session) {
        //服务器会接到几类信息：群聊信息（nickname,message）
        //用户发送连接请求时带的用户名(nickname)
        //请求最新在线列表（refresh）
        try {
            //如果信息中有message字段则是群聊信息
            if (message.contains("message")) {
                //转发群聊信息
                broadcast(message);
                //将群聊信息存储到数据库
                chatRecord.setRecord(message);
            }
            else
            {
                if (message.contains("refresh")) {
                    //查询更新用户列表
                    session.getBasicRemote().sendText(onlineChatter.selectUser());
                }else if(message.contains("record")){
                    //获得聊天记录
                    session.getBasicRemote().sendText(chatRecord.getRecord());
                } else {
                    //添加新加入用户到在线列表
                    JSONObject jsonObject=JSONObject.fromObject(message);
                    nickname=jsonObject.getString("nickname");
                    onlineChatter.addUser(nickname,session);
                    //查询在线列表
                    try {
                        session.getBasicRemote().sendText(onlineChatter.selectUser());
                    }catch (IOException e){
                        e.printStackTrace();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /*
*用户断开链接后的回调，注意这个方法必须是客户端调用了断开链接方法后才会回调
*/
    @OnClose
    public void onClose(Session session) {
        webSocketSet.remove(this);
        //用户断开连接，删除在线列表的对应用户
        onlineChatter.deleteUser(session);
    }

    //完成群发
    private void broadcast(String info) {
        for (webChatServer w : webSocketSet) {
            try {
                synchronized (webChatServer.class) {
                    if (!w.session.equals(session)) {
                        w.session.getBasicRemote().sendText(info);
                    }
                }
            } catch (IOException e) {
                webSocketSet.remove(w);
                try {
                    w.session.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }

        }
    }

    //连接错误时执行
    @OnError
    public void onError(Throwable t, Session session) {
//        t.printStackTrace();
        webSocketSet.remove(this);
        onlineChatter.deleteUser(session);
    }
}
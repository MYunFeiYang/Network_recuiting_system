package controller.common.webchat;

import net.sf.json.JSONArray;
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
    private  static final AtomicInteger onlineCount = new AtomicInteger(0);
    // concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
    private static CopyOnWriteArraySet<webChatServer> webSocketSet = new CopyOnWriteArraySet<webChatServer>();
    //定义一个记录客户端的聊天nickname
    private String nickname;
    // 与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    //声明一个json数组用以存放用户身份标识session和nickname；
    private static JSONArray users=new JSONArray();
    /*
    *使用@Onopen注解的表示当客户端链接成功后的回掉。参数Session是可选参数
    这个Session是WebSocket规范中的会话，表示一次会话。并非HttpSession
    */
    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        webSocketSet.add(this);
        if (users.size()!=0){
            broadcast(users.toString());
        }
    }
    /*
         *使用@OnMessage注解的表示当客户端发送消息后的回掉，第一个参数表示用户发送的数据。参数Session是可选参数，与OnOpen方法中的session是一致的
         */
    @OnMessage
    public void onMessage(String message, Session session) {
        try{
            if (message.indexOf("nickname")!=-1){
                for (webChatServer w:webSocketSet){
                    if (w.session==session){
                        JSONObject jsonObject=JSONObject.fromObject(message);
                        nickname=jsonObject.getString("nickname");
                        setJson(nickname,session);
                        JSONObject msg=new JSONObject();
                        msg.put("message",nickname+"加入群聊");
                        broadcast(msg.toString());
                    }
                }
            }else {
                broadcast(message);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    /*
*用户断开链接后的回调，注意这个方法必须是客户端调用了断开链接方法后才会回调
*/
    @OnClose
    public void onClose() {
        webSocketSet.remove(this);
        JSONObject message=new JSONObject();
        message.put("message",nickname+"离开群聊");
        broadcast(message.toString());
    }
    //完成群发
    private void broadcast(String info){
        for(webChatServer w:webSocketSet){
            try {
                synchronized (webChatServer.class) {
                    if (w.nickname!=nickname) {
                        w.session.getBasicRemote().sendText(info);
                    }
                }
            } catch (IOException e) {
                System.out.println("向客户端"+w.nickname+"发送消息失败");
                webSocketSet.remove(w);
                try {
                    w.session.close();
                } catch (IOException e1) {}
                JSONObject message=new JSONObject();
                message.put("message",w.nickname+"断开了连接");
                broadcast(message.toString());
            }

        }
    }
    //对用户的消息可以做一些过滤请求，如屏蔽关键字等等。。。
    public static String filter(String message){
        if(message==null){
            return null;
        }
        return message;
    }
    //连接错误时执行
    @OnError
    public void onError(Throwable t) {
        t.printStackTrace();
    }
    public void setJson(String nickname,Session session){
        JSONObject user=new JSONObject();
        user.element("session",session.toString());
        user.element("nickname",nickname);
        users.add(user);
    }
}
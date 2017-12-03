package common.webchat;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

//@ServerEndpoint注解中的内容是用户客户端websocket的连接url,例如ws://127.0.0.1:80/websocket/ws,
//结构形式为“ws：//ip:端口/项目名/指定的url”
@ServerEndpoint("/init")
public class webChatServer {
    private Session session;
    //连接打开时执行
    @OnOpen
    public void onOpen(Session session) {
        this.session=session;
    }

    //收到消息时执行
    @OnMessage
    public void onMessage(String message, Session session) {
        try{
            this.sendMessage(message);//消息发回给客户端
        }catch(Exception e){
            e.printStackTrace();
        }
        //return currentUser + "：" + message;如果有返回值，则客户端发送消息后会收到这个返回值
    }

    //连接关闭时执行
    @OnClose
    public void onClose(Session session, CloseReason closeReason) {

    }

    //连接错误时执行
    @OnError
    public void onError(Throwable t) {
        t.printStackTrace();
    }
    //自定义的方法，用于发送消息
    public void sendMessage(String message) throws IOException{
        this.session.getBasicRemote().sendText(message);
        //this.session.getAsyncRemote().sendText(message);
    }
}
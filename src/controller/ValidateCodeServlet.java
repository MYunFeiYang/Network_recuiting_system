package controller;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

@WebServlet(name = "ValidateCodeServlet")
public class ValidateCodeServlet extends HttpServlet {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    /** 响应客户请求*/
    public void service(HttpServletRequest request,HttpServletResponse response)
            throws ServletException, IOException {

        //创建内存画板对象
        BufferedImage image= new BufferedImage(100,30,BufferedImage.TYPE_INT_RGB);
        Graphics g=image.getGraphics();

        //产生背景色
        Random r=new Random();
        g.setColor(new Color(r.nextInt(255),r.nextInt(255),r.nextInt(255)));

        //用背景色填充矩形框
        g.fillRect(0, 0, 100,30);

        //调用自定义的方法，获取长度为5的字母数字组合的字符串
        String number=getNumber(5);

        //将所产生的随机码加入会话
        HttpSession session=request.getSession();
        session.setAttribute("code", number);

        //设置字的颜色与字体，以图形方式画出
        g.setColor(new Color(0,0,0));
        g.setFont(new Font(null,Font.BOLD,24));
        g.drawString(number,5,25);

        //绘制干扰线
        for(int i=0;i<8;i++)
        {
            g.setColor(new Color(r.nextInt(255),r.nextInt(255),r.nextInt(255)));
            g.drawLine(r.nextInt(100),r.nextInt(30),r.nextInt(100),r.nextInt(30));
        }

        //响应用户请求，绘制图形
        response.setContentType("image/jpeg");
//        response.getWriter().print("{\"image\":"+image+"}");
        OutputStream ops=response.getOutputStream();
        ImageIO.write(image, "jpeg",ops);
        ops.close();

    }

    private String getNumber(int size)
    {
        String str="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";//要注意的是我这里只提供了大写的A-Z如果想实现小写的自己加进去还有就是本应该将用户的输入不管大写小写都要转化为小写我没做有兴趣的自己实现很简单的
        String  number="";
        Random r=new Random();
        for(int i=0;i<size;i++)
        {
            number+=str.charAt(r.nextInt(str.length()));

        }
        return number;
    }
}

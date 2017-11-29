package common;

import DBO.ConnectionDB;
import net.sf.json.JSONObject;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;
import java.util.Random;

public class Common {
    public void CheckEmail(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String email=request.getParameter("email");

        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        try {
            String sql="select occupy_person.email,occupy_company.email from occupy_person,occupy_company where occupy_person.email=? OR occupy_company.email=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, email);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                String str = "{\"msg\":\"email_exist\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }else{
                String str = "{\"msg\":\"email_not_exist\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }
    public void Login(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String login_type=request.getParameter("login_type");
        String nickname=request.getParameter("nickname");
        String password=request.getParameter("password");

        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        if(login_type.equals("person")){
            try {
                String sql="select email from occupy_person where nickname=? and password=?";
                PreparedStatement ps = conn.prepareStatement(sql);
                ps.setString(1, nickname);
                ps.setString(2, password);
                ResultSet rs = ps.executeQuery();
                if(rs.next()){
                    String str = "{\"msg\":\"person_success\"}";
                    response.getWriter().print(str);
                    response.getWriter().flush();;
                    response.getWriter().close();;
                }else{
                    String str = "{\"msg\":\"person_fail\"}";
                    response.getWriter().print(str);
                    response.getWriter().flush();;
                    response.getWriter().close();;
                }
                ps.close();
            } catch (SQLException e) {
                // TODO 自动生成的 catch 块
                e.printStackTrace();
            }
        }else{
            String sql="select name from occupy_company where nickname=? and password=?";
            try {
                PreparedStatement ps = conn.prepareStatement(sql);
                ps.setString(1, nickname);
                ps.setString(2, password);
                ResultSet rs = ps.executeQuery();
                if(rs.next()){
                    String str = "{\"msg\":\"enterprise_success\"}";
                    response.getWriter().print(str);
                    response.getWriter().flush();;
                    response.getWriter().close();;
                }else{
                    String str = "{\"msg\":\"enterprise_fail\"}";
                    response.getWriter().print(str);
                    response.getWriter().flush();;
                    response.getWriter().close();;
                }
                ps.close();
            } catch (SQLException e) {
                // TODO 自动生成的 catch 块
                e.printStackTrace();
            }
        }
    }
    public void LoginSession(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        String login = request.getParameter("login");
        String login_type=request.getParameter("login_type");
        String login_nickname=request.getParameter("nickname");
        String login_password=request.getParameter("password");
        if (login.equals("login")) {
            // 创建session
            // 使用request对象的getSession()获取session，如果session不存在则创建一个
            HttpSession session = request.getSession();
            JSONObject user = new JSONObject();
            user.put("login_type", login_type);
            user.put("nickname",login_nickname);
            user.put("password",login_password);
            session.setAttribute("user",user);
            response.getWriter().print(user.toString());
        } else if (login.equals("refresh")) {
            // 判断session之前是否存在，或者说是否新建
            HttpSession session = request.getSession();
            if (session.isNew()) {
                session.invalidate();
            } else {
                response.getWriter().print(session.getAttribute("user"));
            }
        } else {
            // 删除session
            HttpSession session = request.getSession();
            session.invalidate();
        }

    }
    public void resetPassword(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String email=request.getParameter("email");

        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        try {
            String sql="select occupy_person.email,occupy_company.email from occupy_person,occupy_company where occupy_person.email=? OR occupy_company.email=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, email);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                //邮箱匹配成功，向邮箱发邮件以重置密码
                sendMail(email,response);
            }else{
                String str = "{\"msg\":\"email_not_exist\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }
    public static boolean sendMail(String to, HttpServletResponse response) {

        try {
            Properties props = new Properties();
            props.put("username", "m_YunfeiYang@163.com");
            props.put("password", "420222AA");
            props.put("mail.transport.protocol", "smtp" );
            props.put("mail.smtp.host", "smtp.163.com");
            props.put("mail.smtp.port", "25" );

            Session mailSession = Session.getDefaultInstance(props);
            //生成随机激活码
            String base = "abcdefghijklmnopqrstuvwxyz0123456789";
            Random random = new Random();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < 6; i++) {
                int number = random.nextInt(base.length());
                sb.append(base.charAt(number));
            }
            Message msg = new MimeMessage(mailSession);
            msg.setFrom(new InternetAddress("m_YunFeiYang@163.com"));
            msg.addRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            msg.setSubject("重置密码邮件");
            msg.setContent("<h1>此邮件为官方重置密码邮件</h1>密码重置验证码:"+sb,"text/html;charset=UTF-8");

            msg.saveChanges();

            Transport transport = mailSession.getTransport("smtp");
            transport.connect(props.getProperty("mail.smtp.host"), props
                    .getProperty("username"), props.getProperty("password"));
            transport.sendMessage(msg, msg.getAllRecipients());
            transport.close();
            JSONObject mag=new JSONObject();
            mag.put("msg",sb.toString());
            response.getWriter().print(mag.toString());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
            return false;
        }
        return true;
    }
    public void updatePassword(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String email=request.getParameter("email");
        String password=request.getParameter("password");

        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        try {
            String sql1="UPDATE occupy_person SET password=? WHERE email=?";
            String sql2="UPDATE occupy_company SET password=? WHERE email=?";
            PreparedStatement ps1 = conn.prepareStatement(sql1);
            PreparedStatement ps2 = conn.prepareStatement(sql2);
            ps1.setString(1, password);
            ps1.setString(2, email);
            ps2.setString(1, password);
            ps2.setString(2, email);
            int rs1 = ps1.executeUpdate();
            int rs2 = ps2.executeUpdate();
            if(rs1==1||rs2==1){
                String str = "{\"msg\":\"updatePassword_success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }else{
                String str = "{\"msg\":\"updatePassword_fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps1.close();
            ps2.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }
}

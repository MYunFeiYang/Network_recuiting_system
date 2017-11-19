package common;

import DBO.connectionDB;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Common {
    public void CheckTelephone(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String telephone=request.getParameter("telephone");
        System.out.println(telephone);

        connectionDB conndb=new connectionDB();
        Connection conn=conndb.getConn();
        String sql="select telephone from occupy_person,occupy_enterprise where telephone=?";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, telephone);
            ResultSet rs = ps.executeQuery();
            System.out.println(rs.getRow());
            if(rs.next()){
                String str = "{\"msg\":\"telephone_exist\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }else{
                String str = "{\"msg\":\"telephone_not_exist\"}";
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

        connectionDB conndb=new connectionDB();
        Connection conn=conndb.getConn();
        if(login_type.equals("person")){
            String sql="select telephone from occupy_person where nickname=? and password=?";
            try {
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
            System.out.println("enterprise");
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

}

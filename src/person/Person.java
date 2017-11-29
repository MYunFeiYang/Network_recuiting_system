package person;

import DBO.ConnectionDB;
import net.sf.json.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
public class Person {
    public void register(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String nickname=request.getParameter("nickname");
        String password=request.getParameter("password");
        String name=request.getParameter("name");
        String telephone=request.getParameter("telephone");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
        String dataString=df.format(new Date());// new Date()为获取当前系统时间
        String email=request.getParameter("email");

        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        String sql="insert into occupy_person (nickname,password,"
                + "name,telephone,email,regrime) values(?,?,?,?,?,?)";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, name);
            ps.setString(4, telephone);
            ps.setString(5, email);
            ps.setString(6, dataString);
            int tag = ps.executeUpdate();
            ps.close();
            if(tag==1){
                String str = "{\"msg\":\"success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();;
                response.getWriter().close();;
            }else{
                String str = "{\"msg\":\"fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();;
                response.getWriter().close();;
            }
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }
    public void modifyUser(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String telephone=request.getParameter("telephone");
        String nickname=request.getParameter("nickname");
        String password=request.getParameter("password");
        String email=request.getParameter("email");

        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        String sql="update occupy_person set nickname=?,password=?,email=? where telephone=?";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, email);
            ps.setString(4, telephone);
            boolean tag = ps.execute();
            if(!tag){
                String str = "{\"msg\":\"modify_user_success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();;
                response.getWriter().close();;
            }else{
                String str = "{\"msg\":\"modify_user_fail\"}";
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
    public void initResume(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        // 以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        // System.out.println(nickname);
        ConnectionDB conndb = new ConnectionDB();
        Connection conn = conndb.getConn();
        try {
            String sql = "select name,telephone,email from occupy_person where nickname=? and password=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                String name = rs.getString("name");
                String telephone = rs.getString("telephone");
                String email = rs.getString("email");
                JSONObject user = new JSONObject();
                user.put("name", name);
                user.put("telephone", telephone);
                user.put("email", email);
                response.getWriter().print(user.toString());
                response.getWriter().flush();
                response.getWriter().close();
                ps.close();
            }
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }

    }
    public void addResume(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String nickname=request.getParameter("nickname");
        String password=request.getParameter("password");
        String name=request.getParameter("name");
        String age=request.getParameter("age");
        String sex=request.getParameter("sex");
        String origin=request.getParameter("origin");
        String collage=request.getParameter("collage");
        String specialty=request.getParameter("specialty");
        String degree=request.getParameter("degree");
        String admission_data=request.getParameter("admission_data");
        String graduation_data=request.getParameter("graduation_data");
        String telephone=request.getParameter("telephone");
        String email=request.getParameter("email");

        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        String sql="insert into occupy_resume (nickname,password,name,age,sex,origin,collage,specialty,"
                + "degree,admission_data,graduation_data,telephone,email) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, name);
            ps.setString(4, age);
            ps.setString(5, sex);
            ps.setString(6, origin);
            ps.setString(7, collage);
            ps.setString(8, specialty);
            ps.setString(9, degree);
            ps.setString(10, admission_data);
            ps.setString(11, graduation_data);
            ps.setString(12, telephone);
            ps.setString(13, email);
            int tag = ps.executeUpdate();
            ps.close();
            if(tag==1){
                String str = "{\"msg\":\"add_resume_success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();;
                response.getWriter().close();;
            }else{
                String str = "{\"msg\":\"add_resume_fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();;
                response.getWriter().close();;
            }
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }
}

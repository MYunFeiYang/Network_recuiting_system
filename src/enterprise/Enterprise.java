package enterprise;

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

public class Enterprise {
   public void register(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String nickname=request.getParameter("nickname");
        String password=request.getParameter("password");
        String name=request.getParameter("name");
        String industry=request.getParameter("industry");
        String telephone=request.getParameter("telephone");
        String email=request.getParameter("email");
        String address=request.getParameter("address");

        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        String sql="insert into occupy_company (nickname,password,name,industry,telephone,email,address) values(?,?,?,?,?,?,?)";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, name);
            ps.setString(4, industry);
            ps.setString(5, telephone);
            ps.setString(6, email);
            ps.setString(7, address);
            int tag = ps.executeUpdate();
            ps.close();
            if(tag==1){
                String str = "{\"msg\":\"success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }else{
                String str = "{\"msg\":\"fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
   public void initJob(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        // 以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        System.out.println(nickname);
        ConnectionDB conndb = new ConnectionDB();
        Connection conn = conndb.getConn();
        try {
            String sql = "select name,address,industry,email from occupy_company where nickname=? and password=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                String name = rs.getString("name");
                String address = rs.getString("address");
                String industry = rs.getString("industry");
                String email = rs.getString("email");
                JSONObject job = new JSONObject();
                job.put("name", name);
                job.put("address", address);
                job.put("industry", industry);
                job.put("email", email);
                response.getWriter().print(job.toString());
                response.getWriter().flush();
                response.getWriter().close();
                ps.close();
            }
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }

    }
   public void addJob(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");

        String name=request.getParameter("name");
        String address=request.getParameter("address");
        String industry=request.getParameter("industry");
        String job=request.getParameter("job_name");
        String number=request.getParameter("number");
        String salary=request.getParameter("salary");
        String publish_time=request.getParameter("publish_time");
        String effective_time=request.getParameter("effective_time");
        String telephone=request.getParameter("telephone");
        String email=request.getParameter("email");

        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        String sql="insert into occupy_jobs (telephone,name,address,industry,job,number,salary,publish_time,"
                + "effective_time,email) values(?,?,?,?,?,?,?,?,?,?)";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, telephone);
            ps.setString(2, name);
            ps.setString(3, address);
            ps.setString(4,industry);
            ps.setString(5, job);
            ps.setString(6, number);
            ps.setString(7, salary);
            ps.setString(8, publish_time);
            ps.setString(9, effective_time);
            ps.setString(10, email);
            int tag = ps.executeUpdate();
            ps.close();
            if(tag==1){
                String str = "{\"msg\":\"add_job_success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }else{
                String str = "{\"msg\":\"add_job_fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

}

package service.person;

import model.DBManager;
import model.person.Resume;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class Person {
    public void register(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String name = request.getParameter("name");
        String telephone = request.getParameter("telephone");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
        String dataString = df.format(new Date());// new Date()为获取当前系统时间
        String email = request.getParameter("email");
        int assessment=0;
        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        String sql = "{call person_register(?,?,?,?,?,?,?)}";
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, name);
            ps.setString(4, telephone);
            ps.setString(5, email);
            ps.setString(6, dataString);
            ps.setInt(7,assessment);
            int tag = ps.executeUpdate();
            if (tag == 1) {
                String str = "{\"msg\":\"assessing\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            } else {
                String str = "{\"msg\":\"fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps.close();
            conn.close();
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
        String telephone = request.getParameter("telephone");
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");

        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        String sql = "{call modifyPerosn(?,?,?)}";
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, telephone);
            boolean tag = ps.execute();
            if (!tag) {
                String str = "{\"msg\":\"modify_user_success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            } else {
                String str = "{\"msg\":\"modify_user_fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps.close();
            conn.close();
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
        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        try {
            String sql = "{call initResumeByPerson(?,?,?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.registerOutParameter(3,Types.VARCHAR);
            ps.registerOutParameter(4,Types.VARCHAR);
            ps.registerOutParameter(5,Types.VARCHAR);
            ps.execute();
            if (ps.getString(3)!=null) {
                String name = ps.getString(3);
                String telephone = ps.getString(4);
                String email = ps.getString(5);
                JSONObject user = new JSONObject();
                user.put("name", name);
                user.put("telephone", telephone);
                user.put("email", email);
                response.getWriter().print(user.toString());
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps.close();
            conn.close();
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
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String name = request.getParameter("name");
        String age = request.getParameter("age");
        String sex = request.getParameter("sex");
        String origin = request.getParameter("origin");
        String collage = request.getParameter("collage");
        String specialty = request.getParameter("specialty");
        String degree = request.getParameter("degree");
        String admission_data = request.getParameter("admission_data");
        String graduation_data = request.getParameter("graduation_data");
        String telephone = request.getParameter("telephone");
        String email = request.getParameter("email");
        Random r = new Random();
        String identification = nickname + password + r.nextInt(100);
        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        String sql = "call addResume(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, identification);
            ps.setString(2, nickname);
            ps.setString(3, password);
            ps.setString(4, name);
            ps.setString(5, age);
            ps.setString(6, sex);
            ps.setString(7, origin);
            ps.setString(8, collage);
            ps.setString(9, specialty);
            ps.setString(10, degree);
            ps.setString(11, admission_data);
            ps.setString(12, graduation_data);
            ps.setString(13, telephone);
            ps.setString(14, email);
            int tag = ps.executeUpdate();
            if (tag == 1) {
                String str = "{\"msg\":\"add_resume_success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            } else {
                String str = "{\"msg\":\"add_resume_fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

    public void manageResume(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        // 以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        List<Resume> resumeList = new ArrayList<>();
        try {
            String sql = "select identification,name,age,sex,origin,collage,specialty,degree,admission_data,graduation_data from resume where (nickname=? and password=?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Resume resume = new Resume();
                resume.setIdentification(rs.getString(1));
                resume.setName(rs.getString(2));
                resume.setAge(rs.getString(3));
                resume.setSex(rs.getString(4));
                resume.setOrigin(rs.getString(5));
                resume.setCollage(rs.getString(6));
                resume.setSpecialty(rs.getString(7));
                resume.setDegree(rs.getString(8));
                resume.setAdmission_data(rs.getString(9));
                resume.setGraduation_data(rs.getString(10));
                resumeList.add(resume);
            }
            response.getWriter().print(JSONArray.fromObject(resumeList).toString());
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }

    }

    public void modifyResume(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String identification = request.getParameter("identification");
        String age = request.getParameter("age");
        String collage = request.getParameter("collage");
        String specialty = request.getParameter("specialty");
        String degree = request.getParameter("degree");
        String admission_data = request.getParameter("admission_data");
        String graduation_data = request.getParameter("graduation_data");

        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        String sql = "UPDATE resume SET age=?,collage=?,specialty=?,"
                + "degree=?,admission_data=?,graduation_data=? WHERE identification=?";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, age);
            ps.setString(2, collage);
            ps.setString(3, specialty);
            ps.setString(4, degree);
            ps.setString(5, admission_data);
            ps.setString(6, graduation_data);
            ps.setString(7, identification);
            int tag = ps.executeUpdate();
            if (tag == 1) {
                String str = "{\"msg\":\"modify_resume_success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            } else {
                String str = "{\"msg\":\"modify_resume_fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

    public void deleteResume(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        // 以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String identification = request.getParameter("identification");
        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        try {
            String sql = "DELETE resume WHERE identification=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, identification);
            int tag = ps.executeUpdate();
            if (tag == 1) {
                String str = "{\"msg\":\"delete_resume_success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            } else {
                String str = "{\"msg\":\"delete_resume_fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

    public void auto_match(HttpServletRequest request,HttpServletResponse response)throws ServletException,IOException{
        String nickname=request.getParameter("nickname");
        String password=request.getParameter("password");
        DBManager dbManager=new DBManager();
        Connection conn=dbManager.getConnection();
        try {
            String sql="SELECT origin,degree FROM resume WHERE (nickname=? AND password=?)";
            PreparedStatement ps=conn.prepareStatement(sql);
            ps.setString(1,nickname);
            ps.setString(2,password);
            ResultSet rs=ps.executeQuery();
            while (rs.next()){

            }
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
}

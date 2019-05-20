package service.enterprise;

import model.DBManager;
import model.enterprise.Jobs;
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

public class Enterprise {
    public void register(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String name = request.getParameter("name");
        String industry = request.getParameter("industry");
        String telephone = request.getParameter("telephone");
        String email = request.getParameter("email");
        String address = request.getParameter("address");
        int assessment = 1;
        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        String sql = "{call enterpriseRegister(?,?,?,?,?,?,?,?)}";
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, name);
            ps.setString(4, industry);
            ps.setString(5, telephone);
            ps.setString(6, email);
            ps.setString(7, address);
            ps.setInt(8, assessment);
            ps.execute();
            String str = "{\"msg\":\"assessing\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
            String str = "{\"msg\":\"register_fail\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
        }
    }

    public void modifyUserBeforeSelect(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");

        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        String sql = "{call enterpriseModifyBeforeSelect(?,?,?,?,?,?,?)}";
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.registerOutParameter(3, Types.VARCHAR);
            ps.registerOutParameter(4, Types.VARCHAR);
            ps.registerOutParameter(5, Types.VARCHAR);
            ps.registerOutParameter(6, Types.VARCHAR);
            ps.registerOutParameter(7, Types.VARCHAR);
            ps.execute();
            if (ps.getString(3) != null) {
                model.enterprise.Enterprise enterprise = new model.enterprise.Enterprise();
                enterprise.setNickname(nickname);
                enterprise.setPassword(password);
                enterprise.setName(ps.getString(3));
                enterprise.setIndustry(ps.getString(4));
                enterprise.setAddress(ps.getString(5));
                enterprise.setTelephone(ps.getString(6));
                enterprise.setEmail(ps.getString(7));
                response.getWriter().print(JSONObject.fromObject(enterprise).toString());
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
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String name = request.getParameter("nickname");
        String industry = request.getParameter("industry");
        String email = request.getParameter("email");
        String telephone = request.getParameter("telephone");
        String address = request.getParameter("address");
        String oldNickname = request.getParameter("oldnickname");
        String oldPassword = request.getParameter("oldpassword");

        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        String sql = "{call enterpriseModify(?,?,?,?,?,?,?,?,?)}";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, name);
            ps.setString(4, industry);
            ps.setString(5, email);
            ps.setString(6, telephone);
            ps.setString(7, address);
            ps.setString(8, oldNickname);
            ps.setString(9, oldPassword);
            ps.execute();
            String str = "{\"msg\":\"modify_user_success\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            String str = "{\"msg\":\"modify_user_fail\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
            e.printStackTrace();
        }
    }

    public void initJob(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        try {
            String sql = "{call jobInit(?,?,?,?,?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.registerOutParameter(3, Types.VARCHAR);
            ps.registerOutParameter(4, Types.VARCHAR);
            ps.registerOutParameter(5, Types.VARCHAR);
            ps.registerOutParameter(6, Types.VARCHAR);
            ps.registerOutParameter(7, Types.VARCHAR);
            ps.execute();
            if (ps.getString(3) != null) {
                String name = ps.getString(3);
                String address = ps.getString(4);
                String industry = ps.getString(5);
                String telephone = ps.getString(6);
                String email = ps.getString(7);
                JSONObject job = new JSONObject();
                job.put("name", name);
                job.put("address", address);
                job.put("industry", industry);
                job.put("telephone", telephone);
                job.put("email", email);
                response.getWriter().print(job.toString());
                response.getWriter().flush();
                response.getWriter().close();
                ps.close();
                conn.close();
            }
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }

    }

    public void addJob(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        Random random = new Random();
        String identification = nickname + password + random.nextInt(500);
        String name = request.getParameter("name");
        String address = request.getParameter("address");
        String industry = request.getParameter("industry");
        String position = request.getParameter("position");
        String number = request.getParameter("number");
        int min_salary = Integer.parseInt(request.getParameter("min_salary"));
        int max_salary = Integer.parseInt(request.getParameter("max_salary"));
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
        String publish_time = df.format(new Date());// new Date()为获取当前系统时间
        String effective_time = request.getParameter("effective_time");
        String telephone = request.getParameter("telephone");
        String email = request.getParameter("email");

        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        String sql = "{call jobAdd(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, identification);
            ps.setString(2, nickname);
            ps.setString(3, password);
            ps.setString(4, name);
            ps.setString(5, address);
            ps.setString(6, industry);
            ps.setString(7, position);
            ps.setString(8, number);
            ps.setInt(9, min_salary);
            ps.setInt(10, max_salary);
            ps.setString(11, publish_time);
            ps.setString(12, effective_time);
            ps.setString(13, email);
            ps.setString(14, telephone);
            ps.execute();
            String str = "{\"msg\":\"add_job_success\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
            String str = "{\"msg\":\"add_job_fail\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
        }
    }

    public void manageJob(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        List<Jobs> jobsList = new ArrayList<>();
        try {
            String sql = "{call jobManageBeforeSelect(?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                Jobs jobs = new Jobs();
                jobs.setIdentification(rs.getString(1));
                jobs.setName(rs.getString(2));
                jobs.setAddress(rs.getString(3));
                jobs.setIndustry(rs.getString(4));
                jobs.setPosition(rs.getString(5));
                jobs.setNumber(rs.getString(6));
                jobs.setMin_salary(rs.getInt(7));
                jobs.setMax_salary(rs.getInt(8));
                jobs.setPublish_time(rs.getString(9));
                jobs.setEffective_time(rs.getString(10));
                jobsList.add(jobs);
            }
            response.getWriter().print(JSONArray.fromObject(jobsList).toString());
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }

    }

    public void modifyJob(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String identification = request.getParameter("identification");
        String address = request.getParameter("address");
        String number = request.getParameter("number");
        int min_salary = Integer.parseInt(request.getParameter("min_salary"));
        int max_salary = Integer.parseInt(request.getParameter("max_salary"));
        String effective_time = request.getParameter("effective_time");

        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        String sql = "{call jobModify(?,?,?,?,?,?)}";
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, address);
            ps.setString(2, number);
            ps.setInt(3, min_salary);
            ps.setInt(4, max_salary);
            ps.setString(5, effective_time);
            ps.setString(6, identification);
            ps.execute();
            String str = "{\"msg\":\"modify_job_success\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
            String str = "{\"msg\":\"modify_job_fail\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
        }
    }

    public void deleteJob(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String identification = request.getParameter("identification");
        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        try {
            String sql = "{call jobDelete(?)}";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, identification);
            ps.execute();
            String str = "{\"msg\":\"delete_job_success\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
            String str = "{\"msg\":\"delete_job_fail\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
        }
    }

    public void resumeReg(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<Resume> resumeList=new ArrayList<>();
        try {
            String sql = "{call resumeReg()}";
            CallableStatement ps=conn.prepareCall(sql);
            ResultSet rs=ps.executeQuery();
            while (rs.next()) {
                Resume resume=new Resume();
                resume.setName(rs.getString("name"));
                resume.setAge(rs.getString("age"));
                resume.setSex(rs.getString("sex"));
                resume.setOrigin(rs.getString("origin"));
                resume.setCollage(rs.getString("collage"));
                resume.setSpecialty(rs.getString("specialty"));
                resume.setDegree(rs.getString("degree"));
                resume.setGraduation_data(rs.getString("graduation_data"));
                resume.setTelephone(rs.getString("telephone"));
                resume.setEmail(rs.getString("email"));
                resumeList.add(resume);
            }
            response.getWriter().print(JSONArray.fromObject(resumeList).toString());
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void getResumePreference(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        try {
            String sql = "{call getResumePreference(?,?,?,?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.registerOutParameter(3, Types.VARCHAR);
            ps.registerOutParameter(4, Types.VARCHAR);
            ps.registerOutParameter(5, Types.VARCHAR);
            ps.registerOutParameter(6, Types.VARCHAR);
            ps.execute();
            if (ps.getString(3) != null || ps.getString(4) != null || ps.getString(5) != null || ps.getString(6) != null) {
                String positions = ps.getString(3);
                String cities = ps.getString(4);
                int min_salary = ps.getInt(5);
                int max_salary = ps.getInt(6);
                JSONObject resume = new JSONObject();
                resume.put("positions", positions);
                resume.put("cities", cities);
                resume.put("min_salary", min_salary);
                resume.put("max_salary", max_salary);
                response.getWriter().print(resume.toString());
                response.getWriter().flush();
                response.getWriter().close();
                ps.close();
                conn.close();
            }
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }

    }

    public void updateResumePreference(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String positions = request.getParameter("positions");
        String cities = request.getParameter("cities");
        int min_salary = Integer.parseInt(request.getParameter("min_salary"));
        int max_salary = Integer.parseInt(request.getParameter("max_salary"));
        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        try {
            String sql = "{call updateResumePreference(?,?,?,?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, positions);
            ps.setString(4, cities);
            ps.setInt(5, min_salary);
            ps.setInt(6, max_salary);
            ps.execute();
            String str = "{\"msg\":\"modify_resumePreference_success\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
            ps.close();
            conn.close();

        } catch (
                SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }

    }

    public void ResumeRecommendation(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        DBManager dbmanager = new DBManager();
        Connection conn = dbmanager.getConnection();
        List<Resume> resumeList = new ArrayList<>();
        try {
            String sql = "{call ResumeRecommendation(?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                Resume resume = new Resume();
                resume.setIdentification(rs.getString("identification"));
                resume.setName(rs.getString("name"));
                resume.setAge(rs.getString("age"));
                resume.setSex(rs.getString("sex"));
                resume.setOrigin(rs.getString("origin"));
                resume.setCollage(rs.getString("collage"));
                resume.setSpecialty(rs.getString("specialty"));
                resume.setDegree(rs.getString("degree"));
                resume.setAdmission_data(rs.getString("admission_data"));
                resume.setGraduation_data(rs.getString("graduation_data"));
                resume.setCareer_objective(rs.getString("career_objective"));
                resume.setExpected_city(rs.getString("expected_city"));
                resume.setMin_salary(rs.getInt("min_salary"));
                resume.setMax_salary(rs.getInt("max_salary"));
                resume.setTelephone(rs.getString("telephone"));
                resume.setEmail(rs.getString("email"));
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
}

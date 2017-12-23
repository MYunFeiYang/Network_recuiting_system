package service.admin.person;

import model.DBManager;
import model.person.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Account {
    public void getRegisterCount(HttpServletResponse response) throws ServletException, IOException {
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "{call adminGetRegisterPersonCount(?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.registerOutParameter(1, Types.INTEGER);
            ps.execute();
            if (ps.getInt(1) > 0) {
                JSONObject user = new JSONObject();
                user.element("count", ps.getInt(1));
                response.getWriter().print(user.toString());
            }
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void init_assessment(HttpServletResponse response) throws ServletException, IOException {
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<User> userList = new ArrayList<>();
        try {
            String sql = "{call personAssessmentInit()}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                User user = new User();
                user.setNickname(rs.getString(1));
                user.setPassword(rs.getString(2));
                user.setName(rs.getString(3));
                user.setTelephone(rs.getString(4));
                user.setEmail(rs.getString(5));
                userList.add(user);
            }
            response.getWriter().print(JSONArray.fromObject(userList).toString());
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void pass_assessment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        int assessment = 2;
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "{call personAssessmentPass(?,?,?)}";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setInt(3, assessment);
            ps.execute();
            String str = "{\"msg\":\"person_assessment_pass\"}";
            response.getWriter().print(str);
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void init_person_account(HttpServletResponse response) throws ServletException, IOException {
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<User> adminList = new ArrayList<>();
        try {
            String sql = "{call personAcountInit()}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                User user = new User();
                user.setNickname(rs.getString(1));
                user.setPassword(rs.getString(2));
                user.setLogin_time(rs.getString(3));
                adminList.add(user);
            }
            response.getWriter().print(JSONArray.fromObject(adminList).toString());
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void add_account(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String login_time = request.getParameter("login_time");
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "{call personAcountAdd(?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, login_time);
            ps.execute();
            response.getWriter().print("{\"msg\":\"add_person_account_success\"}");
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void delete_account(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "{call personAcountDelete(?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.execute();
            response.getWriter().print("{\"msg\":\"delete_account_success\"}");
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

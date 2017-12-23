package service.admin.enterprise;

import model.DBManager;
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
            String sql = "{call adminGetRegisterEnterpriseCount(?)}";
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
        List<model.enterprise.Enterprise> adminList = new ArrayList<>();
        try {
            String sql = "{call enterpriseAssessmentInit()}";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                model.enterprise.Enterprise enterprise = new model.enterprise.Enterprise();
                enterprise.setNickname(rs.getString(1));
                enterprise.setPassword(rs.getString(2));
                enterprise.setName(rs.getString(3));
                enterprise.setIndustry(rs.getString(4));
                enterprise.setAddress(rs.getString(5));
                enterprise.setEmail(rs.getString(6));
                enterprise.setTelephone(rs.getString(7));
                adminList.add(enterprise);

            }
            response.getWriter().print(JSONArray.fromObject(adminList).toString());
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
            String sql = "{call enterpriseAssessmentPass(?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setInt(1, assessment);
            ps.setString(2, nickname);
            ps.setString(3, password);
            ps.execute();
            String str = "{\"msg\":\"enterprise_assessment_pass\"}";
            response.getWriter().print(str);
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void init_enterprise_account(HttpServletResponse response) throws ServletException, IOException {
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<model.enterprise.Enterprise> adminList = new ArrayList<>();
        try {
            String sql = "{call enterpriseAcountInit()}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                model.enterprise.Enterprise enterprise = new model.enterprise.Enterprise();
                enterprise.setNickname(rs.getString(1));
                enterprise.setPassword(rs.getString(2));
                enterprise.setLogin_time(rs.getString(3));
                adminList.add(enterprise);
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
            String sql = "enterpriseAcountAdd(?,?,?)";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, login_time);
            ps.execute();
            response.getWriter().print("{\"msg\":\"add_enterprise_account_success\"}");
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
            String sql = "{call enterpriseAcountDelete (?,?)}";
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

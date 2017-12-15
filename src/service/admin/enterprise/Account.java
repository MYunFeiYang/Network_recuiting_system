package service.admin.enterprise;

import model.DBManager;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Account {
    public void init_enterprise_account(HttpServletResponse response) throws ServletException, IOException {
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<model.enterprise.Enterprise> adminList = new ArrayList<>();
        try {
            String sql = "SELECT nickname,password,login_time FROM company";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
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

    public void pass_assessment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        int assessment = 1;
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "UPDATE company SET assessment=? WHERE (nickname=? AND password=?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, assessment);
            ps.setString(2, nickname);
            ps.setString(3, password);
            int rs = ps.executeUpdate();
            if (rs == 1) {
                String str = "{\"msg\":\"enterprise_assessment_pass\"}";
                response.getWriter().print(str);
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
            String sql = "SELECT nickname,password,name,industry,address,email,telephone,assessment FROM company";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getInt(8) == 0) {
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
            String sql = "INSERT INTO company (nickname,password,login_time) VALUES (?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, login_time);
            int rs = ps.executeUpdate();
            if (rs == 1) {
                response.getWriter().print("{\"msg\":\"add_enterprise_account_success\"}");
            }
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
            String sql = "DELETE FROM company WHERE (nickname=? and password=?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            int rs = ps.executeUpdate();
            if (rs == 1) {
                response.getWriter().print("{\"msg\":\"delete_account_success\"}");
            }
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

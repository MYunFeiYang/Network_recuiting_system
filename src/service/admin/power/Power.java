package service.admin.power;

import model.DBManager;
import model.admin.Admin;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Power {
    public void init_admin(HttpServletResponse response) throws ServletException, IOException {
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<Admin> adminList = new ArrayList<>();
        try {
            String sql = "{call adminInit()}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                Admin admin = new Admin();
                admin.setNickname(rs.getString(1));
                admin.setPassword(rs.getString(2));
                adminList.add(admin);
            }
            response.getWriter().print(JSONArray.fromObject(adminList).toString());
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void modify_admin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String power = request.getParameter("power");
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "{call adminModify(?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, power);
            ps.setString(2, nickname);
            ps.setString(3, password);
            ps.execute();
            response.getWriter().print("{\"msg\":\"modify_power_success\"}");
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void add_admin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String power = request.getParameter("power");
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "{call adminAdd(?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, power);
            ps.execute();
            response.getWriter().print("{\"msg\":\"add_power_success\"}");
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void delete_admin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String power = request.getParameter("power");
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "{call adminDelete(?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.execute();
            response.getWriter().print("{\"msg\":\"delete_power_success\"}");
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}


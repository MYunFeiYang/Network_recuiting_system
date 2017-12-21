package service.admin.power;

import model.DBManager;
import model.admin.Admin;
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

public class Power {
    public void init_admin(HttpServletResponse response) throws ServletException, IOException {
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<Admin> adminList = new ArrayList<>();
        try {
            String sql = "SELECT nickname,password,power FROM admin";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Admin admin = new Admin();
                admin.setNickname(rs.getString(1));
                admin.setPassword(rs.getString(2));
                admin.setPower(rs.getString(3));
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
        //System.out.println(nickname+password+power);
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "UPDATE admin SET power=? WHERE (nickname=? AND password=?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, power);
            ps.setString(2, nickname);
            ps.setString(3, password);
            int rs = ps.executeUpdate();
            if (rs > 0) {
                response.getWriter().print("{\"msg\":\"modify_power_success\"}");
            }
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
            String sql = "INSERT INTO admin (nickname,password,power) VALUES (?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, power);
            int rs = ps.executeUpdate();
            if (rs == 1) {
                response.getWriter().print("{\"msg\":\"add_power_success\"}");
            }
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
            String sql = "DELETE FROM admin WHERE (nickname=? and password=?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            int rs = ps.executeUpdate();
            if (rs == 1) {
                response.getWriter().print("{\"msg\":\"delete_power_success\"}");
            }
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}


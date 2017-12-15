package service.admin.person;

import model.DBManager;
import model.person.User;
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
    public void init_assessment(HttpServletResponse response) throws ServletException, IOException {
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<User> userList = new ArrayList<>();
        try {
            String sql = "SELECT nickname,password,name,telephone,email,assessment FROM person";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getInt(6) == 0) {
                    User user = new User();
                    user.setNickname(rs.getString(1));
                    user.setPassword(rs.getString(2));
                    user.setName(rs.getString(3));
                    user.setEmail(rs.getString(5));
                    user.setTelephone(rs.getString(4));
                    userList.add(user);
                }
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
        int assessment = 1;
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        try {
            String sql = "UPDATE person SET assessment=? WHERE (nickname=? AND password=?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, assessment);
            ps.setString(2, nickname);
            ps.setString(3, password);
            int rs = ps.executeUpdate();
            if (rs == 1) {
                String str = "{\"msg\":\"person_assessment_pass\"}";
                response.getWriter().print(str);
            }
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
            String sql = "SELECT nickname,password,login_time FROM person";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
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
            String sql = "INSERT INTO person (nickname,password,login_time) VALUES (?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3, login_time);
            int rs = ps.executeUpdate();
            if (rs == 1) {
                response.getWriter().print("{\"msg\":\"add_person_account_success\"}");
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
            String sql = "DELETE FROM person WHERE (nickname=? and password=?)";
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

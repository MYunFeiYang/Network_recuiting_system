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
    public void init_admin(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        DBManager dbManager=new DBManager();
        Connection conn=dbManager.getConnection();
        Admin admin=new Admin();
        List<Admin> list=new ArrayList<>();
        try {
            String sql="SELECT nickname,password,power FROM admin";
            PreparedStatement ps=conn.prepareStatement(sql);
            ResultSet rs=ps.executeQuery();
            while (rs.next()){
                admin.setNickname(rs.getString(1));
                admin.setPassword(rs.getString(2));
                admin.setPower(rs.getString(3));
                list.add(admin);
            }
            response.getWriter().print(JSONArray.fromObject(list).toString());
            rs.close();
            ps.close();
            conn.close();
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
}

package loginSuccess.person;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import connectionDB.connectionDB;
import javafx.scene.chart.PieChart.Data;

@WebServlet("/add_resume.do")
public class Add_resume extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String nickname=request.getParameter("nickname");
        String password=request.getParameter("password");
        String name=request.getParameter("name");
        String age=request.getParameter("age");
        String sex=request.getParameter("sex");
        String origin=request.getParameter("origin");
        String collage=request.getParameter("collage");
        String specialty=request.getParameter("specialty");
        String degree=request.getParameter("degree");
        String admission_data=request.getParameter("admission_data");
        String graduation_data=request.getParameter("graduation_data");
        String telephone=request.getParameter("telephone");
        String email=request.getParameter("email");
      
        connectionDB conndb=new connectionDB();
        Connection conn=conndb.connDB();
        String sql="insert into occupy_resume (nickname,password,name,age,sex,origin,collage,specialty,"
        		+ "degree,admission_data,graduation_data,telephone,email) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, nickname);
			ps.setString(2, password);
			ps.setString(3, name);
			ps.setString(4, age);
			ps.setString(5, sex);
			ps.setString(6, origin);
			ps.setString(7, collage);
			ps.setString(8, specialty);
			ps.setString(9, degree);
			ps.setString(10, admission_data);
			ps.setString(11, graduation_data);
			ps.setString(12, telephone);
			ps.setString(13, email);
			int tag = ps.executeUpdate();
			ps.close();
			if(tag==1){
				String str = "{\"msg\":\"add_resume_success\"}";
		        response.getWriter().print(str);
		        response.getWriter().flush();;
		        response.getWriter().close();;
			}else{
				String str = "{\"msg\":\"add_resume_fail\"}";
		        response.getWriter().print(str);
		        response.getWriter().flush();;
		        response.getWriter().close();;
			}
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
    }
}

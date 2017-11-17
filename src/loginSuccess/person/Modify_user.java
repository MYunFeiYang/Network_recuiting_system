package loginSuccess.person;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import connectionDB.connectionDB;

@WebServlet("/modify_user.do")
public class Modify_user extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/xml; charset=UTF-8");
		//以下两句为取消在本地的缓存
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		String telephone=request.getParameter("telephone");
		String nickname=request.getParameter("nickname");
		String password=request.getParameter("password");
		String email=request.getParameter("email");

		connectionDB conndb=new connectionDB();
		Connection conn=conndb.connDB();
		String sql="update occupy_person set nickname=?,password=?,email=? where telephone=?";
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, nickname);
			ps.setString(2, password);
			ps.setString(3, email);
			ps.setString(4, telephone);
			boolean tag = ps.execute();
			if(!tag){
				String str = "{\"msg\":\"modify_user_success\"}";
				response.getWriter().print(str);
				response.getWriter().flush();;
				response.getWriter().close();;
			}else{
				String str = "{\"msg\":\"modify_user_fail\"}";
				response.getWriter().print(str);
				response.getWriter().flush();;
				response.getWriter().close();;
			}
			ps.close();
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
	}
}

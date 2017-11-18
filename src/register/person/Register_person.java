package register.person;

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

import DBO.connectionDB;

@WebServlet("/register_person.do")
public class Register_person extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/xml; charset=UTF-8");
		//以下两句为取消在本地的缓存
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		String nickname=request.getParameter("nickname");
		String password=request.getParameter("password");
		String name=request.getParameter("name");
		String telephone=request.getParameter("telephone");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
		String dataString=df.format(new Date());// new Date()为获取当前系统时间
		String email=request.getParameter("email");

		connectionDB conndb=new connectionDB();
		Connection conn=conndb.getConn();
		String sql="insert into occupy_person (nickname,password,"
				+ "name,telephone,email,regrime) values(?,?,?,?,?,?)";
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, nickname);
			ps.setString(2, password);
			ps.setString(3, name);
			ps.setString(4, telephone);
			ps.setString(5, email);
			ps.setString(6, dataString);
			int tag = ps.executeUpdate();
			ps.close();
			if(tag==1){
				String str = "{\"msg\":\"成功\"}";
				response.getWriter().print(str);
				response.getWriter().flush();;
				response.getWriter().close();;
			}else{
				String str = "{\"msg\":\"失败\"}";
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

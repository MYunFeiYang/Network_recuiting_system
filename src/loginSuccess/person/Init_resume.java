package loginSuccess.person;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import connectionDB.connectionDB;
import net.sf.json.JSONObject;

@WebServlet("/init_resume.do")
public class Init_resume extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/xml; charset=UTF-8");
		// 以下两句为取消在本地的缓存
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		String nickname = request.getParameter("nickname");
		String password = request.getParameter("password");
		// System.out.println(nickname);
		connectionDB conndb = new connectionDB();
		Connection conn = conndb.connDB();
		try {
			String sql = "select job_name,job_telephone,job_email from occupy_person where job_nickname=? and job_password=?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, nickname);
			ps.setString(2, password);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				String name = rs.getString("job_name");
				String telephone = rs.getString("job_telephone");
				String email = rs.getString("job_email");
				JSONObject user = new JSONObject();
				user.put("name", name);
				user.put("telephone", telephone);
				user.put("email", email);
				response.getWriter().print(user.toString());
				response.getWriter().flush();
				response.getWriter().close();
				ps.close();
			}
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}

	}
}

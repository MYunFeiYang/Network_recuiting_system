package loginSuccess.enterprise;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import DBO.connectionDB;

@WebServlet("/add_job.do")
public class Add_job extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/xml; charset=UTF-8");
		//以下两句为取消在本地的缓存
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");

		String name=request.getParameter("name");
		String address=request.getParameter("address");
		String industry=request.getParameter("industry");
		String job=request.getParameter("job_name");
		String number=request.getParameter("number");
		String salary=request.getParameter("salary");
		String publish_time=request.getParameter("publish_time");
		String effective_time=request.getParameter("effective_time");
		String telephone=request.getParameter("telephone");
		String email=request.getParameter("email");

		connectionDB conndb=new connectionDB();
		Connection conn=conndb.getConn();
		String sql="insert into occupy_jobs (telephone,name,address,industry,job,number,salary,publish_time,"
				+ "effective_time,email) values(?,?,?,?,?,?,?,?,?,?)";
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, telephone);
			ps.setString(2, name);
			ps.setString(3, address);
			ps.setString(4,industry);
			ps.setString(5, job);
			ps.setString(6, number);
			ps.setString(7, salary);
			ps.setString(8, publish_time);
			ps.setString(9, effective_time);
			ps.setString(10, email);
			int tag = ps.executeUpdate();
			ps.close();
			if(tag==1){
				String str = "{\"msg\":\"add_job_success\"}";
				response.getWriter().print(str);
				response.getWriter().flush();
				response.getWriter().close();
			}else{
				String str = "{\"msg\":\"add_job_fail\"}";
				response.getWriter().print(str);
				response.getWriter().flush();
				response.getWriter().close();
			}
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
	}
}

package register.enterprise;

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

@WebServlet("/register_enterprise.do")
public class Register_enterprise extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/xml; charset=UTF-8");
		//��������Ϊȡ���ڱ��صĻ���
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		String nickname=request.getParameter("nickname");
		String password=request.getParameter("password");
		String name=request.getParameter("name");
		String industry=request.getParameter("industry");
		String telephone=request.getParameter("telephone");
		String email=request.getParameter("email");
		String address=request.getParameter("address");

		connectionDB conndb=new connectionDB();
		Connection conn=conndb.getConn();
		String sql="insert into occupy_company (nickname,password,name,industry,telephone,email,address) values(?,?,?,?,?,?,?)";
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, nickname);
			ps.setString(2, password);
			ps.setString(3, name);
			ps.setString(4, industry);
			ps.setString(5, telephone);
			ps.setString(6, email);
			ps.setString(7, address);
			int tag = ps.executeUpdate();
			ps.close();
			if(tag==1){
				String str = "{\"msg\":\"�ɹ�\"}";
				response.getWriter().print(str);
				response.getWriter().flush();
				response.getWriter().close();
			}else{
				String str = "{\"msg\":\"ʧ��\"}";
				response.getWriter().print(str);
				response.getWriter().flush();
				response.getWriter().close();
			}
		} catch (SQLException e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		}
	}
}

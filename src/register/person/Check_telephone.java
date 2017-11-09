package register.person;

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

@WebServlet("/check_telephone.do")
public class Check_telephone extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //��������Ϊȡ���ڱ��صĻ���
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String telephone=request.getParameter("telephone");
        System.out.println(telephone);
        
        connectionDB conndb=new connectionDB();
        Connection conn=conndb.connDB();
        String sql="select name from occupy_person where telephone=?";
        try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, telephone);
			ResultSet rs = ps.executeQuery();
	        System.out.println(rs.getRow());
			if(rs.next()){
				String str = "{\"msg\":\"telephone_exist\"}";
		        response.getWriter().print(str);
		        response.getWriter().flush();
		        response.getWriter().close();
			}else{
				String str = "{\"msg\":\"telephone_not_exist\"}";
		        response.getWriter().print(str);
		        response.getWriter().flush();
		        response.getWriter().close();
			}
			ps.close();
		} catch (SQLException e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		}
    }
}

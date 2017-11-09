package register.enterprise;

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

@WebServlet("/check_telephone_enterprise.do")
public class Check_telephone extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //��������Ϊȡ���ڱ��صĻ���
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String telephone=request.getParameter("telephone");
        
        connectionDB conndb=new connectionDB();
        Connection conn=conndb.connDB();
        String sql="select name from occupy_company where telephone=?";
        try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, telephone);
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				String str = "{\"msg\":\"�ɹ�\"}";
		        response.getWriter().print(str);
		        response.getWriter().flush();
		        response.getWriter().close();
		        System.out.println(rs);
			}else{
				String str = "{\"msg\":\"ʧ��\"}";
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

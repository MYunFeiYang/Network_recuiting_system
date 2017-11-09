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
        //以下两句为取消在本地的缓存
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
				String str = "{\"msg\":\"成功\"}";
		        response.getWriter().print(str);
		        response.getWriter().flush();
		        response.getWriter().close();
		        System.out.println(rs);
			}else{
				String str = "{\"msg\":\"失败\"}";
		        response.getWriter().print(str);
		        response.getWriter().flush();
		        response.getWriter().close();
			}
			ps.close();
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
    }
}

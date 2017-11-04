package register.enterprise;

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

@WebServlet("/register_enterprise.do")
public class register extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String com_nickname=request.getParameter("com_nickname");
        String com_password=request.getParameter("com_password");
        String com_name=request.getParameter("com_name");
        String com_industry=request.getParameter("com_industry");
        String com_telephone=request.getParameter("com_telephone");
        String com_email=request.getParameter("com_email");
        String com_address=request.getParameter("com_address");
        String com_introduction=request.getParameter("com_introduction");
        
        connectionDB conndb=new connectionDB();
        Connection conn=conndb.connDB();
        String sql="insert into occupy_company (com_nickname,com_password,com_name,com_industry,"
        		+ "com_telephone,com_email,com_address,com_introduction) values(?,?,?,?,?,?,?,?)";
        try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, com_nickname);
			ps.setString(2, com_password);
			ps.setString(3, com_name);
			ps.setString(4, com_industry);
			ps.setString(5, com_telephone);
			ps.setString(6, com_email);
			ps.setString(7, com_address);
			ps.setString(8, com_introduction);
			
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

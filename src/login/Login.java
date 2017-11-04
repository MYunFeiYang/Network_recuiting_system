package login;

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

@WebServlet("/login.do")
public class Login extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String job_nickname=request.getParameter("job_nickname");
        String job_password=request.getParameter("job_password");
        
        connectionDB conndb=new connectionDB();
        Connection conn=conndb.connDB();
        String sql="select job_id from occupy_registerinf where job_nickname=? and job_password=?";
        try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, job_nickname);
			ps.setString(2, job_password);
			ResultSet rs = ps.executeQuery();
			System.out.println(rs);
			ps.close();
			if(rs!=null){
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

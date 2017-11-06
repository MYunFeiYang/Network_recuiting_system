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
        String login_type=request.getParameter("login_type");
        String nickname=request.getParameter("nickname");
        String password=request.getParameter("password");
        
        connectionDB conndb=new connectionDB();
        Connection conn=conndb.connDB();
        if(login_type.equals("person")){
        	String sql="select job_id from occupy_person where job_nickname=? and job_password=?";
            try {
    			PreparedStatement ps = conn.prepareStatement(sql);
    			ps.setString(1, nickname);
    			ps.setString(2, password);
    			ResultSet rs = ps.executeQuery();
    			if(rs.next()){
    				String str = "{\"msg\":\"person_success\"}";
    		        response.getWriter().print(str);
    		        response.getWriter().flush();;
    		        response.getWriter().close();;
    			}else{
    				String str = "{\"msg\":\"person_fail\"}";
    		        response.getWriter().print(str);
    		        response.getWriter().flush();;
    		        response.getWriter().close();;
    			}
    			ps.close();
    		} catch (SQLException e) {
    			// TODO 自动生成的 catch 块
    			e.printStackTrace();
    		}
        }else{
        	System.out.println("enterprise");
        	String sql="select com_id from occupy_company where com_nickname=? and com_password=?";
            try {
    			PreparedStatement ps = conn.prepareStatement(sql);
    			ps.setString(1, nickname);
    			ps.setString(2, password);
    			ResultSet rs = ps.executeQuery();
    			if(rs.next()){
    				String str = "{\"msg\":\"enterprise_success\"}";
    		        response.getWriter().print(str);
    		        response.getWriter().flush();;
    		        response.getWriter().close();;
    			}else{
    				String str = "{\"msg\":\"enterprise_fail\"}";
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
}

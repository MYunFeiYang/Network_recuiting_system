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

@WebServlet("/register_person.do")
public class register extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String job_nickname=request.getParameter("job_nickname");
        String job_password=request.getParameter("job_password");
        String job_name=request.getParameter("job_name");
        String job_telephone=request.getParameter("job_telephone");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
        String dataString=df.format(new Date());// new Date()为获取当前系统时间
        String job_email=request.getParameter("job_email");
        
        connectionDB conndb=new connectionDB();
        Connection conn=conndb.connDB();
        String sql="insert into occupy_registerinf (job_nickname,job_password,"
        		+ "job_name,job_telephone,job_email,job_regrime) values(?,?,?,?,?,?)";
        try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, job_nickname);
			ps.setString(2, job_password);
			ps.setString(3, job_name);
			ps.setString(4, job_telephone);
			ps.setString(5, job_email);
			ps.setString(6, dataString);
			int tag = ps.executeUpdate();
			ps.close();
			if(tag==1){
				String str = "{'msg':'成功','success':'true'}";
		        response.getWriter().print(str);
		        response.getWriter().flush();;
		        response.getWriter().close();;
			}
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
        //System.out.println(job_nickname);;
    }
}

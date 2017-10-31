package register.person;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

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
        String job_email=request.getParameter("job_email");
        String str = "{'msg':'成功','success':'true'}";
        response.setStatus(200);
        response.getWriter().print(str);
        response.getWriter().flush();
        response.getWriter().close();
        //System.out.println(job_nickname);;
    }
}

package servlet;

import common.Common;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "public")
public class servletPublic extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String public_type=request.getParameter("public");
        Common common=new Common();
        if (public_type.equals("checkTelephone")){
            common.CheckTelephone(request,response);
        }else if (public_type.equals("loginSession")){
            common.LoginSession(request,response);
        }else if (public_type.equals("login")){
            common.Login(request,response);
        }else {
            return;
        }
    }
}

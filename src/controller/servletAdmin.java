package controller;

import service.admin.power.Power;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "admin")
public class servletAdmin extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        String url=request.getRequestURI();
        if (url.contains("power")){
            Power power=new Power();
            if (url.contains("init")){
                power.init_admin(request,response);
            }else if (url.contains("modify")){
                power.modify_admin(request,response);
            }else if (url.contains("add")){
                power.add_admin(request,response);
            }else if (url.contains("delete")){
                power.delete_admin(request,response);
            }

        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}

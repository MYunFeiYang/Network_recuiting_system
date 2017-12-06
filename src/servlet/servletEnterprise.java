package servlet;

import controller.enterprise.Enterprise;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "/enterprise")
public class servletEnterprise extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String enterprise_type=request.getParameter("enterprise");
        Enterprise enterprise=new Enterprise();
        if (enterprise_type.equals("register")){
            enterprise.register(request,response);
        }else if (enterprise_type.equals("modifyUser")){
            enterprise.modifyUser(request,response);
        }else if (enterprise_type.equals("initJob")){
            enterprise.initJob(request,response);
        }else if (enterprise_type.equals("addJob")){
            enterprise.addJob(request,response);
        }else {
            return;
        }
    }
}

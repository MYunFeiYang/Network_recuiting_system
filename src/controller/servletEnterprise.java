package controller;

import service.enterprise.Enterprise;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "/enterprise")
public class servletEnterprise extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String enterprise_type = request.getParameter("enterprise");
        Enterprise enterprise = new Enterprise();
        switch (enterprise_type) {
            case "register":
                enterprise.register(request, response);
                break;
            case "modifyUser":
                enterprise.modifyUser(request, response);
                break;
            case "initJob":
                enterprise.initJob(request, response);
                break;
            case "addJob":
                enterprise.addJob(request, response);
                break;
            case "manageJob":
                enterprise.manageJob(request, response);
                break;
            case "modifyJob":
                enterprise.modifyJob(request,response);
                break;
            case "deleteJob":
                enterprise.deleteJob(request,response);
                break;
        }
    }
}

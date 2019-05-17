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
        // 允许该域发起跨域请
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3628800");
        response.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type,X-Auth-Token");
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        response.setHeader("content-type", "text/html;charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String enterprise_type = request.getParameter("enterprise");
        Enterprise enterprise = new Enterprise();
        switch (enterprise_type) {
            case "register":
                enterprise.register(request, response);
                break;
            case "modifyEnterpriseBeforeSelect":
                enterprise.modifyUserBeforeSelect(request, response);
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
                enterprise.modifyJob(request, response);
                break;
            case "deleteJob":
                enterprise.deleteJob(request, response);
                break;
            case "resumeReg":
                enterprise.resumeReg(request, response);
                break;
            case "getResumePreference":
                enterprise.getResumePreference(request, response);
                break;
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}

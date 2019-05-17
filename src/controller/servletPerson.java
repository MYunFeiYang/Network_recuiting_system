package controller;

import service.person.Person;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "/person")
public class servletPerson extends HttpServlet {
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
        String person_type = request.getParameter("person");
        Person person = new Person();
        switch (person_type) {
            case "register":
                person.register(request, response);
                break;
            case "modifyUserBeforeSelect":
                person.modifyUserBeforeSelect(request, response);
                break;
            case "modifyUser":
                person.modifyUser(request, response);
                break;
            case "initResume":
                person.initResume(request, response);
                break;
            case "addResume":
                person.addResume(request, response);
                break;
            case "manageResume":
                person.manageResume(request, response);
                break;
            case "modifyResume":
                person.modifyResume(request, response);
                break;
            case "deleteResume":
                person.deleteResume(request, response);
                break;
            case "auto_match":
                person.auto_match(request, response);
                break;
            case "jobReg":
                person.jobReg(request, response);
                break;
            case "getJobPreference":
                person.getJobPreference(request, response);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

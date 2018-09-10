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
        response.setCharacterEncoding("utf-8");
        request.setCharacterEncoding("utf-8");
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
            case "jobReg":
                person.jobReg(request, response);
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}

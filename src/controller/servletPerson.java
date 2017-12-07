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
        String person_type=request.getParameter("person");
        Person person=new Person();
        if (person_type.equals("register")){
            person.register(request,response);
        }else if (person_type.equals("modifyUser")){
            person.modifyUser(request,response);
        }else if (person_type.equals("initResume")){
            person.initResume(request,response);
        }else if (person_type.equals("addResume")){
            person.addResume(request,response);
        }else {
            return;
        }
    }
}

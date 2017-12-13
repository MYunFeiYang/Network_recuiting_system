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
        String person_type = request.getParameter("person");
        Person person = new Person();
        switch (person_type) {
            case "register":
                person.register(request, response);
            case "modifyUser":
                person.modifyUser(request, response);
            case "initResume":
                person.initResume(request, response);
            case "addResume":
                person.addResume(request, response);
            case "manageResume":
                person.manageResume(request, response);
        }
    }
}

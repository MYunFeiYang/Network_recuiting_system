package controller;

import service.common.Common;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "public")
public class servletPublic extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String public_type = request.getParameter("public");
        Common common = new Common();
        switch (public_type) {
            case "checkemail":
                common.CheckEmail(request, response);
                break;
            case "loginSession":
                common.LoginSession(request, response);
                break;
            case "login":
                common.Login(request, response);
                break;
            case "resetPassword":
                common.resetPassword(request, response);
                break;
            case "updatePassword":
                common.updatePassword(request, response);
                break;
            case "get_news":
                common.getNews(request, response);
                break;
            case "query":
                common.query(request, response);
                break;
            case "paging":
                common.Paging(request, response);
                break;
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

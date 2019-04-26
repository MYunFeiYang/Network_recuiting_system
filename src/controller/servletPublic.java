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
        // 允许该域发起跨域请
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3628800");
        response.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type,X-Auth-Token");
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        response.setHeader("content-type","text/html;charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
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
            case "getEmail":
                common.getEmail(request,response);
                break;
            case "getHeadPicture":
                common.getHeadPicture(request,response);
                break;
            case "getVideoSrc":
                common.getVideoSrc(request,response);
                break;
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

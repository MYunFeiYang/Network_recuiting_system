package controller;

import service.common.Query;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "query")
public class servletQuery extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 允许该域发起跨域请
        response.setHeader("Access-Control-Allow-Origin", "*");//*允许任何域
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
        String url = request.getRequestURI();
        Query query = new Query();
        if (url.contains("industry")) {
            query.init_filter_industry(request, response);
        } else if (url.contains("address")) {
            query.init_filter_address(request, response);
        } else if (url.contains("position")) {
            query.init_filter_position(request, response);
        } else if (url.contains("company")) {
            query.queryCompany(request, response);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

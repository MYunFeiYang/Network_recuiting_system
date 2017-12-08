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
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        String url=request.getRequestURI();
        Query query =new Query();
        if (url.indexOf("job")!=-1){
            query.init_filter_job(request,response);
        }else if (url.indexOf("address")!=-1){
            query.init_filter_address(request,response);
        }else if (url.indexOf("position")!=-1){
            query.init_filter_position(request,response);
        }else if (url.indexOf("company")!=-1){
            query.queryCompany(request,response);
        }else {
            return;
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}

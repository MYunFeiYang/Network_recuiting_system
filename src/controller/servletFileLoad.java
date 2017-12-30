package controller;

import service.common.FileLoad;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "fileLoad")
public class servletFileLoad extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        String url = request.getRequestURI();
        FileLoad fileLoad=new FileLoad();
        if (url.contains("upload")){
            fileLoad.FileUpload(request,response);
        }else if (url.contains("download")){
            fileLoad.FileDownload(request,response);
        }
    }
}

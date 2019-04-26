package controller;

import service.admin.person.Account;
import service.admin.power.Power;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "admin")
public class servletAdmin extends HttpServlet {
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
        String url = request.getRequestURI();
        if (url.contains("power")) {
            Power power = new Power();
            if (url.contains("init")) {
                power.init_admin(response);
            } else if (url.contains("modify")) {
                power.modify_admin(request, response);
            } else if (url.contains("add")) {
                power.add_admin(request, response);
            } else if (url.contains("delete")) {
                power.delete_admin(request, response);
            }
        } else if (url.contains("person_assessment")) {
            Account account = new Account();
            if (url.contains("init")) {
                account.init_assessment(response);
            } else if (url.contains("pass")) {
                account.pass_assessment(request, response);
            } else if (url.contains("delete")) {
                account.delete_account(request, response);
            }else if (url.contains("registerCount")) {
                account.getRegisterCount(response);
            }
        } else if (url.contains("person_account")) {
            Account account = new Account();
            if (url.contains("init")) {
                account.init_person_account(response);
            } else if (url.contains("add")) {
                account.add_account(request, response);
            } else if (url.contains("delete")) {
                account.delete_account(request, response);
            }
        } else if (url.contains("enterprise_assessment")) {
            service.admin.enterprise.Account account = new service.admin.enterprise.Account();
            if (url.contains("init")) {
                account.init_assessment(response);
            } else if (url.contains("pass")) {
                account.pass_assessment(request, response);
            }else if (url.contains("registerCount")) {
                account.getRegisterCount(response);
            }
        } else if (url.contains("enterprise_account")) {
            service.admin.enterprise.Account account = new service.admin.enterprise.Account();
            if (url.contains("init")) {
                account.init_enterprise_account(response);
            } else if (url.contains("add")) {
                account.add_account(request, response);
            } else if (url.contains("delete")) {
                account.delete_account(request, response);
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

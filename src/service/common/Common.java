package service.common;

import model.DBManager;
import model.common.Company;
import model.common.PageBean;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

public class Common {
    public void CheckEmail(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String email = request.getParameter("email");

        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        try {
            String sql = "select person.email,company.email from person,company where person.email=? OR company.email=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, email);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                String str = "{\"msg\":\"email_exist\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            } else {
                String str = "{\"msg\":\"email_not_exist\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

    public void Login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String login_type = request.getParameter("login_type");
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
        String dataString = df.format(new Date());// new Date()为获取当前系统时间
        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        String sql = null;
        switch (login_type) {
            case "person":
                sql = "{call person_login(?,?,?,?)}";
                break;
            case "enterprise":
                sql = "{call enterprise_login(?,?,?,?)}";
                break;
            case "admin":
                sql = "{call admin_login(?,?,?)}";
                break;
        }
        try {
            CallableStatement ps;
            switch (login_type) {
                case "admin":
                    ps = conn.prepareCall(sql);
                    ps.setString(1, nickname);
                    ps.setString(2, password);
                    ps.registerOutParameter(3,Types.VARCHAR);
                    ps.execute();
                    if (ps.getString(3)!=null) {
                        String str = "{\"msg\":\"login_success\"}";
                        response.getWriter().print(str);
                        response.getWriter().flush();
                        response.getWriter().close();

                    } else {
                        String str = "{\"msg\":\"login_fail\"}";
                        response.getWriter().print(str);
                        response.getWriter().flush();
                        response.getWriter().close();
                    }
                    break;
                default:
                    ps = conn.prepareCall(sql);
                    ps.registerOutParameter(4, Types.BIT);
                    ps.setString(1, nickname);
                    ps.setString(2, password);
                    ps.setString(3,dataString);
                    ps.execute();
                    if (ps.getInt(4)!=-1) {
                        if (ps.getInt(4)==1) {
                            String str = "{\"msg\":\"login_success\"}";
                            response.getWriter().print(str);
                            response.getWriter().flush();
                            response.getWriter().close();
                        } else {
                            String str = "{\"msg\":\"assessing\"}";
                            response.getWriter().print(str);
                            response.getWriter().flush();
                            response.getWriter().close();
                        }
                    } else {
                        String str = "{\"msg\":\"login_fail\"}";
                        response.getWriter().print(str);
                        response.getWriter().flush();
                        response.getWriter().close();
                    }
            }
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
            response.getWriter().print("{\"msg\":"+e+"}");
        }
    }

    public void LoginSession(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        String login = request.getParameter("login");
        String login_type = request.getParameter("login_type");
        String login_nickname = request.getParameter("nickname");
        String login_password = request.getParameter("password");
        // 创建session
        // 使用request对象的getSession()获取session，如果session不存在则创建一个
        HttpSession session = request.getSession();
        switch (login) {
            case "login":
                JSONObject user = new JSONObject();
                user.put("login_type", login_type);
                user.put("nickname", login_nickname);
                user.put("password", login_password);
                session.setAttribute("user", user.toString());
                response.getWriter().print(user.toString());
                //System.out.println(session.getAttribute("user"));
                break;
            case "refresh":
                // 判断session之前是否存在，或者说是否新建
                if (session.isNew()) {
                    session.invalidate();
                } else {
                    response.getWriter().print(session.getAttribute("user"));
                }
                break;
            case "delete":
                // 删除session
                session.invalidate();
                break;
        }
    }

    public void resetPassword(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String email = request.getParameter("email");

        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        try {
            String sql = "select person.email,company.email from person,company where person.email=? OR company.email=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, email);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                //邮箱匹配成功，向邮箱发邮件以重置密码
                sendMail(email, response);
            } else {
                String str = "{\"msg\":\"email_not_exist\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

    private static boolean sendMail(String to, HttpServletResponse response) {
        try {
            Properties props = new Properties();
            props.put("username", "m_YunfeiYang@163.com");
            props.put("password", "420222AA");
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.host", "smtp.163.com");
            props.put("mail.smtp.port", "25");

            Session mailSession = Session.getDefaultInstance(props);
            //生成随机激活码
            String base = "abcdefghijklmnopqrstuvwxyz0123456789";
            Random random = new Random();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < 6; i++) {
                int number = random.nextInt(base.length());
                sb.append(base.charAt(number));
            }
            Message msg = new MimeMessage(mailSession);
            msg.setFrom(new InternetAddress("m_YunFeiYang@163.com"));
            msg.addRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            msg.setSubject("重置密码邮件");
            msg.setContent("<h1>此邮件为官方重置密码邮件</h1>密码重置验证码:" + sb, "text/html;charset=UTF-8");

            msg.saveChanges();

            Transport transport = mailSession.getTransport("smtp");
            transport.connect(props.getProperty("mail.smtp.host"), props
                    .getProperty("username"), props.getProperty("password"));
            transport.sendMessage(msg, msg.getAllRecipients());
            transport.close();
            JSONObject mag = new JSONObject();
            mag.put("msg", sb.toString());
            response.getWriter().print(mag.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public void updatePassword(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        try {
            String sql1 = "UPDATE person SET password=? WHERE email=?";
            String sql2 = "UPDATE company SET password=? WHERE email=?";
            PreparedStatement ps1 = conn.prepareStatement(sql1);
            PreparedStatement ps2 = conn.prepareStatement(sql2);
            ps1.setString(1, password);
            ps1.setString(2, email);
            ps2.setString(1, password);
            ps2.setString(2, email);
            int rs1 = ps1.executeUpdate();
            int rs2 = ps2.executeUpdate();
            if (rs1 == 1 || rs2 == 1) {
                String str = "{\"msg\":\"updatePassword_success\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            } else {
                String str = "{\"msg\":\"updatePassword_fail\"}";
                response.getWriter().print(str);
                response.getWriter().flush();
                response.getWriter().close();
            }
            ps1.close();
            ps2.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

    public void getNews(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String user_login = request.getParameter("user_type");
        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        String sql;
        if (user_login.equals("service/person")) {
            sql = "SELECT company,href FROM (SELECT ROW_NUMBER() OVER(ORDER BY id ASC) AS ROWID,* FROM Hot_recruitment)AS TEMP WHERE ROWID<=30";
        } else {
            sql = "SELECT company,href FROM (SELECT ROW_NUMBER() OVER(ORDER BY id ASC) AS ROWID,* FROM Hot_recruitment)AS TEMP WHERE ROWID<=30";
        }
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            JSONArray companys = new JSONArray();
            JSONObject company = new JSONObject();
            while (rs.next()) {
                company.put("company", rs.getString(1));
                company.put("href", rs.getString(2));
                companys.add(company);
            }
            response.getWriter().print(companys.toString());
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

    public void query(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String content = request.getParameter("content");
        content = "%" + content + "%";
        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        String sql = "select top 20 company FROM Hot_recruitment WHERE company LIKE ?";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, content);
            ResultSet rs = ps.executeQuery();
            JSONArray companys = new JSONArray();
            JSONObject company = new JSONObject();
            while (rs.next()) {
                company.put("company", rs.getString(1));
                companys.add(company);
            }
            response.getWriter().print(companys.toString());
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

    public void Paging(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        int pageSize = Integer.parseInt(request.getParameter("pageSize"));
        int pageNum = Integer.parseInt(request.getParameter("pageNum"));
        //String position = request.getParameter("position");
        String address = request.getParameter("address");
        //position = "%" + position + "%";
        address = "%" + address + "%";
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<Company> companyList = new ArrayList<>();
        List<PageBean> pageBeanList = new ArrayList<>();
        String sql1 = "SELECT COUNT (company) FROM school_rercuit WHERE address LIKE ?";
        String sql = "SELECT company,position, address,time FROM (SELECT ROW_NUMBER() OVER(ORDER BY id ASC) AS ROWID,* FROM school_rercuit WHERE address LIKE ?)AS TEMP WHERE (ROWID>? AND ROWID<=?)";
        try {
            PreparedStatement ps1 = conn.prepareStatement(sql1);
            ps1.setString(1, address);
            ResultSet rs1 = ps1.executeQuery();
            int rowCount = 0;
            while (rs1.next()) {
                rowCount = rs1.getInt(1);
            }
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, address);
            ps.setString(2, (pageNum - 1) * pageSize + "");
            ps.setString(3, pageNum * pageSize + "");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Company company = new Company();
                company.setName(rs.getString(1));
                company.setPosition(rs.getString(2));
                company.setAddress(rs.getString(3));
                company.setTime(rs.getString(4));
                companyList.add(company);
            }
            PageBean pageBean = new PageBean(pageNum, pageSize, rowCount);
            pageBean.setPageNum(pageNum);
            pageBean.setPageSize(pageSize);
            pageBean.setList(companyList);
            pageBeanList.add(pageBean);
            response.getWriter().print(JSONArray.fromObject(pageBeanList).toString());
            rs1.close();
            rs.close();
            ps1.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

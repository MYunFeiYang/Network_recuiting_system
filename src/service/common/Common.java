package service.common;

import model.DBManager;
import model.common.Company;
import model.common.PageBean;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

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
    private static void sendMail(String to, HttpServletResponse response) {
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
        }
    }

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
            String sql = "{call emailCheck(?)}";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, email);
            ps.execute();
            ResultSet rs = ps.getResultSet();
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
                sql = "{call personLogin(?,?,?,?)}";
                break;
            case "enterprise":
                sql = "{call enterpriseLogin(?,?,?,?)}";
                break;
            case "admin":
                sql = "{call adminLogin(?,?,?)}";
                break;
        }
        try {
            CallableStatement ps;
            switch (login_type) {
                case "admin":
                    ps = conn.prepareCall(sql);
                    ps.setString(1, nickname);
                    ps.setString(2, password);
                    ps.registerOutParameter(3, Types.VARCHAR);
                    ps.execute();
                    if (ps.getString(3) != null) {
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
                    ps.registerOutParameter(4, Types.BIGINT);
                    ps.setString(1, nickname);
                    ps.setString(2, password);
                    ps.setString(3, dataString);
                    ps.execute();
                    if (ps.getInt(4) != 0) {
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
            }
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
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
            String sql = "{call passwordSelect(?)}";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, email);
            ps.execute();
            ResultSet rs = ps.getResultSet();
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
            String sql1 = "{call passwordUpdate(?,?)}";
            CallableStatement ps1 = conn.prepareCall(sql1);
            ps1.setString(1, password);
            ps1.setString(2, email);
            ps1.execute();
            String str = "{\"msg\":\"updatePassword_success\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
            ps1.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
            String str = "{\"msg\":\"updatePassword_fail\"}";
            response.getWriter().print(str);
            response.getWriter().flush();
            response.getWriter().close();
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
        String sql = "{call initNews(?)}";
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, user_login);
            ps.execute();
            ResultSet rs = ps.getResultSet();
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
        int bottom = (pageNum - 1) * pageSize;
        int top = pageNum * pageSize;
        //String position = request.getParameter("position");
        String address = request.getParameter("address");
        //position = "%" + position + "%";
        address = "%" + address + "%";
        DBManager dbManager = new DBManager();
        Connection conn = dbManager.getConnection();
        List<Company> companyList = new ArrayList<>();
        List<PageBean> pageBeanList = new ArrayList<>();
        try {
            String sql = "{call enterprisePaging(?,?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.registerOutParameter(1, Types.INTEGER);
            ps.setString(2, address);
            ps.setInt(3, bottom);
            ps.setInt(4, top);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                Company company = new Company();
                company.setName(rs.getString("company"));
                company.setPosition(rs.getString("position"));
                company.setAddress(rs.getString("address"));
                company.setTime(rs.getString("time"));
                companyList.add(company);
            }
            int rowCount = ps.getInt(1);
            PageBean pageBean = new PageBean(pageNum, pageSize, rowCount);
            pageBean.setPageNum(pageNum);
            pageBean.setPageSize(pageSize);
            pageBean.setList(companyList);
            pageBeanList.add(pageBean);
            response.getWriter().print(JSONArray.fromObject(pageBeanList).toString());
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void getEmail(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml; charset=UTF-8");
        //以下两句为取消在本地的缓存
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        String userType=request.getParameter("userType");
        DBManager conndb = new DBManager();
        Connection conn = conndb.getConnection();
        try {
            String sql = "{call emailGet(?,?,?)}";
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, nickname);
            ps.setString(2, password);
            ps.setString(3,userType);
            ps.execute();
            ResultSet rs=ps.getResultSet();
            if (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.element("email", rs.getString(1));
                response.getWriter().print(jsonObject.toString());
            }
            ps.close();
            conn.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }

    public void getHeadPicture(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException{
        String login_type = request.getParameter("login_type");
        String nickname = request.getParameter("nickname");
        String password = request.getParameter("password");
        DBManager dbManager=new DBManager();
        Connection conn=dbManager.getConnection();
        try {
            String sql="{call fileHeadPictureGet(?,?,?)}";
            CallableStatement cast=conn.prepareCall(sql);
            cast.setString(1,nickname);
            cast.setString(2,password);
            cast.setString(3,login_type);
            cast.execute();
            ResultSet rs=cast.getResultSet();
            JSONObject jsonObject=new JSONObject();
            if (rs.next()){
                jsonObject.element("email",rs.getString(1));
                jsonObject.element("fileType",rs.getString(2));
                jsonObject.element("fileName",rs.getString(3));
            }
            response.getWriter().print(jsonObject.toString());
        }catch (SQLException e){
            e.printStackTrace();
        }
    }

    public void getVideoSrc(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException{
        String src=request.getParameter("src");
        org.jsoup.Connection conn = Jsoup.connect(src).timeout(10000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Elements video=doc.getElementsByTag("video");
        System.out.println(doc);
    }
}

package service.common;

import model.DBManager;
import model.common.Address;
import model.common.Company;
import model.common.Job;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Query {
    public void init_filter_job(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DBManager DBManager = new DBManager();
        Connection conn = DBManager.getConnection();
        String sql = "SELECT href,text FROM filter_job";
        List<Job> list = new ArrayList<Job>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Job job = new Job();
                job.setHref(rs.getString(1));
                job.setText(rs.getString(2));
                list.add(job);
                list = JSONArray.fromObject(list);
            }
            response.getWriter().print(list.toString());
            response.getWriter().close();
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void init_filter_address(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DBManager DBManager = new DBManager();
        Connection conn = DBManager.getConnection();
        String sql = "SELECT href,text FROM filter_address";
        List<Address> list = new ArrayList<Address>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Address address = new Address();
                address.setHref(rs.getString(1));
                address.setText(rs.getString(2));
                list.add(address);
                list = JSONArray.fromObject(list);
            }
            response.getWriter().print(list.toString());
            response.getWriter().close();
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void init_filter_position(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DBManager DBManager = new DBManager();
        Connection conn = DBManager.getConnection();
        String job=request.getParameter("job_name");
        String sql = "SELECT position FROM filter_position WHERE job=?";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1,job);
            ResultSet rs = ps.executeQuery();
            JSONArray jsonArray=new JSONArray();
            JSONObject jsonObject=new JSONObject();
            while (rs.next()) {
                jsonObject.element("position",rs.getString(1));
                jsonArray.add(jsonObject);
            }
            response.getWriter().print(jsonArray.toString());
            response.getWriter().close();
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void queryCompany(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String job = request.getParameter("job");
        String address = request.getParameter("address");
        job = "%" + job + "%";
        address = "%" + address + "%";
        DBManager DBManager = new DBManager();
        Connection conn = DBManager.getConnection();
        String sql;
        PreparedStatement ps;
        //分页查询
        try {
            if (request.getParameter("address").equals("不限")) {
                sql = "SELECT company,position, address,time FROM (SELECT ROW_NUMBER() OVER(ORDER BY id ASC) AS ROWID,* FROM school_rercuit)AS TEMP WHERE ROWID<=12";
                ps = conn.prepareStatement(sql);
            } else {
                sql = "SELECT company, position, address, time FROM school_rercuit WHERE (address LIKE ?)";
                ps = conn.prepareStatement(sql);
                ps.setString(1, address);
            }
            ResultSet rs = ps.executeQuery();
            List<Company> list=new ArrayList<Company>();
            Company company=new Company();
            while (rs.next()) {
                company.setName(rs.getString(1));
                company.setPosition(rs.getString(2));
                company.setAddress(rs.getString(3));
                company.setTime(rs.getString(4));
                list.add(company);
                list=JSONArray.fromObject(list);
            }
            response.getWriter().print(list.toString());
            response.getWriter().close();
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

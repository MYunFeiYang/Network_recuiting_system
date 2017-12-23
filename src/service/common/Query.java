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
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Query {
    public void init_filter_industry(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DBManager DBManager = new DBManager();
        Connection conn = DBManager.getConnection();
        String sql = "{call initIndustry()}";
        List<Job> list = new ArrayList<>();
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                Job job = new Job();
                job.setHref(rs.getString(1));
                job.setText(rs.getString(2));
                list.add(job);
            }
            response.getWriter().print(JSONArray.fromObject(list).toString());
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
        String sql = "{call initAddres()}";
        List<Address> list = new ArrayList<>();
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            while (rs.next()) {
                Address address = new Address();
                address.setHref(rs.getString(1));
                address.setText(rs.getString(2));
                list.add(address);
            }
            response.getWriter().print(JSONArray.fromObject(list).toString());
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
        String job = request.getParameter("job_name");
        String sql = "{call initPosition(?)}";
        try {
            CallableStatement ps = conn.prepareCall(sql);
            ps.setString(1, job);
            ps.execute();
            ResultSet rs = ps.getResultSet();
            JSONArray jsonArray = new JSONArray();
            JSONObject jsonObject = new JSONObject();
            while (rs.next()) {
                jsonObject.element("position", rs.getString(1));
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
        //String job = request.getParameter("job");
        String address = request.getParameter("address");
        //job = "%" + job + "%";
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
            List<Company> list = new ArrayList<>();
            while (rs.next()) {
                Company company = new Company();
                company.setName(rs.getString(1));
                company.setPosition(rs.getString(2));
                company.setAddress(rs.getString(3));
                company.setTime(rs.getString(4));
                list.add(company);
            }
            response.getWriter().print(JSONArray.fromObject(list).toString());
            response.getWriter().close();
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

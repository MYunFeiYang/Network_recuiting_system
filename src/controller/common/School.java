package controller.common;

import model.common.Address;
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

public class School {
    public void init_filter_job(HttpServletRequest request, HttpServletResponse response) throws IOException{
        DBManager DBManager =new DBManager();
        Connection conn= DBManager.getConnection();
        String sql="SELECT href,text FROM filter_job";
        List<Job> list=new ArrayList<Job>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()){
                Job job=new Job();
                job.setHref(rs.getString(1));
                job.setText(rs.getString(2));
                list.add(job);
                list=JSONArray.fromObject(list);
            }
            response.getWriter().print(list.toString());
            response.getWriter().close();
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void init_filter_address(HttpServletRequest request, HttpServletResponse response) throws IOException{
        DBManager DBManager =new DBManager();
        Connection conn= DBManager.getConnection();
        String sql="SELECT href,text FROM filter_address";
        List<Address> list=new ArrayList<Address>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()){
                Address address=new Address();
                address.setHref(rs.getString(1));
                address.setText(rs.getString(2));
                list.add(address);
                list=JSONArray.fromObject(list);
            }
            response.getWriter().print(list.toString());
            response.getWriter().close();
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void init_filter_company(HttpServletRequest request, HttpServletResponse response) throws IOException{
        DBManager DBManager =new DBManager();
        Connection conn= DBManager.getConnection();
        String sql="SELECT company,position, address,time FROM (SELECT ROW_NUMBER() OVER(ORDER BY id ASC) AS ROWID,* FROM school_rercuit)AS TEMP WHERE ROWID<=12";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            JSONArray companys=new JSONArray();
            JSONObject company=new JSONObject();
            while (rs.next()){
                company.put("company",rs.getString(1));
                company.put("position",rs.getString(2));
                company.put("address",rs.getString(3));
                company.put("time",rs.getString(4));
                companys.add(company);
            }
            response.getWriter().print(companys.toString());
            response.getWriter().close();
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

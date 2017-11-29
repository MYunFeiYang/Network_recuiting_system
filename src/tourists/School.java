package tourists;

import DBO.ConnectionDB;
import bean.Address;
import bean.Job;
import net.sf.json.JSONArray;

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
        ConnectionDB connectionDB=new ConnectionDB();
        Connection conn=connectionDB.getConn();
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
        ConnectionDB connectionDB=new ConnectionDB();
        Connection conn=connectionDB.getConn();
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
        ConnectionDB connectionDB=new ConnectionDB();
        Connection conn=connectionDB.getConn();
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
}

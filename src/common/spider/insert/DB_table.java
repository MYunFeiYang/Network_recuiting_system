package common.spider.insert;

import DBO.ConnectionDB;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DB_table {
    public void school_rercuit(String company,String position,String address,String time) throws IOException {
        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        String sql="INSERT INTO school_rercuit (company,position,address,time) VALUES (?,?,?,?)";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, company);
            ps.setString(2, position);
            ps.setString(3, address);
            ps.setString(4, time);
            ResultSet rs=ps.executeQuery();
            if (rs.next()){
                System.out.println(rs);
            }
            ps.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }
    public void filter_job(String href,String text) throws IOException {
        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        String sql="INSERT INTO filter_job (href,text) VALUES (?,?)";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, href);
            ps.setString(2, text);
            boolean rs=ps.execute();
            if (rs){
                System.out.println(rs);
            }
            ps.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }
    public void filter_address(String href,String text) throws IOException {
        ConnectionDB conndb=new ConnectionDB();
        Connection conn=conndb.getConn();
        String sql="INSERT INTO filter_address (href,text) VALUES (?,?)";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, href);
            ps.setString(2, text);
            boolean rs=ps.execute();
            if (rs){
                System.out.println(rs);
            }
            ps.close();
        } catch (SQLException e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }
    }
}

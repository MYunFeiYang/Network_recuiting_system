package service.common.webchat;

import model.DBManager;
import net.sf.json.JSONArray;

import javax.websocket.Session;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OnlineChatter {
    public void addUser(String nickname, Session session){
        DBManager dbManager=new DBManager();
        Connection conn=dbManager.getConnection();
        try {
            String sql="{call onlineChatterAdd(?,?)}";
            CallableStatement cast=conn.prepareCall(sql);
            cast.setString(1,session.toString());
            cast.setString(2,nickname);
            cast.execute();
            cast.close();
            conn.close();
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
    public String selectUser(){
        DBManager dbManager=new DBManager();
        Connection conn =dbManager.getConnection();
        List<model.common.OnlineChatter> onlineChatterList=new ArrayList<>();
        try {
            String sql="{call onlineChatterSelect()}";
            CallableStatement cast=conn.prepareCall(sql);
            cast.execute();
            ResultSet rs=cast.getResultSet();
            while (rs.next()){
                model.common.OnlineChatter onlineChatter=new model.common.OnlineChatter();
                onlineChatter.setSession(rs.getString(1));
                onlineChatter.setNickname(rs.getString(2));
                onlineChatterList.add(onlineChatter);
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        return JSONArray.fromObject(onlineChatterList).toString();
    }
    public void deleteUser(Session session){
        DBManager dbManager=new DBManager();
        Connection conn=dbManager.getConnection();
        try {
            String sql="{call onlineChatterDelete(?)}";
            CallableStatement cast=conn.prepareCall(sql);
            cast.setString(1,session.toString());
            cast.execute();
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
}

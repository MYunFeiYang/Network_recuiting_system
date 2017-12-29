package service.common.webchat;

import model.DBManager;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ChatRecord {
    public void setRecord(String message){
        JSONObject jsonObject=JSONObject.fromObject(message);
        String nickname=jsonObject.getString("nickname");
        String record=jsonObject.getString("message");
        DBManager dbManager=new DBManager();
        Connection conn=dbManager.getConnection();
        String sql="{call recordSet(?,?)}";
        try {
            CallableStatement cast=conn.prepareCall(sql);
            cast.setString(1,nickname);
            cast.setString(2,record);
            cast.execute();
            cast.close();
            conn.close();
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
    public String getRecord(String message){
        JSONObject jsonObject=JSONObject.fromObject(message);
        int record=jsonObject.getInt("record");
        int top=20*record;
        int bottom=20*(record-1);
        DBManager dbManager=new DBManager();
        Connection conn=dbManager.getConnection();
        List<model.common.ChatRecord> chatRecordList=new ArrayList<>();
        try {
            String sql="{call recordGet(?,?)}";
            CallableStatement cast=conn.prepareCall(sql);
            cast.setInt(1,bottom);
            cast.setInt(2,top);
            cast.execute();
            ResultSet rs=cast.getResultSet();
            while (rs.next()){
                model.common.ChatRecord chatRecord=new model.common.ChatRecord();
                chatRecord.setNickname(rs.getString(1));
                chatRecord.setRecord(rs.getString(2));
                chatRecordList.add(chatRecord);
            }
            cast.close();
            conn.close();
        }catch (SQLException e){
            e.printStackTrace();
        }
        return JSONArray.fromObject(chatRecordList).toString();
    }
}

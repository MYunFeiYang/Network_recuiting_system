package connectionDB;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class connectionDB  {
	public Connection connDB() throws IOException {
		Connection conn = null;
	try {  
        // �������ݿ�������ע�ᵽ����������  
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");  
        // ���ݿ������ַ���  
        String url = "jdbc:sqlserver://localhost:1433;databaseName=Network-recuiting-system";  
        // ���ݿ��û���  
        String username = "sa";  
        // ���ݿ�����  
        String password = "420222aa";  
        // ����Connection����  
        conn = DriverManager.getConnection(url, username, password);  
	}catch (SQLException | ClassNotFoundException e) {  
        e.printStackTrace();  
    }
	return conn;  
	}
}

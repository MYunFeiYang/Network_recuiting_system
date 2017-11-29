package DBO;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionDB {
    Connection conn = null;
    public Connection getConn() throws IOException {
        try {
            // 加载数据库驱动，注册到驱动管理器
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            // 数据库连接字符串
            String url = "jdbc:sqlserver://localhost:1433;databaseName=Network-recuiting-system";
            // 数据库用户名
            String username = "sa";
            // 数据库密码
            String password = "420222aa";
            // 创建Connection连接
            conn = DriverManager.getConnection(url, username, password);
        }catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return conn;
    }
}

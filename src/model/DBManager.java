package model;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import java.sql.Connection;
import java.sql.SQLException;

public class DBManager {
    private static DataSource datasource;
    Connection conn = null;
    public Connection getConnection() {
        setupJdbcPool();
        try {
            conn = datasource.getConnection();
        } catch (SQLException e) { }
        return conn;
    }
    private static void  setupJdbcPool() {
        PoolProperties p = new PoolProperties();
        p.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        p.setUrl("jdbc:sqlserver://localhost:1433;databaseName=Network-recuiting-system");
        p.setUsername("sa");
        p.setPassword("420222aa");
        p.setMaxActive(20);
        p.setInitialSize(5);
        p.setMaxWait(30000);
        p.setMaxIdle(10);
        p.setMinIdle(2);
        p.setDefaultAutoCommit(true);
        datasource = new DataSource();
        datasource.setPoolProperties(p);
    }

}

package model;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;

import java.sql.Connection;
import java.sql.SQLException;

public class DBManager {
    private static DataSource datasource;
    private Connection conn = null;

    private static void setupJdbcPool() {
        PoolProperties p = new PoolProperties();
        p.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        p.setUrl("jdbc:sqlserver://m");
        p.setUsername("sa");
        p.setPassword("420222aaAA");
        p.setMaxActive(20);
        p.setInitialSize(5);
        p.setMaxWait(10000);
        p.setMaxIdle(10);
        p.setMinIdle(2);
        p.setDefaultAutoCommit(true);
        datasource = new DataSource();
        datasource.setPoolProperties(p);
    }

    public Connection getConnection() {
        setupJdbcPool();
        try {
            conn = datasource.getConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

}

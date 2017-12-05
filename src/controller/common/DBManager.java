package controller.common;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import java.sql.Connection;
import java.sql.SQLException;

public class DBManager {
    private static DataSource datasource;

    public Connection getConnection() {
        setupJdbcPool();
        Connection conn = null;
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
        p.setMaxActive(100);
        p.setInitialSize(10);
        p.setMaxWait(10000);
        p.setMaxIdle(50);
        p.setMinIdle(10);
        p.setDefaultAutoCommit(false);
        datasource = new DataSource();
        datasource.setPoolProperties(p);

    }

}

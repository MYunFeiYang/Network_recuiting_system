package service.common;

import model.DBManager;
import net.sf.json.JSONObject;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class FileLoad {
    public void FileUpload(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email=request.getParameter("email");
        String fileType=request.getParameter("fileType");
        //得到上传文件的保存目录，将上传的文件存放于WEB-INF目录下，不允许外界直接访问，保证上传文件的安全
        String selfPath="/resource/files"+"/"+email+"/"+fileType;
        String savePath =request.getServletContext().getRealPath(selfPath);
        File file = new File(savePath);
        //判断上传文件的保存目录是否存在
        if (!file.exists() && !file.isDirectory()) {
            //创建目录
            file.mkdirs();
        }
        //消息提示
        JSONObject message=new JSONObject();
        try {
            //使用Apache文件上传组件处理文件上传步骤：
            //1、创建一个DiskFileItemFactory工厂
            DiskFileItemFactory factory = new DiskFileItemFactory();
            //2、创建一个文件上传解析器
            ServletFileUpload upload = new ServletFileUpload(factory);
            //解决上传文件名的中文乱码
            upload.setHeaderEncoding("UTF-8");
            //4、使用ServletFileUpload解析器解析上传数据，解析结果返回的是一个List<FileItem>集合，
            //每一个FileItem对应一个Form表单的输入项
            //@SuppressWarnings("unchecked")
            List<FileItem> list = upload.parseRequest(request);
            for (FileItem item : list) {
                //如果fileitem中封装的是普通输入项的数据
                if (item.isFormField()) {
                    String name = item.getFieldName();
                    //解决普通输入项的数据的中文乱码问题
                    String value = item.getString("UTF-8");
                    //value = new String(value.getBytes("iso8859-1"),"UTF-8");
                    System.out.println(name + "=" + value);
                } else {
                    //如果fileitem中封装的是上传文件
                    //得到上传的文件名称，
                    String filename = item.getName();
                    if (filename == null || filename.trim().equals("")) {
                        continue;
                    }
                    //注意：不同的浏览器提交的文件名是不一样的，有些浏览器提交上来的文件名是带有路径的，
                    //如：  c:\a\b\1.txt，而有些只是单纯的文件名，如：1.txt
                    //处理获取到的上传文件的文件名的路径部分，只保留文件名部分
                    filename = filename.substring(filename.lastIndexOf("\\") + 1);
                    //如果是头像就重命名
                    if (fileType.equals("head_picture")){
                        filename = filename.substring(filename.lastIndexOf(".") + 1);
                        filename=fileType+"."+filename;
                    }
                    //上传文件信息存到数据库
                    service.common.FileLoad fileload=new service.common.FileLoad();
                    fileload.addFile(email,fileType,filename);
                    //获取item中的上传文件的输入流
                    InputStream in = item.getInputStream();
                    //创建一个文件输出流
                    FileOutputStream out = new FileOutputStream(savePath + "\\" + filename);
                    //创建一个缓冲区
                    byte buffer[] = new byte[1024];
                    //判断输入流中的数据是否已经读完的标识
                    int len = 0;
                    //循环将输入流读入到缓冲区当中，(len=in.read(buffer))>0就表示in里面还有数据
                    while ((len = in.read(buffer)) > 0) {
                        //使用FileOutputStream输出流将缓冲区的数据写入到指定的目录
                        //(savePath + "\\" + filename)当中
                        out.write(buffer, 0, len);
                    }
                    //关闭输入流
                    in.close();
                    //关闭输出流
                    out.close();
                    //删除处理文件上传时生成的临时文件
                    item.delete();
                    message.element("message","success");
                }
            }
        } catch (Exception e) {
            message.element("message","fail");
            e.printStackTrace();
        }
        response.getWriter().print(message);
    }
    public void FileDownload(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String dataDirectory = request.
                getServletContext().getRealPath("/WEB-INF/files");
        String filename = "火烧人.fla";
        File file = new File(dataDirectory, filename);
        if (file.exists()) {
            response.setContentType("application/fla");
            response.addHeader("Content-Disposition",
                    "attachment; filename=\"" + filename + "\"");
            byte[] buffer = new byte[1024];
            FileInputStream fis = null;
            BufferedInputStream bis = null;

            try {
                fis = new FileInputStream(file);
                bis = new BufferedInputStream(fis);
                OutputStream os = response.getOutputStream();
                int i = bis.read(buffer);
                while (i != -1) {
                    os.write(buffer, 0, i);
                    i = bis.read(buffer);
                }
            } catch (IOException ex) {
                System.out.println(ex.toString());
            } finally {
                if (bis != null) {
                    bis.close();
                }
                if (fis != null) {
                    fis.close();
                }
            }
        }
    }
    private void addFile(String email,String fileType,String fileName){
        DBManager dbManager=new DBManager();
        Connection conn=dbManager.getConnection();
        try {
            String sql="{call fileloadAdd(?,?,?)}";
            CallableStatement cast=conn.prepareCall(sql);
            cast.setString(1,email);
            cast.setString(2,fileType);
            cast.setString(3,fileName);
            cast.execute();
            cast.close();
            cast.close();
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
}

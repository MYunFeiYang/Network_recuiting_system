package file;

import java.io.File;  
import java.io.*;  
import java.io.IOException;  
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;  
  
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
  
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;  
import org.apache.commons.fileupload.disk.DiskFileItemFactory;  
import org.apache.commons.fileupload.servlet.ServletFileUpload;


@WebServlet("/file_upload.do")
public class Fileupload extends HttpServlet {
		private static final long serialVersionUID = -7888819885984202778L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		try {
			List<?> items = upload.parseRequest(request);
			Iterator<?> iter = items.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				File fileName = new File(item.getName());
				File uploadedFile = new File(
						getServletContext().getRealPath("/uploadfiles") + "/" + fileName.getName());// 传送到服务器uploadfiles文件夾
				item.write(uploadedFile);
				System.out.println("文件上传成功");
				request.getRequestDispatcher("/login_success_person.html").forward(request, response);
			}
		} catch (FileUploadException e1) {
			e1.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	}	 
	



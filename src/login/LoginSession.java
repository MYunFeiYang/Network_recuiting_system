package login;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
@WebServlet("/login_session")
public class LoginSession extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF=8");
		response.setContentType("text/html;charset=UTF-8");
		String login = request.getParameter("login");
		if (login.equals("login")) {
			// ����session
			// ʹ��request�����getSession()��ȡsession�����session�������򴴽�һ��
			HttpSession session = request.getSession();
			response.getWriter().print("{\"msg\":\"session�����ɹ�\"}");
		} else if (login.equals("refresh")) {
			// �ж�session֮ǰ�Ƿ���ڣ�����˵�Ƿ��½�
			HttpSession session = request.getSession();
			if (session.isNew()) {
				response.getWriter().print("{\"msg\":\"session֮ǰ������\"}");
				session.invalidate();
			} else {
				response.getWriter().print("{\"msg\":\"session֮ǰ����\"}");
			}
		} else {
			// ɾ��session
			HttpSession session = request.getSession();
			session.invalidate();
			response.getWriter().print("{\"msg\":\"sessionɾ��\"}");
		}

	}
}
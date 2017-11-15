package login;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;
@WebServlet("/login_session")
public class LoginSession extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF=8");
		response.setContentType("text/html;charset=UTF-8");
		String login = request.getParameter("login");
		String login_type=request.getParameter("login_type");
		if (login.equals("login")) {
			// ����session
			// ʹ��request�����getSession()��ȡsession�����session�������򴴽�һ��
			HttpSession session = request.getSession();
			JSONObject user = new JSONObject();
			user.put("msg", "session�����ɹ�");
			user.put("login_type", login_type);
			response.getWriter().print(user.toString());
		} else if (login.equals("refresh")) {
			// �ж�session֮ǰ�Ƿ���ڣ�����˵�Ƿ��½�
			HttpSession session = request.getSession();
			if (session.isNew()) {
				response.getWriter().print("{\"msg\":\"session֮ǰ������\"}");
				session.invalidate();
			} else {
				JSONObject user = new JSONObject();
				user.put("msg", "session֮ǰ����");
				user.put("login_type", login_type);
				response.getWriter().print(user.toString());
			}
		} else {
			// ɾ��session
			HttpSession session = request.getSession();
			session.invalidate();
			response.getWriter().print("{\"msg\":\"sessionɾ��\"}");
		}

	}
}
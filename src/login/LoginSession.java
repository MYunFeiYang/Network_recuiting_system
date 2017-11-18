package login;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;
@WebServlet("/login_session.do")
public class LoginSession extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		String login = request.getParameter("login");
		String login_type=request.getParameter("login_type");
		String login_nickname=request.getParameter("nickname");
		String login_password=request.getParameter("password");
		if (login.equals("login")) {
			// 创建session
			// 使用request对象的getSession()获取session，如果session不存在则创建一个
			HttpSession session = request.getSession();
			JSONObject user = new JSONObject();
			user.put("login_type", login_type);
			user.put("nickname",login_nickname);
			user.put("password",login_password);
			session.setAttribute("user",user);
			response.getWriter().print(user.toString());
		} else if (login.equals("refresh")) {
			// 判断session之前是否存在，或者说是否新建
			HttpSession session = request.getSession();
			if (session.isNew()) {
				session.invalidate();
			} else {
				response.getWriter().print(session.getAttribute("user"));
			}
		} else {
			// 删除session
			HttpSession session = request.getSession();
			session.invalidate();
		}

	}
}
package register.person;

public class User {
	// 用户昵称  
    private int job_nickname;  
    // 密码 
    private String job_password;  
    // 真实姓名  
    private double job_name;  
    // 电话  
    private int job_telephone;  
    // 邮箱  
    private String job_email;
	public int getJob_nickname() {
		return job_nickname;
	}
	public void setJob_nickname(int job_nickname) {
		this.job_nickname = job_nickname;
	}
	public String getJob_password() {
		return job_password;
	}
	public void setJob_password(String job_password) {
		this.job_password = job_password;
	}
	public double getJob_name() {
		return job_name;
	}
	public void setJob_name(double job_name) {
		this.job_name = job_name;
	}
	public int getJob_telephone() {
		return job_telephone;
	}
	public void setJob_telephone(int job_telephone) {
		this.job_telephone = job_telephone;
	}
	public String getJob_email() {
		return job_email;
	}
	public void setJob_email(String job_email) {
		this.job_email = job_email;
	} 
}

import React from "react";
import axios from "axios";
import qs from "qs";
import { Button, notification } from "antd";
const path = "http://localhost:80";


export function messageNotification(meassge, description) {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    meassge,
    description,
    btn,
    key
  });
}

export function isLogin(data, user) {
  user.login = data;
  axios({
    method: "post",
    url: `${path}/public?public=loginSession`,
    data: qs.stringify(user),
    withCredentials: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(response => {})
    .catch(function(error) {
      console.log(error);
    });
}
export function checkEmail(value, register) {
  axios({
    method: "post",
    url: `${path}/public?public=checkemail`,
    data: qs.stringify({ email: value }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  })
    .then(response => {
      if (response.data.msg === "email_exist") {
        messageNotification(
          "邮件提醒",
          "该邮件已经注册，请检查是否输入错误或直接登录"
        );
      } else {
        register();
      }
    })
    .catch(error => {
      console.log(error);
    });
}

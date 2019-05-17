import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { Button, notification } from "antd";
const path = "http://localhost:80";

function loginRemind() {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        确认
      </Button>
    );
    notification.open({
      message: "登录提醒",
      description: "请先登录",
      btn,
      key
    });
  }
export function loginGuart(isLogin) {
  if (!isLogin) {
    loginRemind();
    return <Redirect to="/login" />;
  }
}
const emailAleadyExist = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "邮件错误",
    description: "该邮件已经注册，请检查是否输入错误或直接登录",
    btn,
    key
  });
};
export function addResumeSuccess() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "简历",
    description: "简历已添加成功",
    btn,
    key
  });
}
export function addJobSuccess() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "岗位",
    description: "岗位已添加成功",
    btn,
    key
  });
}
export function deleteJobSuccess() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "岗位",
    description: "岗位已删除成功",
    btn,
    key
  });
}
export function modifyResumeSuccess() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "简历",
    description: "简历已修改成功",
    btn,
    key
  });
}
export function modifyJobSuccess() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "岗位",
    description: "岗位已修改成功",
    btn,
    key
  });
}
export function deleteResumeSuccess() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "简历",
    description: "简历已删除成功",
    btn,
    key
  });
}
export function addResumeFail() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "简历",
    description: "请不要添加重复简历",
    btn,
    key
  });
}
export function addJobFail() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "岗位",
    description: "请不要添加重复岗位",
    btn,
    key
  });
}
export function ModifyUserSuccess() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "信息修改",
    description: "用户信息已修改成功",
    btn,
    key
  });
}
export function nicknameAndPasswordAleadyExist() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "注册错误",
    description: "用户名和密码已经存在，请重新输入",
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
        emailAleadyExist();
      } else {
        register();
      }
    })
    .catch(error => {
      console.log(error);
    });
}
export function assessPass() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "注册审核",
    description: "注册审核痛过",
    btn,
    key
  });
}
export function deleteAccount() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      确认
    </Button>
  );
  notification.open({
    message: "注销账号",
    description: "注销账号成功",
    btn,
    key
  });
}

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="baidu-site-verification" content="9fafb17b50ec81fa1c31c782370dd7be"/>
    <title>问道网</title>
    <link rel="shortcut icon" href="image/brand.png">
    <!--stylesheet-->
    <link type="text/css" rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.css">
    <link type="text/css" rel="stylesheet" href="stylesheet/main.css">
    <link type="text/css" rel="stylesheet" href="stylesheet/confirm_info_box.css">
    <!--javascript-->
    <script src="javascript/jquery-3.2.1.js"></script>
    <script src="bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <script src="javascript/jquery.form.js"></script>
    <script src="javascript/util/cookie_and_session.js"></script>
    <script src="javascript/util/check_input.js"></script>
    <script src="javascript/util/key_event.js"></script>
    <script src="javascript/common/common.js"></script>
    <script src="javascript/common/quick_query.js"></script>
    <script src="javascript/enterprise/enterprise.js"></script>
    <script src="javascript/enterprise/address_industry_position.js"></script>
    <script src="javascript/util/preview_picture.js"></script>
    <script src="javascript/util/night.js"></script>
</head>
<body id="top">
<div class="container-fluid">
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                    <img class="img-circle" alt="Brand" src="image/brand.png">
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="index.jsp">首页</a></li>
                    <li class="dropdown" id="recurit">
                        <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">招聘<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="public.html" onclick="close_nav();return change_iframe_src(this)">校招</a></li>
                            <li role="separator" class="divider"></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <img style="width:40px;height: 40px;border-radius:20px;margin: 5px" class="hidden" src=""
                         id="head_picture">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" id="login_btu" data-toggle="dropdown" role="button"
                           aria-haspopup="true" aria-expanded="false">
                            登录<span class="caret"></span></a>
                        <ul class="dropdown-menu" id="user_center">
                            <li>
                                <!-- Button trigger modal -->
                                <a data-toggle="modal" data-target="#login" onclick="close_nav()">
                                    登录
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown" id="register_btu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-haspopup="true"
                           onclick="get_industry('enterprise_industry');get_address('enterprise_address')"
                           aria-expanded="false">注册<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <!-- Button trigger modal -->
                                <a data-toggle="modal" data-target="#register-person" onclick="close_nav()">
                                    个人注册
                                </a>
                            </li>
                            <li role="separator" class="divider"></li>
                            <li>
                                <a data-toggle="modal" data-target="#register-enterprise" onclick="close_nav()">
                                    企业注册
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a data-toggle="modal" data-target="#search" onclick="close_nav()">
                            <span class="glyphicon glyphicon-search"></span>
                        </a>
                    </li>
                    <li>
                        <a data-toggle="modal" data-target="#setting" onclick="close_nav()">
                            <span class="glyphicon glyphicon-cog"></span>
                        </a>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <!-- Modal start -->
    <div class="modal fade" id="search" tabindex="-1" role="dialog" aria-labelledby="searchLabel">
        <div class="modal-dialog" role="document" style="min-width: 420px;max-height: 480px">
            <div class="modal-content">
                <div class="modal-body" style="height:320px;">
                    <div class="input-group">
                        <input type="text" class="form-control" title="搜索" id="search-con" onkeyup="complete_content()"
                               aria-describedby="basic-addon2">
                        <span class="input-group-addon glyphicon glyphicon-search" id="basic-addon2"
                              onclick="query()"></span>
                    </div>
                    <div id="preselected_search"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="setting" tabindex="-1" role="dialog" aria-labelledby="settingLabel">
        <div class="modal-dialog" role="document" style="min-width: 420px;max-height: 480px">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="settingLabel">设置中心</h4>
                </div>
                <div class="modal-body" style="height:320px;">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="btn-group-vertical" role="group">
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                        夜间模式
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a onclick="open_night()">开启</a></li>
                                        <li><a onclick="close_night()">关闭</a></li>
                                        <li><a onclick="bigger()">变亮</a></li>
                                        <li><a onclick="smaller()">变暗</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-9">

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="mylogin"
         onkeyup="key_down_event('login')">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="mylogin">登录</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="confirm_login_box"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon glyphicon glyphicon-user">用户类型</span>
                                <select id="login_type" class="form-control" title="用户类型">
                                    <option value="admin">管理员</option>
                                    <option value="person">个人用户</option>
                                    <option value="enterprise">企业用户</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon glyphicon glyphicon-user">用户昵称</span>
                                <input type="text" id="login_nickname" class="form-control" placeholder="用户名">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon glyphicon glyphicon-lock">密&nbsp;&nbsp;码</span>
                                <input type="password" id="login_password" class="form-control"
                                       placeholder="密码">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <input type="radio" checked="checked" id="remember_user" placeholder="记住密码">选中我记住登录状态
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-sm-12 padding_top">
                            <a href="resetPassword.html" target="_top" class="btn btn-primary"
                               onclick="close_login();return change_iframe_src(this)">找回密码</a>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="close_login">关闭
                    </button>
                    <button type="button" class="btn btn-primary"
                            onclick="login();reset_user()">登录
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="register-person" tabindex="-1" role="dialog" aria-labelledby="myregister-person"
         onkeyup="direction_key_event('register-person')">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myregister-person">个人注册</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <div id="confirm_person_box"></div>
                            </div>
                        </div>
                        <div onmouseover="btu_able('person_reg_btu','confirm_person_box')">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-user">用户昵称</button>
                    </span>
                                        <input type="text" class="form-control" id="person_nickname" placeholder="用户名"
                                               onkeyup="reg_username('person_nickname','btu_person_username')">
                                        <span class="input-group-btn">
                        <button type="button" class="btn btn-default " id="btu_person_username">填</button>
                    </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-lock">密&nbsp;&nbsp;码</button>
                    </span>
                                        <input type="password" class="form-control" id="person_password"
                                               placeholder="密码"
                                               onkeyup="reg_pwd('person_password','btu_person_password')">
                                        <span class="input-group-btn">
                        <button type="button" class="btn btn-default " id="btu_person_password">完</button>
                    </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-lock">确认密码</button>
                    </span>
                                        <input type="password" class="form-control" id="person_confirm_password"
                                               placeholder="确认密码"
                                               onkeyup="conf_pwd('person_password','person_confirm_password','btu_person_conf_password')">
                                        <span class="input-group-btn">
                        <button type="button" class="btn btn-default" id="btu_person_conf_password">整</button>
                    </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="person_name_group">
                                <div class="col-md-12">
                                    <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-user">真实姓名</button>
                    </span>
                                        <input type="text" class="form-control" id="person_name" placeholder="真实姓名">
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="person_email_group">
                                <div class="col-md-12">
                                    <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-erase">电子邮件</button>
                    </span>
                                        <input type="email" class="form-control" placeholder="电子邮件"
                                               onkeyup="reg_email('person_email','btu_person_email')"
                                               id="person_email">
                                        <span class="input-group-btn">
                        <button type="button" class="btn btn-default " id="btu_person_email">@</button>
                    </span>
                                        <span class="input-group-btn">
                        <button type="button" class="btn btn-default"
                                onclick="check_email('person_email','btu_person_email')">验证</button>
                    </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-envelope">手机号码</button>
                    </span>
                                        <input type="text" class="form-control" id="person_telephone" placeholder="手机号码"
                                               onkeyup="reg_telephone('person_telephone','btu_person_telephone')">
                                        <span class="input-group-btn">
                        <button type="button" class="btn btn-default " id="btu_person_telephone">哦</button>
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 padding_top">
                                <input class="btn btn-sm btn-primary center-block" id="person_reg_btu"
                                       type="button" value="注册"
                                       onmouseover="btu_disable_person('person_reg_btu','confirm_person_box')"
                                       onclick="register_person();remember_user('person_nickname','person_password')">
                            </div>
                            <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 padding_top">
                                <input class="btn btn-sm btn-danger center-block" type="reset" value="重置">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="register-enterprise" tabindex="-1" role="dialog"
         aria-labelledby="myregister-enterprise"
         onkeyup="direction_key_event('register-enterprise')">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myregister-enterprise">企业用户注册</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="confirm_enterprise_box"></div>
                        </div>
                    </div>
                    <div onmouseover="btu_able('reg_btu','confirm_enterprise_box')">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-user">&nbsp;用户名</button>
                    </span>
                                    <input type="text" class="form-control" id="enterprise_nickname" placeholder="用户名"
                                           onkeyup="reg_username('enterprise_nickname','btu_enterprise_username')">
                                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default" id="btu_enterprise_username">填</button>
                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-lock">密&nbsp;&nbsp;码</button>
                    </span>
                                    <input type="password" class="form-control" placeholder="密码"
                                           onkeyup="reg_pwd('enterprise_password','btu_enterprise_password')"
                                           id="enterprise_password">
                                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default" id="btu_enterprise_password">完</button>
                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-lock">确认密码</button>
                    </span>
                                    <input type="password" class="form-control" id="confirm_enterprise_password"
                                           placeholder="确认密码"
                                           onkeyup="conf_pwd('enterprise_password','confirm_enterprise_password','btu_enterprise_conf_password')">
                                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default" id="btu_enterprise_conf_password">整</button>
                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-user">企业名称</button>
                    </span>
                                    <input type="text" class="form-control" id="enterprise_name" placeholder="企业名称">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-user">所属行业</button>
                    </span>
                                    <select class="form-control" id="enterprise_industry" title="所属行业">

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="enterprise_telephone_group">
                            <div class="col-md-12">
                                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-erase">电子邮箱</button>
                    </span>
                                    <input type="email" class="form-control" placeholder="电子邮箱"
                                           onkeyup="reg_email('enterprise_email','btu_enterprise_email')"
                                           id="enterprise_email">
                                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default " id="btu_enterprise_email">@</button>
                    </span>
                                    <span class="input-group-btn">
                        <button type="button"
                                onclick="check_email('enterprise_email','btu_enterprise_email')"
                                class="btn btn-default">验证</button>
                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-envelope">手机电话</button>
                    </span>
                                    <input type="text" class="form-control" placeholder="手机电话"
                                           onkeyup="reg_telephone('enterprise_telephone','btu_enterprise_telephone')"
                                           id="enterprise_telephone">
                                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default" id="btu_enterprise_telephone">哦</button>
                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default glyphicon glyphicon-modal-window">企业地址</button>
                    </span>
                                    <select class="form-control" id="enterprise_address" title="企业地址">

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 padding_top">
                            <input class="btn btn-sm btn-primary center-block" type="button"
                                   id="reg_btu" value="注册"
                                   onmouseover="btu_disable_enterprise('reg_btu','confirm_enterprise_box')"
                                   onclick="register_enterprise();remember_user('enterprise_nickname','enterprise_password')">
                        </div>
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 padding_top">
                            <input type="reset" class="btn btn-sm btn-danger center-block"
                                   value="重置">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="head_sculpture" tabindex="-1" role="dialog" aria-labelledby="myhead_sculpture">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myupload">修改头像</h4>
                </div>
                <div class="modal-body">
                    <form enctype="multipart/form-data" method="post" id="picture_load" action="/fileLoad/upload"
                          onsubmit="return sub()">
                        <input id="f" class="form-control" type="file" name="f"
                               onchange="fileType='head_picture';change()"/>
                        <p>预览:</p>
                        <p>
                        <div id="warning"></div>
                        <img id="preview" alt="" name="pic" style="height: 200px"/>
                        </p>
                        <input type="submit" class="form-control" id="UploadButton" value="上传头像" disabled>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <!--end Modal-->
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
            <div class="item active">
                <img class="img-responsive center-block" src="image/3.jpg" alt="...">
                <div class="carousel-caption">
                </div>
            </div>
            <div class="item">
                <img class="img-responsive center-block" src="image/2.jpg" alt="...">
                <div class="carousel-caption">
                </div>
            </div>
            <div class="item">
                <img class="img-responsive center-block" src="image/1.jpg" alt="...">
                <div class="carousel-caption">
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <iframe frameborder="0" marginheight="0" src=""></iframe>
        </div>
    </div>
    <div id="toTop">
        <a href="#top"></a>
    </div>
    <footer>
        <div class="row">
            <div class="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                <address>
                    Written by <a target="_blank"
                                  href="https://github.com/MYunFeiYang/Network_recuiting_system">think道</a><br>
                    Visit me at:<br>
                    <a target="_blank"
                       href="https://github.com/MYunFeiYang/Network_recuiting_system">MYunFeiYang</a><br>
                </address>
            </div>
            <div class="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                <address>
                    网站运营：<br>
                    <a target="_blank" href="http://tool.chinaz.com/">站长工具</a><br>
                    <a target="_blank" href="http://union.baidu.com/">百度联盟</a><br>
                </address>
            </div>
            <div class="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                <address>
                    项目部署：<br>
                    <a target="_blank" href="https://www.aliyun.com/">阿里云计算</a><br>
                    <a target="_blank" href="http://www.miitbeian.gov.cn/">鄂ICP备17029283号</a><br>
                </address>
            </div>
            <div class="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                <address>
                    友情链接：<br>
                    <a target="_blank" href="http://v3.bootcss.com/">bootstrap中文网</a><br>
                    <a target="_blank" href="http://glyphicons.com/">Halflings字体图标</a><br>
                </address>
            </div>
        </div>
    </footer>
</div>
<script>
    window.onload = function () {
        show_user('login_nickname', 'login_password');
        login_session('refresh');
    };

    function close_nav() {
        document.getElementById("bs-example-navbar-collapse-1").classList.remove("in");
    }

    window._bd_share_config = {
        "common": {
            "bdSnsKey": {},
            "bdText": "",
            "bdMini": "2",
            "bdPic": "",
            "bdStyle": "0",
            "bdSize": "16"
        },
        "slide": [{
            "bdImg": 8,
            "bdPos": "right",
            "bdTop": 100
        }],
        "share": {},
        "image": {"viewList": ["qzone", "tsina", "tqq", "renren", "weixin"], "viewText": "分享到：", "viewSize": "16"},
        "selectShare": {"bdContainerClass": null, "bdSelectMiniList": ["qzone", "tsina", "tqq", "renren", "weixin"]}
    };
    with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
</script>
</body>
</html>
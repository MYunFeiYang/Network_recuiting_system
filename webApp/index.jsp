<%@ page language="java" pageEncoding="utf-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
    <base href="<%=basePath%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="baidu-site-verification" content="9fafb17b50ec81fa1c31c782370dd7be"/>
    <title>问道网</title>
    <!--stylesheet-->
    <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css">
    <link type="text/css" rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.css">
    <link type="text/css" rel="stylesheet" href="stylesheet/main.css">
    <link type="text/css" rel="stylesheet" href="stylesheet/confirm_info_box.css">
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/animate.css@3.5.2/animate.min.css">
    <!--javascript-->
    <script src="javascript/jquery-3.2.1.js"></script>
    <script src="bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <script src="javascript/jquery.form.js"></script>
    <script src="javascript/common/common.js"></script>
    <script src="javascript/common/login-session.js"></script>
    <script src="javascript/common/quick_query.js"></script>
    <script src="javascript/enterprise/enterprise.js"></script>
    <script src="javascript/util/preview_picture.js"></script>
    <script src="javascript/common/suspend.js"></script>
</head>
<body id="top">
<img src="" id="background">
<div class="modal fade" id="loading" tabindex="-1" role="dialog" aria-labelledby="myhead_sculpture">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <i class="fa fa-spinner" style="font-size:48px;color: #a6e1ec"></i>
            </div>
        </div>
    </div>
</div>
<script>
    $("#loading").modal({backdrop: 'static', keyboard: false});
</script>
<div class="modal fade" id="wechat" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">

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
<header>
    <nav class="navbar navbar-default navbar-fixed-top">
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
                    <img class="brand" src="favicon.ico" style="width: 20px;height: 20px">
                </a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="index.jsp">
                        首页<i class="fa fa-home"></i>
                    </a>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">
                            <i class="fa fa-graduation-cap"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="public.html" target="myiframe">
                                    校招<i class="fa fa-graduation-cap"></i>
                                </a>
                            </li>
                            <li role="separator" class="divider"></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a id="login_btu" data-toggle="dropdown" role="button"
                           aria-haspopup="true" aria-expanded="false" style="float: left">
                            登录<i class=""></i>
                        </a>
                        <a class="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-haspopup="true" aria-expanded="false" style="float: left">
                            <img style="width:20px;height: 20px;border-radius:10px" class="hidden" src=""
                                 id="head_picture">
                        </a>
                        <ul class="dropdown-menu" id="user_center">
                            <li>
                                <!-- Button trigger modal -->
                                <a href="login.html" target="myiframe">
                                    登录<i class=""></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown" id="register_btu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-user-plus"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <!-- Button trigger modal -->
                                <a href="register-person.html" target="myiframe">
                                    个人注册<i class="fa fa-male"></i>
                                </a>
                            </li>
                            <li role="separator" class="divider"></li>
                            <li>
                                <a href="register-enterprise.html" target="myiframe">
                                    企业注册<i class="fa fa-male"></i>
                                    <i class="fa fa-male"></i>
                                    <i class="fa fa-male"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="audio.html" target="myiframe">
                            <i class="fa fa-music"></i>
                        </a>
                    </li>
                    <li>
                        <a href="video.html" target="myiframe">
                            <i class="fa fa-video-camera"></i>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="fa fa-search"></i>
                        </a>
                    </li>
                    <li>
                        <a href="setting.html" target="myiframe">
                            <i class="fa fa-cog"></i>
                        </a>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</header>
<main>
    <div class="btn-group-vertical" role="group" id="suspend">
        <button type="button" class="btn btn-default qq" id="qq_btn" onclick="QQ()">
            <i class="fa fa-comment"></i>
        </button>
        <button type="button" class="btn btn-default wechat" id="wechat_btn"
                onclick="wechat();$('#wechat').modal('show')">
            <i class="fa fa-comment"></i>
        </button>
        <button type="button" class="btn btn-default telephone" id="telephone_btn" onclick="telephone()">
            <i class="fa fa-phone"></i>
        </button>
        <button onclick="document.getElementById('myiframe').contentWindow.scrollTo(0, 0);"
                class="btn btn-default toTop hidden-xs">
            <i class="fa fa-plane"></i>
        </button>
    </div>
    <ul id="qq_con">
        <li class="li1">在线咨询
            <i class="fa fa-close" id="qq_close" onclick="hidden_QQ(this)"></i>
        </li>
        <li class="li2">
            <h2>2728363142</h2>
        </li>
        <li class="li3">
            <h4 style="float: left">联系电话</h4>
            <h3>13164696579</h3>
        </li>
    </ul>
    <ul id="telephone_con">
        <li class="li1">联系电话
            <i class=" 	fa fa-close" id="telephone_close" onclick="hidden_telephone(this)">
            </i>
        </li>
        <li class="li2">
            <h3>联系电话</h3>
            <h2>13164696579</h2>
        </li>
        <li class="li3">
            <h3>2728363142</h3>
        </li>
    </ul>
    <iframe id="myiframe" name="myiframe" frameborder="0" marginheight="0" src=""></iframe>
</main>
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
<script>
    $(document).ready(function () {
        login_session('refresh');
        response_background();
        background.onload = function () {
            $("#loading").modal("hide");
        };
        $("#wechat").on('hidden.bs.modal', function () {
            wechat_close();
        })
    });
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
            "bdPos": "left",
            "bdTop": 250
        }],
        "share": {},
        "image": {"viewList": ["qzone", "tsina", "tqq", "renren", "weixin"], "viewText": "分享到：", "viewSize": "16"},
        "selectShare": {"bdContainerClass": null, "bdSelectMiniList": ["qzone", "tsina", "tqq", "renren", "weixin"]}
    };
    with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
</script>
</body>
</html>
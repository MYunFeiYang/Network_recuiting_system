let file,userType,fileType,pic;
function sub() {
    // jquery 表单提交
    $("#picture_load").ajaxSubmit(function(message) {
        if (JSON.parse(message).message=="success"){
            document.all.warning.innerHTML="头像更换成功";
        }else {
            document.all.warning.innerHTML="头像更换失败";
        }
    });
    return false; // 必须返回false，否则表单会自己再做一次提交操作，并且页面跳转
}
function change() {
    pic = document.getElementById("preview");
    pic.src="";
    pic.style.height="auto !important";
        file = document.getElementById("f");
    let ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();
    // gif在IE浏览器暂时无法显示
    if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
        document.all.warning.innerHTML="图片的格式必须为png或者jpg或者jpeg格式！";
        return;
    }
    let isIE = navigator.userAgent.match(/MSIE/)!= null,
        isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;
    if(isIE) {
        file.select();
        let reallocalpath = document.selection.createRange().text;
        // IE6浏览器设置img的src为本地路径可以直接显示图片
        if (isIE6) {
            pic.src = reallocalpath;
        }else {
            // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
            pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
            // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
            pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
        }
    }else {
        html5Reader(file);
    }
    getEmail(fileType,userType);
}
function html5Reader(file){
    file = file.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        let pic = document.getElementById("preview");
        pic.src=this.result;
    }
}
function getEmail(fileType,userType) {
    let user=JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    user.userType=userType;
    $.ajax({
        url:"public?public=getEmail",
        data:user,
        dataType:"JSON",
        type:"POST",
        success:function (data) {
            document.all.picture_load.action+="?email="+data.email+"&fileType="+fileType;
            document.all.UploadButton.disabled=false;
        },
        fail:function () {

        }
    })

}
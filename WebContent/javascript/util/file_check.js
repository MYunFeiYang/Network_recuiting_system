"use strict";
let userType;//上传文件的用户类型
let fileType;
let allowFile="|.doc|.docx|.pdf";//允许上传的文件格式
function sub() {
    // jquery 表单提交
    $("#file_load").ajaxSubmit(function(message) {
        if (JSON.parse(message).message=="success"){
            document.all.massage.innerHTML="头像更换成功";
        }else {
            document.all.massage.innerHTML="头像更换失败";
        }
    });

    return false; // 必须返回false，否则表单会自己再做一次提交操作，并且页面跳转
}
function checkInput(obj) {
    let file = encodeURI(obj.value);
    if(file == "") {
        document.all.massage.innerHTML="文件不能为空";
    } else {
        var extension = file.substring(file.lastIndexOf('.'), file.length).toLowerCase();
        if (allowFile.indexOf(extension)!=-1){
            document.all.massage.innerHTML="该文件允许上传";
            getEmail(fileType,userType);
        }else {
            document.all.massage.innerHTML="该文件不允许上传，允许上传的文件为:"+allowFile;
        }
    }
}
//邮箱和设置文件类型
function getEmail(fileType,userType) {
    let user=JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    user.userType=userType;
    $.ajax({
        url:"public?public=getEmail",
        data:user,
        dataType:"JSON",
        type:"POST",
        success:function (data) {
            document.all.file_load.action+="?email="+data.email+"&fileType="+fileType;
            document.all.UploadButton.disabled=false;
        },
        fail:function () {
            
        }
    })
    
}
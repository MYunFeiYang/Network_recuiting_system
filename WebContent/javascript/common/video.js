function get_video_src() {
    let video={};
    let src=document.all.video_src.value;
    video.src=src;
    $.ajax({
        url:"public?public=getVideoSrc",
        data:video,
        type:"POST",
        dataType:"POST",
        success:function () {

        }
    })
}
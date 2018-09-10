let videoPlayer = {
    init: function () {
        $("#video").removeAttr("controls");
    },
    ready: function () {
        $("#play").click(function () {
            //监听播放时间并更新进度条
            $("#video").get(0).addEventListener('timeupdate', function () {
                updateProgress();
            }, false);
            //监听播放完成事件
            $("#video").get(0).onended = function () {
                $("#video").get(0).currentTime = 0;
                $("#video").get(0).pause();
                $('#play i:first').removeClass("fa-pause").addClass("fa-play");
            };
            if ($("#video").get(0).paused) {
                $("#video").get(0).play();
                $(this).find("i:first").removeClass("fa-play").addClass("fa-pause");
            } else {
                $("#video").get(0).pause();
                $(this).find("i:first").removeClass("fa-pause").addClass("fa-play");
            }
        });
        $('#video').on("loadedmetadata", function () {
            //alert(audio.duration)
            let t = this.duration;
            $('#videoTime').text(Math.floor(t / 60) + ":" + (t % 60 / 100).toFixed(2).slice(-2));
        });
        let progress_time = $('.progress-time').width();
        //点击进度条跳到指定点播放
        $('.progress-time').click(function (e) {
            let rate = (e.offsetX) / progress_time;
            $("#video").get(0).currentTime = $("#video").get(0).duration * rate;
            updateProgress();
        });
        $("#voice").parent().click(function () {
            if ($("#video").get(0).muted) {
                $("#video").get(0).muted = false;
                $("#voice").removeClass("fa-volume-off").addClass("fa-volume-up");
            } else {
                $("#video").get(0).muted = true;
                $("#voice").removeClass("fa-volume-up").addClass("fa-volume-off");
            }
        });
        let progress_voice = $('.progress-voice').width();
        $(".progress-voice").click(function (e) {
            let rate = (e.offsetX) / progress_voice;
            $("#video").get(0).volume = rate;
            $(".pgs-voice").css("width", `${rate * 100}%`)
        });
        $("#fullScreen").click(function () {
            if (isFullscreen()) {
                let video = document.getElementById("video_container");
                fullscreen(video);
            } else {
                exitFullscreen();
            }
        });
        //鼠标在视频播放区控制条显示，否则隐藏
        $("#video_container").hover(function () {
            $("#videoControls").css("opacity",1);
            $("#videoControls").css("transition-duration","0.3s");
        },function () {
            $("#videoControls").css("opacity",0);
            $("#videoControls").css("transition-duration","1s")
        })
    }
}
//窗口变化触发
window.onresize = function() {
    if (isFullscreen()) {
        $(this).find("i:first").removeClass("fa-arrows-alt").addClass("fa-compress");
    } else {
        $(this).find("i:first").removeClass("fa-compress").addClass("fa-arrows-alt");
    }
}
//更新进度条
function updateProgress() {
    let value = Math.round((Math.floor($("#video").get(0).currentTime) / Math.floor($("#video").get(0).duration)) * 100, 0);
    $('.pgs-play').css('width', value + '%');
    let t = $("#video").get(0).currentTime
    $('.played-time').html(Math.floor(t / 60) + ":" + (t % 60 / 100).toFixed(2).slice(-2));
}
//判断是否全屏
function isFullscreen() {
    var ableFullscreen = document.fullscreenEnabled ||
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenEnabled;
    if (ableFullscreen) {
        var fullscreenEle = document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;
        return fullscreenEle == null;
    }
}
//全屏
function fullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
//退出全屏
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
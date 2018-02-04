function audioPlayer() {
    // 播放器
    let Player = {
        // 歌曲路径
        path: 'resource/music/',
        // 歌曲数据
        data: [
            {
                name: "范宗沛-杨柳.mp3",
                url: "http://stor.cloudmusics.cn/mp3/2018/02/1164d7bfb2e8b0e0670c582d4eb7e218.mp3"
            },
            {
                name: "刘莱斯-浮生.mp3",
                url: "http://stor.cloudmusics.cn/mp3/2018/02/30eaf96884d7f6b51bb8f12fd13e64c0.mp3"
            },
            {
                name: "大城小爱.mp3",
                url: "http://stor.cloudmusics.cn/mp3/2018/02/28fa2fc65e06d80a5c50a7aea323740c.mp3"
            },
            {
                name: "逆时针向.mp3",
                url: "http://stor.cloudmusics.cn/mp3/2018/02/d62e9c946c784bee65a7ce8f48700a82.mp3"
            },
            {
                name: "我们的纪念.mp3",
                url: "http://stor.cloudmusics.cn/mp3/2018/02/ae0b4aa222e1d3c4e1c0ce1f3e0ce558.mp3"
            }],
        // 当前播放歌曲的 索引
        currentIndex: -1,
        //  播放器元素jquery对象
        $audio: $('#audio'),
        // 歌曲列表
        $mList: $('#m-list'),
        //正在播放的歌曲
        $rmusic: $('#rmusic'),
        // 初始化 数据
        init: function () {
            // 数据一般来自服务器端,通过ajax 加载数据,这里是模拟
            //Player.data = ['古璇 - 长亭外.mp3', '叶启田 - 爱拼才会赢(闽).mp3', '迪克牛仔 - 水手.mp3'];
            // 一般用模板引擎,把数据 与 模板 转换为 视图,来显示,这里是模拟
            let mhtml = '';
            let len = Player.data.length;
            for (let i = 0; i < len; i++) {
                mhtml += '<li><a index="' + i + '">' + Player.data[i].name + '</a></li>';
            }
            Player.$mList.html(mhtml);
        },
        // 就绪
        ready: function () {
            // 控制
            Player.audio = Player.$audio.get(0);
            $('#ctrl-area').on('click', 'button', function () {
                Player.$rmusic.html(Player.data[Player.currentIndex].name);
            });
            //播放暂停控制
            $('#playPause').click(function () {

                //监听音频播放时间并更新进度条
                Player.audio.addEventListener('timeupdate', updateProgress, false);
                //监听播放完成事件
                Player.audio.addEventListener('ended', audioEnded, false);


                //改变暂停/播放icon
                if (Player.audio.paused) {
                    Player.audio.play();
                    $('.icon-btn').removeClass('icon-pause').addClass('icon-play');
                    $('#playPause').find("i").removeClass('fa-play-circle-o').addClass('fa-stop-circle-o');
                } else {
                    Player.audio.pause();
                    $('.icon-btn').removeClass('icon-play').addClass('icon-pause');
                    $('#playPause').find("i").removeClass('fa-stop-circle-o').addClass('fa-play-circle-o');
                }
            });
            //读取视频长度,设置页面时长显示-loadedmetadata:指定视频/音频（audio/video）的元数据加载后触发
            //audio.duration 获取音频的时长，单位为秒
            $('#audio').on("loadedmetadata", function () {
                //alert(audio.duration)
                $('#audioTime').text(transTime(this.duration));
            });

            let pgsWidth = $('.pgs img').width() * 0.907; //0.907是 进度条这个div和整个进度条图片宽度的比例
            //点击进度条跳到指定点播放
            $('.pgs img').click(function (e) {

                let rate = (e.offsetX - ($(this).width() - pgsWidth) / 2) / pgsWidth;
                Player.audio.currentTime = Player.audio.duration * rate;
                updateProgress();
            });

            // 下一曲
            $('#btn-next').click(function () {
                if (Player.currentIndex == -1) {
                    Player.currentIndex = 0;
                } else if (Player.currentIndex == (Player.data.length - 1)) {
                    Player.currentIndex = 0;
                } else {
                    Player.currentIndex++;
                }
                Player.audio.src =Player.data[Player.currentIndex].url;
                Player.$rmusic.html(Player.data[Player.currentIndex].name);
                Player.audio.play();
                $('.icon-btn').removeClass('icon-pause').addClass('icon-play');
                //监听音频播放时间并更新进度条
                Player.audio.addEventListener('timeupdate', updateProgress, false);
                //监听播放完成事件
                Player.audio.addEventListener('ended', audioEnded, false);
            });
            // 上一曲
            $('#btn-pre').click(function () {
                if (Player.currentIndex == -1) {
                    Player.currentIndex = 0;
                } else if (Player.currentIndex == 0) {
                    Player.currentIndex = (Player.data.length - 1);
                } else {
                    Player.currentIndex--;
                }
                Player.audio.src =Player.data[Player.currentIndex].url;
                Player.$rmusic.html(Player.data[Player.currentIndex].name);
                Player.audio.play();
                $('.icon-btn').removeClass('icon-pause').addClass('icon-play');
                //监听音频播放时间并更新进度条
                Player.audio.addEventListener('timeupdate', updateProgress, false);
                //监听播放完成事件
                Player.audio.addEventListener('ended', audioEnded, false);
            });
            // 单曲循环
            $('#btn-loop').click(function () {
                Player.audio.onended = function () {
                    Player.audio.load();
                    Player.audio.play();
                };
                let src = $('#btn-loop img:first').attr('src');
                $("#playModal").attr("src", src);
            });
            // 列表循环
            $('#btn-order').click(function () {
                Player.audio.onended = function () {
                    $('#btn-next').click();
                };
                let src = $('#btn-order img:first').attr('src');
                $("#playModal").attr("src", src);
            });
            // 随机播放
            $('#btn-random').click(function () {
                Player.audio.onended = function () {
                    let i = parseInt((Player.data.length - 1) * Math.random());
                    playByMe(i);
                };
                let src = $('#btn-random img:first').attr('src');
                $("#playModal").attr("src", src);
            });

            // 播放指定歌曲
            function playByMe(i) {
                Player.audio.src = Player.data[i].url;
                Player.audio.play();
                $('.icon-btn').removeClass('icon-pause').addClass('icon-play');
                $('#playPause').find("i").removeClass('fa-play-circle-o').addClass('fa-stop-circle-o');
                //监听音频播放时间并更新进度条
                Player.audio.addEventListener('timeupdate', updateProgress, false);
                //监听播放完成事件
                Player.audio.addEventListener('ended', audioEnded, false);
                Player.currentIndex = i;
                Player.$rmusic.html(Player.data[Player.currentIndex].name);
            }

            // 歌曲被点击
            $('#m-list a').click(function () {
                playByMe($(this).attr('index'));
            });
        }
    };
    Player.init();
    Player.ready();
}

//转换音频时长显示
function transTime(time) {
    let duration = parseInt(time);
    let minute = parseInt(duration / 60);
    let sec = duration % 60 + '';
    let isM0 = ':';
    if (minute == 0) {
        minute = '00';
    } else if (minute < 10) {
        minute = '0' + minute;
    }
    if (sec.length == 1) {
        sec = '0' + sec;
    }
    return minute + isM0 + sec
}

//更新进度条
function updateProgress() {
    let audio = document.getElementById('audio');
    let value = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100, 0);
    $('.pgs-play').css('width', value * 0.907 + '%');
    $('.played-time').html(transTime(audio.currentTime));


}

//播放完成
function audioEnded() {
    let audio = document.getElementsByTagName('audio')[0];
    audio.currentTime = 0;
    audio.pause();
    $('.play-pause>span').removeClass('icon-pause').addClass('icon-play');
}


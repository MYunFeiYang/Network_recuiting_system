import React from 'react';
import { Row, Col, Icon, Slider } from 'antd';
import '../style/App.scss'

class Video extends React.Component {
    constructor() {
        super();
        this.state = {
            video: {
                url: "http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4"
            },
            currentIndex: 0,
            pgsPlay: 0,
            volume: 100,
            playedTime: '00:00:00',
            totalTime: '00:00:00',
            playPause: 'play-circle',
            screen: 'fullscreen'
        }
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }
    transTime = (time) => {
        let duration = parseInt(time);
        let hour = parseInt(duration / 3600)
        let minute = parseInt(parseInt(duration % 3600) / 60);
        let sec = duration % 3600 + '';
        let isM0 = ':';
        if (hour === 0) {
            hour = '00';
        } else if (minute < 10) {
            hour = '0' + minute;
        };
        if (minute === 0) {
            minute = '00';
        } else if (minute < 10) {
            minute = '0' + minute;
        };
        if (sec.length === 1) {
            sec = '0' + sec;
        };
        return hour + isM0 + minute + isM0 + sec;
    }
    updateProgress = () => {
        let video = document.getElementById('video');
        const playedTime = this.transTime(video.currentTime)
        let value = Math.round((Math.floor(video.currentTime) / Math.floor(video.duration)) * 100, 0);
        this.setState({
            pgsPlay: value,
            playedTime,
        })
    }
    videoEnded = () => {
        let video = document.getElementsByTagName('video')[0];
        video.currentTime = 0;
        this.setState({
            playPause: "play-circle"
        })
        video.pause();
    }
    changePlayPause = () => {
        let video = document.getElementById('video');
        if (video.paused) {
            const totalTime = this.transTime(video.duration);
            this.setState({
                totalTime,
                playPause: "pause-circle"
            })
            video.play();
        } else {
            this.setState({
                playPause: "play-circle"
            })
            video.pause();
        }
    }
    handleClickVideoProgress = (value) => {
        let video = document.getElementById('video');
        video.currentTime = video.duration * parseFloat(value) / 100;
        this.updateProgress();
    }
    handleClickVolumeProgress = (value) => {
        document.getElementById('video').volume = parseFloat(value / 100);
        this.setState({
            volume: value
        })
    }
    handleClickVolume = (value) => {
        let video = document.getElementById('video');
        if (video.muted) {
            video.muted = false;
        } else {
            video.muted = true;
        }
    }
    isFullscreen = () => {
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

    fullscreen = (element) => {
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

    exitFullscreen = () => {
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
    changeScreen = () => {
        let screen = this.state.screen;
        if (screen === 'fullscreen') {
            this.setState({
                screen: 'fullscreen-exit'
            })
            this.fullscreen(document.getElementById('fullScreen'));
        } else {
            this.setState({
                screen: 'fullscreen'
            })
            this.exitFullscreen();
        }
    }
    render() {
        return <Row id="fullScreen">
            <Col span={24} >
                <video src={this.state.video.url} onTimeUpdate={this.updateProgress}
                    onEnded={this.videoEnded} ref="video" id="video" style={{ width: '100%' }}></video>
                <div className="video-progress-background">
                    <div>
                        <Slider value={this.state.pgsPlay} onChange={this.handleClickVideoProgress} />
                    </div>
                    <div>
                        <div onClick={this.changePlayPause}>
                            <Icon type={this.state.playPause} />
                            <span>{this.state.playedTime}</span>
                            <span>/</span>
                            <span>{this.state.totalTime}</span>
                        </div>
                        <div >
                            <Icon type="sound" onClick={this.handleClickVolume} />
                            <Slider value={this.state.volume} onChange={this.handleClickVolumeProgress} />
                        </div>
                        <div onClick={this.changeScreen}>
                            <Icon type={this.state.screen} />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    }
}
export default Video;

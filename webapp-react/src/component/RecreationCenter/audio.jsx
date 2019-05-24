import React from 'react';
import { connect } from 'react-redux'
import { Button, Row, Col, Icon, Menu, Dropdown, Slider, Input, Select } from 'antd';
import axios from 'axios'
import '../../style/App.scss'

const Option = Select.Option;
const Search = Input.Search;
class Audio extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [
                {
                    name: "爱拼才会赢(闽).mp3",
                    url: "http://music.163.com/song/media/outer/url?id=5267163.mp3"
                },
                {
                    name: "清明雨上.mp3",
                    url: "http://music.163.com/song/media/outer/url?id=167882.mp3"
                },
                {
                    name: "荷塘月色 (街舞舞曲版) - remix.mp3",
                    url: "http://music.163.com/song/media/outer/url?id=26601034.mp3"
                },
                {
                    name: "岁月神偷.mp3",
                    url: "http://music.163.com/song/media/outer/url?id=28285910.mp3"
                }, {
                    name: "唐人.mp3",
                    url: "http://music.163.com/song/media/outer/url?id=26524402.mp3"
                }, {
                    name: "水手.mp3",
                    url: "http://music.163.com/song/media/outer/url?id=190381.mp3"
                }],
            currentIndex: 0,
            currentMusic: {
                name: "",
                url: "",
                index: 0,
            },
            pgsPlay: 0,
            playedTime: '00:00',
            totalTime: '',
            playPause: 'play',
            loopType: '循环模式',
            interface: [
                {
                    name: 'QQ音乐',
                    url: 'https://www.sinsyth.com/lxapi/ssk/yqq.x'
                }
            ],
            currentInterface: 'https://www.sinsyth.com/lxapi/ssk/yqq.x'
        }
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }
    //转换音频时长显示
    transTime = (time) => {
        let duration = parseInt(time);
        let minute = parseInt(duration / 60);
        let sec = duration % 60 + '';
        let isM0 = ':';
        if (minute === 0) {
            minute = '00';
        } else if (minute < 10) {
            minute = '0' + minute;
        }
        if (sec.length === 1) {
            sec = '0' + sec;
        }
        return minute + isM0 + sec
    }

    //更新进度条
    updateProgress = () => {
        let audio = document.getElementById('audio');
        let value = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100, 0);
        this.setState({
            pgsPlay: value,
            playedTime: this.transTime(audio.currentTime),
        })
    }

    //播放完成
    audioEnded = () => {
        let audio = document.getElementsByTagName('audio')[0];
        audio.currentTime = 0;
        audio.pause();
    }
    playByMe = (e) => {
        e.preventDefault();
        const { text, href } = e.target;
        const index = e.target.getAttribute('data-index');
        let audio = this.refs.audio;
        if (href != null) {
            audio.src = href;
            audio.play();
            audio.oncanplay = () => {
                this.setState({
                    totalTime: this.transTime(audio.duration),
                    currentIndex: parseInt(index),
                    currentMusic: {
                        name: text,
                    },
                });
            }
        }
    }
    changePlayPause = () => {
        let audio = document.getElementById('audio');
        if (audio.paused) {
            this.setState({
                playPause: 'pause'
            })
            audio.play();
        } else {
            this.setState({
                playPause: 'play'
            })
            audio.pause();
        }
    }
    handleClickProgress = (value) => {
        let audio = document.getElementById('audio');
        audio.currentTime = audio.duration * parseFloat(value) / 100;
        this.updateProgress();
    }
    handleBtuPre = () => {
        let currentIndex = this.state.currentIndex;
        console.log(this.state.currentIndex)
        if (this.state.currentIndex != null) {
            if (currentIndex > 0) {
                currentIndex--;
            }
            const audio = document.getElementById('audio');
            const { name, url } = this.state.data[currentIndex];
            this.setState({
                currentMusic: {
                    name: name,
                    url: url,
                },
                currentIndex: currentIndex,
            })
            audio.oncanplay = () => {
                audio.play();
            }
        }
    }
    handleBtuNext = () => {
        let currentIndex = this.state.currentIndex;
        console.log(this.state.currentIndex)
        if (this.state.currentIndex != null) {
            if (currentIndex < this.state.data.length - 1) {
                currentIndex++;
            }
            const audio = document.getElementById('audio');
            const { name, url } = this.state.data[currentIndex];
            this.setState({
                currentMusic: {
                    name: name,
                    url: url,
                },
                currentIndex: currentIndex,
            })
            audio.oncanplay = () => {
                audio.play();
            }
        }
    }
    // 单曲循环
    loopPlay = (e) => {
        this.refs.audio.onended = function () {
            this.refs.audio.load();
            this.refs.audio.play();
        };
        const loopType = e.target.getAttribute('data-looptype')
        this.setState({
            loopType
        })
    };
    // 列表循环
    orderPlay = (e) => {
        this.refs.audio.onended = function () {
            this.refs.stepForward.click();
        };
        const loopType = e.target.getAttribute('data-looptype')
        this.setState({
            loopType
        })
    }
    // 随机播放
    randomPlay = (e) => {
        this.refs.audio.onended = function () {
            let i = parseInt((this.data.length - 1) * Math.random());
            this.playByMe(i);
        };
        const loopType = e.target.getAttribute('data-looptype')
        this.setState({
            loopType
        })
    };
    handleChange = (value) => {
        this.setState({
            currentInterface: value,
        })
    }
    search = (value) => {
        const url = this.state.currentInterface
        axios({
            method: 'post',
            url: url,
            type: 'mp3',
            surl: value,
            strkey: 'yqq_18analyze'
        }).then((Response) => {
            console.log(Response)
        }).catch((Response) => {
            console.log(Response)
        })
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Button onClick={this.loopPlay} data-looptype="单曲循环">
                        单曲循环<i className="fa fa-recycle"></i>
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={this.orderPlay} data-looptype="顺序播放">
                        顺序播放<i className="fa fa-recycle"></i>
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={this.randomPlay} data-looptype="随机播放">
                        随机播放<i className="fa fa-random"></i>
                    </Button>
                </Menu.Item>
            </Menu>
        );
        return (<div>
            <div id="search">
                <Select defaultValue={this.state.interface[0].name} onChange={this.handleChange}>
                    {
                        this.state.interface.map((value, index) => {
                            return <Option value={value.url} key={index}>{value.name}</Option>
                        })
                    }
                </Select>
                <Search placeholder="请输入视频地址" onSearch={(value) => {
                    this.search(value)
                }} enterButton="解析" />
            </div>
            <Row id="audioBox">
                <Col span={24}>
                    <ol ref="mlist" onClick={this.playByMe}>
                        {this.state.data.map((value, index) => {
                            return <li key={index}><a href={value.url} data-index={index}>{value.name}</a></li>
                        })}
                    </ol>
                </Col>
                <Col span={24}>
                    正在播放: <strong>{this.state.currentMusic.name}</strong>
                    <audio src={this.state.currentMusic.url} onTimeUpdate={this.updateProgress}
                        onEnded={this.audioEnded} ref="audio" id="audio"></audio>
                    <Slider value={this.state.pgsPlay} onChange={this.handleClickProgress} />
                    <Row>
                        <Col span={3}>
                            <span style={{ height: '30px', lineHeight: '30px' }}>{this.state.playedTime}</span>
                        </Col>
                        <Col span={3}>
                            <Button onClick={this.handleBtuPre}>
                                <Icon type="step-backward" />
                            </Button>
                        </Col>
                        <Col span={4}>
                            <Button onClick={this.changePlayPause}>
                                {this.state.playPause}
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Button onClick={this.handleBtuNext} refs="stepForward">
                                <Icon type="step-forward" />
                            </Button>
                        </Col>
                        <Col span={3}>
                            <span style={{ height: '30px', lineHeight: '30px' }}>{this.state.totalTime}</span>
                        </Col>
                        <Col span={7}>
                            <Dropdown overlay={menu}>
                                <Button ref="loopType">
                                    {this.state.loopType}<Icon type="down" />
                                </Button>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        );
    }
}
export default connect((state) => ({
    ...state
}))(Audio);

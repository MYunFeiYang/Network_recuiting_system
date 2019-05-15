import React from 'react';
import { Row, Col } from 'antd';
import '../style/App.scss'
class Footer extends React.Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col span={6}>
                        <address className="center">
                            Written by <a target="_blank" rel="noopener noreferrer"
                                href="https://github.com/MYunFeiYang/Network_recuiting_system">think道</a><br />
                            Visit me at:<br />
                            <a target="_blank" rel="noopener noreferrer"
                                href="https://github.com/MYunFeiYang/Network_recuiting_system">MYunFeiYang</a><br />
                        </address>
                    </Col>
                    <Col span={6}>
                        <address className="center">
                            网站运营：<br />
                            <a target="_blank" rel="noopener noreferrer" href="http://tool.chinaz.com/">站长工具</a><br />
                            <a target="_blank" rel="noopener noreferrer" href="http://union.baidu.com/">百度联盟</a><br />
                        </address>
                    </Col>
                    <Col span={6}>
                        <address className="center">
                            项目部署：<br />
                            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com/">阿里云计算</a><br />
                            <a target="_blank" rel="noopener noreferrer" href="http://www.miitbeian.gov.cn/">鄂ICP备17029283号</a><br />
                        </address>
                    </Col>
                    <Col span={6}>
                        <address className="center">
                            友情链接：<br />
                            <a target="_blank" rel="noopener noreferrer" href="http://v3.bootcss.com/">bootstrap中文网</a><br />
                            <a target="_blank" rel="noopener noreferrer" href="http://glyphicons.com/">Halflings字体图标</a><br />
                        </address>
                    </Col>
                </Row>
            </footer>
        )
    }
}

export default Footer;
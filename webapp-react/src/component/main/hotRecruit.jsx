import React, { Fragment } from 'react';
import '../../style/App.scss';
import { Row, Col, Card } from 'antd';

class HotRecruite extends React.Component {
    constructor() {
        super();
        this.state = {
            company: [
                {
                    name: '融创中国',
                    img: '//cdn6.haitou.cc/homepage/1524625068.jpg',
                },
                {
                    name: '乐有家',
                    img: '//cdn6.haitou.cc/homepage/1553248621.png',
                },
                {
                    name: '中国银行',
                    img: '//cdn6.haitou.cc/homepage/1524626103.jpg',
                },
                {
                    name: '苏宁',
                    img: '//cdn6.haitou.cc/homepage/1551153110.png',
                },
                {
                    name: '雀巢',
                    img: '//cdn6.haitou.cc/homepage/1551151570.png',
                },
                {
                    name: '京东',
                    img: '//cdn6.haitou.cc/homepage/1546933770.png',
                },
                {
                    name: '学而思',
                    img: '//cdn6.haitou.cc/homepage/1535338622.png',
                },
                {
                    name: '腾讯',
                    img: '//cdn6.haitou.cc/homepage/1551152418.png',
                },
                {
                    name: '伊利',
                    img: '//cdn6.haitou.cc/homepage/1551151927.png',
                },
            ]
        }
    }
    render() {
        return (<Fragment>
            <Row id="hotRecruit">
                {
                    this.state.company.map((value, index) => {
                        return <Col span={8} key={index}>
                            <Card title={value.name} bordered={false} >
                                <img src={value.img} alt={value.name} />
                            </Card>
                        </Col>
                    })
                }
            </Row>
        </Fragment>
        )
    }
}
export default HotRecruite;
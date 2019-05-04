import React, { Fragment } from 'react';
import '../../style/App.css';
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
            <Row style={{ width: '25%',marginTop:'30px',marginLeft:'50px'}}>
                {
                    this.state.company.map((value, index) => {
                        return <Col span={8} key={index}>
                            <Card title={value.name} bordered={false} style={{backgroundColor:'rgba(0,0,0,0.2)'}}>
                                <img src={value.img} alt={value.name} style={{width:'100%',height:'100%',borderRadius:'50%'}}/>
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
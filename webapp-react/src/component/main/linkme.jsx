import React, { Fragment } from 'react';
import { BackTop, Icon } from 'antd'
import wechat from '../../img/WeChat.jpg'


class Linkme extends React.Component {
    constructor(){
        super();
        this.state={
            icon:[
                "wechat",
                "qq",
                "linkedin",
                "github",
            ],
            link:[wechat,
                'http://wpa.qq.com/msgrd?v=3&uin=2728363142&site=qq&menu=yes',
                'https://www.linkedin.com/in/%E5%BF%97%E5%BC%BA-%E6%98%8E-408632151',
                'https://github.com/MYunFeiYang',
            ]
        }
    }
    render() {
        return (<Fragment>
            <ul id="linkme">
                {
                    this.state.icon.map((value,index)=>{
                        return <li key={index}>
                        <a href={this.state.link[index]} alt='添加QQ' target='_black'>
                        <Icon type={value} ></Icon>
                        </a>
                        </li>
                    })
                }
            </ul>
            <BackTop visibilityHeight="40" style={{right:'10px'}}>
                <Icon type="up-circle" theme="twoTone" style={{ fontSize: '36px' }} />
            </BackTop>
        </Fragment>
        )
    }
}
export default Linkme;
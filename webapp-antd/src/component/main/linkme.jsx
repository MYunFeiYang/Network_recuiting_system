import React, { Fragment } from 'react';
import { BackTop, Icon } from 'antd'


class Linkme extends React.Component {
    constructor(){
        super();
        this.state={
            icon:[
                "wechat",
                "qq",
                "linkedin",
                "github",
                "phone",
            ]
        }
    }
    render() {
        return (<Fragment>
            <ul>
                {
                    this.state.icon.map((value,index)=>{
                        return <li key={index}><Icon type={value} style={{fontSize:'30px'}}></Icon></li>
                    })
                }
            </ul>
            <BackTop>
                <Icon type="up-circle" theme="twoTone" style={{ fontSize: '36px' }} />
            </BackTop>
        </Fragment>
        )
    }
}
export default Linkme;
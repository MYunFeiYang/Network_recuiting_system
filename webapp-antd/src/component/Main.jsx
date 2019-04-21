import React from 'react';
import { } from 'antd'
import Linkme from './main/linkme'
import HotRecruite from './main/hotRecruit'

class Main extends React.Component {
    render() {
        return (<main>
            <HotRecruite></HotRecruite>
            <Linkme></Linkme>
        </main>
        )
    }
}
export default Main;
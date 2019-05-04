import React from 'react';
import { } from 'antd'
import Linkme from './linkme'
import HotRecruite from './hotRecruit'

class Home extends React.Component {
    render() {
        return (<main>
            <HotRecruite></HotRecruite>
            <Linkme></Linkme>
        </main>
        )
    }
}
export default Home;
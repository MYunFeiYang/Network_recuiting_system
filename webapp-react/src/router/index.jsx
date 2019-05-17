import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../component/login/Login';
import Audio from '../component/audio'
import Video from '../component/video'
import Home from '../component/main/home'
import Person from '../component/person/'
import Enterprise from '../component/enterprise/'
import RegisterPerson from '../component/register/Person'
import RegisterEnterprise from '../component/register/Enterprise'
import Admin from '../component/admin/'
import Wechat from '/WeChat/'
import School from './main/school/';

const BasicRoute = () => (
    <Router>
        <Switch >
            <Route path="/music/" exact component={Audio} />
            <Route path="/video/" exact component={Video} />
            <Route path="/school/" exact component={School} />
            <Route path="/login/" exact component={Login} />
            <Route path="/person/" component={Person} />
            <Route path="/enterprise/" component={Enterprise} />
            <Route path="/admin/" component={Admin} />
            <Route path="/wechat/" component={Wechat} />
            <Route path="/register/enterprise/" exact component={RegisterEnterprise} />
            <Route path="/register/person" exact component={RegisterPerson} />
            <Route path="/" exact component={Home} />
        </Switch>
    </Router>
);


export default BasicRoute;
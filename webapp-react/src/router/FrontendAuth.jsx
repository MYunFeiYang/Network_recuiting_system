import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';


export class FrontendAuth extends React.Component {
    render() {
        const { location, config } = this.props;
        const { pathname } = location;
        let isLogin = localStorage.getItem('__config_center_token') === "true" ? true : false;

        const targetRouterConfig = config.find((v) => v.path === pathname);
        if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
            const { component } = targetRouterConfig;
            return <Route exact path={pathname} component={component} />
        }
        if (isLogin) {
            if (pathname === '/login') {
                return <Redirect to='/' />
            } else {
                if (targetRouterConfig) {
                    return <Route path={targetRouterConfig.path} component={targetRouterConfig.component} />
                } else {
                    return <Redirect to='/404' />
                }
            }
        } else {
            if (targetRouterConfig && targetRouterConfig.auth) {
                return <Redirect to='/login' />
            } else {
                return <Redirect to='/404' />
            }
        }
    }
}

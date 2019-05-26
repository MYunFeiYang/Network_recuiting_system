import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';


export class FrontendAuth extends React.Component {
    render() {
        const { location, config } = this.props;
        let { pathname } = location;
        const isLogin = localStorage.getItem('__config_center_token') === "true" ? true : false;
        const login_type = localStorage.getItem('login_type');
        let targetRouterConfig;
        if ((pathname.split("/").length - 1) === 1) {
            targetRouterConfig = config.find((v) => v.path === pathname)
        } else if ((pathname.split("/").length - 1) === 2) {
            pathname="/" + pathname.split("/")[1];
            targetRouterConfig = config.find((v) => v.path === pathname)
        } else {
            return <Redirect to='/404' />
        }
        if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
            const { component } = targetRouterConfig;
            return <Route path={pathname} component={component} />
        }
        if (isLogin) {
            if (pathname === '/login') {
                return <Redirect to='/' />
            } else {
                if (targetRouterConfig) {
                    if(targetRouterConfig.type===undefined){
                        return <Route path={targetRouterConfig.path} component={targetRouterConfig.component} />
                    }else if(targetRouterConfig.type!==undefined&targetRouterConfig.type===login_type){
                        return <Route path={targetRouterConfig.path} component={targetRouterConfig.component} />
                    }else{
                        return <Redirect to='/404' />
                    }
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
export class FrontendAuth1 extends React.Component {
    render() {
        const { location, config } = this.props;
        const { pathname } = location;
        let isLogin = localStorage.getItem('__config_center_token') === "true" ? true : false;

        let targetRouterConfig ;
        if ((pathname.split("/").length - 1) === 2) {
            targetRouterConfig = config.find((v) => v.path === pathname);
        }else if((pathname.split("/").length - 1) === 1){
            return <div></div>
        }
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


import axios from 'axios';
import qs from 'qs';

const path = 'http://localhost:80'

export function isLogin (data, user) {
    user.login = data;
    axios({
        method: 'post',
        url: `${path}/public?public=loginSession`,
        data: qs.stringify(user),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        
    }).catch(function (error) {
        console.log(error);
    });
}
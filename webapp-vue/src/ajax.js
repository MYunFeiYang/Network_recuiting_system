import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true

const path='http://localhost/'

export function Login (data,callback){
    axios({
        method:'post',
        data:qs.stringify(data),
        url:`${path}public?public=login`,
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
        }
    }).then((Response)=>{
        callback(Response);
    }).catch((err)=>{

    })
}
export function LoginSession (user,login,callback){
    user.login=login;
    axios({
        method:'post',
        data:qs.stringify(user),
        url:`${path}public?public=loginSession`,
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
        }
    }).then((Response)=>{
        callback(Response);
    }).catch((err)=>{

    })
}
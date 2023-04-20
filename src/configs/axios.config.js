import axios from "axios";

let request = axios.create({
    timeout: 700000,
})


//判断是否是生产环境
if (process.env.NODE_ENV === 'development') {
    request.defaults.baseURL = 'http:///10.100.158.25:7777'//本地开发环境
} else if (process.env.NODE_ENV === 'production') {
    request.defaults.baseURL = 'http://162.14.109.182:9500'//正式环境
}

request.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
request.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

//请求拦截器
request.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if(token!==null){
        config.headers['token']=token
    }
    return config
},error => {
    return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use(response => {
    if(response.headers.token){
        localStorage.setItem("token",response.headers.token)
    }
    return response
},error => {
    let { response } = error
    if (response){
        switch(response.status){
            case 404:
            //进行错误跳转之类
            case 401:
                //用户未登录
                location.href='/#/index'
            case 403:
                //登录态失效
                break;
        }
    } else {
        //服务器没有返回结果 分两种情况 断网服务器崩了
        if(!window.navigator.onLine){
            //断网处理：跳转到断网页面
            return
        }
        return Promise.reject(error)
    }
})
export default request;


export const post=(url,params)=>{
    return new Promise((resolve, reject)=>{
        request.post(url,params)
            .then((res)=>{
                resolve(res)
            })
            .catch((err)=>{
                reject(err)
            })
    })
}
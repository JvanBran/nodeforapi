import axios from "axios";
// import store from "@/store";
// import { router } from '@/router/index'
import { message } from 'ant-design-vue'


axios.defaults.baseURL = "";
axios.defaults.timeout = 30000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["Cache-Control"] = "no-cache";
axios.defaults.headers["pragma"] = "no-cache";


let source = axios.CancelToken.source();

//请求添加token
axios.interceptors.request.use(request => {
  //request.headers["token"] = store.state.user.token ? encodeURI(store.state.user.token) : ""; // 已将userId保存在store中
  
  return request;
})

//切换页面取消请求
axios.interceptors.request.use(request => {
  request.cancelToken = source.token;
  return request;
});

// router.beforeEach((to, from, next) => {
//   source.cancel()
//   source = axios.CancelToken.source();
//   next()
// })
//登录过期跳转
axios.interceptors.response.use(response => {
  let data = response.data;
  if(['9999'].includes(data.code)){
    //store.commit('SET_TOKEN','')
    //router.push({ path: '/user/login',query: { redirect: router.currentRoute.fullPath }}) // 跳转到登录页面
  }
  return response;
})

//返回值解构
axios.interceptors.response.use(response => {
  let data = response.data;
  if(data.code=='0000'){
    return Promise.resolve(data);
  }else{
    message.error(data.msg);
    return new Promise(() => { });
  }
}, err => {
  const { response } = err;
  if (err && response) {
    switch (response.status) {
        case 400:
          message.error('错误请求');
          break;
        case 401:
          message.error('未授权，请重新登录');
          break;
        case 403:
          //message.error('用户为登陆！');
          //.push({ name: "login" ,query: { redirect: router.currentRoute.fullPath }}); // 跳转到登录页面
          break;
        case 404:
          message.error('请求错误,未找到该资源');
          break;
        case 405:
          message.error('请求方法未允许');
          break;
        case 408:
          message.error('请求超时');
          break;
        case 500:
          message.error('服务器端出错');
          break;
        case 501:
          message.error('网络未实现');
          break;
        case 502:
          message.error('网络错误');
          break;
        case 503:
          message.error('服务不可用');
          break;
        case 504:
          message.error('网络超时');
          break;
        case 505:
          message.error('http版本不支持该请求');
          break;
        default:
          message.error('连接错误'+response.status);
    }
  }
  if(err.code == 'ECONNABORTED'){
    message.error('请求超时!刷新重试。')
  }
  
  return new Promise(() => { });
})

export function post(url, data, otherConfig) {
  console.log('url: ', url);
  return axios.post(url, data, otherConfig);
}
export function get(url, data, otherConfig) {
  console.log('url: ', url);
  return axios.get(url, { params: data, ...otherConfig });
}

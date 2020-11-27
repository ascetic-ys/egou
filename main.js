import Vue from 'vue'
import store from './store'
import App from './App'
import {RESOURCE } from '@/api/resource.js'


// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)



const msg = (title, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		icon
	});
}
const loading = (title)=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showLoading({
		title
	})
}


const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


const service = (options) => {
  return new Promise(async (resolve, reject) => {
    let [error, r] = await uni.request({
      ...options,
      header: {
        'custom-header': 'hello' //自定义请求头信息
      }
    })
    if (r) {
      const resData = r.data
      switch (resData.code) {
        case 0:
          resolve(resData)
          break;
        case 401:
          reject(resData)
          uni.reLaunch({
            url: 'pages/withoutToken/login/login'
          });
          break;
        default:
          reject(resData)
          break;
      }
    }else{
      reject(error)
    }
  })
}
service.url = (url) => {
  return RESOURCE.URL_API + url
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 */
service.jointParams = (params = {}) => {
	let defaults = {
		't': new Date().getTime()
	}
	let urlParams = '?'
	for(var key in params){
		urlParams += key+'='+params[key]+'&'
		console.log(key+':'+params[key]);
　　	}
	urlParams += 't='+new Date().getTime()
	// urlParams = urlParams.slice(0,-1)
	return urlParams
}

function httpGet (url,data,prefix) {
	console.log("get请求参数：",data)
	if(!prefix){
		prefix = "order"
	}
  return service({
    url: service.url(prefix+"/"+url),
    method: 'GET',
    data
  })
}

function httpPost (url,data,prefix) {
	console.log("post请求参数：",data)
	if(!prefix){
		prefix = "order"
	}
  return service({
    url: service.url(prefix+"/"+url),
    method: 'POST',
    data
  })
}

function httpGetParams (url,data,prefix) {
	if(!prefix){
		prefix = "order"
	}
	let _url = service.url(prefix+"/"+url)+service.jointParams(data)
	console.log("get请求地址：",_url)
	return service({
		url: _url,
		method: 'GET',
		data
	})
}

function httpPostParams (url,data,prefix) {
	if(!prefix){
		prefix = "order"
	}
	let _url = service.url(prefix+"/"+url)+service.jointParams(data)
	console.log("post请求地址：",_url)
	return service({
		url: _url,
		method: 'POST',
		data
	})
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg,loading, prePage,httpGet,httpPost,httpGetParams,httpPostParams};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
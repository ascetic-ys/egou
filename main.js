import Vue from 'vue'
import store from './store'
import App from './App'
import {RESOURCE } from '@/api/resource.js'


// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

import Json from './Json' //测试用数据
/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const msg = (title, duration=2000, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
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
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
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

function httpGet (url,data) {
	console.log("get请求参数：",data)
  return service({
    url: service.url(url),
    method: 'GET',
    data
  })
}

function httpPost (url,data) {
	console.log("post请求参数：",data)
  return service({
    url: service.url(url),
    method: 'POST',
    data
  })
}

function httpGetParams (url,data) {
	let _url = service.url(url)+service.jointParams(data)
	console.log("get请求地址：",_url)
	return service({
		url: _url,
		method: 'GET',
		data
	})
}

function httpPostParams (url,data) {
	let _url = service.url(url)+service.jointParams(data)
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
Vue.prototype.$api = {msg,loading, json, prePage,httpGet,httpPost,httpGetParams,httpPostParams};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
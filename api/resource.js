let URL_API = 'https://zhonghe.huodongling.com/order/'
let URL_SHOW='https://zhonghe.huodongling.com/'

if(process.env.NODE_ENV === 'development'){
	URL_API = 'https://zhonghe.huodongling.com/order/'
	// URL_API='http://192.168.3.21:8080/order/'
	URL_SHOW='https://zhonghe.huodongling.com/'
}

export const RESOURCE = {
  URL_API,
  URL_SHOW,
}
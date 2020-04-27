let URL_API = 'http://47.104.155.25/order/'
let URL_SHOW='http://47.104.155.25/'

if(process.env.NODE_ENV === 'development'){
  URL_API='http://47.104.155.25/order/'
  URL_SHOW='http://47.104.155.25/'
}

export const RESOURCE = {
  URL_API,
  URL_SHOW
}
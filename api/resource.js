let URL_API = 'http://47.104.155.25/order/'
let URL_SHOW='http://47.104.155.25/'
let URL_API2='http://localhost:8046/admin/weChat'
let appid='wx06c619704536ab15'
let secert='5e939cbb2b2271bc063366798e0ce326'
let grantType='authorization_code'

if(process.env.NODE_ENV === 'development'){
  URL_API='http://47.104.155.25/order/'
  URL_SHOW='http://47.104.155.25/'
  URL_API2='http://localhost:8046/admin/weChat'
}

export const RESOURCE = {
  URL_API,
  URL_API2,
  URL_SHOW,
  appid,
  secert,
  grantType
}
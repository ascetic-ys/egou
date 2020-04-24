let URL_API = 'http://47.104.155.25/order/'

if(process.env.NODE_ENV === 'development'){
  URL_API='http://47.104.155.25/order/'
}

export const RESOURCE = {
  URL_API
}
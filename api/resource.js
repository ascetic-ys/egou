let URL_API = 'https://zhonghekeep.com/'
let URL_SHOW='https://zhonghekeep.com/'
let COMPANY_NAME='柏福车饰'

if(process.env.NODE_ENV === 'development'){
	URL_API = 'http://localhost:8080/'
	URL_SHOW='http://localhost:8080/'
}

export const RESOURCE = {
  URL_API,
  URL_SHOW,
  COMPANY_NAME
}
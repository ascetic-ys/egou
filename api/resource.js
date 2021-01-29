let URL_API = 'https://jj.bofuchepin.com/'
let URL_SHOW='https://jj.bofuchepin.com/'
let COMPANY_NAME='柏福地板'

if(process.env.NODE_ENV === 'development'){
	URL_API = 'http://localhost:8080/'
	URL_SHOW='http://localhost:8080/'
}

export const RESOURCE = {
  URL_API,
  URL_SHOW,
  COMPANY_NAME
}
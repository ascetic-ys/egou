let URL_API = 'https://zhonghekeep.com/'
let URL_SHOW='https://zhonghekeep.com/'

if(process.env.NODE_ENV === 'development'){
	URL_API = 'https://zhonghekeep.com/'
	URL_SHOW='https://zhonghekeep.com/'
}

export const RESOURCE = {
  URL_API,
  URL_SHOW,
}
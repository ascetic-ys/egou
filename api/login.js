import store from '@/store'

//微信授权
export const wxToAuth = (formData={})=> {
	let isCanUse=true;
	return uni.getUserInfo().then(userInfoRes=>{
		uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
		isCanUse = uni.getStorageSync("isCanUse")
		console.log("授权信息：",userInfoRes)
		if(userInfoRes.length>1){
			//登录
			uni.showLoading({
				title: '授权中...'
			})
			// 1.wx获取登录用户code
			return uni.login({provider: 'weixin'})
		}
	}).then(loginRes=>{
		console.log('loginRes',loginRes)
		if(isCanUse){return new Error()}
		//非第一次授权获取用户信息
		return uni.getUserInfo({provider: 'weixin'}).then(userInfoRes=>{
			const infoRes=userInfoRes[1]
			const {nickName,avatarUrl}=infoRes.userInfo
			return {userInfo:userInfoRes[1],loginData:loginRes[1]}
		});
	})
}
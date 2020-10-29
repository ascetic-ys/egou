<template>
	<view class="container paddingno">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper padding170">
			<!-- <view class="left-top-sign">LOGIN</view> -->
			<!-- <view class="welcome"> 欢迎回来！</view> -->
			<view class="logo-top">
				<view class="logo-img">
					<image src="/static/logo/login-logo.png"></image>
				</view>
				<view class="system-tip">柏福车品网购平台</view>
				<!-- <view class="login-tip">登录：</view> -->
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						type="number" 
						:value="form.phoneNumber" 
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="phoneNumber"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						:value="form.userPassword" 
						placeholder="请输入密码"
						placeholder-class="input-empty"
						maxlength="18"
						password 
						data-key="userPassword"
						@input="inputChange"
					/>
				</view>
			</view>
			<button class='confirm-btn' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="toLogin">登录</button>
			<!-- <view class="forget-section">
				忘记密码?
			</view> -->
		</view>
		<view class="register-section">
			<text>还没有账号?</text>
			<button open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="toRegist">马上注册</button>
		</view>
		<view class="company-section">
			<text>平台技术：北京中和在线科技有限公司</text>
		</view>
	</view>
</template>

<script>
	import {wxToAuth} from '@/api/login.js'
	import {isMobile} from '@/api/validate.js'
	import {mapMutations} from 'vuex';
	
	export default{
		data(){
			return {
				flag:0,
				form:{
					phoneNumber: '',
					userPassword: '',
				}
			}
		},
		onLoad(e){
			this.flag=e.flag
		},
		methods: {
			...mapMutations(['login','setWeChat']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this.form[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			//先授权微信信息，再跳转注册页面
			toRegist(){
				wxToAuth().then(infoData=>{
					console.log('微信授权信息：',infoData)
					const {userInfo,loginData}=infoData
					this.setWeChat(userInfo.userInfo)
					uni.hideLoading();
					//授权成功后去注册页面
					uni.navigateTo({
						url:'/pagesUser/public/regist'
					})
				}).catch(e=>{
					console.log("注册请求错误：",e)
					this.$api.msg(e.msg||'授权失败')
					uni.hideLoading();
				})
			},
			//登录
			toLogin(){
				if(!this.verifyForm()){
					return
				}
				//授权登录
				wxToAuth(this.form).then(infoData=>{
					console.log(infoData)
					const {userInfo,loginData}=infoData
					console.log('注册请求参数：',this.form)
					this.setWeChat(userInfo.userInfo)
					//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息 及 前端输入的注册信息
					return this.$api.httpPost('userInfo/api/login',this.form)
				}).then(r=>{
					console.log('登录请求响应：',r)
					if(r.code==0){
						uni.hideLoading();
						console.log("登录成功：",r)
						// r.data.tag=2
						this.login(r.data)
						this.$api.msg('登录成功')
						this.changeTabBar(r.data.tag)
						uni.switchTab({
							url:'/pages/user/user'
						})
					}else{
						this.$api.msg(r.msg||'网络异常请重试')
					}
					uni.hideLoading();
				}).catch(e=>{
					uni.hideLoading();
					console.log("登录请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			changeTabBar(tag){
				if([0,2].indexOf(tag)>-1){
					uni.setTabBarItem({
					  index: 2,
					  text: '订单',
					  iconPath: "static/tab-order.png",
					  selectedIconPath: "static/tab-order-current.png",
					})
				}else if(tag==3){
					uni.setTabBarItem({
					  index: 2,
					  text: '业绩',
					  iconPath: "static/tab-achieve.png",
					  selectedIconPath: "static/tab-achieve-current.png",
					})
				}else if([1,4].indexOf(tag)>-1){
					uni.setTabBarItem({
					  index: 2,
					  text: '购物车',
					  iconPath: "static/tab-cart.png",
					  selectedIconPath: "static/tab-cart-current.png",
					})
				}
			},
			//校验参数
			verifyForm(){
				// 数据验证模块
				if(!this.form.phoneNumber){
					this.$api.msg('请输入手机号')
					return false
				}
				if(!isMobile(this.form.phoneNumber)){
					this.$api.msg('手机号格式不正确')
					return false
				}
				if(!this.form.userPassword){
					this.$api.msg('请输入密码')
					return false
				}
				return true
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
		.logo-top{
			display: flex;
			flex-direction: column;
			align-items: center;
			.logo-img{
				height: 200rpx;
				width: 200rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.system-tip{
				padding: 30rpx;
				color: #000000;
				font-size: 50rpx;
				font-weight: 800;
				letter-spacing: 10rpx;
				margin-bottom: 40rpx;
			}
			.login-tip{
				width: 100%;
				padding: 30rpx 70rpx;
			}
		}
		
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.company-section{
		position:absolute;
		left: 0;
		bottom: 40upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			flex: 1;
			line-height: 80rpx;
		}
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 100upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		display: flex;
		justify-content:center;
		text{
			margin-left: 10upx;
			flex: 1;
			line-height: 80rpx;
			text-align: right;
		}
		button{
			color: $font-color-spec;
			flex: 1;
			background: none;
			font-size: 26rpx;
			text-align: left;
		}
		button::after{
			border: none;
		}
		
	}
	.paddingno{
		padding-top: 0rpx !important;
	}
	.padding170{
		padding-top:170rpx ;
	}
</style>

<template>
	<view class="container">
		<view class="content">
			<view class="head-info">
				<view class="head-img">
					<image :src='weChat.avatarUrl'></image>
				</view>
				<view class="user-info">
					<view class="info">
						<text class="name">{{userInfo.userName}}</text>
						<image :src='userInfo.sex==1?`/static/images/female.png`:`/static/images/male.png`'></image>
					</view>
					<view class="phone">{{userInfo.phoneNumber}}</view>
				</view>
			</view>
			<view class="qr-code-img" v-if="type==1">
				<image :src='qrCodeImage1'></image>
			</view>
			<view class="qr-code-img" v-if="type==2">
				<image :src='qrCodeImage2'></image>
			</view>
			<view class="note-info">
				<text>扫一扫上面的二维码图案，绑定注册</text>
			</view>
		</view>
		<view class="change-qrcode" v-if="userInfo.isB!=2">
			<button class="code-img img-left" :class="[type==1?'show':'hide']" @click="changeType(1)">用户注册二维码</button>
			<button class="code-img img-right" :class="[type==2?'show':'hide']" @click="changeType(2)">城市渠道商B端注册二维码</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		data(){
			return {
				type:1,
				qrCodeImage1: '',
				qrCodeImage2: '',
				access_token:'',
				expires_in:0,
			}
		},
		onLoad(){
			// this.createQrCode()
			if(this.userInfo.isB==2){
				//是城市渠道商B端,只显示一个二维码
				this.type=1
			}
			this.qrCodeImage1=this.userInfo.userQrCode
			this.qrCodeImage2=this.userInfo.partnerQrCode
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			changeType(type){
				this.type=type
			},
			async createQrCode(){
				this.$api.httpPost('wechatPayInfo/api/getAccessToken').then(r=>{
					console.log("请求结果：",r)
					this.access_token=r.data.access_token
					this.expires_in=r.data.expires_in
					this.createUserRegQrcode()
					this.createBUserRegQrcode()
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
				
			},
			createUserRegQrcode(){
				var that = this;
				let url = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+this.access_token
				// 生成页面的二维码
				uni.request({
					//注意：下面的access_token值可以不可以直接复制使用，需要自己请求获取
					url: url,
					data: {
						width: 600,
						scene: 'phoneNumber='+that.userInfo.phoneNumber,
						page: "pages/public/regist"  //这里按照需求设置值和参数   
					},
					method: "POST",
					responseType: 'arraybuffer',  //设置响应类型
					success(res) {
						console.log(res)
						console.log(uni.arrayBufferToBase64(res.data))
						that.qrCodeImage1 = 'data:image/png;base64,'+uni.arrayBufferToBase64(res.data);  //对数据进行转换操作
					},
					fail(e) {
						console.log(e)
					}
				})
			},
			createBUserRegQrcode(){
				var that = this;
				let url = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+this.access_token
				// 生成页面的二维码
				uni.request({
					//注意：下面的access_token值可以不可以直接复制使用，需要自己请求获取
					url: url,
					data: {
						width: 600,
						scene: 'phoneNumber='+that.userInfo.phoneNumber,
						page: "pages/partner/partner"  //这里按照需求设置值和参数   
					},
					method: "POST",
					responseType: 'arraybuffer',  //设置响应类型
					success(res) {
						console.log(res)
						that.qrCodeImage2 = 'data:image/png;base64,'+uni.arrayBufferToBase64(res.data);  //对数据进行转换操作
					},
					fail(e) {
						console.log(e)
					}
				})
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: #F2F2F2;
	}
	.container{
		height: 100%;
		background: #F2F2F2;
		padding: 10% 5%;
		.content{
			background: #FFFFFF;
			padding: 30rpx;
			border-radius: 20rpx;
			box-shadow: 0 2rpx 10rpx #dcdcdc;
			.head-info{
				display: flex;
				justify-content: flex-start;
				.head-img{
					width: 140rpx;
					height: 140rpx;
					margin-right: 20rpx;
					image{
						border-radius: 15rpx;
						width: 100%;
						height: 100%;
					}
				}
				.user-info{
					display: flex;
					justify-content: space-around;
					flex-direction: column;
					.info{
						display: flex;
						justify-content: flex-start;
						line-height: 30rpx;
						height: 30rpx;
						.name{
							font-size: 30rpx;
							margin-right: 10rpx;
						}
						image{
							width: 30rpx;
							height: 30rpx;
						}
					}
					.phone{
						line-height: 30rpx;
						height: 30rpx;
						font-size: 30rpx;
						color: #606266;
					}
				}
			}
			.qr-code-img{
				display: flex;
				justify-content: center;
				margin: 50rpx 0;
				width: 600rpx;
				height: 600rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.note-info{
				text-align: center;
				margin-bottom: 20rpx;
				height: 28rpx;
				line-height: 28rpx;
				font-size: 28rpx;
				color: #606266;
			}
		}
		.change-qrcode{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			background: #FFFFFF;
			border-radius: 10rpx;
			.code-img{
				width: 50%;
				margin: 0;
				border-radius: 0;
				font-size: 28rpx;
			}
			.hide{
				background: none;
			}
			.show{
				background: #fa436a;
				color: #FFFFFF;
			}
			.img-left{
				border-top-left-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
			}
			.img-right{
				border-top-right-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
			}
			button::after{
				border: none;
			}
		}
	}
</style>

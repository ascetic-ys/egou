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
			<view class="qr-code-img">
				<image :src='qrCodeImage'></image>
			</view>
			<view class="note-info">
				<text>扫一扫上面的二维码图案，绑定注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		data(){
			return {
				qrCodeImage: '/static/or6mJ5SdnzMS6O6v3P8fouvhBiT4.jpg',
				access_token:'',
				expires_in:0,
			}
		},
		onLoad(){
			this.createQrCode()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			async createQrCode(){
				this.$api.httpPost('wechatPayInfo/api/getAccessToken').then(r=>{
					console.log("请求结果：",r)
					this.access_token=r.data.access_token
					this.expires_in=r.data.expires_in
					var that = this;
					let url = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+this.access_token
					// 生成页面的二维码
					uni.request({
						//注意：下面的access_token值可以不可以直接复制使用，需要自己请求获取
						url: url,
						data: {
							width: 600,
							scene: 'pUserId='+that.userInfo.id+'&phoneNumber='+that.userInfo.phoneNumber,
							page: "pages/public/regist"  //这里按照需求设置值和参数   
						},
						method: "POST",
						responseType: 'arraybuffer',  //设置响应类型
						success(res) {
							console.log(res)
							that.qrCodeImage = 'data:image/png;base64,'+uni.arrayBufferToBase64(res.data);  //对数据进行转换操作
						},
						fail(e) {
							console.log(e)
						}
					})
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
				
			}
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
	}
</style>

<template>
	<view class="container">
		<view class="notice-item" @click="navTo('/pages/notice/messageList?noticeType=1')">
			<view class="logo icon1">
				<text class="yticon icon-comment"></text>
			</view>
			<view class="title">
				<view class="info">
					<text class="info-desc">公告信息</text>
					<text class="info-num">总计{{num1||0}}条信息</text>
				</view>
				<text class="more-icon yticon icon-you"></text>
			</view>
		</view>
		<view class="notice-item" @click="navTo('/pages/notice/messageList?noticeType=2')">
			<view class="logo icon2">
				<text class="yticon icon-zuanshi"></text>
			</view>
			<view class="title">
				<view class="info">
					<text class="info-desc">预售信息</text>
					<text class="info-num">总计{{num2||0}}条信息</text>
				</view>
				<text class="more-icon yticon icon-you"></text>
			</view>
		</view>
		<view class="notice-item" @click="navTo('/pages/notice/messageList?noticeType=3')">
			<view class="logo icon3">
				<text class="yticon icon-xiaoxi"></text>
			</view>
			<view class="title">
				<view class="info">
					<text class="info-desc">系统信息</text>
					<text class="info-num">总计{{num3||0}}条信息</text>
				</view>
				<text class="more-icon yticon icon-you"></text>
			</view>
		</view>
		<view class="notice-item" @click="navTo('/pages/notice/messageList?noticeType=4')">
			<view class="logo icon4">
				<text class="yticon icon-icon-test1"></text>
			</view>
			<view class="title">
				<view class="info">
					<text class="info-desc">客服信息</text>
					<text class="info-num">总计{{num4||0}}条信息</text>
				</view>
				<text class="more-icon yticon icon-you"></text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num1:0,
				num2:0,
				num3:0,
				num4:0,
			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData(){
				this.$api.httpPost('notice/api/list',{
					pageNum:1,
					pageSize:1,
					noticeType:1
				},'system').then(r=>{
					console.log("请求结果：",r)
					this.num1=r.total
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
				this.$api.httpPost('notice/api/list',{
					pageNum:1,
					pageSize:1,
					noticeType:2
				},'system').then(r=>{
					console.log("请求结果：",r)
					this.num2=r.total
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
				this.$api.httpPost('notice/api/list',{
					pageNum:1,
					pageSize:1,
					noticeType:3
				},'system').then(r=>{
					console.log("请求结果：",r)
					this.num3=r.total
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
				this.$api.httpPost('notice/api/list',{
					pageNum:1,
					pageSize:1,
					noticeType:4
				},'system').then(r=>{
					console.log("请求结果：",r)
					this.num4=r.total
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			}, 
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}
	
	.container{
		display: flex;
		flex-direction: column;
		.notice-item{
			display: flex;
			justify-content: space-between;
			padding: 10px;
			background: #fff;
			margin-bottom: 10rpx;
			.logo{
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;

				text{
					width: 100%;
					height: 100%;
					font-size: 50rpx;
					color: #FFFFFF;
					line-height: 100rpx;
					display: flex;
					justify-content: center;

				}
			}
			.icon1{
				background: #8CD2EF;
			}
			.icon2{
				background: #F9AAA7;
			}
			.icon3{
				background: #F0C784;
			}
			.icon4{
				background: #C2AF9F;
			}
			.title{
				display: flex;
				justify-content: space-between;
				width: 610rpx;
				line-height: 100rpx;
				padding-left: 10px;
				.info{
					display: flex;
					flex-direction: column;
					line-height: 50rpx;

					.info-desc{
						
					}
					.info-num{
						font-size: 26rpx;
						color: #606266;
					}
				}
				.more-icon{
					line-height: 100rpx;
				}
			}
		}
	}
	
</style>

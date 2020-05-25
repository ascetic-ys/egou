<template>
	<view class="container">
		<view class="notice-item" @click="navTo('/pages/notice/messageList?noticeType=1')">
			<view class="logo icon1">
				<text class="yticon icon-comment"></text>
			</view>
			<view class="title">
				<text class="info">公告信息</text>
				<text class="more-icon yticon icon-you"></text>
			</view>
		</view>
		<view class="notice-item" @click="navTo('/pages/notice/messageList?noticeType=2')">
			<view class="logo icon2">
				<text class="yticon icon-zuanshi"></text>
			</view>
			<view class="title">
				<text class="info">预售信息</text>
				<text class="more-icon yticon icon-you"></text>
			</view>
		</view>
		<view class="notice-item" @click="navTo('/pages/notice/messageList?noticeType=3')">
			<view class="logo icon3">
				<text class="yticon icon-xiaoxi"></text>
			</view>
			<view class="title">
				<text class="info">系统信息</text>
				<text class="more-icon yticon icon-you"></text>
			</view>
		</view>
		<view class="notice-item" @click="navTo('/pages/notice/messageList?noticeType=4')">
			<view class="logo icon4">
				<text class="yticon icon-icon-test1"></text>
			</view>
			<view class="title">
				<text class="info">客服信息</text>
				<text class="more-icon yticon icon-you"></text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
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
					
				}
				.more-icon{
					
				}
			}
		}
	}
	
</style>

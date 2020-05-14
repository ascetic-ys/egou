<template>
	<view class="container">
		<view class="yt-list">
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">反馈时间</text>
				<text class="cell-tit2 clamp">{{dataInfo.feedbackDate}}</text>
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">反馈描述</text>
				<text class="cell-tit2 clamp">{{dataInfo.description}}</text>
			</view>
			<view class="yt-list-cell desc-cell" v-if="dataInfo.explain">
				<text class="cell-tit clamp">回复</text>
				<text class="cell-tit2 clamp">{{dataInfo.explain}}</text>
			</view>
			<view class="cell-img">
				<view class="image-box" v-for="(item,index) in showImgArr" :key="index" @tap="viewImage">
					<image :src="item" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	export default {
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		data() {
			return {
				id:'',
				dataInfo:{},//反馈信息
				showImgArr:[]
			}
		},
		onLoad(option){
			this.id=option.id
			this.initData()
		},
		methods: {
			initData(){
				this.$api.httpPost('customerFeedback/api/detail',{id:this.id}).then(r=>{
					console.log("请求结果：",r)
					this.dataInfo=r.data
					this.dataInfo.uploadFiles.forEach(e=>{
						this.showImgArr.push(RESOURCE.URL_SHOW+e)
					})
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			viewImage(e) {
				console.log("viewImage",e)
				uni.previewImage({
					urls: this.showImgArr,
					current: e.currentTarget.dataset.url,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}
	.container{
		padding-bottom: 100upx;
	}


	.yt-list {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 50upx;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}
		
		.cell-tit2 {
			flex: 3;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		&.desc-cell {
			display: flex;
			justify-content: space-between;
			.desc {
				flex: 3;
				font-size: $font-base;
				color: $font-color-dark;
				border: 1px solid #ccc;
				border-radius: 10rpx;
				padding: 10rpx;
				height: 240rpx;
			}
		}
	}
	
	.cell-img{
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		padding: 5rpx;
		.image-box{
			width: 247rpx;
			height: 247rpx;
			padding: 5rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}

</style>

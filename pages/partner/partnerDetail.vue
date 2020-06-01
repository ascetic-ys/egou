<template>
	<view class="container">
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">姓名</text>
			<text class="cell-tip">{{partner.partnername}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">手机号</text>
			<text class="cell-tip">{{partner.partnerPhone||''}}</text>
		</view>
		<view class="list-cell  b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">性别</text>
			<text class="cell-tip">{{partner.sex==0?'男':'女'}}</text>
		</view>
		<!-- <view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">邮箱</text>
			<text class="cell-tip">{{partner.email||''}}</text>
		</view> -->
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">推荐人</text>
			<text class="cell-tip">{{partner.referrer||''}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">推荐人手机号</text>
			<text class="cell-tip">{{partner.referrerPhone||''}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">出生日期</text>
			<text class="cell-tip">{{partner.birthday||''}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">注册日期</text>
			<text class="cell-tip">{{partner.regdate||''}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">所在区域</text>
			<text class="cell-tip">{{partner.province||''}}{{partner.city||''}}{{partner.district||''}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">身份证号码</text>
			<text class="cell-tip">{{partner.cardNumber||''}}</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	export default {
		data() {
			return {
				id:'',
				partner:{},
				showImage1:'',
				showImage2:''
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		onLoad(options) {
			this.id=options.id
			this.initData()
		},
		methods:{
			initData(){
				this.$api.httpPost('partner/api/detail',{id:this.id}).then(r=>{
					console.log("请求结果：",r)
					this.partner=r.data
					// this.showImage1=this.partner.cardFront?this.partner.cardFront:''
					// this.showImage2=this.partner.cardReverse?this.partner.cardReverse:''
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			previewImg(imgUrl){
				// 预览图片
				let imgList = [imgUrl]
				uni.previewImage({
					urls: imgList,
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
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.container{
		margin-bottom: 100rpx;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:20upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		.cell-img{
			position: absolute;
			top: 16upx;
			right: 20upx;
			border-radius: 50%;
			overflow: hidden;
			width: 80upx;
			height: 80upx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.cell-img2{
			position: absolute;
			top: 16upx;
			right: 20upx;
			overflow: hidden;
			width: 60upx;
			height: 60upx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>

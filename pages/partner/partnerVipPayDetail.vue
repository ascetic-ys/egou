<template>
	<view class="container">
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">会员起始日期</text>
			<text class="cell-tip">{{item.startDate}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">会员截止日期</text>
			<text class="cell-tip">{{item.endDate||''}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">支付费用</text>
			<text class="cell-tip">¥{{item.price||0}}元</text>
		</view>
		<view class="list-cell b-b" v-if="item.marketDate" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">市场审核日期</text>
			<text class="cell-tip">{{item.marketDate||''}}</text>
		</view>
		<view class="list-cell b-b" v-if="item.marketMan" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">市场审核人</text>
			<text class="cell-tip">{{item.marketMan||''}}</text>
		</view>
		<view class="list-cell b-b" v-if="item.marketOpinion" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">市场审核意见</text>
			<text class="cell-tip">{{item.marketOpinion||''}}</text>
		</view>
		<view class="list-cell b-b" v-if="item.marketConclusion" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">市场审核结论</text>
			<text class="cell-tip">{{item.marketConclusion||''}}</text>
		</view>
		<view class="list-cell b-b" v-if="item.financialDate" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">财务审核日期</text>
			<text class="cell-tip">{{item.financialDate||''}}</text>
		</view>
		<view class="list-cell b-b" v-if="item.financialMan" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">财务审核人</text>
			<text class="cell-tip">{{item.financialMan||''}}</text>
		</view>
		<view class="list-cell b-b" v-if="item.financialOpinion" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">财务审核意见</text>
			<text class="cell-tip">{{item.financialOpinion||''}}</text>
		</view>
		<view class="list-cell b-b" v-if="item.financialConclusion" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">财务审核结论</text>
			<text class="cell-tip">{{item.financialConclusion||''}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">审核状态</text>
			<text class="cell-tip">{{['未审核','审核中','审核通过','审核未通过'][item.auditState]||'未审核'}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">支付凭证</text>
			<view class="cell-img2" @tap.stop="previewImg(showImage)">
				<image :src="showImage" mode=""></image>
			</view>
		</view>
		<!-- auditState审核状态（0：未审核 1：审核中 2：审核通过 3：审核未通过） -->
		<view class="list-cell log-out-btn"  @tap="toPayPage()" v-if="[3].indexOf(item.auditState)>-1">
			<text class="cell-tit">去支付</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	export default {
		data() {
			return {
				item:{},
				showImage:''
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		onLoad(options) {
			this.item=JSON.parse(options.item)
			this.showImage=this.item.payImgPath
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			// 跳转会员续费界面
			toPayPage(){
				uni.navigateTo({
					url:`/pages/partner/partnerPayEdit?item=${JSON.stringify(this.item)}`
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

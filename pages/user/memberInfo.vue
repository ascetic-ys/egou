<template>
	<view class="container">
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">注册日期</text>
			<text class="cell-tip">{{userInfo.regDate}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">会员费用</text>
			<text class="cell-tip">{{userInfo.price||''}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">会员有效期</text>
			<text class="cell-tip">{{userInfo.validDate||''}}</text>
		</view>
		<view class="list-cell  b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">会员状态</text>
			<text class="cell-tip">{{userInfo.vipState==1?'有效':'过期'}}</text>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		onLoad() {
		},
		methods:{
			...mapMutations(['login','logout']),
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

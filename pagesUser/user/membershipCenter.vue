<template>
	<view class="container">
		<view class="list-cell b-b m-t" v-if="userInfo.ifVip!=2" @click="navTo('/pagesUser/user/memberProtocol')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-icon icon1 yticon icon-zuanshi"></text>
			<text class="cell-tit">成为会员</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" v-if="userInfo.ifVip==1" @click="navTo('/pagesUser/user/memberInfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-icon icon2 yticon icon-iLinkapp-"></text>
			<text class="cell-tit">会员信息</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" v-if="userInfo.ifVip==1" @click="navTo('/pagesUser/user/memberRenewal')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-icon icon3 yticon icon-iconfontweixin"></text>
			<text class="cell-tit">会员续费</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" v-if="userInfo.ifVip==1" @click="navTo('/pagesProduct/product/list?ifVip=2')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-icon icon3 yticon icon-pingjia"></text>
			<text class="cell-tit">会员特权商品</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods:{
			navTo(url){
				// this.$api.msg(`跳转到${url}`);
				uni.navigateTo({
					url:url
				})
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
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
			margin-left:10upx;
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
		.cell-icon{
			font-size: 34rpx;
			padding-right: 10rpx;
		}
		.icon1{
			color: #5fcda2;
		}
		.icon2{
			color: #9789f7;
		}
		.icon3{
			color: #fa436a;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>

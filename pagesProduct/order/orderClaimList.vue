<template>
	<view class="content">
		<view class="claim-item" v-for="orderClaim in orderClaimsList" :key="orderClaim.id">
			<view class="yt-list">
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">申请日期</text>
					<text class="cell-tip">{{orderClaim.applyDate}}</text>
				</view>
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">状态</text>
					<text class="cell-tip">{{stateArr[orderClaim.state]}}</text>
				</view>
				<view class="yt-list-cell b-b">
					<button class="action-btn"  @tap.stop="gotoClaimDetail(orderClaim.id)"> 查看 </button>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import {mapState} from 'vuex';
	export default{
		data(){
			return{
				orderId:'',
				orderClaimsList:[],
				stateArr:['待处理','厂家协助','退款中','退款失败','退款成功','拒绝']
			}
		},
		onLoad(option){
			this.orderId=option.id
			this.initData()
		},
		methods:{
			initData(){
				this.$api.httpPost('claims/api/list',{orderId:this.orderId}).then(r=>{
					console.log("请求结果：",r)
					this.orderClaimsList=r.data
					
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//理赔详情
			gotoClaimDetail(id){
				uni.navigateTo({
					url:`/pagesProduct/order/orderClaimDetail?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	/* .claim-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx; 
		background: #fff;
		margin-top: 16upx;
	} */
	
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
	
		&.cell-hover {
			background: #fafafa;
		}
	
		&.b-b:after {
			left: 30upx;
		}
	
		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;
	
			&.hb {
				background: #ffaa0e;
			}
	
			&.lpk {
				background: #3ab54a;
			}
	
		}
	
		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}
	
		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}
	
		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;
	
			&.disabled {
				color: $font-color-light;
			}
	
			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
			}
		}
	
		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}
	
		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
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
	}
	.action-btn{
		width: 160upx;
		height: 56upx;
		margin-right: -5px;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		&:after{
			border-radius: 100px;
		}
		&.recom{
			background: #fff9f9;
			color: $base-color;
			&:after{
				border-color: #f7bcc8;
			}
		}
	}  
</style>

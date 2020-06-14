<template>
	<view class="app">
		<!-- <view class="order-state">
			<text class="state" :style="{color: orderInfo.stateTipColor}">{{orderInfo.stateTip}}</text>
		</view> -->
		<view class="goods-box">
			<scroll-view v-if="orderInfo.orderChildInfoList.length > 1" class="image-box" scroll-x>
				<view
					v-for="(goodsItem, goodsIndex) in orderInfo.orderChildInfoList" :key="goodsIndex"
					class="goods-item"
				>
					<image class="goods-img" :src="goodsItem.productInfo.imgPath||`https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg`" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view class="goods-box-single"
				v-if="orderInfo.orderChildInfoList.length === 1" 
				v-for="(goodsItem, goodsIndex) in orderInfo.orderChildInfoList" :key="goodsIndex"
			>
				<image class="goods-img" :src="goodsItem.productInfo.imgPath||`https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg`" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{goodsItem.productName}}</text>
					<text class="attr-box">{{goodsItem.productInfo.color}}  x {{goodsItem.productNum}}</text>
					<text class="price">{{goodsItem.totalPrice}}</text>
				</view>
			</view>
			
			<view class="order-info-box">
				<view class="order-title">
					<text class="title">订单编号：</text>
					<text class="title">下单时间：</text>
					<text class="title">支付状态：</text>
				</view>
				<view class="order-info">
					<text class="info">{{orderInfo.orderNo||''}}</text>
					<text class="info">{{orderInfo.orderDate||''}}</text>
					<text class="info">{{orderInfo.stateTip}}</text>
				</view>
			</view>
			
			<view class="price-box">
				共
				<text class="num">{{orderInfo.productNum}}</text>
				件商品 实付款
				<text class="price">{{orderInfo.orderPrice}}</text>
			</view>
		</view>
		<button class="mix-btn" :disabled='disabledPay' @click="paySubmit">立即支付</button>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				id:'',
				orderInfo: {},
				disabledPay:false
			};
		},
		onLoad(options) {
			 console.log("options:",options)
			 this.id=options.id
			 this.initData()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			initData(){
				this.$api.httpPost('orderMainInfo/api/detail',{id:this.id}).then(r=>{
					console.log("请求结果：",r)
					this.orderInfo=r.data
					//添加不同状态下订单的表现形式
					this.orderInfo = Object.assign(this.orderInfo, this.orderExp(this.orderInfo));
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//订单支付状态文字和颜色
			orderExp(item){
				//支付状态(0：未支付、1：支付中、2：支付成功、3：支付失败、4：超时、
				//5：申请退款、6：退款中、7：退款成功、8：退款失败、9：支付已关闭、10：退款已取消)
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+item.payState){
					case 0:
						stateTip = '未支付'; break;
					case 1:
						stateTip = '支付中'; break;
					case 2:
						stateTip = '支付成功'; break;
					case 3:
						stateTip = '支付失败'; break;
					case 4:
						stateTip = '超时'; break;
					case 5:
						stateTip = '申请退款'; break;
					case 6:
						stateTip = '退款中'; break;
					case 7:
						stateTip = '退款成功'; break;
					case 8:
						stateTip = '退款失败'; break;
					case 9:
						stateTip = '支付已关闭'; break;
					case 10:
						stateTip = '退款已取消'; 
						stateTipColor = '#909399';
						break;
					default:
						stateTip = '待付款';
					//更多自定义
				}
				return {stateTip, stateTipColor};
			},
			//确认支付
			paySubmit: async function() {
				this.disabledPay=true
				console.log("支付请求：",this.orderInfo)
				let params = this.orderInfo
				params.tag=this.userInfo.tag
				params.type=1
				this.$api.httpPost('wechatPayInfo/api/payMoney',params).then(r=>{
					console.log("支付结果：",r)
					if(r.code==0){
						let _this = this
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: r.data.resp.timeStamp,
							nonceStr: r.data.resp.nonceStr,
							package: r.data.resp.package,
							signType: r.data.resp.signType,
							paySign: r.data.resp.sign,
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
								// this.$api.msg(r.msg||'支付成功')
								//跳转至支付结果
								uni.redirectTo({
									url: `/pagesProduct/money/paySuccess?id=${_this.orderInfo.id}`
								})
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
								_this.$api.msg(err||'网络异常请重试')
								_this.disabledPay=false;
							}
						});
					}else{
						this.$api.msg(r.msg||'网络异常请重试')
						this.disabledPay=false;
					}
					uni.hideLoading()
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading()
					this.disabledPay=false;
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}
	.order-state{
		margin: 100rpx;
		text-align: center;

	}
	
	/* 多条商品 */
	.goods-box{
		padding: 40rpx;
		white-space: nowrap;
		background: #F8F8F8;
		margin: 40rpx;
		border-radius: 40rpx;
		box-shadow: 0 2rpx 10rpx #dcdcdc;
		white-space: nowrap;
		.goods-item{
			width: 120upx;
			height: 120upx;
			display: inline-block;
			margin-right: 24upx;
		}
		.goods-img{
			display: block;
			width: 100%;
			height: 100%;
		}
		.order-info-box{
			margin: 40rpx 0;
			display: flex;
			justify-content: space-between;
			.order-title{
				flex: 1;
				display: flex;
				justify-content: space-between;
				flex-direction:column;
				.title{
					line-height: 50rpx;
					font-size: 26rpx;
					color: #606266;
				}
			}
			.order-info{
				flex: 2;
				display: flex;
				justify-content: space-between;
				flex-direction:column;
				.info{
					line-height: 50rpx;
					font-size: 26rpx;
					color: #606266;
				}
			}
		}
	}
	/* 单条商品 */
	.goods-box-single{
		display: flex;
		padding: 20upx 0;
		.goods-img{
			display: block;
			width: 120upx;
			height: 120upx;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30upx 0 24upx;
			overflow: hidden;
			.title{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}
			.attr-box{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 10upx 12upx;
			}
			.price{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}
	
	.price-box{
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		padding: 20upx 30upx;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		.num{
			margin: 0 8upx;
			color: $font-color-dark;
		}
		.price{
			font-size: $font-lg;
			color: $font-color-dark;
			&:before{
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}
	}

	
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>

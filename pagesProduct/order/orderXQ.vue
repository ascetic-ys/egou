<template>
	<view class="container">
		<!-- 地址 -->
<!-- 		<navigator :url="`/pagesInfo/customer/goodsliu?orderId=${orderInfo.id}`" class="address-section" v-if="orderInfo.orderState != 0">
 -->		<navigator  class="address-section" v-if="orderInfo.orderState != 0">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{orderInfo.receiverLinkMan}}</text>
						<text class="mobile">{{orderInfo.receiverPhoneNumber}}</text>
					</view>
					<text class="address">{{orderInfo.receiverAddress}}</text>
				</view>
				<!-- <text class="yticon icon-you"></text> -->
			</view>
		</navigator>

		<!-- 按厂家分组 -->
		 <view class="goods-section">
			<view class="g-item" v-for="(group,pi) in orderInfo.groupList" :key='pi'>
				<view class="g-header">
					<text class="name">{{group.factoryName}}</text>
				</view>
				<view class="goods-box" v-for="(product,pi) in group.orderChildInfoList" :key='pi' @click="navToProductDetailPage(product.productId)">
					<image :src="product.imgPath||'/static/errorImage.jpg'"></image>
					<view class="right">
						<text class="title clamp">{{product.productName}}</text>
						<text class="spec">{{product.color}}</text>
						<view class="price-box">
							<text class="price">{{product.unitPrice}}￥/m²</text>
							<text class="number">x {{product.colorSpecification}}m²/包</text>
							<text class="number">x {{product.productNum}}</text>
							<!-- <text class="deliveryMethod">发货方式: {{product.deliveryMethod||'-'}}</text> -->
						</view>
					</view>
				</view>
				<view class="wuliu-box b-t" 
				v-if="[3,4].indexOf(orderInfo.orderState)>-1&&group.orderChildInfoList[0].logisticsContrastId" 
				@tap.stop="gotowl(orderInfo.id,group.factoryNo)">
					<view class="left-box">
						<text class="left">配送</text>
					</view>
					<view class="middle-box">
						<text class="top middle" >快递运输</text>
						<text class="bottom middle" >工作日、双休日与节假日均可送货</text>
					</view>
					<view class="right-box">
						<text class="yticon icon-you" ></text>
					</view>
				</view>
				<view class="wuliu-box b-t" >
					<view class="left-box">
						<text class="left">总金额</text>
					</view>
					<!-- <view class="middle-box">
						<text class="top middle" >快递运输</text>
						<text class="bottom middle" >工作日、双休日与节假日均可送货</text>
					</view> -->
					<view class="right-box">
						<text >￥{{getTotalPrice(group.orderChildInfoList)}}</text>
					</view>
				</view>
			</view>
		</view> 
		
		<!-- 不按厂家分组 -->
		<!-- <view class="goods-section">
			<view class="g-item">
				<view class="goods-box" v-for="(product,pi) in orderInfo.orderChildInfoList" :key='pi' @click="navToProductDetailPage(product.productId)">
					<image :src="product.imgPath"></image>
					<view class="right">
						<text class="title clamp">{{product.productName}}</text>
						<text class="spec">{{product.color}}</text>
						<view class="price-box">
							<text class="price">￥{{product.unitPrice}}</text>
							<text class="number">x {{product.productNum}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="wuliu-box b-t" @tap.stop="gotowl(orderInfo.id)">
				<view class="left-box">
					<text class="left">配送</text>
				</view>
				<view class="middle-box">
					<text class="top middle" >快递运输</text>
					<text class="bottom middle" >工作日、双休日与节假日均可送货</text>
				</view>
				<view class="right-box">
					<text class="yticon icon-you" ></text>
				</view>
			</view>
		</view> -->

		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单状态</text>
				<text class="cell-tip red">{{orderInfo.stateTip}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">发票税点金额</text>
				<text class="cell-tip red">￥{{orderInfo.taxPointAllPrice}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">安装费用</text>
				<text class="cell-tip red">￥{{orderInfo.installFeeTotal}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">龙骨安装费</text>
				<text class="cell-tip red">￥{{orderInfo.keelInstallationFeeTotal}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">定金总金额</text>
				<text class="cell-tip red">￥{{orderInfo.totalDepositAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">尾款</text>
				<text class="cell-tip red">￥{{orderInfo.totalDepositAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单金额</text>
				<text class="cell-tip red">￥{{orderInfo.orderPrice}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单编号</text>
				<text class="cell-tip">{{orderInfo.orderNo}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单日期</text>
				<text class="cell-tip">{{orderInfo.orderDate}}</text>
			</view>
			<!-- <view class="yt-list-cell b-b" v-if="orderInfo.orderState != 0">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">免运费</text>
			</view>
			<view class="yt-list-cell b-b" v-if="orderInfo.orderState != 0">
				<text class="cell-tit clamp">物流公司</text>
				<text class="cell-tip">韵达快递</text>
			</view>
			<view class="yt-list-cell b-b" v-if="orderInfo.orderState != 0">
				<text class="cell-tit clamp">物流单号</text>
				<text class="cell-tip">45612644646</text>
			</view> -->
			<view class="yt-list-cell b-b" v-if="this.orderInfo.filePath">
				<text class="cell-tit clamp">行驶证</text>
				<view class="cell-img2" @tap.stop="previewImg(showImage)">
					<image :src="showImage" mode=""></image>
				</view>
			</view>
			<!-- <view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view> -->
		</view>
		
		<!-- 底部 -->
		<view class="footer" v-if="orderInfo.orderState != 0 && [1,4].indexOf(userInfo.tag)>-1">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{orderInfo.orderPrice}}</text>
			</view>
			<view class="footer-btn">
				<button class="submit" :disabled="submitDisabled" v-if="orderInfo.orderState==1" @click="cancelOrder">取消订单</button>
				<!-- <button class="submit" :disabled="submitDisabled" v-if="orderInfo.orderState==2" @click="applyRefund">申请退款</button> -->
				<button class="submit" :disabled="submitDisabled" v-if="orderInfo.orderState==3" @click="confirmReceipt">确认收货</button>
				<button class="submit" :disabled="submitDisabled" v-if="orderInfo.orderState==4" @click="applyFeedback">售后反馈</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	
	var Decimal = require('decimal.js');
	
	export default {
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		data() {
			return {
				id:'',
				orderInfo:{},//订单信息
				showImage:'',
				submitDisabled:false
			}
		},
		onLoad(option){
			this.id=option.id
			this.initData()
		},
		methods: {
			async initData(){
				this.$api.httpPost('orderMainInfo/api/detail',{
					id:this.id
				}).then(r=>{
					console.log("请求结果：",r)
					this.orderInfo=r.data
					this.showImage=this.orderInfo.filePath?this.orderInfo.filePath:''
					this.orderInfo = Object.assign(this.orderInfo, this.orderExp(this.orderInfo));
					let orderChildInfoList = []
					this.orderInfo.groupList.forEach(e=>{
						console.log("e：",e)
						e.orderChildInfoList.forEach(x=>{
							orderChildInfoList.push(x)
						})
					})
					this.orderInfo.orderChildInfoList=orderChildInfoList
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
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
			},
			//取消订单
			cancelOrder(){
				this.submitDisabled=true
				this.$api.loading('请求中...')
				this.$api.httpPost('orderMainInfo/api/delete',{
					id:this.orderInfo.id
				}).then(r=>{
					console.log('请求结果：',r)
					uni.hideLoading()
					if(r.code==0){
						this.$api.msg(r.msg||'取消成功')
						uni.navigateTo({
							url: `/pagesProduct/order/order`
						})
					}else{
						this.submitDisabled=false
						this.$api.msg(r.msg||'网络错误请重试')
					}
				}).catch(e=>{
					uni.hideLoading()
					this.submitDisabled=false
					console.log('请求错误：',e)
					this.$api.msg(e.msg||'网络错误请重试')
				})
			},
			// 物流
			gotowl(id){
				uni.navigateTo({
					url:`/pagesInfo/customer/goodsliu?orderId=${id}`
				})
			},
			//申请退款
			applyRefund(){
				
			},
			//确认收货
			confirmReceipt(){
				let _this = this
				uni.showModal({
					title:'温馨提示',
					content:'您是否收到订单所有商品？',
					cancelText:'取消',
					confirmText:'已收货',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.submitDisabled=true
							_this.$api.loading('请求中...')
							_this.$api.httpPost('orderMainInfo/api/update',{
								id:_this.orderInfo.id
							}).then(r=>{
								console.log('请求结果：',r)
								uni.hideLoading()
								if(r.code==0){
									_this.$api.msg(r.msg||'操作成功')
									_this.orderInfo.orderState = 4
									_this.orderInfo = Object.assign(_this.orderInfo, _this.orderExp(_this.orderInfo));
								}else{
									_this.submitDisabled=false
									_this.$api.msg(r.msg||'网络错误请重试')
								}
							}).catch(e=>{
								uni.hideLoading()
								_this.submitDisabled=false
								console.log('请求错误：',e)
								_this.$api.msg(e.msg||'网络错误请重试')
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			//申请售后
			applyFeedback(){
				uni.navigateTo({
					url: `/pagesProduct/order/orderService?orderId=${this.orderInfo.id}&orderNo=${this.orderInfo.orderNo}`
				})
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type){
				this.payType = type;
			},
			submit(){
				this.$api.msg('确认收货成功！')
			},
			//订单状态文字和颜色
			orderExp(item){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+item.orderState){
					case 0:
						stateTip = '已取消'; 
						stateTipColor = '#909399';
						break;
					case 1:
						stateTip = '待付款'; break;
					case 2:
						stateTip = '待发货'; break;
					case 3:
						stateTip = '待收货'; break;
					case 4:
						stateTip = '已完成'; break;
					case 5:
						stateTip = '待确认'; break;
					case 9:
						stateTip = '订单已关闭'; 
						stateTipColor = '#909399';
						break;
					default:
						stateTip = '待付款';
					//更多自定义
				}
				let submitDisabled=false
				return {stateTip, stateTipColor,submitDisabled};
			},
			//详情
			navToProductDetailPage(id){
				uni.navigateTo({
					url: `/pagesProduct/product/product?id=${id}`
				})
			},
			getTotalPrice(orderChildInfoList){
				let totalPrice = 0
				for(let item of orderChildInfoList){
					totalPrice = new Decimal(item.unitPrice).mul(item.productNum).mul(item.colorSpecification).plus(totalPrice)
				}
				return totalPrice.toString()
			},
			stopPrevent(){}
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

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;
		
		

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			position: relative;
			.name {
				margin-left: 0upx;
			}
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			flex-direction: column;
			margin: 20upx 30upx;
			border-bottom: 1upx solid #EEEEEE;
			
			.goods-box{
				display: flex;
				margin-top: 10rpx;
				margin-bottom: 20rpx;
				image {
					flex-shrink: 0;
					display: block;
					width: 140upx;
					height: 140upx;
					border-radius: 4upx;
				}
				
				.right {
					flex: 1;
					padding-left: 24upx;
					overflow: hidden;
				}
				
				.title {
					font-size: 30upx;
					color: $font-color-dark;
				}
				
				.spec {
					font-size: 26upx;
					color: $font-color-light;
				}
				
				.price-box {
					display: flex;
					align-items: center;
					font-size: 32upx;
					color: $font-color-dark;
					padding-top: 10upx;
				
					.price {
						margin-bottom: 4upx;
					}
					.number{
						font-size: 26upx;
						color: $font-color-base;
						margin-left: 20upx;
					}
					
					.deliveryMethod {
						margin-left: auto;
						font-size: 26upx;
						color: $font-color-light;
					}
				}
				
				.step-box {
					position: relative;
				}
			}
			
		}
		.wuliu-box{
			display:flex;
			justify-content: space-between;
			padding: 20rpx;
			color: #505256;
			font-size: 28rpx;
			.left-box{
				display:flex;
				justify-content: space-between;
			}
			.middle-box{
				display:flex;
				flex-direction: column;
				text-align: right;
				flex: 1;
			}
			.right-box{
				text-align: right;
				line-height: 40rpx;
				padding-top: 14rpx;
				padding-left: 10rpx;
			}
		}
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
	
	/* 支付列表 */
	.pay-list{
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;
		.pay-item{
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;	
			position: relative;
		}
		.icon-weixinzhifu{
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}
		.icon-alipay{
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}
		.icon-xuanzhong2{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}
		.tit{
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}
	
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
		}
		.price-tip{
			color: $base-color;
			margin-left: 8upx;
		}
		.price{
			font-size: 36upx;
			color: $base-color;
		}
		.footer-btn{
			.submit{
				// display:flex;
				// align-items:center;
				// justify-content: center;
				width: 280upx;
				height: 100%;
				color: #fff;
				font-size: 32upx;
				background-color: $base-color;
			}
		}
	}
	
	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}

</style>

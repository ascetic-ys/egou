<template>
	<scroll-view class="container">
		<!-- 地址 -->
		<navigator url="/pagesInfo/address/address?source=1" class="address-section">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen" v-if="addressData&&addressData.phoneNumber">
					<view class="top">
						<text class="name">{{addressData.linkMan}}</text>
						<text class="mobile">{{addressData.phoneNumber}}</text>
					</view>
					<text class="address">{{addressData.receiverAddress}}</text>
				</view>
				<view class="cen" v-else>
					<view class="top">
						<text class="name">请选择收货地址</text>
					</view>
				</view>
				<text class="yticon icon-you"></text>
			</view>

			<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
		</navigator>

		<view class="goods-section">

			<!-- 商品列表 -->
			<!-- <view class="g-header b-b">
				<text class="name">柏福车饰</text>
			</view> -->
			<view v-for="(item,index) in goodsList" :key='index' class="good-box">
				<view style="background: #EEEEEE;height: 20rpx;"></view>
				<view class="g-header b-b">
					<text class="name">{{item.factoryName}}</text>
				</view>
				<view class="g-item" v-for="(product,mm) in item.productInfoList" :key='mm'>
					<image :src="product.imgPath||product.parentImgPath||`/static/errorImage.jpg`"></image>
					<view class="right">
						<text class="title clamp">{{product.productName}}</text>
						<text class="spec">{{product.chooseProductColor.color}}</text>
						<view class="price-box">
							<text class="price">￥{{product.chooseProductColor.salePrice}}</text>
							<text class="number">x {{product.productNum}}</text>
							<text class="deliveryMethod">发货方式: {{product.chooseDeliveryMethod}}</text>
						</view>
						<view class="price-box">
							<text class="deliveryMethod">物流类型: {{product.logisticsType|getLogisticsType}}</text>
						</view>
					</view>
				</view>
				<view class="wuliu-box b-t" >
					<view class="left-box">
						<text class="left">总金额</text>
					</view>
					<view class="right-box">
						<text >￥{{getTotalPrice(item.productInfoList)}}</text>
					</view>
				</view>
			</view>
		</view>

		

		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单金额</text>
				<text class="cell-tip">￥{{totalMoney}}</text>
			</view>

			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">￥{{fare}}</text>
			</view>
			<!-- <view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" maxlength="20" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view> -->
		</view>
		
		<!-- 发票 -->
		<navigator :url="`/pagesInfo/invoice/invoiceOrder?invoice=${JSON.stringify(invoice)}`" class="invoice-section yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">发票</text>
				<text class="cell-tip">{{showInvoice}}</text>
				<text class="yticon icon-you"></text>
			</view>
		</navigator>

		<view class="yt-list" v-if="isCustomizationFlag">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">品牌型号</text>
				<text class="cell-tip">{{model}}</text>
			</view>
		</view>

		<!-- 行驶证 -->
		<view class="yt-list-file" v-if="isCustomizationFlag">
			<view class="input-item2">
				<!-- <text class="tit" @tap="uploadCert">上传行驶证</text> -->
				<!-- <ocr-navigator  @onSuccess="driverSuccess" certificateType="drivingLicense" >
				  <button  class="ocr-wrapper">行驶证</button>
				</ocr-navigator> -->
				<ocr-navigator @onSuccess="driverSuccess" certificateType="drivingLicense" :opposite="false">
					<!-- <button class="ocr-wrapper">营业执照</button> -->
					<view class="upCarm">
						<image src="../../static/carm.png" mode=""></image>
						<text>行驶证</text>
					</view>
				</ocr-navigator>
				<image :src="showImg" mode=""></image>
			</view>
		</view>
		<view class="yt-list">

			<view class="yt-list-cell b-b">
				<textarea class="" placeholder="备注" maxlength="100" v-model="remarks" />
				</view>
			
		</view>
		
		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{totalMoney}}</text>
			</view>
			<view class="footer-btn">
				<button class="submit" :disabled='submitDisabled' @click="submit">提交订单</button>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	export default {
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				addressData: {},
				invoice:{
					invoiceType: 0,
					invoiceTitle: 0,
				},
				showInvoice: '不开发票',
				goodsList:[],
				totalMoney:null,
				groupProduct:undefined,//拼团信息
				groupMember:undefined,//拼团团长信息
				freightTemplate:undefined,//运费模板信息
				showImg:'',
				filePath:'',
				params:{},
				isCustomizationFlag:false,//是否有定制化商品
				submitDisabled:false,
				model:'',//品牌型号
				vin:'',//车辆识别码
				vehicleType:'',//车辆类型,
				remarks:'',
				fare: 0,//运费
				noDeliveryReason: null,//不配送原因
			}
		},
		filters: {
			getLogisticsType: function(value){
				if(value === 'DIRECT'){
					return '直达'
				}else if(value === 'SECOND'){
					return '二次物流'
				}else {
					return value
				}
			}
		},
		onLoad(option){
			//商品数据
			let data = JSON.parse(option.data);
			console.log(data);
			this.goodsList=data.goodsList
			this.totalMoney=data.totalMoney
			this.groupProduct=data.groupProduct
			this.groupMember=data.groupMember
			this.freightTemplate=data.freightTemplate
			this.initData()
		},
		watch: {
			invoice: {
				handler: function (val, oldVal) { 
					console.log(val)
					if(val.invoiceType === 1){
						this.showInvoice = '电子发票'
					}else if(val.invoiceType === 2){
						this.showInvoice = '纸质发票'
					}else {
						this.showInvoice = '不开发票'
					}
				},
				deep: true
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat']),
		},
		methods: {
			initData(){
				this.initAddressInfo()
				// this.initInvoiceInfo()
				this.goodsList.forEach(item=>{
					item.productInfoList.forEach(e=>{
						//是否定制（1：是 0：否）
						if(e.isCustomization==1){
							this.isCustomizationFlag=true
						}
					})
				})
			},
			//计算运费
			countFare(){
				//优先级 不配送 - 配送 - 包邮
				for(item of this.freightTemplate.templateDetailList){
					if(addressData.province == item.cityName){
						if(item.type==0){
							//配送
							this.fare = item.firstPrice
						}else {
							//不配送
							this.noDeliveryReason = '该地区受某些原因不支持配送，敬请谅解'
						}
					}
				}
			},
			initAddressInfo(){
				//获取默认地址
				this.$api.httpPost('userInfo/api/consigneeInfoList',{
					parentId:this.userInfo.id,
					isDefault:1,
					pageSize:1,
					pageNum:1
				}).then(r=>{
					console.log("默认地址请求结果：",r)
					if(r.rows&&r.rows.length>0){
						this.addressData=r.rows[0]
					}
				}).catch(e=>{
					console.log("请求错误：",e)
				})
			},
			initInvoiceInfo(){
				//获取默认发票
				this.$api.httpPost('userInfo/api/billingInfoList',{
					parentId:this.userInfo.id,
					isDefault:1,
					pageSize:1,
					pageNum:1
				}).then(r=>{
					console.log("默认发票请求结果：",r)
					if(r.rows&&r.rows.length>0){
						this.invoice=r.rows[0]
					}
				}).catch(e=>{
					console.log("请求错误：",e)
				})
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type){
				this.payType = type;
			},
			uploadCert(){
				let _this = this
				uni.chooseImage({count:1}).then(r=>{
					const [err,res]=r
					if(err){return}
					_this.filePath=res.tempFilePaths[0]
					// _this.showImg=res.tempFilePaths[0]
					const tempFilePaths = res.tempFilePaths;
					uni.uploadFile({
						url: RESOURCE.URL_API + 'order/orderMainInfo/api/uploadImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'uploadFile',
						formData: {},
						success: (uploadFileRes) => {
							console.log("上传图片结果string：",uploadFileRes);
							if(uploadFileRes.statusCode===200){
								let r = JSON.parse(uploadFileRes.data);
								console.log("上传图片：",r);
								_this.filePath = r.msg;
								_this.showImg=r.msg
							}else{
								_this.$api.msg('上传失败')
							}
						}
					});
				})
			},
			//行驶证识别
			driverSuccess(res){
				console.log(res)
				this.model = res.detail.model.text
				this.vin = res.detail.vin.text
				this.vehicleType = res.detail.vehicle_type.text
				let _this = this
				uni.uploadFile({
					url: RESOURCE.URL_API + 'order/orderMainInfo/api/uploadImage', //仅为示例，非真实的接口地址
					filePath:res.detail.image_path,
					name: 'uploadFile',
					formData: {},
					success: (uploadFileRes) => {
						console.log("上传图片结果string：",uploadFileRes);
						if(uploadFileRes.statusCode===200){
							let r = JSON.parse(uploadFileRes.data);
							_this.filePath = r.msg;
							_this.showImg=r.msg
						}else{
							_this.$api.msg('上传失败')
						}
					}
				});
			},
			//提交订单
			submit(){
				if(!this.validateForm()){
					return
				}
				this.submitDisabled=true
				this.params.remarks=this.remarks
				this.$api.loading('请求中...')
				this.$api.httpPost('orderMainInfo/api/save',this.params
				).then(r=>{
					console.log('请求结果：',r)
					uni.hideLoading()
					if(r.code==0){
						// this.$api.msg(r.msg||'添加成功')
						uni.navigateTo({
							url: `/pagesProduct/money/pay?id=${r.data.id}`
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
			//
			validateForm(){
				this.getParams()
				console.log("params:",this.params)
				if(!this.params.receiverAddress){
					this.$api.msg('请选择收件地址')
					return false
				}
				//有定制化商品需要上传行驶证
				/* if(this.isCustomizationFlag&&!this.params.filePath){
					this.$api.msg('请上传行驶证')
					return false
				} */
				if(this.params.orderChildInfoList.length<=0){
					this.$api.msg('商品信息丢失')
					return false
				}
				return true
			},
			getParams(){
				let productNum = 0
				let orderChildInfoList = []
				this.goodsList.forEach(item=>{
					item.productInfoList.forEach(e=>{
						productNum+=e.productNum
						let item = {
							productName:e.productName,//商品名称
							productNum:e.productNum,//商品数量
							unitPrice:e.chooseProductColor.salePrice,//单价
							totalPrice:Number(e.chooseProductColor.salePrice*e.productNum),//总价
							productId:e.productId,//商品ID
							factoryNo:e.factoryNo,
							factoryName:e.factoryName,
							factoryShortName:e.factoryShortName,
							color:e.chooseProductColor.color,
							imgPath:e.chooseProductColor.imgPath,
							rebatesMode:e.chooseProductColor.rebatesMode,
							rebatesProportion:e.chooseProductColor.rebatesProportion,
							raisePrice:e.chooseProductColor.raisePrice,
							factoryPrice:e.chooseProductColor.price,
							deliveryMethod: e.chooseDeliveryMethod,
							logisticsType: e.logisticsTypeVal
						}
						orderChildInfoList.push(item)
					})
				})
				this.params={
					customer:this.userInfo.userName,
					linkMan:this.userInfo.linkMan,//联系人
					phoneNumber:this.userInfo.phoneNumber,//手机号
					productNum:productNum,//商品总数量
					orderPrice:this.totalMoney,//订单金额
					receiverProvince:this.addressData.province,//省
					receiverCity:this.addressData.city,//市
					receiverDistrict:this.addressData.district,//区
					receiverAddress:this.addressData.receiverAddress,//收货地址
					receiverLinkMan:this.addressData.linkMan,//收货联系人
					receiverPhoneNumber:this.addressData.phoneNumber,//收货人电话
					isOpen:this.invoice.invoiceType!==0?'是':'否',//是否开票（是或否）
					invoiceType:this.invoice.invoiceType,
					invoiceTitle:this.invoice.invoiceTitle,
					companyName:this.invoice.companyName,//公司名称
					duty:this.invoice.duty,//税号
					companyPhoneNumber:this.invoice.phoneNumber,//公司电话
					companyAddress:this.invoice.address,//公司地址
					openingBank:this.invoice.openingBank,//开户行
					account:this.invoice.account,//账户
					userId:this.userInfo.id,//用户ID
					salesPersonPhoneNumber:this.userInfo.salesPersonPhoneNumber,//销售人员电话
					filePath:this.filePath,//附件路径
					orderChildInfoList:orderChildInfoList,//商品信息
					model:this.model,//品牌型号
					vin:this.vin,//车辆识别码
					vehicleType:this.vehicleType,//车辆类型
					groupProduct:this.groupProduct,//拼团模板信息
					groupMember: this.groupMember,//拼团团长信息
					isCustomization: this.isCustomizationFlag?1:0,//是否定制
				}
			},
			getTotalPrice(productInfoList){
				//解决浮点精度丢失问题
				var Decimal = require('decimal.js');
				let totalPrice = 0
				for(let item of productInfoList){
					let salePrice = new Decimal(item.chooseProductColor.salePrice)
					totalPrice = salePrice.mul(item.productNum).plus(totalPrice)
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
		padding-bottom: 100upx;
	}
	.container{
		padding-bottom: 100rpx;
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
		background: #EEEEEE;
		padding-bottom: 1px;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.good-box {
			background: #fff;
			width: 94%;
			border-radius: 12upx 12upx 12upx 12upx;
		}

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
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
		
		.wuliu-box{
			display:flex;
			justify-content: space-between;
			padding: 20rpx;
			color: #505256;
			font-size: 28rpx;
			.left-box{
				display:flex;
				justify-content: space-between;
				margin-left: 24upx;
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

		.g-item {
			display: flex;
			margin: 20upx 30upx;

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
	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #EEEEEE;
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
	}
	.yt-list-file {
		margin-top: 16upx;
		background: #fff;
		margin-bottom: 20rpx;
		.input-item2{
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30upx;
			height: 220upx;
			border-radius: 4px;
			image{
				width: 30%;
				height: 100%;
			}
			.tit{
				font-size: $font-lg;
				background-color: #ccc;
				padding: 20upx;
				border-radius: 10upx;
				color:#303133
			}
			.upCarm{
				height: 180rpx;
				width: 300rpx;
				padding: 20rpx;
				display: flex;
				border-radius: 12rpx;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				border: 1rpx dashed #4CD964;
				
				image{
					width: 90rpx;
					height: 90rpx;
				}
				text{
					color: #909399;
					padding-top: 20rpx;
					font-size: 24rpx;
				}
				
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
	/* ocr 识别按钮样式 */
	.ocr-wrapper {
	  font-size: 24rpx;
	  background-color: #ccc;
	  padding: 20upx 0;
	  height: 60rpx;
	  width: 180rpx;
	  line-height: 30rpx; 
	  border-radius: 10upx;
	  color:#303133
	}
</style>

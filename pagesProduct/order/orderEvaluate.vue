<template>
	<view class="container">
		
		<!-- 按厂家分组 -->
		 <view class="goods-section">
			<view class="g-item" v-for="(group,pi) in orderInfo.groupList" :key='pi'>
				<view class="g-header">
					<text class="name">{{group.factoryName}}</text>
				</view>
				<view class="goods-box" v-for="(product,pi) in group.orderChildInfoList" :key='pi' >
					<image :src="product.imgPath||'/static/errorImage.jpg'"></image>
					<view class="right">
						<text class="title clamp">{{product.productName}}</text>
						<text class="spec">{{product.color}}</text>
						<view class="price-box">
							<text class="price">￥{{product.unitPrice}}</text>
							<text class="number">x {{product.productNum}}</text>
							<text class="deliveryMethod">发货方式: {{product.deliveryMethod||'-'}}</text>
						</view>
					</view>
				</view>
				<!-- <view class="wuliu-box b-t" 
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
				</view> -->
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

		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单编号</text>
				<text class="cell-tip">{{orderInfo.orderNo}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单状态</text>
				<text class="cell-tip red">{{orderInfo.stateTip}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="orderInfo.orderState != 0">
				<text class="cell-tit clamp">订单总计</text>
				<text class="cell-tip red">￥{{orderInfo.orderPrice}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">创建时间</text>
				<text class="cell-tip">{{orderInfo.orderDate}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品评价</text>
				<!-- <input v-model="evaluateLevel"> -->
				<uni-rate v-model="evaluateLevel" :readonly="isExist" :size="18" />
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">评价描述</text>
				<textarea class="desc" v-if="!isExist" v-model="description" placeholder="评价描述" maxlength="100"/>
				<text v-if="isExist">{{orderEvaluate.description}}</text>
			</view>
			
		</view>
			
		
		<view class="yt-list" v-if="!isExist">
			<view class="upload-list" hover-class="cell-hover" :hover-stay-time="50">
				<view class="upload-item">
					<text class="tit" @tap="uploadImage">上传图片</text>
				</view>
				<view class="cell-img">
					<view class="image-box" v-for="(item,index) in imgList" :key="index" @tap="viewImage">
						<image :src="item" mode=""></image>
						<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
							<text class='yticon icon-fork'></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="yt-list" v-if="isExist">
			<view class="upload-list" hover-class="cell-hover" :hover-stay-time="50">
			
				<view class="cell-img">
					<view class="image-box" v-for="(item,index) in orderFilePathList" :key="index" @tap="viewImage" >
						<image :src="item.filePath" mode="" @error="imageError" :data-img-index="index"></image>
						
					</view>
				</view>
			</view>
		</view> 
		
		<!-- 底部 -->
		<view class="footer" v-if="!isExist">
			<button class="confirm-btn" :disabled="submitDisabled" @tap="submit">提交</button>
		</view>

	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	/* import {uniRate } from '@/components/uni-rate/uni-rate.vue' */
	export default {
		computed: {
			...mapState(['hasLogin','userInfo','weChat']),
			/* uniRate */
		},
		data() {
			return {
				id:'',
				orderInfo:{},//订单信息
				submitDisabled:false,
				description:'',
				evaluateLevel:5,
				params:{},
				imgList:[],//选择的图片
				imageList:[],//图片地址
				orderEvaluate:{},
				isExist:false,
				orderFilePathList:[]
			}
		},
		onLoad(option){
			this.id=option.id
			this.initData()
		},
		methods: {
			getTotalPrice(orderChildInfoList){
				let totalPrice = 0
				for(let item of orderChildInfoList){
					totalPrice += item.unitPrice * item.productNum
				}
				return totalPrice
			},
			initData(){
				this.$api.httpPost('evaluate/api/detail',{orderId:this.id}).then(r=>{
					console.log("请求结果：",r)
					this.orderEvaluate=r.data
					
					if(r.data.id){
						this.evaluateLevel=r.data.evaluateLevel
						this.orderFilePathList=r.data.orderFilePathList
						this.isExist=true
					}
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
				this.$api.httpPost('orderMainInfo/api/detail',{id:this.id}).then(r=>{
					console.log("请求结果：",r)
					this.orderInfo=r.data
					this.orderInfo = Object.assign(this.orderInfo, this.orderExp(this.orderInfo));
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			
			//提交申请
			async submit(){
				this.imageList = await this.uploads()
				if(!this.description){
					this.$api.msg('请填写理赔原因！')
					return
				}
				if(!this.imageList || this.imageList.length==0){
					this.$api.msg('请上传图片！')
					return
				}
				this.params={
					userId: this.userInfo.id,
					userName: this.userInfo.userName,
					description:this.description,
					evaluateLevel:this.evaluateLevel,
					orderId:this.orderInfo.id,
					orderNo:this.orderInfo.orderNo,
					uploadFiles:this.imageList
				}
				this.submitDisabled=true
				this.$api.loading('请求中...')
				this.$api.httpPost('evaluate/api/save',this.params).then(r=>{
					console.log('请求结果：',r)
					uni.hideLoading()
					if(r.code==0){
						this.$api.msg(r.msg||'提交成功')
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
			stopPrevent(){},
			uploadImage(){
				let _this = this
				uni.chooseImage().then(r=>{
					const [err,res]=r
					if(err){return}
					_this.imgList = res.tempFilePaths;
				})
			},
			//小程序不支持多文件上传 
			async uploads(){ 
				const that=this
				let arr=[]
				for (let k in that.imgList) {
					let data = await that.uploadImageOne(that.imgList[k])
					arr[k] = data.msg
				} 
				return arr
			},
			uploadImageOne(url){
				return new Promise((resolve, reject) => {  
					uni.uploadFile({
						url: RESOURCE.URL_API + 'order/orderMainInfo/api/uploadImage', //仅为示例，非真实的接口地址
						filePath: url,
						name: 'uploadFile',
						success: (uploadFileRes) => { 
							resolve(JSON.parse(uploadFileRes.data));  
						}
					});
				})  
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			delImg(e) {
				console.log("e:",e,e.currentTarget.dataset.index)
				uni.showModal({
					title: '删除',
					content: '确定要删除吗？',
					cancelText: '否',
					confirmText: '是',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			imageError(e){
				let imgIndex=e.currentTarget.dataset.imgIndex
				this.orderFilePathList[imgIndex].filePath="/static/errorImage.jpg";
			}
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
			display: flex;
			justify-content: space-between;
			.desc {
				flex: 3;
				font-size: $font-base;
				color: $font-color-dark;
				border: 1px solid #ccc;
				border-radius: 10rpx;
				height: 240rpx;
				line-height: 28rpx;
				text-indent: 10rpx;
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
		.confirm-btn{
			width: 630upx;
			height: 76upx;
			line-height: 76upx;
			border-radius: 50px;
			background: $uni-color-primary;
			color: #fff;
			font-size: $font-lg;
			&:after{
				border-radius: 100px;
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

.upload-list{
		.upload-item{
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30upx;
			height: 130upx;
			border-radius: 4px;
			
			.tit{
				font-size: $font-lg;
				background-color: #ccc;
				padding: 20upx;
				border-radius: 10upx;
				color:#303133
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
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				.cu-tag{
					background: #fa436a;
					line-height: 32rpx;
					height: 32rpx;
					width: 32rpx;
					position: absolute;
					top: 5rpx;
					right: 5rpx;
					opacity: 0.7;
				}
			}
		}
	}
</style>

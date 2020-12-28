<template>
  <div class="total-wrap">
    <div class="logistics-title">物流跟踪</div>
	<view class="logistics-content" v-for="(logist, index) in list" :key="index">
		<view style="background: #EEEEEE;height: 4rpx;"></view>
		<view class="logic-company">
			<view class="info-box">
				<text class="title">国内承运人：</text>
				<text class="content">{{logist.logisticsCompany}}</text>
			</view>
			<view class="info-box">
				<text class="title">运单号：</text>
				<text class="content">{{logist.goodsNumber}}</text>
			</view>
		</view>
		
		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="goods-box" v-for="(order,pi) in logist.orderChildInfoList" :key='pi'>
				<image :src="order.imgPath||`https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=298298368,1308836146&fm=26&gp=0.jpg`"></image>
				<view class="right">
					<text class="title clamp">{{order.productName}}</text>
					<text class="spec">{{order.color}}</text>
					<view class="price-box">
						<text class="price">￥{{order.unitPrice}}</text>
						<text class="number">x {{order.productNum}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<block v-for="(trace, index2) in logist.newLogistList" :key="index2">
		  <trackNode :is-first="index2===logist.newLogistList.length-1" :is-newest="index2===0" :is-main-node="trace.isMainNode" :node-data="trace"></trackNode>
		</block>
    </view>
  </div>
</template>

<script>
import trackNode from '@/components/wuliuInfo/trackNode.vue'
export default {
	components: {
		trackNode
	},
	data () {
		return {
			orderId:'',
			factoryNo:'',
			orderInfo:{},
			tracesData: [],
			list:[]
		}
	},
	onLoad(options){
		console.log("options:",options)
		this.orderId=options.orderId
		// this.factoryNo=options.factoryNo
		// this.orderId=223
		// this.factoryNo='ys'
		this.initData()
	},
	methods:{
		initData(){
			this.tracesData=[]
			this.$api.httpPost('orderMainInfo/api/logisticsDescription',{
				orderId:this.orderId,
				factoryNo:this.factoryNo,
			}).then(r=>{
				console.log("请求结果：",r)
				this.list=r.data
				this.initTraceItem()
			}).catch(e=>{
				console.log("请求错误：",e)
				this.$api.msg(e.msg||'网络异常请重试')
			})
		},
		initTraceItem(){
			this.list.forEach(x=>{
				let newLogistList = []
				x.orderLogisticsDescriptionList.forEach(e=>{
					let data = {
						acceptStation: e.description,
						createTime: e.logisticsDate,
						status: '',
						statusName: '',
						isMainNode: false
					}
					newLogistList.push(data)
				})
				x.newLogistList=newLogistList
			})
		}
	
	}
}
</script>

<style lang="scss" scoped>
.total-wrap {
  width: 100vw;
  height: auto;
  box-sizing: border-box;
  padding: 0upx 40upx 0upx 20upx;
  .logistics-title {
    height: 72rpx;
    box-sizing: border-box;
    padding: 36rpx 0 8rpx;
    line-height: 28rpx;
    color: #4B4B4B;
    font-size: 26rpx;
    font-family: 'PingFangSC-Medium';
    text-align: left;
  }
}
.logistics-content{
	margin-bottom: 40rpx;
}
.logic-company{
	font-size: 26rpx;
	line-height: 50rpx;
	margin-left: 30rpx;
	margin-top: 20rpx;
	.info-box{
		display: flex;
		justify-content: flex-start;
		.title{
			width: 25%;
		}
		.content{
			width: 75%;
		}
	}
}

.goods-section {
	margin-top: 16upx;
	background: #fff;
	padding-bottom: 1px;
	display: flex;
	flex-direction: column;
	margin: 20upx 30upx;
		
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
		}
		
	}
}
</style>

<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>
		
		<view>
			<!-- 空白页 -->
			<!-- <empty v-if="list.length === 0"></empty> -->
			<mescroll-body :bottom='bottom' :up='upOption' @down="downCallback" @up="upCallback" @init="mescrollInit">
				<!-- 订单列表 -->
				<view v-for="(item,index) in list" :key="index" class="order-item" @tap="goOrderXQ(item.id)">
					<view class="i-top b-b">
						<text class="time">{{item.orderDate||''}}</text>
						<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
						<!-- <text 
							v-if="item.payState===9" 
							class="del-btn yticon icon-iconfontshanchu1"
							@click="deleteOrder(index)"
						></text> -->
					</view>
					<!-- 按厂家分组 -->
					<!-- <view
						class="goods-box-factory"
						v-for="(group, groupIndex) in item.groupList" :key="groupIndex"
					>
						<view class="b-b"></view>
						<view class="g-header" v-if="group.factoryShortName">
							<text class="name">{{group.factoryShortName}}</text>
						</view>
						<scroll-view v-if="group.orderChildInfoList.length > 1" class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in group.orderChildInfoList" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.imgPath||`https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg`" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view
							v-if="group.orderChildInfoList.length === 1" 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in group.orderChildInfoList" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.imgPath||`https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg`" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.productName}}</text>
								<text class="attr-box">{{goodsItem.color}}  x {{goodsItem.productNum}}</text>
								<text class="price">{{goodsItem.totalPrice}}</text>
							</view>
						</view>
						<view class="wuliu-box b-t" v-if="[3,4].indexOf(item.orderState)>-1" @tap.stop="gotowl(item.id,group.factoryNo)">
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
					
					<!-- 不按厂家分组 -->
					<view
						class="goods-box-factory"
					>
						<scroll-view v-if="item.orderChildInfoList.length > 1" class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in item.orderChildInfoList" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.imgPath||`https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg`" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view
							v-if="item.orderChildInfoList.length === 1" 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.orderChildInfoList" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.imgPath||`https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg`" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.productName}}</text>
								<text class="attr-box">{{goodsItem.color}}  x {{goodsItem.productNum}}</text>
								<text class="price">{{goodsItem.totalPrice}}</text>
							</view>
						</view>
					</view>
					
					<view class="price-box">
						共
						<text class="num">{{item.productNum}}</text>
						件商品 实付款
						<text class="price">{{item.orderPrice}}</text>
					</view>
					<view class="action-box b-t" v-if="item.orderState != 0">
						<button class="action-btn" v-if="[2,5].indexOf(item.orderState)>-1" :disabled="item.submitDisabled" @tap.stop="gotoRefund(item.id)">申请退款</button>
						<button class="action-btn" v-if="[3,4].indexOf(item.orderState)>-1" @tap.stop="gotowl(item.id)">查看物流</button>
						<button class="action-btn" v-if="item.orderState==1" :disabled="item.submitDisabled" @tap.stop="cancelOrder(item)">取消订单</button>
						<button class="action-btn" v-if="item.orderState==3" :disabled="item.submitDisabled" @tap.stop="confirmReceipt(item)">确认收货</button>
						<button class="action-btn" v-if="item.orderState==4" :disabled="item.submitDisabled" @tap.stop="feedback(item)">售后反馈</button>
						<button class="action-btn recom" v-if="item.orderState==1" @tap.stop="toPay(item)">立即支付</button>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template> 

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	import empty from "@/components/empty";
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			empty
		},
		data() {
			return {
				bottom:120,
				upOption:{
					auto:false,
				},
				tabCurrentIndex: 0,
				list: [],
				navList: [
					{state: 0,text: '全部'},
					{state: 1,text: '待付款'},
					{state: 2,text: '待确认'},
					{state: 3,text: '待发货'},
					{state: 4,text: '待收货'},
					{state: 5,text: '已完成'}
				],
				params:{}
			};
		},
		
		async onLoad(options){
			this.tabCurrentIndex = +options.state||0;
			this.initParams()
			this.tabClick(this.tabCurrentIndex);
			this.loadData()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			initParams(){
				this.params={
					orderByColumn:"",
					isAsc:"",
					userId:this.userInfo.id
				}
			},
			/*下拉刷新的回调 */
			downCallback() {
				//联网加载数据
				this.loadData().then(r => {
					//联网成功的回调,隐藏下拉刷新的状态
					this.mescroll.endSuccess();
				}).catch(()=>{
					//联网失败的回调,隐藏下拉刷新的状态
					this.mescroll.endErr();
				})
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.loadData({pageNum,pageSize}).then(r=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
								
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					// this.mescroll.endByPage(r.length, r.total); //必传参数(当前页的数据个数, 总页数)
								
					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					this.mescroll.endBySize(this.list.length, r.total); //必传参数(当前页的数据个数, 总数据量)
								
					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
								
					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					// mescroll.endSuccess(r.length)
				}).catch(()=>{
					this.mescroll.endErr()
				})
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(data={}) {
				const {pageNum=1,pageSize=10}=data
				this.params.userId=this.userInfo.id
				if(!this.params.orderByColumn){
					delete this.params.orderByColumn
					delete this.params.isAsc
				}
				return this.$api.httpPost('orderMainInfo/api/list',{
					pageNum,
					pageSize,
					...this.params
				}).then(r=>{
					console.log("请求结果：",r)
					let orderList = r.rows
					orderList.forEach(item=>{
						console.log("item：",item)
						//添加不同状态下订单的表现形式
						item = Object.assign(item, this.orderExp(item));
						let orderChildInfoList = []
						item.groupList.forEach(e=>{
							console.log("e：",e)
							e.orderChildInfoList.forEach(x=>{
								orderChildInfoList.push(x)
							})
						})
						item.orderChildInfoList=orderChildInfoList
					})
					console.log('orderList',orderList)
					if(pageNum===1){
						this.list=orderList
					}else{
						this.list=this.list.concat(orderList)
					}
					return r
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			// 跳转详情
			goOrderXQ(id){
				uni.navigateTo({
					url:`/pagesProduct/order/orderXQ?id=${id}`
				})
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
				this.list=[]
				this.setParams(index)
				this.loadData()
			},
			setParams(index){
				//1待付款、2待发货、5待确认、3待收货、4已完成
				if(index==0){
					this.params.orderState=''
				}else if(index==1){
					this.params.orderState=1
				}else if(index==2){
					this.params.orderState=5
				}else if(index==3){
					this.params.orderState=2
				}else if(index==4){
					this.params.orderState=3
				}else if(index==5){
					this.params.orderState=4
				}
			},
			// 退款
			gotoRefund(id){
				uni.navigateTo({
					url:`/pagesProduct/order/orderRefund?id=${id}`
				})
			},
			// 物流
			gotowl(id){
				uni.navigateTo({
					url:`/pagesInfo/customer/goodsliu?orderId=${id}`
				})
			},
			//确认收货
			confirmReceipt(item){
				let _this = this
				uni.showModal({
					title:'温馨提示',
					content:'您是否收到该订单商品？',
					cancelText:'未收货',
					confirmText:'已收货',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							item.submitDisabled=true
							_this.$api.loading('请求中...')
							_this.$api.httpPost('orderMainInfo/api/update',{
								id:item.id
							}).then(r=>{
								console.log('请求结果：',r)
								if(r.code==0){
									_this.$api.msg(r.msg||'操作成功')
									_this.loadData()
								}else{
									item.submitDisabled=false
									_this.$api.msg(r.msg||'网络错误请重试')
								}
								uni.hideLoading()
							}).catch(e=>{
								item.submitDisabled=false
								console.log('请求错误：',e)
								item.$api.msg(e.msg||'网络错误请重试')
								uni.hideLoading()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			//取消订单
			cancelOrder(item){
				let _this = this
				uni.showModal({
					title:'温馨提示',
					content:'您确定要取消订单吗？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							item.submitDisabled=true
							_this.$api.loading('请求中...')
							_this.$api.httpPost('orderMainInfo/api/delete',{
								id:item.id
							}).then(r=>{
								console.log('请求结果：',r)
								if(r.code==0){
									_this.$api.msg(r.msg||'取消成功')
									_this.loadData()
								}else{
									item.submitDisabled=false
									_this.$api.msg(r.msg||'网络错误请重试')
								}
								uni.hideLoading()
							}).catch(e=>{
								item.submitDisabled=false
								console.log('请求错误：',e)
								item.$api.msg(e.msg||'网络错误请重试')
								uni.hideLoading()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
			},
			//售后反馈
			feedback(item){
				uni.navigateTo({
					url: `/pagesProduct/order/orderService?orderId=${item.id}&orderNo=${item.orderNo}`
				})
			},
			//去支付页面
			toPay(item){
				uni.navigateTo({
					url: `/pagesProduct/money/pay?id=${item.id}`
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
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		.goods-box-factory{
			display:flex;
			position:relative;
			flex-direction: column;
			.g-header {
				display: flex;
				align-items: center;
				height: 84upx;
				padding: 30rpx 20rpx;
				position: relative;
				background: #FFFFFF;
			}
			.wuliu-box{
				display:flex;
				justify-content: space-between;
				padding: 20rpx 20rpx 20rpx 0;
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
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
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
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 56upx;
			margin: 0;
			margin-left: 24upx;
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
	}
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>

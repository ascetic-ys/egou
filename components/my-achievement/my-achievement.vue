<template>
	<view class="content">
		<view class="navbar">
			<view class="order-numb">
				<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange1">
						<view class="uni-input">起始：{{date1}}</view>
				</picker>
				<text style="line-height: 70upx;">--</text>
				<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
						<view class="uni-input">结束：{{date2}}</view>
				</picker>
			</view>
			<view class="order-numb">
				<text>订单总数：<text class="num">{{totalNum}}</text></text>
				<text>总金额：<text class="money">￥{{totalPrice}}</text></text>
			</view>
		</view>

		<view>
			<!-- 空白页 -->
			<empty v-if="list.length === 0"></empty>
			
			<!-- 统计图表页 -->
			<!-- <view class="" v-if="tabCurrentIndex===2">
				<orderMoney/>
			</view> -->
			<!-- 订单列表 -->
			<view v-else v-for="(item,index) in list" :key="index" class="order-item">
				<view class="i-top b-b">
					<text class="time">{{item.orderDate}}</text>
					<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
				</view>
				<view class="goods-box-single">
					<!-- <image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image> -->
					<view class="right">
						<view class="orderLItem">
							<text>订单编号：{{item.orderNo}}</text>
						</view>
						<view class="orderLItem">
							<text>客户名称：{{item.customer}}</text>
						</view>
					</view>
				</view>
				
				<view class="price-box">
					共
					<text class="num">{{item.productNum}}</text>
					件商品 实付款
					<text class="price">{{item.orderPrice}}</text>
				</view>
			</view>
					
		</view>
	</view>
</template> 

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {mapState} from 'vuex';
	import empty from "@/components/empty";
	import orderMoney from "./orderMoney.vue";
	export default {
		components: {
			empty,
			orderMoney
		},
		data() {
			return {
				params:{},
				list:[],
				totalNum:0,
				totalPrice:0,
				yearArray: ['2018', '2019', '2020', '2021','2022','2023','2024','2025'],
				mouthArray: ['全部','1','2','3','4','5','6','7','8','9','10','11','12'],
				date1: 0,
				date2: 0,
			};
		},
		
		created() {
			this.date1 = this.getDate('lastmouth')
			this.date2 = this.getDate()
			this.initParams()
			this.loadData()
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			...mapState(['hasLogin','userInfo','weChat'])
		},
		mounted() {
			this.date1 = this.getDate('lastmouth')
			this.date2 = this.getDate()
		},
		methods: {
			initParams(){
				this.params={
					orderDateStart:'',
					orderDateEnd:'',
					orderByColumn:"",
					isAsc:"",
					id:this.userInfo.id
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
					this.mescroll.endBySize(this.list.length, r.data.totalNum); //必传参数(当前页的数据个数, 总数据量)
								
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
				this.params.id=this.userInfo.id
				this.params.orderDateStart=this.date1
				this.params.orderDateEnd=this.date2
				if(!this.params.orderByColumn){
					delete this.params.orderByColumn
					delete this.params.isAsc
				}
				return this.$api.httpPost('userInfo/api/myGrade',{
					pageNum,
					pageSize,
					...this.params
				}).then(r=>{
					console.log("请求结果：",r)
					let orderList = r.data.rows
					orderList.forEach(item=>{
						//添加不同状态下订单的表现形式
						item = Object.assign(item, this.orderExp(item));
					})
					console.log('orderList',orderList)
					if(pageNum===1){
						this.list=orderList
					}else{
						this.list=this.list.concat(orderList)
					}
					this.totalNum=r.data.totalNum
					this.totalPrice=r.data.totalPrice
					return r
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			bindDateChange1(e) {
				this.date1 = e.target.value
				this.loadData()
			},
			bindDateChange2(e) {
				this.date2 = e.target.value
				this.loadData()
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
						year = year - 60;
				} else if (type === 'end') {
						year = year + 2;
				}else if (type === 'lastmouth') {
						month = month - 1;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
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
	.order-numb {
		width: 100%;
		background-color: #fffefc;
		font-size: $font-base;
		display: flex;
		justify-content: space-between;
		padding: 20upx 30upx;
		.uni-input{
			background-color: #d6dfdf;
			padding:20upx;
			border-radius: 10upx;
		}
		.num{
			font-size: $font-lg;
			color:$font-color-red ;
		}
		.money{
			font-size: $font-lg;
			color:$font-color-red ;
		}
	}
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
		// display: flex;
		// height: 40px;
		// padding: 0 5px;
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
			padding: 20upx 0 0upx 0;
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
				.orderLItem{
					font-size: $font-base;
					padding: 6upx 0;
				}
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
			height: 60upx;
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

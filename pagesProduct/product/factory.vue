<template>
	<view class="content">
		<view class="head">
			<view class="icon">
				<image class="icardIcon" src="/static/images/card.png" mode="aspectFill" @click="toFactoryDetail"></image>
				<image class="factoryIcon" :src="factoryDetail.factoryIcon||'/static/errorImage.jpg'" mode="aspectFill"></image>
				<image class="icardIcon" src="/static/images/qr-code-1.png" mode="aspectFill" ></image>
			</view>
			<view class="factoryName">{{factoryDetail.factoryName||factoryNo}}</view>
		</view>
		<view class="body">
			<scroll-view scroll-y style="height: 100%;width: 100%;"  @scrolltolower="scrollDown">
			
			<view class="guess-section">
				<view v-for="(item, index) in productList" :key="index" class="guess-item" @click="navToProductDetailPage(item)">
					<view class="image-wrapper">
						<image :src="item.imgPath" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productName}}</text>
					<text class="price">￥{{item.factoryPrice||'暂无'}}</text>
				</view>
			</view>	
			<view class="bar-blank">
				
			</view>
			</scroll-view>	
			
		</view>
		
		
		<!-- 分类 -->
		
		<view class="classify" v-if="show">
			<view :class="['classify-item',item.active?'active':'']" v-for="item in categoryList" :key="item.id" @click="selectCategory(item)">
				<text>{{item.orderProductCategory}}</text>
			</view>
		</view>
		
		
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom" >
			<view @click="show=!show" :class="['bottom-item',show?'active':'']">
				<text class="yticon icon-fenlei"></text>
				<text>商品分类</text>
			</view>
			<view class="bottom-line"></view>
			<navigator url="/pages/index/index" open-type="switchTab" class="bottom-item">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator> 
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				factoryNo: '',
				productTotal: 0,
				productList: [],
				factoryDetail: {},
				categoryList: [],
				category: '',
				queryParams: {
					pageNum:1,
					pageSize:4,
					orderByColumn:'',
					isAsc:'',
					state: 3
				}
			}
		},
		onLoad(option) {
			this.factoryNo = option.factoryNo
			this.getFactoryDetail()
			this.getCategory()
			this.getProductlist()
		},
		//下拉属性
		/* onPullDownRefresh() {
			console.log('refresh')
			this.queryParams.pageNum=1
			this.getProductlist()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载
		onReachBottom() {
			console.log("onReachBottom")
			if(this.productTotal!==0&&this.productList.length<this.productTotal){
				this.queryParams.pageNum+=1
				this.getProductlist()
			}else{
				this.$api.msg("没有更多的数据了")
			}
			
		}, */
		methods: {
			scrollDown(){
				if(this.productTotal!==0&&this.productList.length<this.productTotal){
					this.queryParams.pageNum+=1
					this.getProductlist()
				}else{
					this.$api.msg("没有更多的数据了")
				}
			},
			getCategory() {
				this.$api.httpGet('productCategory/api/listAll').then(r=>{
					this.categoryList = r.data
					for(let item of this.categoryList){
						item.active = false
					}
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			getProductlist() {
				this.queryParams.factoryNo = this.factoryNo
				this.queryParams.largeCategory = this.category
				this.$api.httpPost('productInfo/api/list',this.queryParams).then(r=>{
					this.productTotal = r.total
					if(this.queryParams.pageNum===1){
						this.productList=r.rows
					}else{
						this.productList=this.productList.concat(r.rows)
					}
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			getFactoryDetail() {
				this.$api.httpPost('factoryDetail/api/detail',{
					factoryNo: this.factoryNo,
					submitState: 1
				}).then(r=>{
					this.factoryDetail = r.data
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			toFactoryDetail() {
				uni.navigateTo({
					url: `/pagesProduct/product/factoryDetail?factoryDetail=${encodeURIComponent(JSON.stringify(this.factoryDetail))}`
				})
			},
			selectCategory(item) {
				if(item.active) {
					item.active = false
					this.category = ''
				}else {
					for(let obj of this.categoryList){
						if(obj.id === item.id){
							obj.active = true
						}else{
							obj.active = false
						}
					}
					this.category = item.orderProductCategory
				}
				
				this.show = false
				this.getProductlist()
			},
			navToProductDetailPage(item){
				/* if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				} */
				let id = item.id;
				uni.navigateTo({
					url: `/pagesProduct/product/product?id=${id}`
				})
			}
		}
	}
</script>

<style lang=scss>
	.content {
		background-color: #cdd1d9;
	}
	
	.body {
		min-height: 80vh;
		height: 800upx;
		background: #fff;
		
		.bar-blank {
			margin-top: 20upx;
			height: 100upx;
		}
	}
	
	.head {
		background-color: #272727;
		height: 300upx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		
		.icon {
			display: flex;
			align-items: center;
				
			.icardIcon {
				padding: 19upx;
				background-color: #46474a;
				border-radius: 40upx;
				width: 80upx;
				height: 80upx;
			}
			
			.factoryIcon {
				width: 100upx;
				height: 100upx;
				border-radius: 50upx;
			}
			
			image {
				margin: 0 50upx;
			}
		}
		
		
		
		.factoryName {
			color: #d4b087;
			margin-top: 30upx;
			font-size: 36upx;
		}
	}
	
	
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		margin-top: 20upx;
		
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			box-shadow: 2upx 2upx 12upx #d6dae2;
			margin-top: 20upx;
			
			&:nth-child(2n+1){
				margin-right: 4%;
			}
			
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		bottom:0;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100upx;
		background: rgba(255,255,255,.9);
		border-radius: 6upx;
		border-top: 1upx solid #d9d9d9; 
		
		.bottom-item {
			margin: 0 auto;
			>text{
				margin-right: 10upx;
			}
			
			
		}
		
		.active {
			color: red;
		}
		
		.bottom-line {
			display: block;
			border-left: 1upx solid #d9d9d9; 
			height: 70%;
			width: 2upx;
		}
	}
	
	.classify {
		position:fixed;
		bottom:100upx;
		z-index: 95;
		display: flex;
		flex-direction: column;
		width: 100%;
		background: rgba(255,255,255,.9);
		border-radius: 6upx;
		
		.classify-item {
			padding: 20upx;
			border-top: 1upx solid #d9d9d9;
			
			>text {
				padding-left: 20upx;
				border-left: 4upx solid #ff0000; 
				margin-left: 20upx;
			}
		}
		
		.active {
			color: #5555ff;
			background-color: #F7F9FB;
			
			>text {
				border-left: 4upx solid #5555ff; 
			}
			
		}
		
	}
</style>

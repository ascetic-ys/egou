<template>
	<view class="content">
		
		<view class="search-header">
			<view class="top-img">
				<image class="bg-img logo-img" src="/static/indexImage/LOGO-car.png" mode="aspectFit"/>
				<image class="bg-img logo-text" src="/static/indexImage/LOGO-text.png" mode="aspectFit"/>
			</view>
			<view class="search-box">
				<view class="left-tip" @click="navToCategory()">
					<image class="search-icon" src="/static/indexImage/search-category.png" mode="aspectFit"/>
				</view>
				<view class="search-input">
					<input type="text" v-model="productName" placeholder="请输入商品名称" confirm-type="search" @confirm="searchProduct"/>
					<image class="input-icon" src="/static/indexImage/search.png" mode="aspectFit"/>
				</view>
				<view class="right-tip" @click="navTo('/pagesInfo/notice/message')">
					<image class="search-icon2" src="/static/indexImage/message.png" mode="aspectFit"/>
				</view>
			</view>
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
		</view>
		<view class="space-header"></view>
		
		<scroll-view scroll-with-animation scroll-y class="right-aside"  :scroll-into-view='scrollntoView' :style="{'height':sHeight+'rpx'}">
			<!-- 头部轮播 -->
			<view class="carousel-section">
				<!-- 标题栏和状态栏占位符 -->
				<view class="titleNview-placing"></view>
				<!-- 背景色区域 -->
				<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
				<swiper class="carousel" circular autoplay @change="swiperChange">
					<!-- <swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
						<image :src="item.filePath" />
					</swiper-item> -->
					<block v-for="(obj, index) in carouselList" :key="index">
						<template v-if="obj.linkType===1">
							<swiper-item v-for="(item, index) in obj.orderFilePathList" :key="index" class="carousel-item" @click="navToGroupActivity(obj)">
								<image :src="item.filePath" />
							</swiper-item>
						</template>
						<template v-else>
							<swiper-item v-for="(item, index) in obj.orderFilePathList" :key="index" class="carousel-item" >
								<image :src="item.filePath" />
							</swiper-item>
						</template>
					</block>
					
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength}}</text>
				</view>
			</view>
			<view class="cate-section" >
				<view class="cate-item" v-for="(item,i) in naviCateList" :key='i' @tap="toProductList(item)">
					<image :src="item.imgPath||`/static/logo/category_default.jpg`"></image>
					<text class="cate-text">{{item.orderProductCategory}}</text>
				</view>
				<view class="cate-item" @tap="toGroupProductList()">
					<image :src="`/static/logo/category_default.jpg`"></image>
					<text class="cate-text">拼购专区</text>
				</view>
			</view>
			
			<view class="ad-1">
				<swiper class="serviceImg" circular autoplay @change="swiperChange1">
					<swiper-item v-for="(item, index) in serviceImgList1" :key="index" class="serviceImg-item" @click="navToDetailPage({title: '轮播服务'})">
						<image :src="item.filePath" mode="scaleToFill"/>
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent1+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength1}}</text>
				</view>
			</view>
			
			
			
			<!-- 推荐商品 -->
			<view class="f-header m-t" @tap="navTo('/pagesProduct/product/list')" id="main-0">
				<image src="/static/indexImage/hot.png"></image>
				<view class="tit-box">
					<text class="tit">热门推荐</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			
			<view class="guess-section">
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="guess-item"
					@click="navToProductDetailPage(item)"
				>
					<view class="image-wrapper">
						<image :src="item.imgPath" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productName}}</text>
					<text class="price" v-if="hasLogin">￥{{item.factoryPrice||'暂无'}}</text>
				</view>
			</view>
			
			<view class="ad-1">
				<swiper class="serviceImg" circular autoplay @change="swiperChange2">
					<swiper-item v-for="(item, index) in serviceImgList2" :key="index" class="serviceImg-item" @click="navToDetailPage({title: '轮播服务'})">
						<image :src="item.filePath" mode="scaleToFill"/>
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent2+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength2}}</text>
				</view>
			</view>


			<!-- 品牌区 -->
			<view class="f-header m-t" @tap="navTo('/pagesProduct/product/list?category=品牌产品')" id="main-1">
				<image src="/static/indexImage/brund.png"></image>
				<view class="tit-box">
					<text class="tit">品牌区</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			
			<view class="guess-section">
				<view 
					v-for="(item, index) in goodsList2" :key="index"
					class="guess-item"
					@click="navToProductDetailPage(item)"
				>
					<view class="image-wrapper">
						<image :src="item.imgPath" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productName}}</text>
					<text class="price" v-if="hasLogin">￥{{item.factoryPrice||'暂无'}}</text>
				</view>
			</view>		

			<!-- <view class="ad-1">
				<swiper class="serviceImg" circular autoplay @change="swiperChange3">
					<swiper-item v-for="(item, index) in serviceImgList3" :key="index" class="serviceImg-item" @click="navToDetailPage({title: '轮播服务'})">
						<image :src="item.filePath" mode="scaleToFill"/>
					</swiper-item>
				</swiper>
				
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent3+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength3}}</text>
				</view>
			</view> -->


			<!-- 推荐商品 -->
			<!-- <view class="f-header m-t" @tap="navTo('/pagesProduct/product/list?category=自营产品')" id="main-2">
				<image src="/static/indexImage/self.png"></image>
				<view class="tit-box">
					<text class="tit">商城自运营区</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			
			<view class="guess-section">
				<view 
					v-for="(item, index) in goodsList3" :key="index"
					class="guess-item"
					@click="navToProductDetailPage(item)"
				>
					<view class="image-wrapper">
						<image :src="item.imgPath" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productName}}</text>
					<text class="price" v-if="hasLogin">￥{{item.price||'暂无'}}</text>
				</view>
			</view> -->	
			
			
			<view class="ad-1">
				<swiper class="serviceImg" circular autoplay @change="swiperChange4">
					<swiper-item v-for="(item, index) in serviceImgList4" :key="index" class="serviceImg-item" @click="navToDetailPage({title: '轮播服务'})">
						<image :src="item.filePath" mode="scaleToFill"/>
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent4+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength4}}</text>
				</view>
			</view>
			
			
			<!-- VIP区 -->
			<view class="f-header m-t" @tap="navTo('/pagesProduct/product/list?ifVip=2')" id="main-2">
				<image src="/static/indexImage/logo.png" class="vipImg"></image>
				<view class="tit-box">
					<text class="tit">VIP区</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			
			<view class="guess-section">
				<view 
					v-for="(item, index) in goodsList4" :key="index"
					class="guess-item"
					@click="navToProductDetailPage(item)"
				>
					<view class="image-wrapper">
						<image :src="item.imgPath" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productName}}</text>
					<text class="price" v-if="hasLogin">￥{{item.factoryPrice||'暂无'}}</text>
				</view>
			</view>	
				
				
		</scroll-view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	export default {

		data() {
			return {
				titleNViewBackground: '',
				productName:'',
				swiperCurrent: 0,
				swiperLength: 0,
				swiperCurrent1: 0,
				swiperLength1: 0,
				swiperCurrent2: 0,
				swiperLength2: 0,
				swiperCurrent3: 0,
				swiperLength3: 0,
				swiperCurrent4: 0,
				swiperLength4: 0,
				carouselList: [],
				serviceImgList1: [],
				serviceImgList2: [],
				serviceImgList3: [],
				serviceImgList4: [],
				goodsList: [],
				goodsList2: [],
				goodsList3: [],
				goodsList4: [],
				navList:[
					{state: 0,text: '精选'},
					{state: 1,text: '品牌区'},
					/* {state: 2,text: '商城自营区'}, */
					{state: 2,text: 'VIP区'}
				],
				scrollntoView:'',
				tabCurrentIndex:0,
				sHeight:980,
				cateList:[],//分类
				naviCateList:[]//导航分类
			};
		},

		computed: {
			...mapState(['hasLogin','userInfo','weChat','isTemp'])
		},
		created() {
			this.loadData();
			let _this = this
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res.windowHeight);
					_this.sHeight=res.windowHeight*2-260
			    }
			});
		},
		onLoad(option) {
			let isTemp = this.isTemp
			if (option.scene) {
				const scene = decodeURIComponent(option.scene)
				if(scene.expiredTime){
					let date = new Date()
					let now = date.getTime()
					let day = (now - scene.expiredTime)/(1000*60*60*24)
					if(day > 7){
						this.$api.msg("二维码已过期")
						uni.reLaunch({
							url:'/pagesUser/public/login'
						})
						return
					}else{
						isTemp = true
						this.$store.setIsTemp(isTemp)
					}
				}
			}
			if(!this.userInfo&&!isTemp){
				uni.reLaunch({
					url:'/pagesUser/public/login'
				})
			}
		},
		methods: {
			navToGroupActivity(obj){
				//跳转拼团活动页面
				uni.navigateTo({
					url: `/pagesProduct/activity/groupActivity?homePageId=${obj.id}`
				})
			},
			toProductList(item){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				}
				uni.navigateTo({
					/* url: `/pagesProduct/product/list?largeCategory=${item.largeCategory}&littleCategory=${item.littleCategory}` */
					//修改为大类
					url: `/pagesProduct/product/list?largeCategory=${item.orderProductCategory}`
				})
			},
			toGroupProductList(){
				uni.navigateTo({
					//修改为大类
					url: `/pagesProduct/product/list?isOpenGroup=${1}`
				})
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index
				this.scrollntoView='main-'+index
			},
			navTo(url){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				}
				uni.navigateTo({
					url:url
				})
			},
			searchProduct(){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				}
				uni.navigateTo({
					url:`/pagesProduct/product/list?productName=${this.productName}`
				})
			},
			navToCategory(){
				uni.switchTab({
					url:'/pages/category/category'
				})
			},
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				this.initCarouseList()
				this.initServiceImgList1()
				this.initServiceImgList2()
				this.initServiceImgList3()
				this.initServiceImgList4()
				this.initCateList()
				this.initRecommendGoodsList()
				this.initGoodsList2()
				this.initGoodsList3()
				this.initGoodsList4()
			},
			initCarouseList(){
				this.$api.httpPost('homePage/api/query',{
					titleType: 1,
					startState: 1,
				}).then(r=>{
					// console.log("轮播图片请求结果：",r)
					this.carouselList=r.data
					this.titleNViewBackground = "none";
					for(let item of this.carouselList){
						this.swiperLength += item.orderFilePathList.length
					}
					//this.swiperLength = this.carouselList.length;
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initServiceImgList1(){
				this.$api.httpPost('homePage/api/query',{
					titleType:4//精选区海报
				}).then(r=>{
					// console.log("服务图片请求结果：",r)
					this.serviceImgList1=r.data[0].orderFilePathList
					this.swiperLength1 = this.serviceImgList1.length;
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initServiceImgList2(){
				this.$api.httpPost('homePage/api/query',{
					titleType:5//品牌区海报
				}).then(r=>{
					// console.log("服务图片请求结果：",r)
					this.serviceImgList2=r.data[0].orderFilePathList
					this.swiperLength2 = this.serviceImgList2.length;
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initServiceImgList3(){
				this.$api.httpPost('homePage/api/query',{
					titleType:6//自营区海报
				}).then(r=>{
					// console.log("服务图片请求结果：",r)
					this.serviceImgList3=r.data[0].orderFilePathList
					this.swiperLength3 = this.serviceImgList3.length;
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initServiceImgList4(){
				this.$api.httpPost('homePage/api/query',{
					titleType:2//vip区海报
				}).then(r=>{
					// console.log("服务图片请求结果：",r)
					this.serviceImgList4=r.data[0].orderFilePathList
					this.swiperLength4 = this.serviceImgList4.length;
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initCateList(){
				this.$api.httpGet('productCategory/api/listAll').then(r=>{
					// console.log("请求结果：",r)
					if(r.code==0){
						this.cateList = r.data
						this.naviCateList=[]
						this.cateList.forEach(e=>{
							/* e.littleCategorylist.forEach(en=>{
								if(this.naviCateList.length<10){
									let item = {
										"id": en.id,
										"littleCategory": en.littleCategory,
										"parentId": en.parentId,
										"filePath": en.filePath,
										"largeCategory": e.largeCategory,
										"imgPath": e.imgPath,
									}
									this.naviCateList.push(item)
								}
								
							}) */
							//修改为显示大类
							if(this.naviCateList.length<10){
								let item = {
									"id": e.id,
									"orderProductCategory": e.orderProductCategory,
									"imgPath": e.imgPath,
								}
								this.naviCateList.push(item)
							}
						})
					}
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initRecommendGoodsList(){
				this.$api.httpGet('productInfo/api/recommend').then(r=>{
					// console.log("请求结果：",r)
					if(r.code==0){
						this.goodsList = r.data
					}
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initGoodsList2(){
				this.$api.httpPost('productInfo/api/list',{
					pageNum:1,
					pageSize:4,
					orderByColumn:'orderNum',
					isAsc:'asc',
					ifHomePage:1,
					category:'品牌产品',
					state: 3
				}).then(r=>{
					console.log("品牌产品请求结果：",r)
					if(r.code==0){
						this.goodsList2 = r.rows
					}
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initGoodsList3(){
				this.$api.httpPost('productInfo/api/list',{
					pageNum:1,
					pageSize:4,
					orderByColumn:'orderNum',
					isAsc:'asc',
					ifHomePage:1,
					category:'自营产品',
					state: 3
				}).then(r=>{
					console.log("自营产品请求结果：",r)
					if(r.code==0){
						this.goodsList3 = r.rows
					}
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initGoodsList4(){
				this.$api.httpPost('productInfo/api/list',{
					pageNum:1,
					pageSize:4,
					orderByColumn:'orderNum',
					isAsc:'asc',
					ifHomePage:1,
					category:'定制产品',
					state: 3
				}).then(r=>{
					console.log("定制产品请求结果：",r)
					if(r.code==0){
						this.goodsList4 = r.rows
					}
				}).catch(e=>{
					// console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				// this.titleNViewBackground = this.carouselList[index].background;
			},
			//轮播图切换修改背景色
			swiperChange1(e) {
				const index = e.detail.current;
				this.swiperCurrent1 = index;
			},
			swiperChange2(e) {
				const index = e.detail.current;
				this.swiperCurrent2 = index;
			},
			swiperChange3(e) {
				const index = e.detail.current;
				this.swiperCurrent3 = index;
			},
			swiperChange4(e) {
				const index = e.detail.current;
				this.swiperCurrent4 = index;
			},
			//详情页
			navToDetailPage(item) {
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				}
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					// url: `/pagesProduct/product/product?id=${id}`
					url: `/pagesProduct/product/factoryPage?id=${id}`
				})
			},
			navToProductDetailPage(item){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				}
				let id = item.id;
				uni.navigateTo({
					url: `/pagesProduct/product/product?id=${id}`
				})
			}
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pagesInfo/notice/notice'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	.jj{
		font-size: $font-sm;
		color: $font-color-light;
	}
	.shdoc {
		padding: 0upx 40upx 20upx 40upx;
		line-height: 40upx;
		font-size: $font-sm;
		 text-indent:2em
	}
	.right-aside{
		flex: 1;
		overflow: hidden;
	}
	.space-header{
		height: 260rpx;
	}
	.search-header{
		width: 100%;
		height: 260rpx;
		/* background-color: #E92620; */
		background-color: #010101;
		display: flex;
		flex-direction: column;
		position: fixed;
		z-index: 9;
		.top-img{
			padding-top: 58rpx;
			.bg-img{
				height: 50rpx;
			}
			.logo-img{
				width: 156rpx;
			}
			.logo-text{
				width: 270rpx;
			}

		}
		.search-box{
			// position: absolute;
			// bottom: 0rpx;
			width: 100%;
			height: 70rpx;
			display: flex;
			padding: 0 20rpx;

			.search-icon{
				width: 32rpx;
				height: 70rpx;
			}
			.search-icon2{
				width: 38rpx;
				height: 70rpx;
			}
			.left-tip{
				margin-left: 28rpx;
			}
			.right-tip{
				
			}
			.search-input{
				background-color: #FFFFFF;
				line-height: 45rpx;
				height: 45rpx;
				width: 77%;
				border-radius: 50rpx;
				margin: 14rpx 20rpx;
				padding: 5rpx 10rpx;
				position: relative;
				font-size: 21rpx;
				.input-icon{
					position: absolute;
					left: 20rpx;
					width: 30rpx;
					height: 30rpx;
					top: 10rpx;

				}
				input{
					margin-left: 50rpx;
				}
			}
		}
		.navbar{
			display: flex;
			justify-content: flex-start;
			height: 40px;
			padding: 0 5px;
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
				font-weight: 400;
				color: #FFF;
				position: relative;
				&.current{
					font-weight: 800;
					text-shadow: 4rpx 4rpx 4rpx rgba(70, 70, 70, 0.7);
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
	}
	/* #ifdef MP */
	.mp-search-box{
		position:absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;
		.ser-input{
			flex:1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 20px;
			background: rgba(255,255,255,.6);
		}
	}
	page{
		.cate-section{
			position:relative;
			z-index:5;
			border-radius:16rpx;
			margin: 12rpx;
		}
		.carousel-section{
			padding: 0;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	/* #endif */
	
	
	page {
		background: #E6E6E6;
	}
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 分类 */
	.cate-section {
		display: flex;
		//justify-content: flex-start;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx; 
		background: #fff;
		.cate-item {
			flex: 0 1 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			margin-bottom: 20rpx;
			.cate-text{
				width: 120rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 20rpx;
				line-height: 40rpx;
				text-align: center;
			}
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 110rpx;
			height: 110rpx;
			margin-bottom: 14rpx;
			/* box-shadow: 4rpx 4rpx 4rpx rgba(70,70,70, 0.7); */
			border-radius: 50%;
			margin: 5px;
			border:1px solid #D8DADA;
		}
	}
	.ad-1{
		width: 750rpx;
		height: 280rpx;
		background: #fff;
		position: relative;
		.serviceImg {
			width: 100%;
			height: 100%;
			.serviceImg-item {
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	/* 秒杀专区 */
	.seckill-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 92upx;
			line-height: 1;
			.s-img{
				width: 140upx;
				height: 30upx;
			}
			.tip{
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}
			.timer{
				display:inline-block;
				width: 40upx;
				height: 36upx;
				text-align:center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0,0,0,.8);
			}
			.icon-you{
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
	}
	
	.f-header{
		display:flex;
		align-items:center;
		height: 100upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 45upx;
			height: 45upx;
			margin-right: 10upx;
		}
		.vipImg{
			
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	/* 团购楼层 */
	.group-section{
		background: #fff;
		.g-swiper{
			height: 650upx;
			padding-bottom: 30upx;
		}
		.g-swiper-item{
			width: 100%;
			padding: 0 30upx;
			display:flex;
		}
		image{
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}
		.g-item{
			display:flex;
			flex-direction: column;
			overflow:hidden;
		}
		.left{
			flex: 1.2;
			margin-right: 24upx;
			.t-box{
				padding-top: 20upx;
			}
		}
		.right{
			flex: 0.8;
			flex-direction: column;
			justify-content: start;
			font-size: 30upx;
			.text-box{
				padding-bottom: 10upx;
				p{
					font-size: $font-base;
					color: $font-color-light;
					padding-bottom: 10upx;
					
				}
				.nr{
					// font-weight: 700;
					font-size: $font-lg;
				}
			}
		}
		.t-box{
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}
		.price{
			color:$uni-color-primary;
		}
		.m-price{
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}
		.pro-box{
			display:flex;
			align-items:center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}
		.progress-box{
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}
	/* 分类推荐楼层 */
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
			
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
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
	

</style>

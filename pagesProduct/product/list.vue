<template>
	<view class="content">
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: params.orderByColumn === ''}" @click="tabClick('')">
				综合排序
			</view>
			<view class="nav-item" :class="{current: params.orderByColumn === 'salesVolume'}" @click="tabClick('salesVolume')">
				销量优先
				
			</view>
			<!-- <view class="nav-item" :class="{current: params.orderByColumn === 'factoryPrice'}" @click="tabClick('factoryPrice')">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: params.isAsc === 'asc' && params.orderByColumn === 'factoryPrice'}" class="yticon icon-shang" ></text>
					<text :class="{active: params.isAsc === 'desc' && params.orderByColumn === 'factoryPrice'}" class="yticon icon-shang xia" ></text>
				</view>
			</view> -->
			<text class="cate-item jyticon icon-fenlei1" @click="toggleCateMask('show')"></text>
		</view>
		<view class="goods-box">
			<scroll-view scroll-y style="height: 100%;width: 100%;"  @scrolltolower="scrollDown">
				<view class="goods-list">
					<view 
						v-for="(item, index) in goodsList" :key="index"
						class="goods-item"
						@click="navToDetailPage(item)"
					>
						<view class="image-wrapper">
							<image :src="item.imgPath||`/static/errorImage.jpg`" mode="aspectFill"></image>
						</view>
						<text class="title clamp">{{item.productName}}</text>
						<view class="price-box" v-if="hasLogin">
							<text class="price">{{item.factoryPrice}}</text>
						</view>
					</view>
				</view>
				<view class="load-more">
					<u-loadmore :status="loadStatus" ></u-loadmore>
				</view>
			</scroll-view>
		</view>
		
		
		<!-- <mescroll-body :up='upOption' @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="goods-list">
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="goods-item"
					@click="navToDetailPage(item)"
				>
					<view class="image-wrapper">
						<image :src="item.imgPath||`/static/errorImage.jpg`" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productName}}</text>
					<view class="price-box">
						<text class="price">{{item.factoryPrice}}</text>
					</view>
				</view>
			</view>
		</mescroll-body> -->
		
		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view class="attr-list">
						<text>品牌</text>
						<view class="item-list">
							<text 
								v-for="(item, index) in brandList" 
								:key="index" class="tit"
								:class="{selected: item.dictValue===params.ibm}"
								@click="selectIbm(item.dictValue)"
							>
								{{item.dictValue}}
							</text>
						</view>
					</view>
					<!-- <view class="attr-list">
						<text>价格</text>
						<view class="input-range">
							<view class="input-info">
								<input type="number" v-model="params.lowPrice" placeholder="最低价" @input="inputChangeLowPrice"/>
							</view>
							<view class="input-conc">-</view>
							<view class="input-info">
								<input type="number" v-model="params.highPrice" placeholder="最高价" @input="inputChangeHighPrice"/>
							</view>
						</view>
					</view> -->
					<!-- <view class="attr-list">
						<text>颜色</text>
						<view class="item-list">
							<text 
								v-for="(item, index) in colorList" 
								:key="item.name" class="tit"
								:class="{selected: item.name===params.color}"
								@click="selectColor(item.name)"
							>
								{{item.name}}
							</text>
						</view>
					</view> -->
					<!-- <view class="attr-list" v-for="item in cateList" :key="item.id">
						<text>{{item.orderProductCategory}}</text>
						<view class="item-list">
							<text 
								v-for="(lt, index) in item.categoryList" 
								:key="lt.orderProductCategory" class="tit"
								:class="{selected: lt.orderProductCategory===params.littleCategory}"
								@click="changeCate(lt,item)"
							>
								{{lt.orderProductCategory}}
							</text>
						</view>
					</view> -->
					<view class="confirm-btn">
						<button class="confirm" @tap="selectConfirm">确定</button>
						<button class="reset" @tap="selectCancel">重置</button>
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {mapState} from 'vuex';
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				bottom:120,
				upOption:{
					auto:false,
				},
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				cateList: [],
				goodsList: [],
				ifVip:1,//是否会员商品（1：否、2：是）
				goodsTotal: 0,
				loadStatus: 'loadmore', //loadmore,loading,nomore
				params:{
					pageNum: 1,
					pageSize: 10,
					orderByColumn: 'orderNum',
					isAsc:'asc',
					state: 3,//已发布的商品
					
					brand:'',
					largeCategory:'',
					middleCategory:'',
					littleCategory:'',
					color:'',
					ifVip:'',
					lowPrice:'',
					highPrice:'',
					productName:'',
					category:'',
					isRecommend: '',
					ibm: ''
				},
				sizeList:[],
				colorList:[],
				brandList: []
			};
		},
		computed: {
			...mapState(['hasLogin'])
		},
		async onLoad(options){
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			this.params.largeCategory=options.largeCategory
			if(options.middleCategory){
				this.params.middleCategory=options.middleCategory
			}
			if(options.littleCategory){
				this.params.littleCategory=options.littleCategory
			}
			
			if(options.productName){
				this.params.productName=options.productName
			}
			if(options.category){
				this.params.category=options.category
			}
			if(options.ifVip){
				this.params.ifVip=options.ifVip
			}
			if(options.isOpenGroup){
				this.params.isOpenGroup=options.isOpenGroup
			}
			if(options.isRecommend){
				this.params.isRecommend=options.isRecommend
			}
			if(options.ibm){
				this.params.ibm=options.ibm
			}
			/* this.sizeList = await this.$api.json('sizeList')
			this.colorList = await this.$api.json('colorList') */
			this.loadCateList()
			this.loadData()
			this.getBrandList()
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		methods: {
			getBrandList(){
				this.$api.httpPost('common/api/getDictByKey',{key:'productInfo_ibm'}).then(r=>{
					this.brandList = r.data
					
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			loadData() {
				this.loadStatus = 'loadmore'
				this.$api.loading('加载中...')
				return this.$api.httpPost('productInfo/api/list',this.params).then(r=>{
					uni.hideLoading();
					this.goodsList=r.rows
					this.goodsTotal = r.total
					if(this.goodsTotal===0||this.goodsTotal===this.goodsList.length){
						this.loadStatus = 'nomore'
					}
					return r
				}).catch(e=>{
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			
			scrollDown(){
				if(this.goodsTotal!==0&&this.goodsList.length<this.goodsTotal){
					this.params.pageNum += 1
					this.loadStatus = 'loading'
					this.$api.httpPost('productInfo/api/list',this.params).then(r=>{
						this.goodsList=this.goodsList.concat(r.rows)
						this.goodsTotal = r.total
						this.loadStatus = 'loadmore'
					}).catch(e=>{
						this.loadStatus = 'loadmore'
						this.$api.msg(e.msg||'网络异常请重试')
					})
				}else{
					this.loadStatus = 'nomore'
				}
				
			},
			//加载分类
			async loadCateList(){
				this.$api.httpGet('productCategory/api/listAll').then(r=>{
					console.log("请求结果：",r)
					if(r.code==0){
						this.cateList = r.data
					}
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//排序点击
			tabClick(orderByColumn,isAsc){
				this.params.orderByColumn = orderByColumn;
				if(orderByColumn==="factoryPrice"){
					if(this.params.isAsc==="asc"){
						this.params.isAsc = "desc"
					}else{
						this.params.isAsc = "asc"
					}
					
				}else{
					this.params.isAsc = "desc"
				}
				this.loadData();
			},
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(litem,item){
				this.params.largeCategory=item.orderProductCategory
				this.params.littleCategory=litem.orderProductCategory
				// this.toggleCateMask();
				// this.loadData();
			},
			selectIbm(ibm){
				this.params.ibm=ibm
				this.loadData();
			},
			//分类点击
			selectSize(name){
				this.params.size=name
				// this.toggleCateMask();
				// this.loadData();
			},
			//分类点击
			selectColor(name){
				this.params.color=name
				// this.toggleCateMask();
				// this.loadData();
			},
			//分类点击
			selectConfirm(){
				/* if(Number(this.params.lowPrice)>Number(this.params.highPrice)){
					this.$api.msg('最低价要小于最高价')
					return 
				} */
				this.toggleCateMask();
				this.loadData();
			},
			//分类点击
			selectCancel(){
				this.params.ibm = ''
				this.params.highPrice = ''
				this.params.lowPrice = ''
				this.toggleCateMask();
				this.loadData();
			},
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pagesProduct/product/product?id=${id}`
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss" scoped>
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 96upx;
	}
	
	.goods-box {
		min-height: 100vh;
		height: 1200upx;
		
		.load-more {
			//margin-top: 20upx;
			height: 80upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
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
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $base-color;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 20rpx;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
 			font-size: 28upx;
			color: #555;
			position: relative;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
		.active{
			color: $base-color;
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
			.input-range{
				margin-top: 30upx;
				display: flex;
				justify-content: space-between;
				line-height: 70rpx;
				view{
					line-height: 70rpx;
					.input-info{
						flex: 3;
					}
					.input-conc{
						padding: 0 10rpx;
					}
					input{
						background: #F2F2F2;
						border-radius: 50rpx;
						text-indent: 30rpx;
						padding: 5rpx 30rpx;
						line-height: 70rpx;
						height: 70rpx;
						width: 250rpx;
					}
				}
			}
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected{
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
		.confirm-btn{
			display: flex;
			justify-content: space-between;
			margin: 50rpx 0;
			.confirm{
				background: #fa436a;
				color: #FFFFFF;
			}
			.reset{
				background: #C0C4CC;
			}
			button{
				width: 200rpx;
				border-radius: 40rpx;
				border: none;
			}
			button::after{
				border: none;
			}
		}
	}

	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.goods-item{
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
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	

</style>

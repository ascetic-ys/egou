<template>
	<view class="content">
		<mescroll-body :up='upOption' @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="goods-list">
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="goods-item"
					@click="navToDetailPage(item)"
				>
					<view class="image-wrapper">
						<image :src="item.productInfo.imgPath||`http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg`" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productInfo.productName}}</text>
					<view class="price-box">
						<text class="price">{{item.productInfo.price}}</text>
						<!-- <text @tap.stop='toFavorite(item)' class="yticon icon-shoucang" style="color:#DD524D" v-if="item.favorite"></text> -->
						<!-- <text @tap.stop='toFavorite(item)' class="yticon icon-shoucang" v-if="!item.favorite"></text> -->
					</view>
				</view>
			</view>
		</mescroll-body>
		
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
				goodsList: [],
				params:{},
			};
		},
		async onLoad(options){
			this.initParams()
			this.loadData()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			initParams(){
				this.params={
					orderByColumn:'',
					isAsc:'',
					userId:this.userInfo.id,
					isFavorite:'0'
				}
			},
			/*下拉刷新的回调 */
			downCallback() {
				//联网加载数据
				this.loadData().then(data => {
					//联网成功的回调,隐藏下拉刷新的状态
					this.mescroll.endSuccess();
				}).catch(()=>{
					//联网失败的回调,隐藏下拉刷新的状态
					this.mescroll.endErr();
				})
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.loadData({pageNum,pageSize}).then(r=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
								
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					// this.mescroll.endByPage(r.length, t.total); //必传参数(当前页的数据个数, 总页数)
								
					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					this.mescroll.endBySize(this.goodsList.length, r.total); //必传参数(当前页的数据个数, 总数据量)
								
					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
								
					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					// this.mescroll.endSuccess(r.length)
				}).catch(()=>{
					this.mescroll.endErr()
				})
			},
			//加载商品 ，带下拉刷新和上滑加载
			loadData(data={}) {
				const {pageNum=1,pageSize=10}=data
				if(!this.params.orderByColumn){
					delete this.params.orderByColumn
					delete this.params.isAsc
				}
				delete this.params.size
				this.$api.loading('加载中...')
				return this.$api.httpPost('footmark/api/list',{
					pageNum,
					pageSize,
					...this.params
				}).then(r=>{
					console.log("请求结果：",r)
					let data = []
					r.rows.forEach(e=>{
						e.favorite=e.isFavorite==1
						data.push(e)
					})
					if(pageNum===1){
						this.goodsList=data
					}else{
						this.goodsList=this.goodsList.concat(data)
					}
					uni.hideLoading();
					return r
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
					uni.hideLoading();
				})
			},
			//详情
			navToDetailPage(item){
				let id = item.productId;
				uni.navigateTo({
					url: `/pagesProduct/product/product?id=${id}`
				})
			},
			//收藏
			toFavorite(item){
				if(!item.favorite){
					this.addFavorite(item)
				}else{
					this.$api.msg('您已收藏')
					// this.disFavorite(item)
				}
			},
			//收藏
			addFavorite(item){
				this.$api.loading('请求中...')
				this.$api.httpPost('footmark/api/save',{
					productId:item.productId,
					userId:this.userInfo.id
				}).then(r=>{
					console.log("请求结果：",r)
					if(r.code==0){
						item.favorite = !item.favorite;
						this.$api.msg('收藏成功')
					}else{
						this.$api.msg('收藏失败')
					}
					uni.hideLoading();
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
					uni.hideLoading();
				})
			},
			//取消收藏
			disFavorite(item){
				this.$api.loading('请求中...')
				this.$api.httpPost('footmark/api/batchDeletee',{
					ids:item.id,
					productId:item.productId
				}).then(r=>{
					console.log("请求结果：",r)
					if(r.code==0){
						item.favorite = !item.favorite;
						this.$api.msg('取消收藏成功')
					}else{
						this.$api.msg('取消收藏失败')
					}
					uni.hideLoading();
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
					uni.hideLoading();
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
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

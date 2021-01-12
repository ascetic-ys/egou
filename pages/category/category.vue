<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="(item,index) in cateLit" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item,index)">
				{{item.orderProductCategory}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" >
			<view v-for="item in childCate" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.orderProductCategory}}</text>
				<view class="t-list">
					<view class="t-item" @tap.stop="navToList(item,1)" >
						<image :src="item.imgPath||`/static/logo/category_default.jpg`"></image>
						<text>{{item.orderProductCategory}}</text>
					</view>
					<view class="t-item" v-for="titem in item.categoryList" :key="titem.id" @tap.stop="navToList(titem,2)" >
						<image :src="titem.imgPath||`/static/logo/category_default.jpg`"></image>
						<text>{{titem.orderProductCategory}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部自定义tabbar -->
		<!-- <tab-bar :current="1" @clickTab="clickTab"></tab-bar> -->
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				currentLargeCategory: '',
				cateLit: [],
				childCate: [],
			}
		},
		created() {
			this.loadData();
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			clickTab(item){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				}else{
					uni.navigateTo({
						url:item.pagePath
					})
				}
			},
			async loadData(){
				this.$api.loading('加载中...')
				this.$api.httpGet('productCategory/api/listAll').then(r=>{
					console.log("请求结果：",r)
					if(r.code==0){
						this.cateLit = r.data
						this.currentId = this.cateLit[0].id
						this.childCate = this.cateLit[0].categoryList
					}
					uni.hideLoading();
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//一级分类点击
			tabtap(item,index){
				/* if(!this.sizeCalcState){
					this.calcSize();
				}
				this.tabScrollTop = this.cateLit[index].top; */
				this.currentId = item.id;
				this.currentLargeCategory = item.orderProductCategory
				this.childCate = item.categoryList
				console.log(this.childCate)
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				console.log('scrollTop:',scrollTop,e)
				let tabs = this.cateLit.filter(item=>(item.top-20) <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].id;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.cateLit.forEach(item=>{
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					console.log('view:',view)
					view.fields({
						size: true,
						scrollOffset: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
						console.log('data:',item)
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(item,type){
				let url = '/pagesProduct/product/list'
				if(type===1){
					url += `?middleCategory=${item.orderProductCategory}`
				}else if(type===2){
					url += `?littleCategory=${item.orderProductCategory}`
				}
				uni.navigateTo({
					url: url
				})
				
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>

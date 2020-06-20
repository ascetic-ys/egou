<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="(item,index) in cateLit" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item,index)">
				{{item.orderProductCategory}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in cateLit" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.orderProductCategory}}</text>
				<view class="t-list">
					<view class="t-item" v-for="titem in item.categoryList" :key="titem.id" @tap.stop="navToList(titem,item)" >
						<image :src="titem.imgPath||`/static/temp/Cate4.jpg`"></image>
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
				cateLit: []
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
					}
					uni.hideLoading();
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
					uni.hideLoading();
				})
			},
			//一级分类点击
			tabtap(item,index){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				this.currentId = item.id;
				// let index = this.cateLit.findIndex(sitem=>sitem.id === item.id);
				this.tabScrollTop = this.cateLit[index].top;
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
			navToList(item,pitem){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
				}else{
					uni.navigateTo({
						url: `/pagesProduct/product/list?largeCategory=${pitem.orderProductCategory}&littleCategory=${item.orderProductCategory}`
					})
				}
				
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

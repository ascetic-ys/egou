<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots autoplay="true" interval="2000" circular=true duration="400" >
				<swiper-item class="swiper-item" v-for="(item1,index1) in videoList" :key="index1">
					<view class="video-wrapper">
						<video id="myVideo" :src="item1" @error="videoErrorCallback" 
						controls 
						show-center-play-btn="true" 
						enable-play-gesture="true" 
						show-mute-btn="true" 
						muted="true" 
						></video>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="scaleToFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="c-list" >
			<view class="sectionRow b-b">
				<text class="title">{{product.productName}}</text>	
			</view>
		</view>
		<view class="c-list" >
			<view class="c-row b-b">
				<view class="progress-left">
					<u-line-progress :striped="true" :percent="groupProduct.sales/(groupProduct.stockNum+groupProduct.sales)" :striped-active="true"  active-color="#e6292c"></u-line-progress>
				</view>
				<view class="progress-right" >仅剩{{groupProduct.stockNum}}件</view>
			</view>
			<view class="c-row b-b">
				<!-- <view class="">
					<text class="price-left">万人团价￥</text><text class="price-right">100</text>
				</view> -->
				<view class="count-right">
					<template v-if="groupProduct.leftTime<=0">
						<view>活动已结束！</view>
					</template>
					<template v-if="groupProduct.leftTime>0">
						<u-count-down font-size="22" :timestamp="groupProduct.leftTime"></u-count-down>
						<text>后结束</text>
					</template>
				</view>
			</view>
			<view class="c-row b-b c-c">
				<template v-if="groupProduct.leftTime<=0">
					<view class="activity-btn">活动已结束！</view>
				</template>
				<template v-if="groupProduct.leftTime>0">
					<view class="activity-btn" @click="openSelect(3)">参与拼单，立即成团</view>
				</template>
			</view>
		</view>
		
		
		
		
		
		
		<view class="detail-desc" v-show="tabCurrentIndex==0">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<jyf-parser domain="https://6874-html-foe72-1259071903.tcb.qcloud.la" gesture-zoom lazy-load ref="article" selectable
			 show-with-animation use-anchor @error="error" @imgtap="imgtap" @linkpress="linkpress" @parse="parse" @ready="ready">加载中...</jyf-parser>
			<view class="d-bottom"></view>
		</view>
		
		
		
		
		
		
		<!-- 规格-模态层弹窗 -->
		<view 
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec" >
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t" v-if="product.orderProductColorList.length>0">
					<!-- <image :src="specSelected.imgPath||product.orderProductColorList[0].imgPath||'/static/errorImage.jpg'" mode="aspectFill"></image> -->
					<image :src="product.imgPath||'/static/errorImage.jpg'" mode="aspectFill"></image>
					<view class="right">
						<text>{{product.product}}</text>
						<text>¥{{product.factoryPrice}}</text>
						<!-- <text class="price">¥{{specSelected.price}}</text> -->
						<!-- <view class="selected">
							已选：
							<text class="selected-text">
								{{specSelected.color}}
							</text>
						</view> -->
					</view>
				</view>
				<!-- <view class="attr-list">
					<text>尺寸</text>
					<view class="item-list">
						<text 
							v-for="(item, index) in sizeList" 
							:key="index" class="tit"
							:class="{selected: item.selected}"
							@click="selectSize(item)"
						>
							{{item.name}}
						</text>
					</view>
				</view> -->
				<scroll-view class="attr-list" v-if="product.orderProductColorList.length>0" scroll-y>
					<text>颜色</text>
					<view class="item-list">
						<view 
							v-for="(item, index) in product.orderProductColorList " 
							:key="index" class="select-box"
							@click="selectColor(item)"
						>
							<view class="line-box">
								<u-line></u-line>
							</view>
							<image :src="item.imgPath||'/static/errorImage.jpg'" mode="aspectFit"></image>
							<text class="tit">{{item.color}}</text>
							<view class="number-box">
								<text>￥{{item.salePrice||'-'}}</text>
								<text>库存：{{item.stockNum||'-'}}</text>
								<u-number-box v-model="item.shoppingNum" :bg-color="bgColor" :color="color" :min="0"
								:step="step" :disabled="disabled" ></u-number-box>
							</view>
							<view class="line-box" v-if="index === product.orderProductColorList.length-1">
								<u-line></u-line>
							</view>
						</view>
					</view>
				</scroll-view>
				<button v-if="cartBtnShow" class="btn" @click="batchAddCart">确定</button>
				<button v-if="buyBtnShow" class="btn" @click="buy">确定</button>
				<button v-if="groupBtnShow" class="btn" @click="startGroup">确定</button>
				<view v-if="selectShow" class="btn-group">
					<view  class="cartBtn" @click="batchAddCart">加入购物车</view>
					<view  class="buyBtn" @click="buy">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from '@/components/jyf-parser/jyf-parser'; // HBuilderX 2.5.5 及以上可以不需要
	import {mapState} from 'vuex';
	import share from '@/components/share';
	
	export default{
		components: {
			share,
			jyfParser,
		},
		data() {
			return {
				homePageId:null,
				specClass: 'none',
				specSelected:{},
				product:{},
				favorite: true,
				shareList: [],
				imgList: [],
				videoList: [],
				desc: ``,
				sizeList:[],
				colorList:[],
				deliveryMethodList:[
					{name: '快递',value: 1,active: false, visible:false},
					{name: '快运',value: 2,active: false, visible:false},
					{name: '物流',value: 3,active: false, visible:false},
				],
				tabCurrentIndex:0,
				bgColor: "#F2F3F5",
				color: '#323233',
				disabled: false,
				step: 1,
				shoppingNum: 1,
				navList: [
					{state: 0,text: '商品介绍'},
					{state: 1,text: '详细参数'},
					{state: 2,text: '服务规则'},
				],
				count: 0,//购物车总数
				selectShow: false,
				cartBtnShow: false,
				buyBtnShow: false,
				groupBtnShow: false,
				groupProduct: undefined,//拼团信息,
				groupMemberHeadList: [],//拼团团长信息列表
				freightTemplate: {},//运费模板
			};
		},
		watch:{
			groupProduct: {
				handler: function (val, oldVal) { 
					if(val){
						this.getGroupMemberHeadList()
					}
				},
				deep: true
			},
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		onLoad(options){
			this.homePageId = options.homePageId;
			this.initData()
			this.getCartCount()
			if([1,4].indexOf(this.userInfo.tag)===-1){
				this.$api.msg("你不是会员，不能购买商品。")
			}
		},
		methods:{
			//获取运费模板
			getFreightTemplate(){
				let id = this.product.freightTemplateId
				if(this.groupProduct){
					id = this.groupProduct.freightTemplateId
				}
				this.$api.httpPost('freightTemplate/api/detail',{
					id: id,
				}).then(r=>{
					this.freightTemplate = r.data
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//获取拼团列表
			getGroupMemberHeadList() {
				this.$api.httpPost('groupMember/api/groupMemberHeadList',{
					productId:this.groupProduct.productId,
					groupProductId:this.groupProduct.id
				}).then(r=>{
					this.groupMemberHeadList = r.data
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			openSelect(index){
				if(index===1){
					this.cartBtnShow = true
				}else if(index===2){
					this.buyBtnShow = true
				}else if(index===3){
					this.groupBtnShow =true
				}
				this.specClass = 'show'
			},
			goCart(){
				uni.switchTab({
					url: `/pages/cart/cart`
				})
			},
			goStore(){
				uni.navigateTo({
					url: `/pagesProduct/product/factory?factoryNo=${this.product.factoryNo}`
				})
			},
			initData(){
				this.$api.loading('加载中...')
				this.$api.httpPost('productInfo/api/detailForActivity',{
					homePageId:this.homePageId
				}).then(r=>{
					console.log("请求结果：",r.data)
					if(r.data){
						this.product=r.data
						if(r.data.groupProduct.isActivity === 1){
							this.groupProduct = r.data.groupProduct
						}
						if(this.product.orderProductColorList&&this.product.orderProductColorList.length>0){
							console.log("orderProductColorList",this.product.orderProductColorList)
							this.$set(this.product.orderProductColorList[0], 'selected', true);
							this.specSelected=this.product.orderProductColorList[0];
						}
						if(this.product.filePathList && this.product.filePathList.length>0){
							console.log(this.product.filePathList)
							this.product.filePathList.forEach(e=>{
								if(e.type==1){
									this.imgList.push(e.filePath)
								}else if(e.type==2){
									this.videoList.push(e.filePath)
								}
							})
						}
						this.favorite=this.product.isFavorite==1
						this.$refs.article.setContent(this.product.introductory);
						if(this.product.deliveryMethod){
							let arr = this.product.deliveryMethod.split(",")
							for(let item of arr){
								for(let obj of this.deliveryMethodList){
									if(obj.value == item){
										obj.visible = true
									}
								}
							}
						}
					}else{
						this.$api.msg('未找到产品信息')
						uni.navigateBack()
					}
					uni.hideLoading();
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			getCartCount(){
				this.$api.httpPost('shoppingCart/api/selectCount',{
					userId:this.userInfo.id
				}).then(r=>{
					this.count = r.data
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			/**
			 * 统一跳转接口
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			navTo2(){
				// 定义插件变量 引入方法
				let chatPlugin = requirePlugin("ykfchat");
				chatPlugin.callback.on("get_pic_templates", this.get_graphic, this); // 事件名称， 事件函数，this作用域
				uni.navigateTo({
					url: 'plugin://ykfchat/chat-page?wechatapp_id=186830&channel_id=9156&scene=p3012d9bnpl',
				})  
			},
			get_graphic(callback) {
			    
				let id=this.product.id
			    let productData = {
			     _id: 87,
			     title: this.product.product,
			     description: this.product.productName,
			     thumb: this.product.imgPath,
			     value: this.product.price,
			     url: `/pagesProduct/product/product?id=${id}`
			    }
			    console.log(productData);
			    callback(productData)
			  },
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			parse(e) {
				// console.log('parse finish', e);
			},
			ready(e) {
				// console.log('ready', e);
				// console.log('api: getText', this.$refs.article.getText());
				// console.log('imgList', this.$refs.article.imgList);
			},
			imgtap(e) {
				// console.log('imgtap', e);
			},
			linkpress(e) {
				// console.log('linkpress', e);
			},
			error(e) {
				// console.error(e);
			},
			//规格弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
					this.selectShow = false
					this.cartBtnShow = false
					this.buyBtnShow = false
					this.groupBtnShow = false
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
					this.selectShow = true
				}
			},
			//选择尺寸
			selectSize(item){
				this.removeItemSpecSelected('size')
				this.sizeList.forEach(e=>{
					e.selected=false
					if(e.id === item.id){
						this.$set(e, 'selected', true);
						this.specSelected.push(item); 
					}
				})
			},
			//选择颜色
			selectColor(item){
				// this.removeItemSpecSelected('color')
				this.specSelected={}
				this.product.orderProductColorList.forEach(e=>{
					e.selected=false
					if(e.id === item.id){
						this.$set(e, 'selected', true);
						this.specSelected=item; 
					}
				})
			},
			selectDeliveryMethod(item){
				for(let obj of this.deliveryMethodList){
					obj.active =false
				}
				item.active = true
			},
			removeItemSpecSelected(type){
				this.specSelected.forEach(item=>{
					if(item.type === type){ 
						// this.specSelected.filter(i=>this.specSelected.indexOf(item)>-1)
						this.delItem(item,this.specSelected)
					} 
				})
			},
			delItem(item,list){
				const index=list.indexOf(item)
				if(index===-1){return}
				list.splice(index,1)
				return list
			},
			//分享
			share(){
				this.$refs.share.toggleMask();	
			},
			toFavorite(){
				if(this.favorite){
					// this.toFavorite2()
					//取消收藏接口在这里用不了，暂时不用
					this.$api.msg('您已收藏')
					return
				}else{
					this.toFavorite1()
				}
			},
			//收藏
			toFavorite1(){
				this.$api.loading('请求中...')
				this.$api.httpPost('footmark/api/save',{
					productId:this.product.id,
					userId:this.userInfo.id
				}).then(r=>{
					console.log("请求结果：",r)
					uni.hideLoading();
					if(r.code==0){
						this.favorite = !this.favorite;
						this.$api.msg(r.msg||'收藏成功')
					}else{
						this.$api.msg(r.msg||'收藏失败')
					}
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//收藏
			toFavorite2(){
				if(this.favorite){
					this.$api.msg('您已收藏')
					return
				}
				this.$api.loading('请求中...')
				this.$api.httpPost('footmark/api/batchDeletee',{
					productId:this.product.id,
					userId:this.userInfo.id
				}).then(r=>{
					console.log("请求结果：",r)
					uni.hideLoading();
					if(r.code==0){
						this.favorite = !this.favorite;
						this.$api.msg(r.msg||'取消收藏成功')
					}else{
						this.$api.msg(r.msg||'取消收藏失败')
					}
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			buy(){
				let data = this.initGoodList()
				uni.navigateTo({
					url: `/pagesProduct/order/createOrder?data=${JSON.stringify({
						goodsList: data.goodsList,
						totalMoney: data.totalMoney,
						freightTemplate: this.freightTemplate
					})}`
				})
			},
			//开团
			startGroup(){
				let data = this.initGoodList()
				uni.navigateTo({
					url: `/pagesProduct/order/createOrder?data=${JSON.stringify({
						goodsList: data.goodsList,
						groupProduct: this.groupProduct,
						totalMoney: data.totalMoney,
						freightTemplate: this.freightTemplate,
						groupMember: this.getGroupMemberHeadList[0]
					})}`
				})
			},
			joinGroup(item){
				let data = this.initGoodList()
				uni.navigateTo({
					url: `/pagesProduct/order/createOrder?data=${JSON.stringify({
						goodsList: data.goodsList,
						groupProduct: this.groupProduct,
						groupMember: item,
						totalMoney: data.totalMoney,
						freightTemplate: this.freightTemplate
					})}`
				})
			},
			initGoodList(){
				if(this.userInfo.ifVip!=2||this.userInfo.vipState!=1){
					//不是vip用户
					if(this.product.ifVip==2||(this.userInfo.tag==1&&!this.product.isBuy)){
						this.$api.msg('你没有权限购买该物品，需成为VIP会员后才可购买。')
						return
					}
				}
				let goodsList = [];
				let goods = {
					factoryShortName:this.product.factoryShortName,
					factoryNo:this.product.factoryNo,
					factoryName:this.product.factoryName,
					productInfoList:[]
				}
				let totalMoney = 0
				for(let item of this.product.orderProductColorList){
					if(item.shoppingNum){
						let newPro = {
							productName:this.product.productName,//商品名称
							factoryNo:this.product.factoryNo,
							factoryName:this.product.factoryName,
							factoryShortName:this.product.factoryShortName,
						}
						newPro.productNum=item.shoppingNum
						newPro.productId=this.product.id
						newPro.chooseProductColor=item
						newPro.color=item.color
						newPro.imgPath=item.imgPath
						delete newPro.introductory
						goods.productInfoList.push(newPro)
						totalMoney += item.salePrice * item.shoppingNum
					}
				}
				if(goods.productInfoList.length===0){
					this.$api.msg('请先选择需要购买的商品数量')
					return
				}
				goodsList.push(goods)
				console.log("goodsList",goodsList)
				this.toggleSpec()
				return {goodsList: goodsList,totalMoney: totalMoney}
			},
			//加入购物车
			addCart(){
				if(this.userInfo.ifVip!=2||this.userInfo.vipState!=1){
					//不是vip用户
					if(this.product.ifVip==2||(this.userInfo.tag==1&&!this.product.isBuy)){
						this.$api.msg('你没有权限购买该物品，需成为VIP会员后才可购买。')
						return
					}
				}
				this.$api.loading('请求中...')
				this.$api.httpPost('shoppingCart/api/add',{
					userId:this.userInfo.id,
					productId:this.product.id,
					productColorId:this.specSelected.id
				}).then(r=>{
					console.log('请求结果：',r)
					uni.hideLoading()
					if(r.code==0){
						this.$api.msg(r.msg||'添加成功')
						uni.switchTab({
						  url: `/pages/cart/cart`
						});
					}else{
						this.$api.msg(r.msg||'网络错误请重试')
					}
				}).catch(e=>{
					console.log('请求错误：',e)
					uni.hideLoading()
					this.$api.msg(e.msg||'网络错误请重试')
				})
			},
			//批量加入购物车
			batchAddCart(){
				if(this.userInfo.ifVip!=2||this.userInfo.vipState!=1){
					//不是vip用户
					if(this.product.ifVip==2||(this.userInfo.tag==1&&!this.product.isBuy)){
						this.$api.msg('你没有权限购买该物品，需成为VIP会员后才可购买。')
						return
					}
				}
				let objList = []
				for(let item of this.product.orderProductColorList){
					if(item.shoppingNum){
						let obj = {
							userId: this.userInfo.id,
							productId: this.product.id,
							productColorId: item.id,
							productNum: item.shoppingNum
						}
						objList.push(obj)
					}
				}
				if(objList.length===0){
					this.$api.msg('请先选择需要购买的商品数量')
					return
				}
				this.$api.loading('请求中...')
				this.$api.httpPost('shoppingCart/api/batchAdd',objList).then(r=>{
					uni.hideLoading()
					console.log('请求结果：',r)
					this.toggleSpec()
					this.$api.msg(r.msg||'添加成功')
				}).catch(e=>{
					uni.hideLoading()
					console.log('请求错误：',e)
					this.$api.msg(e.msg||'网络错误请重试')
				})
			},
			stopPrevent(){}
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 600upx;
/* 		height: 722upx; */
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.video-wrapper{
			width: 100%;
			height: 100%;
			video{
				width: 100%;
				height: 100%;
			}
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #636363;
		padding: 20upx 30upx;
		color: #FFFFFF;
		.price-content{
			display:flex;
			justify-content: space-between;
			.image-download{
				/* background: #4CD964; */
				background: #808080;
				padding: 6rpx 20rpx;
				border-radius: 50rpx;
				line-height: 50rpx;
				text{
					font-size: 26rpx;
					/* color: #ffff00; */
				}
			}
		}
		.title{
			font-size: 32upx;
			color: #FFFFFF;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		margin-top: 15rpx;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
			
			.toRight {
				margin-left: auto;
				display: flex;
				
				.text-box {
					font-size: 22upx;
					text-align: right;
					margin-right: 10upx;
				}
				
				.group-btn{
					font-size: 26upx;
					background-color: #e60003;
					height: 60upx;
					line-height: 60upx;
					padding: 0 26upx;
					color: #FFFFFF;
					letter-spacing: 4upx;
					border-radius: 12upx;
				}
			}
			
			.user-name {
				margin-left: 20upx;
				margin-bottom: 10upx;
			}
			.count-right {
				margin-left: auto;
			}
			
			.progress-left{
				width: 80%;
			}
			
			.progress-right {
				margin-left: auto;
				color: #8d8d8d;
				font-size: 20upx;
			}
			
			.price-left{
				color: #ff0004;
				font-size: 20upx;
			}
			
			.price-right{
				color: #e50003;
				font-size: 28upx;
			}
			
			.activity-btn {
				width: 100%;
				font-size: 30upx;
				background-color: #e60003;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				/* text-align: center;
				line-height: 60upx; */
				padding: 20upx 26upx;
				color: #FFFFFF;
				letter-spacing: 4upx;
				box-shadow: 0 0 12upx 0 rgba(0,0,0,.5);
				border-radius: 8upx;
			}
		}
		
		.c-c {
			justify-content: center;
		}
		
		.sectionRow {
			padding: 20upx 30upx;
			position: relative;
			
			.title {
				font-weight: bolder;
			}
		}
		.tit{
			width: 140upx;
		}
		.con{
			display: flex;
			flex-wrap: wrap;
			flex: 1;
			color: $font-color-dark;
			.selected-box{
				display: flex;
				align-items: center; 
				justify-content: flex-start;
				/* background: #eee; */
				margin-right: 20upx;
				/* border-radius: 10rpx; */
				/* width: 120rpx; */
				height: 60rpx;
				image{
					width: 60rpx;
					height: 60rpx;
				}
				.selected-text{
					font-size: $font-base;
					color: $font-color-dark;
					margin: 20rpx;
				}
			}
			
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		margin-top: 15rpx;
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
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
		.d-bottom{
			height: 200rpx;
		}
	}
	/* 详细参数 */
	.detail-params{
		background: #fff;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		.d-data{
			display: flex;
			flex-direction: row;
			line-height: 80rpx;
			border-bottom: 1rpx solid #F5F5F5;
			font-size: 24rpx;
			.title{
				flex: 1;
				float: left;
			}
			.info{
				flex: 3;
				float: left;
			}
		}
		.d-bottom{
			height: 200rpx;
		}
	}
	.detail-service{
		background: #fff;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		.d-data{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			line-height: 80rpx;
			border-bottom: 1rpx solid #F5F5F5;
			font-size: 24rpx;
		}
		.d-bottom{
			height: 200rpx;
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
			max-height: 600rpx;
			overflow-y: scroll;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			/* align-items: center; */
			justify-content: left;
			flex-wrap: wrap;
			flex-direction: column;
			/* height: 550rpx; */
			margin-bottom: 20upx;
			
			
			
			.select-box{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				/* background: #eee; */
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 10rpx;
				min-width: 120rpx;
				height: 60rpx;
				/* border: 1upx solid $border-color-light; */
				
				.line-box {
					flex-basis: 100%;
				}
				.number-box {
					margin-left: auto;
				}
				
				image{
					width: 60rpx;
					height: 60rpx;
				}
				text{
					font-size: 20rpx;
					/* color: $font-color-dark; */
					margin: 20rpx;
				}
			}
			
			/* .selected{
				background: #fbebee;
				text{
					color: $uni-color-primary;
					margin: 20rpx;

				}
			} */
		}
		
		.item-list-2{
			padding: 20upx 0 0;
			display: flex;
			align-items: center;
			justify-content: left;
			flex-wrap: wrap;
			/* height: 550rpx; */
			margin-bottom: 20upx;
			
			
			
			.select-box{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 10rpx;
				min-width: 120rpx;
				height: 60rpx;
				/* border: 1upx solid $border-color-light; */
				
				.line-box {
					flex-basis: 100%;
				}
				.number-box {
					margin-left: auto;
				}
				
				image{
					width: 60rpx;
					height: 60rpx;
				}
				text{
					font-size: 20rpx;
					/* color: $font-color-dark; */
					margin: 20rpx;
				}
			}
			
			.selected{
				background: #fbebee;
				text{
					color: $uni-color-primary;
					margin: 20rpx;
		
				}
			}
		}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
			.btn-group{
				display: flex;
				align-items: center;
				justify-content: space-around;
				
				.cartBtn {
					width: 300upx;
					text-align: center;
					line-height: 66rpx;
					padding: 0 30rpx;
					border-radius: 36rpx;
					color: #ffffff;
					background-color: #ed3f14;
					margin-right: 30rpx;
				}
				.buyBtn {
					width: 300upx;
					text-align: center;
					line-height: 66rpx;
					padding: 0 30rpx;
					border-radius: 36rpx;
					color: #ffffff;
					background-color: #ff7900;
				}
			}
			
			
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 30upx;
		bottom:100upx;
		z-index: 95;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
			button{
				line-height: 32rpx;
				padding: 0;
				font-size: 24rpx;
				color: #606266;

			}
			button::after{
				border: none;
			}
		}
		.btn-service{
			padding: 0;
			background: none;
			.btn-name{
				line-height: 32rpx;
			}
		}
		.btn-service::after{
			border: none;
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin-left: 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	
	.navigation {
		width: 100%;
		z-index: 99;
		position:fixed;
		bottom: 0;
		display: flex;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		
		.left {
			display: flex;
			font-size: 20rpx;
			padding: 16rpx 0;
			.item {
				margin: 0 30rpx;
				&.car {
					text-align: center;
					position: relative;
					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			width: 100%;
			
			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50%;
				height: 100%;
				color: #ffffff;
			}
			.cart {
				background-color: #e60003;
			}
			.buy {
				background-color: #ff7900;
			}
			.singleBuy {
				background-color: #ffb7b8;
			}
			.group {
				background-color: #e60003;
			}
		}
	}
</style>

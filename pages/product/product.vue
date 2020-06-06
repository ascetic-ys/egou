<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400" >
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
							mode="aspectFit"
						></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- <view class="image-wrapper">
				<image
					:src="product.imgPath||`http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg`" 
					class="loaded" 
					mode="aspectFill"
				></image>
			</view> -->
			<!-- <view class="video-wrapper">
				<video id="myVideo" :src="videoSrc" @error="videoErrorCallback" 
				controls 
				autoplay='true' 
				loop="true" 
				enable-play-gesture="true" 
				show-mute-btn="true" 
				muted="true" 
				></video>
			</view> -->
		</view>
		
		<view class="introduce-section">
			<text class="title">{{product.productName}}</text>
			<view class="price-content">
				<view class="price-box">
					<text class="price-tip">¥</text>
					<text class="price">{{specSelected.price}}</text>
					<!-- <text class="m-price">¥488</text> -->
					<!-- <text class="coupon-tip">7折</text> -->
				</view>
				<view class="image-download"><text class="yticon icon-Group-" @click="downloadImage">素材下载</text></view>
			</view>
			<!-- <view class="bot-row">
				<text>销量: 108</text>
				<text>库存: 4690</text>
				<text>浏览量: 768</text>
			</view> -->
		</view>
		
		<!--  分享 -->
		<!-- <view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
			
		</view> -->
		
		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec" v-if="product.orderProductColorList.length>0">
				<text class="tit">已选购</text>
				<view class="con">
					<view class="selected-box">
						<image :src="specSelected.imgPath" mode="aspectFit"></image>
						<text class="selected-text">{{specSelected.color}}</text>
					</view>
				</view>
				<text class="yticon icon-you"></text>
			</view>
		<!-- 	<view class="c-row b-b">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<text class="yticon icon-you"></text>
			</view> -->
			<!-- <view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view> -->
			<!-- <view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
			</view> -->
			<!-- <view class="c-row b-b">
				<text class="tit">厂家:</text>
				<view class="bz-list con">
					<text>{{product.factoryShortName}}</text>
				</view>
			</view> -->
			<view class="c-row b-b">
				<text class="tit">保障:</text>
				<view class="bz-list con">
					<text>付款后{{product.guarantee||60}}天内发货</text>
				</view>
			</view>
		</view>
		
		<!-- 评价 -->
		<!-- <view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view> 
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view> -->
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
		<view class="detail-desc" v-show="tabCurrentIndex==0">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<jyf-parser domain="https://6874-html-foe72-1259071903.tcb.qcloud.la" gesture-zoom lazy-load ref="article" selectable
			 show-with-animation use-anchor @error="error" @imgtap="imgtap" @linkpress="linkpress" @parse="parse" @ready="ready">加载中...</jyf-parser>
			<view class="d-bottom"></view>
		</view>
		<view class="detail-params" v-show="tabCurrentIndex==1">
			<!-- 商品编号、风格、主要材质、工艺、功能、体积、面料、适用场景 -->
			<view class="d-data">
				<text class="title">商品编号</text>
				<text class="info">{{product.brand||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">风格</text>
				<text class="info">{{product.specification||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">主要材质</text>
				<text class="info">{{product.productModel||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">工艺</text>
				<text class="info">{{product.technology||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">功能</text>
				<text class="info">{{product.function||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">体积</text>
				<text class="info">{{product.volume||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">面料</text>
				<text class="info">{{product.fabric||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">适用场景</text>
				<text class="info">{{product.adapter||'-'}}</text>
			</view>
			<view class="d-bottom"></view>
		</view>
		<view class="detail-service" v-show="tabCurrentIndex==2">
			<view class="d-data" @click="navTo('/pages/set/protocolCommon?flag=1')">
				<text class="title">7天无理由退换货规则</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="d-data" @click="navTo('/pages/set/protocolCommon?flag=2')">
				<text class="title">包邮服务及物流费用说明</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="d-bottom"></view>
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom" v-if="[1,4].indexOf(userInfo.tag)>-1">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<!-- <button class="p-b-btn btn-service" open-type="contact" @click="navTo" @contact="getContact">
				<text class="yticon icon-xiaoxi"></text>
				<text class="btn-name">客服</text>
			</button> -->
			<button class="p-b-btn btn-service" open-type="contact" @click="navTo2">
				<text class="yticon icon-xiaoxi"></text>
				<text class="btn-name">客服</text>
			</button>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>
			
			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="addCart">加入购物车</button>
			</view>
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
					<image :src="specSelected.imgPath||product.orderProductColorList[0].imgPath" mode="aspectFit"></image>
					<view class="right">
						<text class="price">¥{{specSelected.price}}</text>
						<!-- <text class="stock">库存：188件</text> -->
						<view class="selected">
							已选：
							<text class="selected-text">
								{{specSelected.color}}
							</text>
						</view>
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
				<view class="attr-list" v-if="product.orderProductColorList.length>0">
					<text>颜色</text>
					<view class="item-list">
						<view 
							v-for="(item, index) in product.orderProductColorList " 
							:key="index" class="select-box"
							:class="{selected: item.selected}"
							@click="selectColor(item)"
						>
							<image :src="item.imgPath" mode="aspectFit"></image>
							<text class="tit">{{item.color}}</text>
						</view>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view>
		<!-- 分享 -->
		<!-- <share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share> -->
	</view>
</template>

<script>
	import jyfParser from '@/components/jyf-parser/jyf-parser'; // HBuilderX 2.5.5 及以上可以不需要
	import {mapState} from 'vuex';
	import share from '@/components/share';
	
	
	export default{
		components: {
			share,
			jyfParser
		},
		data() {
			return {
				id:null,
				// videoSrc:'/static/video/banner.mp4',
				videoSrc:'https://jdvideo.300hu.com/vodtransgzp1251412368/9031868223418300449/v.f30.mp4?dockingId=c59ea11a-f67e-4738-b4c3-2eb105aa528d&storageSource=3',
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
				tabCurrentIndex:0,
				navList: [
					{state: 0,text: '商品介绍'},
					{state: 1,text: '详细参数'},
					{state: 2,text: '服务规则'},
				],
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		async onLoad(options){
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.id = options.id;
			this.initData()
			// this.sizeList = await this.$api.json('sizeList')
			// this.colorList = await this.$api.json('colorList')
			//规格 默认选中第一条
			// this.$set(this.sizeList[0], 'selected', true);
			// this.$set(this.colorList[0], 'selected', true);
			// this.specSelected.push(this.sizeList[0]);
			// this.specSelected.push(this.colorList[0]);
			// this.shareList = await this.$api.json('shareList');
		},
		methods:{
			initData(){
				this.$api.loading('加载中...')
				this.$api.httpPost('productInfo/api/detail',{
					id:this.id,
					userId:this.userInfo.id
				}).then(r=>{
					console.log("请求结果：",r.data)
					if(r.data){
						this.product=r.data
						if(this.product.orderProductColorList&&this.product.orderProductColorList.length>0){
							console.log("orderProductColorList",this.product.orderProductColorList)
							this.$set(this.product.orderProductColorList[0], 'selected', true);
							this.specSelected=this.product.orderProductColorList[0];
						}
						if(this.product.filePathList && this.product.filePathList.length>0){
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
					}else{
						this.$api.msg('未找到产品信息')
						uni.navigateBack()
					}
					uni.hideLoading();
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
					uni.hideLoading();
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
			     url: `/pages/product/product?id=${id}`
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
			downloadImage(){
				console.log("素材下载：",this.imgList)
				this.$api.loading("正在保存素材...")
				this.saveVideo()
				this.saveImage()
			},
			saveImage(url){
				this.imgList.forEach(e=>{
					const downloadTask = uni.downloadFile({
						url: e,
						success: (res) => {
							if (res.statusCode === 200) {
								// console.log('下载成功', res);
								let filePath = res.tempFilePath;
								console.log("保存图片路径：", filePath)
								uni.authorize({
									scope: 'scope.writePhotosAlbum',
									success: function() {
										uni.saveImageToPhotosAlbum({
											filePath: filePath,
											success: function() {
												uni.hideLoading();
												// console.log('save success');
												// uni.showToast({title: "图片保存成功",icon: "none"});
											}
										});
									}
								})
							} else {
								uni.showToast({title: '获取图片失败！',icon: "none"})
							}
						},
						fail:(res) => {
							uni.hideLoading()
						}
					});
					downloadTask.onProgressUpdate((res) => {
						console.log('image下载进度' + res.progress);
						console.log('image已经下载的数据长度' + res.totalBytesWritten);
						console.log('image预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					});
				})
			},
			saveVideo(){
				this.videoList.forEach(e=>{
					const downloadTask = uni.downloadFile({
						url: e,
						success: (res) => {
							if (res.statusCode === 200) {
								// console.log('下载成功', res);
								let filePath = res.tempFilePath;
								console.log("保存视频路径：", filePath)
								uni.authorize({
									scope: 'scope.writePhotosAlbum',
									success: function() {
										uni.saveVideoToPhotosAlbum({
											filePath: filePath,
											success: function() {
												uni.hideLoading();
												// console.log('save success');
												// uni.showToast({title: "视频保存成功",icon: "none"});
											}
										});
									}
								})
							} else {
								uni.showToast({title: '获取视频失败！',icon: "none"})
							}
					
						},
						fail:(res) => {
							uni.hideLoading()
						}
					});
					downloadTask.onProgressUpdate((res) => {
						console.log('video下载进度' + res.progress);
						console.log('video已经下载的数据长度' + res.totalBytesWritten);
						console.log('video预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					})
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
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
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
					if(r.code==0){
						this.favorite = !this.favorite;
						this.$api.msg(r.msg||'收藏成功')
					}else{
						this.$api.msg(r.msg||'收藏失败')
					}
					uni.hideLoading();
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
					uni.hideLoading();
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
					if(r.code==0){
						this.favorite = !this.favorite;
						this.$api.msg(r.msg||'取消收藏成功')
					}else{
						this.$api.msg(r.msg||'取消收藏失败')
					}
					uni.hideLoading();
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
					uni.hideLoading();
				})
			},
			buy(){
				let goodsList = [];
				let goods = {
					factoryShortName:this.product.factoryShortName,
					factoryNo:this.product.factoryNo,
					factoryName:this.product.factoryName,
					productInfoList:[]
				}
				let newPro = this.product
				newPro.productNum=1
				newPro.productId=this.product.id
				newPro.chooseProductColor=this.specSelected
				newPro.color=this.specSelected.color
				newPro.imgPath=this.specSelected.imgPath
				delete newPro.introductory
				goods.productInfoList.push(newPro)
				goodsList.push(goods)
				console.log("goodsList",goodsList)
				uni.navigateTo({
					url: `/pages/order/createOrder?data=${JSON.stringify({
						goodsList: goodsList,
						totalMoney: this.specSelected.price
					})}`
				})
			},
			//加入购物车
			addCart(){
				this.$api.loading('请求中...')
				this.$api.httpPost('shoppingCart/api/add',{
					userId:this.userInfo.id,
					productId:this.product.id,
					productColorId:this.specSelected.id
				}).then(r=>{
					console.log('请求结果：',r)
					if(r.code==0){
						this.$api.msg(r.msg||'添加成功')
						uni.switchTab({
						  url: `/pages/cart/cart`
						});
					}else{
						this.$api.msg(r.msg||'网络错误请重试')
					}
					uni.hideLoading()
				}).catch(e=>{
					console.log('请求错误：',e)
					this.$api.msg(e.msg||'网络错误请重试')
					uni.hideLoading()
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
		height: 432upx;
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
		}
		.tit{
			width: 140upx;
		}
		.con{
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
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			.select-box{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 10rpx;
				min-width: 120rpx;
				height: 60rpx;
				image{
					width: 60rpx;
					height: 60rpx;
				}
				text{
					font-size: 20rpx;
					color: $font-color-dark;
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
		bottom:30upx;
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
	
</style>

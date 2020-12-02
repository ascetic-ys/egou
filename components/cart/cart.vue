<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="/pages/index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<!-- <view class="g-header">
					<view
						class="yticon icon-xuanzhong2 checkbox"
						:class="{checked: allChecked}"
						@click="check('all')"
					></view>
					<text class="name">柏福车饰</text>
				</view> -->
				<block v-for="(item, index) in cartList" :key="index">
					<view
						class="cart-item" 
						:class="{'b-b': index!==cartList.length-1}"
					>
						<view class="g-header">
							<view
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: item.checked}"
								@click="check('item',index)"
							></view>
							<text class="name">{{item.factoryName}}</text>
						</view>
						<view class="product-info" v-for="(product, m) in item.productInfoList" :key="m">
							<view class="image-wrapper">
								<image :src="product.imgPath||item.imgPath||`/static/errorImage.jpg`" mode="aspectFill" ></image>
								<view 
									class="yticon icon-xuanzhong2 checkbox"
									:class="{checked: product.checked}"
									@click="check('product',index, m)"
								></view>
							</view>
							<view class="item-right">
								<text class="clamp title">{{product.productName}}</text>
								<text class="attr">{{product.chooseProductColor.color}}</text>
								<view class="price-box">
									<text class="price">¥{{product.chooseProductColor.salePrice}}</text>
									<view class="number-box">
										<uni-number-box
											class="step"
											:min="1" 
											:max="100"
											:value="product.productNum>100?100:product.productNum"
											:isMax="product.productNum>=100?true:false"
											:isMin="product.productNum===1"
											:index="index"
											:mindex="m"
											@eventChange="numberChange"
										></uni-number-box>
									</view>
									
									
								</view>
								<view class="raido-box">
									<u-section title="发货方式" :sub-title="product.chooseDeliveryMethod" :showLine="showLine" :bold="bold" @click="toggleSpec(product)"></u-section>
								</view>
							</view>
							<text class="del-btn yticon icon-fork" @click="deleteCartItem(product,m)"></text>
						</view>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image 
						:src="allChecked?'/static/selected.png':'/static/select.png'" 
						mode="aspectFit"
						@click="check('all')"
					></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
					<!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
		
		<view
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec" >
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<scroll-view class="attr-list" scroll-y>
					<text>发运方式</text>
					<view class="item-list-2">
						
						<block v-for="(item, index) in deliveryMethodList" :key="index">
							<template v-if="item.visible">
								<view
									class="select-box"
									:class="{selected: item.active}"
									@click="selectDeliveryMethod(item)"
								>
										<text class="tit">{{item.name}}</text>
								</view>
							</template>
						</block>
					</view>
				</scroll-view>
				<button class="btn" @click="toggleSpec">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		props:['tag'],
		components: {
			uniNumberBox
		},
		data() {
			return {
				specClass: 'none',
				showLine: false,
				bold: false,
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页显示  true|false
				cartList: [],
				tempProduct: {},
				deliveryMethodList:[
					{name: '快递',value: 1,active: false, visible:false},
					{name: '快运',value: 2,active: false, visible:false},
					{name: '物流',value: 3,active: false, visible:false},
				],
			};
		},
		created() {
			this.initData()
		},
		mounted(){
			this.initData()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			initData(){
				console.log('tag',this.tag)
				this.initParams()
				this.loadData();
			},
			initParams(){
				this.params={
					pageSize:10,
					pageNum:1,
					orderByColumn:'',
					isAsc:'',
					userId:this.userInfo.id
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
					this.mescroll.endBySize(r.length, t.total); //必传参数(当前页的数据个数, 总数据量)
								
					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
								
					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					// this.mescroll.endSuccess(r.length)
				}).catch(()=>{
					this.mescroll.endErr()
				})
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(data={}) {
				const {pageNum=1,pageSize=10}=data
				if(!this.params.orderByColumn){
					delete this.params.orderByColumn
					delete this.params.isAsc
				}
				this.$api.loading('加载中...')
				this.$api.httpPost('shoppingCart/api/list',{pageNum,pageSize,...this.params}).then(r=>{
					console.log("请求结果：",r)
					if(pageNum===1){
						this.cartList=r.rows
					}else{
						this.cartList=this.cartList.concat(r.rows)
					}
					this.cartList.forEach(e=>{
						e.checked=true
						e.productInfoList.forEach(x=>{
							x.checked=true
						})
					})
					this.empty = this.cartList.length === 0 ? true: false;
					uni.hideLoading();
					this.calcTotal();  //计算总价
					return this.cartList
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			clickTab(item){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				}
				uni.navigateTo({
					url:item.pagePath
				})
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pagesUser/public/login'
				})
			},
			 //选中状态处理
			check(type, index,mm){
				// console.log("type:",type,index,mm)
				if(type === 'item'){
					const checked = !this.cartList[index].checked
					const list = this.cartList[index].productInfoList
					list.forEach(item=>{
						item.checked = checked
					})
					this.cartList[index].checked = checked
				}else if(type === 'product'){
					let newList = []
					this.cartList[index].productInfoList.forEach((item,mn)=>{
						console.log("item",item)
						if(mn==mm){
							item.checked = !item.checked
						}
						newList.push(item)
					})
					this.cartList[index].productInfoList=newList
					let itemFlagTrue = false//至少有一个商品选中为true
					let itemFlagFalse = false//至少有一个商品未选中为true
					this.cartList[index].productInfoList.forEach((item,mn)=>{
						// console.log("item",item)
						if(item.checked){
							itemFlagTrue=true
						}
						if(!item.checked){
							itemFlagFalse=true
						}
					})
					if(!itemFlagTrue){
						//没有一个商品选中
						this.cartList[index].checked = false
					}else{
						//至少有一个商品选中
						this.cartList[index].checked = true
					}
					// console.log("itemFlagFalse",itemFlagFalse)
					if(itemFlagFalse){
						//至少有一个未选中
						this.allChecked = false;
					}
				}else{
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item=>{
						item.checked = checked;
						let newList = []
						item.productInfoList.forEach((item,mn)=>{
							console.log("item",item)
							item.checked = checked
							newList.push(item)
						})
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data){
				// console.log("data：",data)
				// console.log("this.cartList：",this.cartList)
				this.cartList[data.index].productInfoList[data.mindex].productNum = data.number;
				// this.$api.loading('请求中...')
				this.$api.httpPost('shoppingCart/api/update',{
					id:this.cartList[data.index].productInfoList[data.mindex].shoppingCartId,
					productNum:this.cartList[data.index].productInfoList[data.mindex].productNum
				}).then(r=>{
					// console.log('请求结果：',r)
					uni.hideLoading()
					if(r.code==0){
						// this.$api.msg(r.msg||'修改成功')
						this.calcTotal();
					}else{
						this.$api.msg(r.msg||'网络错误请重试')
					}
				}).catch(e=>{
					console.log('请求错误：',e)
					uni.hideLoading()
					this.$api.msg(e.msg||'网络错误请重试')
				})
			},
			//删除
			deleteCartItem(item,index){
				let ids = []
				ids.push(item.shoppingCartId)
				this.deleteCart(ids);
			},
			deleteCart(ids){
				this.$api.loading('请求中...')
				this.$api.httpPost('shoppingCart/api/delete',{
					ids:ids.join()
				}).then(r=>{
					console.log('请求结果：',r)
					uni.hideLoading()
					if(r.code==0){
						this.$api.msg(r.msg||'删除成功')
						this.loadData()
					}else{
						this.$api.msg(r.msg||'网络错误请重试')
					}
				}).catch(e=>{
					console.log('请求错误：',e)
					uni.hideLoading()
					this.$api.msg(e.msg||'网络错误请重试')
				})
			},
			//清空
			clearCart(){
				uni.showModal({
					content: '清空购物车？',
					success: (e)=>{
						if(e.confirm){
							let ids = []
							this.cartList.forEach(e=>{
								e.productInfoList.forEach(item=>{
									ids.push(item.shoppingCartId)
								})
							})
							this.deleteCart(ids);
						}
					}
				})
			},
			//计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item=>{
					item.productInfoList.forEach(product=>{
						if(product.checked === true){
							total += product.chooseProductColor.salePrice * product.productNum;
						}else if(checked === true){
							checked = false;
						}
					})
				})
				this.allChecked = checked;
				this.total = total;
			},
			//创建订单
			createOrder(){
				let list = this.cartList;
				let goodsList = [];
				let flag = false
				list.forEach(item=>{
					if(item.checked){
						let newItem = item
						let newProList = []
						item.productInfoList.forEach(product=>{
							if(!product.chooseDeliveryMethod){
								flag = true
							}
							if(product.checked){
								let newPro = product
								delete newPro.introductory
								newProList.push(newPro)
							}
						})
						newItem.productInfoList=newProList
						goodsList.push(newItem)
					}
				})
				
				if(flag){
					this.$api.msg('请选择发货方式')
					return
				}
				
				if(goodsList.length<=0){
					this.$api.msg('请选择商品')
					return
				}

				uni.navigateTo({
					url: `/pagesProduct/order/createOrder?data=${JSON.stringify({
						goodsList: goodsList,
						totalMoney: this.total
					})}`
				})
				// this.$api.msg('跳转下一页 sendData');
			},
			//规格弹窗开关
			toggleSpec(product) {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
					for(let obj of this.deliveryMethodList){
						if(obj.active){
							this.tempProduct.chooseDeliveryMethod = obj.name
						}
						
						obj.visible = false
						obj.active = false
					}
					this.tempProduct = {}
					
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
					if(product.deliveryMethod){
						let arr = product.deliveryMethod.split(",")
						for(let item of arr){
							for(let obj of this.deliveryMethodList){
								if(obj.value == item){
									obj.visible = true
								}
							}
						}
					}
					this.tempProduct = product
				}
			},
			selectDeliveryMethod(item){
				for(let obj of this.deliveryMethodList){
					obj.active =false
				}
				item.active = true
				
			},
			stopPrevent(){}
		}
	}
</script>

<style lang='scss'>
	.container{
		padding-bottom: 180upx;
		/* 空白页 */
		.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}
	.g-header {
		display: flex;
		align-items: center;
		height: 84upx;
		padding: 30rpx 20rpx;
		position: relative;
		background: #FFFFFF;
		.checkbox{
			position:absolute;
			left:4upx;
			top: 20upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #FFFFFF;
			border-radius: 50px;
		}
		.name{
			text-indent: 45rpx;
		}
	}
	
	.cart-list {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		flex-direction: column;
		background: #FFFFFF;
		margin-top: 20rpx;
		width: 94%;
		border-radius: 12upx 12upx;
		/* box-shadow: 12upx 12upx 12upx #d1d6de; */
		
		.product-info{
			background: #FFFFFF;
			padding: 20rpx;
			display: flex;
			.image-wrapper{
				width: 230upx;
				height: 230upx;
				flex-shrink: 0;
				position:relative;
				image{
					border-radius:8upx;
					opacity: 1;
				}
			}
			.checkbox{
				position:absolute;
				left:-16upx;
				top: -16upx;
				z-index: 8;
				font-size: 44upx;
				line-height: 1;
				padding: 4upx;
				color: $font-color-disabled;
				background:#fff;
				border-radius: 50px;
			}
			.item-right{
				display:flex;
				flex-direction: column;
				flex: 1;
				overflow: hidden;
				position:relative;
				padding-left: 30upx;
				.title,.price{
					font-size:$font-base + 2upx;
					color: $font-color-dark;
					height: 40upx;
					line-height: 40upx;
				}
				.attr{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					height: 50upx;
					line-height: 50upx;
					display:block; /*这里设置inline-block或者block；根据使用情况来定（行内元素需要加这个，块级元素和行内块级可以不用）*/
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.price-box{
					display: flex;
					align-items: center;
					.price{
						height: 50upx;
						line-height:50upx;
					}
					
					.number-box{
						margin-left: auto;
					}
				}
				
				
				.raido-box {
				}
			}
			.del-btn{
				padding:4upx 10upx;
				font-size:34upx; 
				height: 50upx;
				color: $font-color-light;
			}
		}
		
	}	/* 规格选择弹窗 */
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
	
	/* 底部栏 */
	.action-section{
		// #ifdef H5
		margin-bottom: 80upx;
		// #endif
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 52upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				text{
					color: $font-color-dark;
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
		
		
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.g-header .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-primary;
	}
</style>

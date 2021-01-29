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
		
		<view class="introduce-section">
			<text class="title">{{product.productName}}</text>
			<view class="price-content">
				<view class="price-box">
					<text class="price-tip">¥</text>
					<text class="price">{{product.factoryPrice}}</text>
				</view>
				<view class="image-download"><text class="yticon icon-Group-" @click="downloadImage">素材下载</text></view>
			</view>
		</view>
		
		<view class="c-list" v-if="groupMemberHeadList.length>0">
			<view class="sectionRow b-b">
				<u-section :show-line="false" font-size="26" :right="false" :bold="false" :title="groupMemberHeadList.length+'人在拼单，可直接参与'" sub-title="查看更多"></u-section>
			</view>
			<block v-for="(item,index) in groupMemberHeadList" :key="index">
				<template>
					<view class="c-row b-b">
						<u-avatar :src="item.imgPath"  size="mini"></u-avatar>
						<view class="user-name" >{{item.userName}}</view>
						
						<view class="toRight">
							<view class="text-box">
								<view class="">还差<text style="color: #e60003;">{{item.totalPeople-item.joinPeople}}人</text>拼成</view>
								
								<view class="" style="margin-top: 4upx;">
									还剩
									<u-count-down font-size="22" :show-days="false" :timestamp="item.leftTime"></u-count-down>
								</view>
							</view>
							<view class="group-btn" @click="openSelect(4,item)">去拼单</view>
						</view>
					</view>
				</template>
				
			</block>
			

		</view>
		
		
		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec" v-if="[1,4].indexOf(userInfo.tag)>-1&&!groupProduct&&product.orderProductColorList.length>0">
				<text class="tit">已选购</text>
				<view class="con">
					<view class="selected-box" v-for="(item,index) in product.orderProductColorList" :key="index">
						<!-- <template v-if="item.shoppingNum">
							<image :src="item.imgPath||'/static/errorImage.jpg'" mode="aspectFit"></image>
							<text class="selected-text">{{item.color}}</text>
						</template> -->
						<template v-if="item.selected">
							<image :src="item.imgPath||'/static/errorImage.jpg'" mode="aspectFit"></image>
							<text class="selected-text">{{item.color}}</text>
						</template>
					</view>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b">
				<text class="tit">保障:</text>
				<view class="bz-list con">
					<text>付款后{{product.guarantee||60}}天内发货</text>
				</view>
			</view>
			<view class="c-row b-b" v-if="product.precautions">
				<!-- <text class="tit">注意事项:</text> -->
				<view class="bz-list con precautions">
					<!-- <text>{{product.precautions||'-'}}</text> -->
					<u-read-more :shadow-style="shadowStyle" :text-indent="0" :toggle="true" :show-height="150">
						<text>{{product.precautions}}</text>
						<!-- <rich-text :nodes="product.precautions"></rich-text> -->
					</u-read-more>
				</view>
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
				<text class="title">产品规格</text>
				<text class="info">{{product.productStandard||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">商品编码</text>
				<text class="info">{{product.productCode||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">颜色</text>
				<text class="info">{{colorAll||'-'}}</text>
			</view>
			<view class="d-data">
				<text class="title">库存数量</text>
				<text class="info">{{stockNumAll||'-'}}</text>
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
		</view>
		<view class="detail-service" v-show="tabCurrentIndex==2">
			<view class="d-data" @click="navTo('/pagesUser/set/protocolCommon?flag=1')">
				<text class="title">7天无理由退换货规则</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="d-data" @click="navTo('/pagesUser/set/protocolCommon?flag=2')">
				<text class="title">包邮服务及物流费用说明</text>
				<text class="yticon icon-you"></text>
			</view>
		</view>
		
		
		
		
		<view class="navigation" v-if="[1,4].indexOf(userInfo.tag)>-1">
			<view class="left">
				<view class="item" @click="navTo2">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
				<view class="item" @click="goStore">
					<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">店铺</view>
				</view>
				<view class="item car" @click="goCart">
					<u-badge class="car-num" :count="count" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right" v-if="!groupProduct">
				<view class="cart btn u-line-1" @click="openSelect(1)">加入购物车</view>
				<view class="buy btn u-line-1" @click="openSelect(2)">立即购买</view>
			</view>
			<view class="right" v-if="groupProduct">
				<view class="singleBuy btn u-line-1" @click="openSelect(2)">单独购买</view>
				<view class="group btn u-line-1" @click="openSelect(3)">发起拼团</view>
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
					<image :src="specSelected.imgPath||'/static/errorImage.jpg'" mode="aspectFill"></image>
					<!-- <image :src="product.imgPath||'/static/errorImage.jpg'" mode="aspectFill"></image> -->
					<view class="right">
						<!-- <text>{{product.product}}</text>
						<text>¥{{product.factoryPrice}}</text> -->
						<text class="price">¥{{specSelected.price}}</text>
						<text class="selected">1平方米的价格</text>
						<!-- <view class="selected">
							已选：
							<text class="selected-text">
								{{specSelected.color}}
							</text>
						</view> -->
					</view>
				</view>
				
				<scroll-view class="attr-list" v-if="product.orderProductColorList.length>0" scroll-y>
					<view class="line-box">
						<u-line></u-line>
					</view>
					<view class="title">
						<text>颜色分类</text>
					</view>
					<view class="item-list-2">
						<view 
							v-for="(item, index) in product.orderProductColorList " 
							:key="index" class="select-box"
							:class="{selected: item.selected}"
							@click="selectColor(item)"
						>
							<image :src="item.imgPath||'/static/errorImage.jpg'" mode="aspectFill"></image>
							<text class="tit">{{item.color}}</text>
						</view>
					</view>
					<view class="line-box">
						<u-line></u-line>
					</view>
					<view class="item-list-2">
						<text class="text-box">规格</text>
						<text class="text-box text-tooltip" >库存：{{specSelected.stockNum||'-'}}</text>
						<view class="select-box selected to-right">
							<text class="tit">{{specSelected.colorSpecification}}m²/包</text>
						</view>
					</view>
					<view class="line-box">
						<u-line></u-line>
					</view>
					<view class="item-list-2">
						<text class="text-box">购买数量</text>
						<!-- <text class="text-box text-tooltip" >总面积：{{specSelected.area}}m²</text> -->
						<!-- <view class="to-right" style="text-align: right;">
							<tui-numberbox :value="specSelected.shoppingNum" @change="shoppingNumChange" :width="120"></tui-numberbox>
						</view> -->
						<view class="to-right">
							<u-number-box  @change="shoppingNumChange"  v-model="specSelected.shoppingNum" :long-press="false" min="1" 
							 :bg-color="bgColor" :color="color" :input-width="100"
							:step="specSelected.increaseNum||1" :disabled-input="specSelected.increaseNum&&specSelected.increaseNum>1"></u-number-box>
						</view>
					</view>
					<view class="line-box">
						<u-line></u-line>
					</view>
					<view class="item-list-2">
						<text class="text-box">总面积（m²）</text>
						<!-- <view class="to-right" style="text-align: right;">
							<tui-numberbox :value="specSelected.area" @change="areaChange" :width="120"></tui-numberbox>
						</view> -->
						<view class="to-right">
							<u-number-box  @change="areaChange"  v-model="specSelected.area" :long-press="false"  :bg-color="bgColor" :color="color" 
							:positive-integer="false" :input-width="100"></u-number-box>
						</view>
					</view>
					<view class="line-box" v-if="specSelected.installFee">
						<u-line></u-line>
					</view>
					<view class="item-list-2" v-if="specSelected.installFee">
						<text class="text-box">安装费用</text>
						<text class="text-box text-tooltip" >总费用：￥{{specSelected.installFeeTotal}}</text>
						<view class="select-box to-right" :class="{selected: specSelected.isInstall}" @click="specSelected.isInstall=!specSelected.isInstall">
							<text class="tit">{{specSelected.installFee}}￥/m²</text>
						</view>
						
					</view>
					<view class="line-box" v-if="specSelected.keelInstallationFee">
						<u-line></u-line>
					</view>
					<view class="item-list-2" v-if="specSelected.keelInstallationFee">
						<text class="text-box">龙骨安装费</text>
						<text class="text-box text-tooltip" >总费用：￥{{specSelected.keelInstallationFeeTotal}}</text>
						<view class="select-box to-right" :class="{selected: specSelected.isKeelInstall}" @click="specSelected.isKeelInstall=!specSelected.isKeelInstall">
							<text class="tit">{{specSelected.keelInstallationFee}}￥/m²</text>
						</view>
						
					</view>
					<view class="line-box">
						<u-line></u-line>
					</view>
					<view class="title">
						<text>发运方式</text>
					</view>
					
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
				<button v-if="cartBtnShow" class="btn" @click="batchAddCart">确定</button>
				<button v-if="buyBtnShow" class="btn" @click="buy">确定</button>
				<button v-if="groupBtnShow" class="btn" @click="startGroup">确定</button>
				<button v-if="joinGroupBtnShow" class="btn" @click="joinGroup">确定</button>
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
	
	var Decimal = require('decimal.js');
	
	export default{
		components: {
			share,
			jyfParser,
		},
		data() {
			return {
				shadowStyle: {
					backgroundImage: "none",
					paddingTop: "0",
					marginTop: "20rpx"
				},
				id:null,
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
				joinGroupBtnShow: false,
				groupProduct: undefined,//拼团信息,
				groupMember: undefined,//拼团信息,
				groupMemberHeadList: [],//拼团团长信息列表
				freightTemplate: {},//运费模板
				limitNum: 0,//起始购买数量
				colorAll: '',
				stockNumAll: 0,
				shoppingNumAll: 0,
				changeIndex: -1,
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
			/* "specSelected.shoppingNum": {
				handler: function (val, oldVal) {
					if(val){
						let area = new Decimal(this.specSelected.shoppingNum).mul(this.specSelected.colorSpecification)
						this.$set(this.specSelected, 'area', area)
						//计算安装费用
						if(this.specSelected.installFee){
							let installFeeTotal = area.mul(this.specSelected.installFee)
							this.$set(this.specSelected, 'installFeeTotal', installFeeTotal)
						}else{
							this.$set(this.specSelected, 'installFeeTotal', '-')
						}
					}else{
						this.$set(this.specSelected, 'area', '-')
					}
				},
				deep: true
			} */
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		onLoad(options){
			if(!this.hasLogin){
				uni.reLaunch({
					url:'/pagesUser/public/login'
				})
				return
			}
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.id = options.id;
			this.initData()
			this.getCartCount()
			this.getGroupProduct()
		},
		methods:{
			areaChange(e){
				
				//debugger
				//总价格：1平方米价格 * 包装面积 * 购买数量
				//总面积：包装面积 * 购买数量
				//安装费： （包装面积 * 购买数量） 向上取整 * 1平方米安装费
				//龙骨安装费： （包装面积 * 购买数量） 向上取整 * 1平方米安装费
				if(this.changeIndex!==1){
					this.changeIndex=0
				}else{
					this.changeIndex=-1
					return
				}
				/* console.log("area..."+e.value)
				this.$set(this.specSelected, 'area', e.value) */
				if(e.value){
					let shoppingNum = new Decimal(e.value).div(this.specSelected.colorSpecification).toNumber()
					shoppingNum = Math.ceil(shoppingNum) //购买数量 = 用户输入面积/包装面积 向上取整
					let area = new Decimal(shoppingNum).mul(this.specSelected.colorSpecification).toNumber() //总面积
					area = Math.ceil(area) //向上取整
					
					//计算安装费用
					if(this.specSelected.installFee){
						let installFeeTotal = new Decimal(area).mul(this.specSelected.installFee)
						this.$set(this.specSelected, 'installFeeTotal', installFeeTotal)
					}
					
					//计算龙骨安装费
					if(this.specSelected.keelInstallationFee){
						let keelInstallationFeeTotal = new Decimal(area).mul(this.specSelected.keelInstallationFee)
						this.$set(this.specSelected, 'keelInstallationFeeTotal', keelInstallationFeeTotal)
					}
					
					this.$set(this.specSelected, 'shoppingNum', shoppingNum)
				}
			},
			shoppingNumChange(e){
				//debugger
				if(this.changeIndex!==0){
					this.changeIndex=1
				}else{
					this.changeIndex=-1
					return
				}
				/* console.log("num..."+e.value)
				this.$set(this.specSelected, 'shoppingNum', e.value) */
				if(e.value){
					let area = new Decimal(this.specSelected.shoppingNum).mul(this.specSelected.colorSpecification).toNumber()
					this.$set(this.specSelected, 'area', area)
					area = Math.ceil(area) //向上取整
					
					//计算安装费用
					if(this.specSelected.installFee){
						let installFeeTotal = new Decimal(area).mul(this.specSelected.installFee)
						this.$set(this.specSelected, 'installFeeTotal', installFeeTotal)
					}
					
					//计算龙骨安装费
					if(this.specSelected.keelInstallationFee){
						let keelInstallationFeeTotal = new Decimal(area).mul(this.specSelected.keelInstallationFee)
						this.$set(this.specSelected, 'keelInstallationFeeTotal', keelInstallationFeeTotal)
					}
				}
			},
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
			openSelect(index,item){
				console.log(item)
				if(index===1){
					this.cartBtnShow = true
				}else if(index===2){
					this.buyBtnShow = true
				}else if(index===3){
					this.groupBtnShow =true
				}else if(index===4){
					this.joinGroupBtnShow = true
					this.groupMember = item
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
					url: `/pagesProduct/product/factory?factoryNo=${this.product.factoryNo}&factoryName=${this.product.factoryName}`
				})
			},
			getGroupProduct(){
				this.$api.httpPost('groupProduct/api/getGroupProductByProductId',{
					productId: this.id,
					isActivity: 0
				}).then(res=>{
					if(res.data.id){
						this.groupProduct = res.data
						this.limitNum = this.groupProduct.quantityLimit
					}
				}).catch(error=>{
					this.$api.msg(error.msg||'网络异常请重试')
				})
			},
			initData(){
				this.$api.loading('加载中...')
				this.$api.httpPost('productInfo/api/detail',{
					id:this.id,
					userId:this.userInfo.id
				}).then(r=>{
					console.log("请求结果：",r.data)
					uni.hideLoading();
					if(r.data){
						this.product=r.data
						if(!this.groupProduct){
							this.limitNum = this.product.limitNum
						}
						if(this.product.orderProductColorList&&this.product.orderProductColorList.length>0){
							this.$set(this.product.orderProductColorList[0], 'selected', true);
							this.$set(this.product.orderProductColorList[0], 'shoppingNum', 1);
							this.$set(this.product.orderProductColorList[0], 'isInstall', false);
							this.$set(this.product.orderProductColorList[0], 'isKeelInstall', false);
							this.$set(this.product.orderProductColorList[0], 'installFeeTotal', 0);
							this.$set(this.product.orderProductColorList[0], 'keelInstallationFeeTotal', 0);
							this.specSelected=this.product.orderProductColorList[0];
						}
						for(let productColor of this.product.orderProductColorList){
							this.colorAll  += ','+productColor.color
							this.stockNumAll += productColor.stockNum
						}
						this.colorAll = this.colorAll.substring(1)
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
						
						//发货方式
						if(this.product.deliveryMethod){
							let arr = this.product.deliveryMethod.split(",")
							let count = 0
							for(let item of arr){
								for(let obj of this.deliveryMethodList){
									if(obj.value == item){
										if(count === 0){
											obj.active = true
										}
										obj.visible = true
										count ++
									}
								}
							}
						}
					}else{
						this.$api.msg('未找到产品信息')
						uni.navigateBack()
					}
					
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			getCartCount(){
				if(this.userInfo.id){
					this.$api.httpPost('shoppingCart/api/selectCount',{
						userId:this.userInfo.id
					}).then(r=>{
						this.count = r.data
					}).catch(e=>{
						this.$api.msg(e.msg||'网络异常请重试')
					})
				}
				
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
					this.selectShow = false
					this.cartBtnShow = false
					this.buyBtnShow = false
					this.groupBtnShow = false
					this.joinGroupBtnShow = false
					this.groupMember = undefined
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
					this.selectShow = true
				}
			},
			//选择颜色
			selectColor(item){
				this.product.orderProductColorList.forEach(e=>{
					this.$set(e, 'selected', false)
					this.$set(e, 'isInstall', false);
					this.$set(e, 'isKeelInstall', false);
				})
				this.$set(item, 'selected', true)
				this.$set(item, 'shoppingNum', 1)
				this.$set(item, 'installFeeTotal', 0)
				this.$set(item, 'keelInstallationFeeTotal', 0)
				this.specSelected=item
			},
			selectDeliveryMethod(item){
				for(let obj of this.deliveryMethodList){
					obj.active =false
				}
				item.active = true
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
				if(!data){
					return
				}
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
				if(!data){
					return
				}
				uni.navigateTo({
					url: `/pagesProduct/order/createOrder?data=${JSON.stringify({
						goodsList: data.goodsList,
						groupProduct: this.groupProduct,
						totalMoney: data.totalMoney,
						freightTemplate: this.freightTemplate
					})}`
				})
			},
			joinGroup(item){
				let groupMember = this.groupMember
				let data = this.initGoodList()
				if(!data){
					return
				}
				uni.navigateTo({
					url: `/pagesProduct/order/createOrder?data=${JSON.stringify({
						goodsList: data.goodsList,
						groupProduct: this.groupProduct,
						groupMember: groupMember,
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
						return false
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
				
				let newPro = {
					productName:this.product.productName,//商品名称
					factoryNo:this.product.factoryNo,
					factoryName:this.product.factoryName,
					factoryShortName:this.product.factoryShortName,
					logisticsType:this.product.logisticsType,
				}
				newPro.productNum=this.specSelected.shoppingNum
				newPro.productId=this.product.id
				newPro.chooseProductColor=this.specSelected
				newPro.color=this.specSelected.color
				newPro.imgPath=this.specSelected.imgPath
				newPro.parentImgPath=this.product.imgPath
				for(let deliveryMethod of this.deliveryMethodList){
					if(deliveryMethod.active){
						newPro.chooseDeliveryMethod=deliveryMethod.name
					}
				}
				newPro.taxPoint=this.product.taxPoint
				newPro.deposit=this.product.deposit
				newPro.isInstall = this.specSelected.isInstall?1:0
				newPro.isKeelInstall = this.specSelected.isKeelInstall?1:0
				newPro.installFeeTotal = this.specSelected.installFeeTotal
				newPro.keelInstallationFeeTotal = this.specSelected.keelInstallationFeeTotal
				delete newPro.introductory
				goods.productInfoList.push(newPro)
				//浮点数精度丢失的问题
				
				totalMoney = new Decimal(this.specSelected.salePrice).mul(this.specSelected.shoppingNum).plus(totalMoney)
				
				if(newPro.productNum < this.limitNum){
					this.$api.msg('少于起购数量:'+ this.limitNum+'，请购买更多的商品')
					return false
				}
				
				goodsList.push(goods)
				this.toggleSpec()
				return {goodsList: goodsList,totalMoney: totalMoney.toString()}
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
				let obj = {
					userId: this.userInfo.id,
					productId: this.product.id,
					productColorId: this.specSelected.id,
					productNum: this.specSelected.shoppingNum,
					isInstall: this.specSelected.isInstall?1:0,
					isKeelInstall: this.specSelected.isKeelInstall?1:0
				}
				for(let deliveryMethod of this.deliveryMethodList){
					if(deliveryMethod.active){
						obj.chooseDeliveryMethod=deliveryMethod.name
					}
				}
				objList.push(obj)
				if(this.specSelected.shoppingNum&&this.specSelected.shoppingNum<1){
					this.$api.msg('请先选择需要购买的商品数量')
					return
				}
				if(this.specSelected.shoppingNum < this.limitNum){
					this.$api.msg('少于起购数量:'+ this.limitNum+'，请购买更多的商品')
					return false
				}
				
				this.$api.loading('请求中...')
				this.$api.httpPost('shoppingCart/api/batchAdd',objList).then(r=>{
					console.log('请求结果：',r)
					this.toggleSpec()
					uni.hideLoading()
					this.$api.msg(r.msg||'添加成功')
				}).catch(e=>{
					console.log('请求错误：',e)
					uni.hideLoading()
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
		}
		
		.sectionRow {
			padding: 20upx 30upx;
			position: relative;
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
		.precautions {
			height: auto;
			
			text {
				font-weight: 900;
				color: #e70000;
			}
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
	
	.d-bottom{
		width: 100%;
		height: 100rpx;
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
			max-height: 850rpx;
			overflow-y: scroll;
			
			.title {
				padding-left: 15rpx;
				padding-top: 15rpx;
				font-size: 32rpx;
				font-weight: bolder;
			}
		}
		.item-list{
			margin: 20upx 0 0;
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
				
				.color-text {
					width: 180upx;
				}
				
				
				
				image{
					width: 60rpx;
					height: 60rpx;
				}
				text{
					font-size: 20rpx;
					/* color: $font-color-dark; */
					margin-left: 20rpx;
				}
			}
			
			.number-box {
				margin-left: auto;
				display: flex;
				align-items: center;
				
				.price-box {
					margin: 10rpx 0;
					
					.price-box-item {
						display: flex;
						
						text {
							margin-left: auto;
						}
					}
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
			margin-bottom: 20upx;
			
			.text-box {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 15rpx 20rpx;
			}
			
			.text-tooltip {
				color: rgba(#000000, .4);
				font-size: 24rpx;
			}
			
			image {
				width: 50rpx;
				height: 50rpx;
			}
			
			.select-box{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				background: rgba(#eee,.4);
				padding: 15rpx 20rpx;
				margin: 20rpx;
				border-radius: 12rpx;
				box-sizing: border-box;
				border: 1rpx solid rgba(#eee,0);
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
					margin-right: 20rpx;
				}
				
				.tit {
					margin-left: 20rpx;
				}
			}
			
			.selected{
				border: 1rpx solid rgba(#ff0000,.9);
				background: rgba(#fbebee,.4);
				text{
					color: $uni-color-primary;
		
				}
			}
			
			.to-right {
				margin-left: auto;
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

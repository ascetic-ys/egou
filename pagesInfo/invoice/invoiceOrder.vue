<template>
	<view class="content b-t">
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
		<view>
			<view class="row b-b" :class="{current: tabCurrentIndex ==0}">
				<text class="tit">名称</text>
				<input class="input" type="text" v-model="invoice.companyName" placeholder=" 名称" placeholder-class="placeholder" />
				<image class="selectImg" src="../../static/tab-cate.png" @click="selectInvoice()"></image>
			</view>
			<view class="row b-b" :class="{current: tabCurrentIndex != 2}">
				<text class="tit">税号</text>
				<input class="input" type="text" v-model="invoice.duty" placeholder="税号" placeholder-class="placeholder" />
			</view>
			<view class="row b-b" :class="{current: tabCurrentIndex != 2}">
				<text class="tit">电话</text>
				<input class="input" type="number" v-model="invoice.phoneNumber" placeholder="电话" placeholder-class="placeholder" />
			</view>
			<!-- <view class="row ">
				<text class="tit">省市区</text>
				<view class="input">
					{{form.addressName}} 
					<pickerAddress @change="changeAddress">{{form.addressName}}</pickerAddress>
				</view>
				<text class="yticon icon-shouhuodizhi"></text>
			</view>
			<view class="row "> 
				<text class="tit">具体位置</text>
				<input class="input" type="text" v-model="form.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
			</view> -->
			<view class="row b-b" :class="{current: tabCurrentIndex != 2}">
				<text class="tit">开户行</text>
				<input class="input" v-model="invoice.openingBank" placeholder="开户行" placeholder-class="placeholder" />
			</view>
			<view class="row b-b" :class="{current: tabCurrentIndex != 2}">
				<text class="tit">账户</text>
				<input class="input" type="number" v-model="invoice.account" placeholder="账户" placeholder-class="placeholder" />
			</view>
			
			<button class="add-btn" @click="checkInvoice()">确定</button>
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
					auto:true,
				},
				source: 0,
				params:{},
				invoiceList: [],
				invoice: {
					companyName: '',
					duty: '',
					phoneNumber: '',
					address:'',
					openingBank:'',
					account:'',
					area: '',
					addressName:'选择地址',
					addressValue:'',
					parentId:'',
					isDefault: 0,
				},
				tabCurrentIndex: 0,
				navList: [
					{state: 0,text: '不开发票'},
					{state: 1,text: '个人发票'},
					{state: 2,text: '企业发票'}
				],
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
			this.tabClick(this.tabCurrentIndex);
			this.initParams()
			this.loadData()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			initParams(){
				this.params={
					parentId:this.userInfo.id,
					orderByColumn:'',
					isAsc:''
				}
			},
			/*下拉刷新的回调 */
			downCallback() {
				//联网加载数据
				this.loadData().then(r => {
					//联网成功的回调,隐藏下拉刷新的状态
					this.mescroll.endSuccess();
				}).catch(()=>{
					//联网失败的回调,隐藏下拉刷新的状态
					this.mescroll.endErr();
				})
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.loadData({pageNum,pageSize}).then(r=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
								
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					// this.mescroll.endByPage(r.length, r.total); //必传参数(当前页的数据个数, 总页数)
								
					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					this.mescroll.endBySize(this.invoiceList.length, r.total); //必传参数(当前页的数据个数, 总数据量)
								
					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
								
					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					// mescroll.endSuccess(r.length)
				}).catch(()=>{
					this.mescroll.endErr()
				})
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(data={}) {
				const {pageNum=1,pageSize=10}=data
				this.params.parentId=this.userInfo.id
				this.params.isDefault=1
				if(!this.params.orderByColumn){
					delete this.params.orderByColumn
					delete this.params.isAsc
				}
				// this.$api.loading('加载中...')
				return this.$api.httpPost('userInfo/api/billingInfoList',{
					pageNum,
					pageSize,
					...this.params
				}).then(r=>{
					console.log("请求结果：",r)
					this.invoice=r.rows[0]
					/* if(pageNum===1){
						this.invoiceList=r.rows
					}else{
						this.invoiceList=this.invoiceList.concat(r.rows)
					} */
					// uni.hideLoading();
					return r
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
					// uni.hideLoading();
				})
			},
			//选择地址
			checkInvoice(){
				if(this.tabCurrentIndex == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().invoice = this.invoice;
					
				}else if(this.tabCurrentIndex == 2){
					this.$api.prePage().invoice = {companyName:this.invoice.companyName};
				}else{
					this.$api.prePage().invoice = {}
				}
				uni.navigateBack()
			},
			selectInvoice(){
				uni.navigateTo({
					url: `/pagesInfo/invoice/invoice?source=1`
				})
			},
			//添加或修改成功之后回调
			refreshList(){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.loadData()
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
				this.list=[]
				
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.invoice-box{
		display: flex;
		align-items: center;
		.tag{
			width: 75rpx;
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.invoice{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
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
	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		&.current{
			display: none;
			
		}
		.selectImg{
			width: 50rpx;
			height: 50rpx;
		}
		.tit{
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.tit-l{
			font-size: 22upx;
			color: $font-color-base;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
</style>

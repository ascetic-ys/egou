<template>
	<view class="content">
		<!-- <view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view> -->
		<view class="head">
			<text>发票</text>
		</view>
		<view class="card">
			<view class="title">
				<text>发票类型</text>
			</view>
			<view class="main">
				<view :class="['item',item.active?'active':''] " v-for="(item,index) in invoiceTypeList" :key="index" @click="selectBtn(1,index)">
					<text>{{item.name}}</text>
				</view>
				<view class="remark">
					电子发票与纸质普通发票具备等同法律效力，订单完成后，可在订单下载电子发票
				</view>
			</view>
		</view>
		<hr/>
		<view class="card">
			<view class="title">
				<text>发票抬头</text>
			</view>
			<view class="main">
				<view :class="['item',item.active?'active':''] " v-for="(item,index) in invoiceTitleList" :key="index" @click="selectBtn(2,index)">
					<text>{{item.name}}</text>
				</view>
				<view class="item-input" v-if="currentIndex!==0">
					<view class="item-label">
						<text>名称</text>
					</view>
					<input v-model="invoice.companyName" placeholder="请输入名称" placeholder-class="pl" />
					<!-- <image class="selectImg" src="/static/tab-cate.png" @click="selectInvoice()"></image> -->
					<text class="yticon icon-bianji" @click.stop="selectInvoice()"></text>
				</view>
				<view class="item-input" v-if="currentIndex==2">
					<view class="item-label">
						<text>税号</text>
					</view>
					<input v-model="invoice.duty" placeholder="请输入税号" placeholder-class="pl" />
				</view>
				<view class="item-input" v-if="currentIndex==2">
					<view class="item-label">
						<text>电话</text>
					</view>
					<input v-model="invoice.phoneNumber" placeholder="请输入电话" placeholder-class="pl" />
				</view>
				<view class="item-input" v-if="currentIndex==2">
					<view class="item-label">
						<text>开户行</text>
					</view>
					<input v-model="invoice.openingBank" placeholder="请输入开户行" placeholder-class="pl" />
				</view>
				<view class="item-input" v-if="currentIndex==2">
					<view class="item-label">
						<text>账户</text>
					</view>
					<input v-model="invoice.account" placeholder=" 账户" placeholder-class="pl" />
				</view>
			</view>
		</view>
		
		<button class="confirm-btn" @click="checkInvoice()">确定</button>
		
		
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {mapState} from 'vuex';
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				invoiceTypeList: [
					{name: '不开发票', value: 0, active: true},
					{name: '电子发票', value: 1, active: false},
					{name: '纸质发票', value: 2, active: false}
				],
				invoiceTitleList: [
					{name: '无', value: 0, active: true},
					{name: '个人', value: 1, active: false},
					{name: '公司', value: 2, active: false}
				],
				currentIndex: 0,
				invoiceList: [],
				invoice: {
					invoiceType: 0,
					invoiceTitle: 0,
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
			}
		},
		onLoad(option){
			console.log(option)
			this.invoice = JSON.parse(option.invoice)
			this.currentIndex = this.invoice.invoiceTitle
			for(let item of this.invoiceTypeList){
				item.active = false
			}
			this.invoiceTypeList[this.invoice.invoiceType].active = true
			for(let item of this.invoiceTitleList){
				item.active = false
			}
			this.invoiceTitleList[this.invoice.invoiceTitle].active = true
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			//选择地址
			checkInvoice(){
				for(let item of this.invoiceTypeList){
					if(item.active){
						this.invoice.invoiceType = item.value
						break
					}
				}
				for(let item of this.invoiceTitleList){
					if(item.active){
						this.invoice.invoiceTitle = item.value
						break
					}
				}
				this.$api.prePage().invoice = this.invoice
				/* if(this.tabCurrentIndex == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().invoice = this.invoice;
					
				}else if(this.tabCurrentIndex == 2){
					this.$api.prePage().invoice = {companyName:this.invoice.companyName};
				}else{
					this.$api.prePage().invoice = {}
				} */
				uni.navigateBack()
			},
			selectInvoice(){
				uni.navigateTo({
					url: `/pagesInfo/invoice/invoice?source=1`
				})
			},
			selectBtn(type,index){
				if(type===1){
					for(let item of this.invoiceTypeList){
						item.active = false
					}
					this.invoiceTypeList[index].active = true
					
					if(index==0){
						for(let item of this.invoiceTitleList){
							item.active = false
						}
						this.invoiceTitleList[0].active = true
						this.currentIndex = 0
					}
				}else if(type===2){
					if(this.invoiceTypeList[0].active){
						return
					}
					for(let item of this.invoiceTitleList){
						item.active = false
					}
					this.invoiceTitleList[index].active = true
					this.currentIndex = index
				}
			}
		}
	}
</script>

<style lang='scss'>
	@import url('/static/css/my-draw.css');
	
</style>

<template>
	<view>
		<StaticalOrder ref='staticalOrder' v-if='userInfo.tag==0'></StaticalOrder>
		<Cart ref='cart' :tag='userInfo.tag' v-if='!userInfo.tag||userInfo.tag==1'></Cart>
		<MyOrder ref='myOrder' v-if='userInfo.tag==2'></MyOrder>
		<MyAchievement ref='myAchievement' v-if='userInfo.tag==3'></MyAchievement>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import Cart from '@/components/cart/cart.vue'
	import MyAchievement from '@/components/my-achievement/my-achievement.vue'
	import MyOrder from '@/components/my-order/my-order.vue'
	import StaticalOrder from '@/components/statical-order/statical-order.vue'
	
	export default {
		components:{
			Cart,
			MyAchievement,
			MyOrder,
			StaticalOrder
		},
		data() {
			return {}
		},
		onLoad(){
			this.initPageTitle()
		},
		onShow() {
			this.initPageTitle()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			initPageTitle(){
				if(!this.userInfo.tag||this.userInfo.tag==1){
					this.$nextTick(() => {
						this.$refs.cart.initData()
					})
				}else if(this.userInfo&&[0,2].indexOf(this.userInfo.tag)>-1){
					uni.setNavigationBarTitle({
					    title: '我的订单'
					});
					uni.setTabBarItem({
					  index: 2,
					  text: '订单',
					  iconPath: "static/tab-order.png",
					  selectedIconPath: "static/tab-order-current.png",
					})
				}else if(this.userInfo&&this.userInfo.tag==3){
					uni.setNavigationBarTitle({
					    title: '我的业绩'
					});
					uni.setTabBarItem({
					  index: 2,
					  text: '业绩',
					  iconPath: "static/tab-achieve.png",
					  selectedIconPath: "static/tab-achieve-current.png",
					})
				}
			}
		}
	}
</script>
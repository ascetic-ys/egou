<template>
	<view>
		<!-- <view class="welcome">
			柏福车品，品牌专区
		</view> -->
		<view class="u-m-t-20" v-for="(child,index) in brandList" :key="index">
			<!-- <u-cell-group>
				<u-cell-item v-for="(item,index) in brandList" :key="index" :title="item.dictValue"></u-cell-item>
				
			</u-cell-group> -->
			<u-cell-group >
				<u-cell-item v-for="(item,childIndex) in child" :key="childIndex" :title="item.dictValue" @click="brandClick(item)"></u-cell-item>
				
			</u-cell-group>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				brandList: []
			}
		},
		onLoad() {
			this.getBrandList()
		},
		methods: {
			brandClick(item){
				uni.navigateTo({
					url: `/pagesProduct/product/list?ibm=${item.dictValue}`
				})
			},
			getBrandList(){
				this.$api.httpPost('common/api/getDictByKey',{key:'productInfo_ibm'}).then(r=>{
					//this.brandList = r.data
					let childList = []
					for(let item of r.data){
						childList.push(item)
						if(childList.length===4){
							this.brandList.push(childList)
							childList = []
						}
					}
					this.brandList.push(childList)
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}

.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
</style>

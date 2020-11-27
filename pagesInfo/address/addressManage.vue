<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="form.linkMan" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="form.phoneNumber" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">省市区</text>
			<view class="input">
				<!-- {{form.addressName}} -->
				<pickerAddress @change="changeAddress">{{form.addressName}}</pickerAddress>
			</view>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">具体位置</text>
			<input class="input" type="text" v-model="form.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<text class="tit-l">提醒：每次下单会默认推荐使用该地址</text>
			<switch :checked="form.isDefault==1" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
		<button class="delete-btn" @click="deleteInfo" v-if="form.id">删除</button>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import pickerAddress from '@/components/pickerAddress/pickerAddress.vue'
	import {isMobile} from '@/api/validate.js'
	export default {
		components:{
			pickerAddress
		},
		data() {
			return {
				title: 'Hello',
				form: {
					id:'',
					receiverAddress: '',
					linkMan: '',
					phoneNumber: '',
					addressName:'选择地址',
					address:'',
					area: '',
					parentId:'',
					isDefault: 0,//是否默认（1：是，0：否）
				}
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				this.form = JSON.parse(option.data)
				this.form.addressName = this.form.receiverAddress.substring(0,this.form.receiverAddress.indexOf(' '))
				this.form.address = this.form.receiverAddress.substring(0,this.form.receiverAddress.indexOf(' '))
				this.form.area = this.form.receiverAddress.slice(this.form.receiverAddress.indexOf(' ')+1,-1)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			switchChange(e){
				this.form.isDefault = e.detail.value?1:0;
			},
			changeAddress(data){
				this.form.province = data.data[0];
				this.form.city = data.data[1];
				this.form.district = data.data[2];
				this.form.addressName = data.data.join('');
				this.form.address = data.data.join('');
			},
			// 地图选择地址
			// chooseLocation(){
			// 	uni.chooseLocation({
			// 		success: (data)=> {
			// 			this.form.area = data.name;
			// 			// this.form.area = data.name;
			// 		}
			// 	})
			// },
			
			//提交
			confirm(){
				if(!this.validateForm()){
					return
				}
				let url = 'userInfo/api/saveConsigneeInfo'
				if(this.manageType==='edit'||this.form.id){
					url = 'userInfo/api/updateConsigneeInfo'
				}
				this.form.parentId=this.userInfo.id
				this.form.receiverAddress=this.form.address+' '+this.form.area
				this.$api.loading('请求中...')
				this.$api.httpPost(url,this.form).then(r=>{
					console.log("请求结果：",r)
					uni.hideLoading();
					if(r.code==0){
						//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
						this.$api.prePage().refreshList();
						this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
					}else{
						this.$api.msg(r.msg||'网络异常请重试')
					}
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			validateForm(){
				if(!this.form.linkMan){
					this.$api.msg('请填写收货人姓名');
					return false
				}
				if(!this.form.phoneNumber){
					this.$api.msg('请填写手机号码');
					return false
				}
				if(!isMobile(this.form.phoneNumber)){
					this.$api.msg('请输入正确的手机号码');
					return false
				}
				if(!this.form.address){
					this.$api.msg('请选择省市区');
					return false
				}
				if(!this.form.area){
					this.$api.msg('请输入具体位置信息');
					return false
				}
				return true
			},
			deleteInfo(){
				this.$api.loading('请求中...')
				this.$api.httpPost('userInfo/api/deleteConsigneeInfo',{ids:this.form.id}).then(r=>{
					console.log("请求结果：",r)
					uni.hideLoading();
					if(r.code==0){
						//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
						this.$api.prePage().refreshList();
						this.$api.msg(`删除成功`);
					}else{
						this.$api.msg(r.msg||'网络异常请重试')
					}
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
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
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
	.delete-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $font-color-light;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 216, 217, 0.4);
	}
</style>

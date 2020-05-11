<template>
	<view class="container">
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">用户名</text>
			<input class="cell-info" v-model="userInfo.userName" placeholder="请输入用户名" maxlength="20"/>
		</view>
		<view class="list-cell  b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">性别</text>
			<view class="cell-info cell-switch">
				<text class="cell-tit" v-if="userInfo.sex==0">男</text>
				<text class="cell-tit" v-if="userInfo.sex==1">女</text>
				<switch color="#fa436a" @change="switchSexChange" />
			</view>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">邮箱</text>
			<input class="cell-info" v-model="userInfo.email" placeholder="请输入邮箱" maxlength="100"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">销售人员</text>
			<input class="cell-info" v-model="userInfo.salesPersonPhoneNumber" placeholder="请输入销售人员手机号" maxlength="11" type=number/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">公司名称</text>
			<input class="cell-info" v-model="userInfo.companyName" placeholder="请输入公司名称" maxlength="50"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">联系人</text>
			<input class="cell-info" v-model="userInfo.linkMan" placeholder="请输入联系人" maxlength="20"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">办公电话</text>
			<input class="cell-info" v-model="userInfo.officePhone" placeholder="请输入办公电话" maxlength="20"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">公司地址</text>
			<input class="cell-info" v-model="userInfo.companyAddress" placeholder="请输入公司地址" maxlength="100"/>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<view class="input-item2">
				<text class="tit" @tap="uploadCert">上传营业执照</text>
			</view>
			<view class="cell-img" @tap.stop="previewImg(showImg)"><image :src="showImg" mode=""></image></view>
		</view>
		
		<button class="confirm-btn" @tap="saveUser">保存</button>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	import {isPhone,isEmail,isMobile} from '@/api/validate.js'
	export default {
		data() {
			return {
				showImg:''
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		onLoad() {
			this.showImg=this.userInfo.filePath?RESOURCE.URL_SHOW+this.userInfo.filePath:''
		},
		methods:{
			...mapMutations(['login','logout']),
			navTo(url){
				// this.$api.msg(`跳转到${url}`);
				uni.navigateTo({
					url:url
				})
			},
			switchSexChange(e){
				console.log("switch:",e.detail.value)
				if(e.detail.value){
					//女
					this.userInfo.sex=1
				}else{
					//男
					this.userInfo.sex=0
				}
			},
			uploadCert(){
				let _this = this
				uni.chooseImage({count:1}).then(r=>{
					const [err,res]=r
					if(err){return}
					_this.userInfo.filePath=res.tempFilePaths[0]
					// _this.showImg=res.tempFilePaths[0]
					const tempFilePaths = res.tempFilePaths;
					uni.uploadFile({
						url: RESOURCE.URL_API + 'orderMainInfo/api/uploadImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'uploadFile',
						formData: {},
						success: (uploadFileRes) => {
							console.log("上传图片结果string：",uploadFileRes);
							if(uploadFileRes.statusCode===200){
								let r = JSON.parse(uploadFileRes.data);
								console.log("上传图片：",r);
								_this.userInfo.filePath = r.msg;
								_this.showImg=RESOURCE.URL_SHOW+r.msg
							}else{
								_this.$api.msg('上传失败')
							}
						}
					});
				})
			},
			saveUser(){
				// 数据验证模块
				if(!this.verifyForm()){
					return
				}
				this.$api.loading('请求中...')
				this.$api.httpPost('userInfo/api/update',this.userInfo).then(r=>{
					console.log('修改请求响应：',r)
					if(r.code==0){
						this.$api.msg(r.msg||'修改成功')
						this.login(this.userInfo)
						uni.navigateBack()
					}else{
						this.$api.msg(r.msg||'网络异常请重试')
					}
					uni.hideLoading();
				}).catch(e=>{
					console.log("修改请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
					uni.hideLoading();
				})
			},
			//校验参数
			verifyForm(){
				if(!this.userInfo.userName){
					this.$api.msg('请输入用户名')
					return false
				}
				if(this.userInfo.email && !isEmail(this.userInfo.email)){
					this.$api.msg('邮箱格式错误')
					return 
				}
				if(this.userInfo.salesPersonPhoneNumber && !isMobile(this.userInfo.salesPersonPhoneNumber)){
					this.$api.msg('销售人员手机号码格式不正确')
					return 
				}
				if(!this.userInfo.companyName){
					this.$api.msg('请输入公司名称')
					return false
				}
				if(this.userInfo.companyName.length>50){
					this.$api.msg('公司名称不能超过50个字符')
					return false
				}
				if(!this.userInfo.linkMan){
					this.$api.msg('请输入联系人')
					return false
				}
				if(!this.userInfo.officePhone){
					this.$api.msg('请输入办公电话')
					return 
				}
				if(!isPhone(this.userInfo.officePhone)){
					this.$api.msg('办公电话格式不正确')
					return false
				}
				if(!this.userInfo.companyAddress){
					this.$api.msg('请输入公司地址')
					return false
				}
				if(this.userInfo.companyAddress.length>100){
					this.$api.msg('公司地址不能超过100个字符')
					return false
				}
				if(!this.userInfo.filePath){
					this.$api.msg('请上传营业执照')
					return false
				}
				return true
			},
			previewImg(imgUrl){
				// 预览图片
				let imgList = [imgUrl]
				uni.previewImage({
					urls: imgList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: space-between;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:20upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-info{
			flex: 3;
			font-size: $font-base;
			color: $font-color-base;
			
		}
		.cell-switch{
			display: flex;
			justify-content: space-between;
			width: 100%;
			text{
				flex: 1;
				text-align: left;
			}
			switch{
				flex: 1;
				text-align: right;
			}
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		.cell-img{
			position: absolute;
			top: 16upx;
			right: 40upx;
			overflow: hidden;
			width: 30%;
			height: 220rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
	.input-item2{
		display:flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 220upx;
		border-radius: 4px;
		image{
			width: 30%;
			height: 100%;
		}
		.tit{
			font-size: $font-lg;
			background-color: #ccc;
			padding: 20upx;
			border-radius: 10upx;
			color:#303133
		}
	}
	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
</style>

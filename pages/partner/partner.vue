<template>
	<view class="container">
		<view>
			<view class="left-bottom-sign"></view>
			<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
			<view class="right-top-sign"></view>
			<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
			<view class="wrapper" style="padding-top: 115px;">
				<!-- <view class="left-top-sign">LOGIN</view> -->
				<view class="welcome">
					合伙人注册，请填写资料！
				</view>
				<view class="input-content">
					<view class="input-item">
						<text class="tit">姓名</text>
						<input 
							v-model="form.partnername" 
							placeholder="请输入姓名"
							maxlength="20"
						/>
					</view>
					<view class="input-item">
						<text class="tit">手机号码</text>
						<input 
							type="number" 
							v-model="form.partnerPhone" 
							placeholder="请输入手机号码"
							maxlength="11"
						/>
					</view>
					<view class="input-item">
						<text class="tit">性别</text>
						<view class="content">
							<text class="cell-tit" v-if="form.sex==0">男</text>
							<text class="cell-tit" v-if="form.sex==1">女</text>
							<switch color="#fa436a" @change="switchSexChange" />
						</view>
					</view>
					<view class="input-item">
						<text class="tit">出生日期</text>
						<picker mode="date" :value="form.birthday" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{form.birthday}}</view>
						</picker>
					</view>
					<view class="input-item">
						<text class="tit">密码</text>
						<input 
							v-model="form.password" 
							placeholder="8-18位不含特殊字符的数字、字母组合"
							placeholder-class="input-empty"
							maxlength="18"
							password 
						/>
					</view>
					<view class="input-item">
						<text class="tit">确认密码</text>
						<input 
							v-model="password2" 
							placeholder="8-18位不含特殊字符的数字、字母组合"
							placeholder-class="input-empty"
							maxlength="18"
							password 
						/>
					</view>
					<!-- <view class="input-item">
						<text class="tit">邮箱</text>
						<input 
							v-model="form.email" 
							placeholder="请输入邮箱"
							maxlength="100"
						/>
					</view> -->
					<view class="input-item">
						<text class="tit">推荐人</text>
						<input 
							v-model="form.referrer" 
							placeholder="请输入推荐人"
							maxlength="100"
						/>
					</view>
					<view class="input-item">
						<text class="tit">省市区</text>
						<view class="input">
							<!-- {{form.addressName}} -->
							<pickerAddress @change="changeAddress">{{form.addressName}}</pickerAddress>
						</view>
					</view>
					<view class="input-item">
						<text class="tit">身份证号码</text>
						<input 
							v-model="form.cardNumber" 
							placeholder="请输入身份证号码"
							maxlength="18"
						/>
					</view>
					<view class="input-item2">
						<text class="tit" @tap="uploadCert(1)">上传身份证正面</text>
						<view class="image">
							<image :src="showImg1" mode=""></image>
						</view>
					</view>
					<view class="input-item2">
						<text class="tit" @tap="uploadCert(2)">上传身份证反面</text>
						<view class="image">
							<image :src="showImg2" mode=""></image>
						</view>
					</view>
				</view>
				<button class='confirm-btn' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="toNext" :disabled="regBtnDisabled">注册</button>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import {wxToAuth} from '@/api/login.js'
	import {RESOURCE } from '@/api/resource.js'
	import {isMobile,isPwd,isAccount,isPhone,isEmail,isIdCard} from '@/api/validate.js'
	import pickerAddress from '@/components/pickerAddress/pickerAddress.vue'
	import jyfParser from '@/components/jyf-parser/jyf-parser'; // HBuilderX 2.5.5 及以上可以不需要
	
	export default{
		components:{
			jyfParser,
			pickerAddress
		},
		data(){
			return {
				form:{
					sex:0,//性别（0：男 1：女）
					email:'',
					partnername:'',
					password: '',
					addressName:'请选择省市区',
					address:'',
					partnerPhone: '',
					cardFront:'',
					cardReverse:'',
					cardNumber:'',
					birthday:'',
					province:'',
					city:'',
					district:'',
				},
				showImg1:'',
				showImg2:'',
				password2: '',
				agreement:'',
				regBtnDisabled:false,
				partnerForm:{
					aName:'',//甲方
					bName:'',//乙方
					bCard:'',//乙方身份证号
					content:'',//协议内容
					signDate:'',//签字日期（yyyy-mm-dd）
					parentId:'',//合伙人ID（销售员）
				},
				protocol:{},
				partner:{}//注册成功后合作伙伴的信息
			}
		},
		onLoad(query){
			this.form.sex=this.weChat.gender==0?1:0
			this.form.birthday=this.getDate()
			this.partnerForm.signDate=this.getDate()
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			...mapMutations(['login','setWeChat']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this.form[key] = e.detail.value;
			},
			changeAddress(data){
				console.log('选择省市区',data.data)
				this.form.province=data.data[0]
				this.form.city=data.data[1]
				this.form.district=data.data[2]
				this.form.addressName = data.data.join('');
				this.form.address = data.data.join('');
				console.log('省市区',data.data.join(''))
			},
			switchSexChange(e){
				console.log("switch:",e.detail.value)
				if(e.detail.value){
					//女
					this.form.sex=1
				}else{
					//男
					this.form.sex=0
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
					
				if (type === 'start') {
					year = year - 100;
				} else if (type === 'end') {
					year = year + 2;
				}else if (type === 'lastmouth') {
					month = month - 1;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange(e) {
				this.form.birthday = e.target.value
			},
			navBack(){
				uni.navigateBack();
			},
			toNext(){
				// 数据验证模块
				if(this.verifyForm()){
					//授权注册
					// this.$api.msg('注册提交')
					this.regBtnDisabled=true
					//授权注册
					// this.$api.msg('注册提交')
					wxToAuth(this.form).then(infoData=>{
						console.log(infoData)
						const {userInfo,loginData}=infoData
						console.log('注册请求参数：',this.form)
						this.setWeChat(userInfo.userInfo)
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息 及 前端输入的注册信息
						return this.$api.httpPost('partner/api/save',{
									code: loginData.code,
									rawData:userInfo.rawData,
									signature:userInfo.signature,
									encrypteData:userInfo.encryptedData,
									iv:userInfo.iv,
									...this.form
								})
					}).then(r=>{
						console.log('合伙人注册请求响应：',r)
						if(r.code==0){
							this.partner=r.data
							// this.$api.msg(r.msg||'注册成功')
							uni.navigateTo({url:`/pages/partner/partnerProtocolAgree?parentId=${this.partner.id}`})
						}else{
							this.regBtnDisabled=false
							this.$api.msg(r.msg||'网络异常请重试')
						}
						uni.hideLoading();
					}).catch(e=>{
						this.regBtnDisabled=false
						console.log("注册请求错误：",e)
						this.$api.msg(e.msg||'网络异常请重试')
						uni.hideLoading();
					})
				}
			},
			uploadCert(tag){
				let _this = this
				uni.chooseImage({count:1}).then(r=>{
					const [err,res]=r
					if(err){return}
					if(tag==1){
						_this.form.cardFront=res.tempFilePaths[0]
					}else{
						_this.form.cardReverse=res.tempFilePaths[0]
					}
					const tempFilePaths = res.tempFilePaths;
					uni.uploadFile({
						url: RESOURCE.URL_API + 'order/orderMainInfo/api/uploadImage', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'uploadFile',
						formData: {},
						success: (uploadFileRes) => {
							console.log("上传图片结果string：",uploadFileRes);
							if(uploadFileRes.statusCode===200){
								let r = JSON.parse(uploadFileRes.data);
								console.log("上传图片：",r);
								if(tag==1){
									_this.form.cardFront = r.msg;
									_this.showImg1=RESOURCE.URL_SHOW+r.msg
								}else{
									_this.form.cardReverse = r.msg;
									_this.showImg2=RESOURCE.URL_SHOW+r.msg
								}
							}else{
								_this.$api.msg('上传失败')
							}
						}
					});
				})
			},
			//校验参数
			verifyForm(){
				if(!this.form.partnername){
					this.$api.msg('请输入姓名')
					return false
				}
				if(!this.form.partnerPhone){
					this.$api.msg('请输入手机号码')
					return 
				}
				if(!isMobile(this.form.partnerPhone)){
					this.$api.msg('手机号码格式不正确')
					return false
				}
				if(!this.form.birthday){
					this.$api.msg('请选择出生日期')
					return false
				}
				if(!this.form.password){
					this.$api.msg('请输入密码')
					return false
				}
				if(!isPwd(this.form.password)){
					this.$api.msg('密码格式不正确')
					return 
				}
				if(!this.password2){
					this.$api.msg('请输入确认密码')
					return false
				}
				if(this.form.password!=this.password2){
					this.$api.msg('两次密码不一致')
					return 
				}
				// if(this.form.email && !isEmail(this.form.email)){
				// 	this.$api.msg('邮箱格式错误')
				// 	return 
				// }
				if(!this.form.referrer){
					this.$api.msg('请输入推荐人')
					return false
				}
				if(!this.form.address){
					this.$api.msg('请选择省市区')
					return false
				}
				if(!this.form.cardNumber){
					this.$api.msg('请输入身份证号码')
					return false
				}
				if(!isIdCard(this.form.cardNumber)){
					this.$api.msg('身份证号码格式不正确')
					return false
				}
				if(!this.form.cardFront){
					this.$api.msg('请上传身份证正面')
					return false
				}
				if(!this.form.cardReverse){
					this.$api.msg('请上传身份证反面')
					return false
				}
				return true
			},
			parse(e) {
				console.log('parse finish', e);
			},
			ready(e) {
				console.log('ready', e);
				// console.log('api: getText', this.$refs.article.getText());
				console.log('imgList', this.$refs.article.imgList);
			},
			imgtap(e) {
				console.log('imgtap', e);
			},
			linkpress(e) {
				console.log('linkpress', e);
			},
			error(e) {
				console.error(e);
			},
			
			
		},
	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		/* padding-top: 115px; */
		position:relative;
		width: 100vw;
		
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
		.list-cell{
			margin-bottom: 50rpx;
			display: flex;
			justify-content: space-around;
			.typeDis{
				color: #C0C4CC;
			}
		}
	}
	.input-item2{
		display:flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30upx;
		background:$page-color-light;
		height: 220upx;
		border-radius: 4px;
		margin-bottom: 40rpx;
		.image{
			flex:5;
			margin-left: 20rpx;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.tit{
			flex: 3;
			font-size: $font-lg;
			background-color: #ccc;
			padding: 20upx;
			border-radius: 10upx;
			color:#303133
		}
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
		.input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
			picker{
				height: 60upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				width: 100%;
			}
		}
		.content{
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
		picker{
			height: 60upx;
			line-height: 60rpx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
			view{
				line-height: 60rpx;
			}
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
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		z-index: 999;
		padding-bottom: 30upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	
	.agree {
		width: 100%;
		height: 100%;
	}
	.uni-banner {
		width: 100%;
		height: 100%;
		/* position: fixed; */
		/* left: 5%; */
		z-index: 2001;
		/* margin-top: 20%; */
		background: #ffffff;
		/* border-radius: 10rpx; */
		.title {
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 36rpx;
			font-weight: 600;
		}
		.content {
			padding: 0 30rpx;
			/* font-size: 28rpx; */
			color: #555555;
			line-height: 40rpx;
			.user-info{
				display: flex;
				flex-direction:column;
				margin-bottom: 20rpx;
				height: 20%;
				
				.text-title{
					color: #232323;
					line-height: 60rpx;
				}
			}
			.user-info-bottom{
				.text-title{
					margin-left: 50%;
				}
			}
			.text-box{
				height: 55%;
			}
		}
		.btn {
			border: none;
			margin-top: 30rpx;
			button {
				width: 95%;
				background: #ffffff;
				border: 1px solid #c0c0c0;
				color: green;
			}
		}
	}
	.uni-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2100;
		background: rgba(0, 0, 0, 0.6);
	}
	view {
		display: block;
		line-height: 1.2;
		overflow: hidden;
		white-space: normal;
		pointer-events: auto;
		font-family: -apple-system;
	}
	
	.agreement{
		width: 100%;
		height: 100%;
			
		.content-box{
			width: 100%;
			height: 100%;
			.title{
				height: 10%;
			}
			.content{
				height: 77%;
				jyf-parser{
					height: 100%;
				}
			}
			.notice{
				height: 5%;
				background: #DCDFE6;
				padding: 5rpx 20rpx;
				line-height: 42rpx;
				.text-box{
					font-size: $font-base;
					color: #999999;
				}
				.touch-box{
					font-size: $font-base;
					color: #4399FC;
				}
			}
			.btn-box{
				height: 8%;
				display: flex;
				justify-content: space-between;
				.cancel{
					width: 50%;
					height: 100%;
					font-size: $font-lg;
					color: #999999;
				}
				.confirm{
					width: 50%;
					height: 100%;
					font-size: $font-lg;
					color: #FFFFFF;
					background: #fa436a;
					border-radius: 0;
				}
				button::after{
					border: none;
				}
			}
		}
	}
</style>

<template>
	<view class="container">
		<view v-show="!showAgreement">
			<view class="left-bottom-sign"></view>
			<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
			<view class="right-top-sign"></view>
			<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
			<view class="wrapper" style="padding-top: 115px;">
				<!-- <view class="left-top-sign">LOGIN</view> -->
				<view class="welcome">
					注册，请填写资料！
				</view>
				<view class="input-content">
					<!-- <view class="list-cell m-t">
						<text class="cell-tit" :class="[form.tag==4?'':'typeDis']">普通用户</text>
						<switch color="#fa436a" @change="switchTypeChange" />
						<text class="cell-tit" :class="[form.tag==1?'':'typeDis']">企业用户</text>
					</view> -->
					<view class="input-item">
						<text class="tit">用户名</text>
						<input 
							:value="form.userName" 
							placeholder="请输入用户名"
							maxlength="20"
							data-key="userName"
							@input="inputChange"
						/>
					</view>
					<view class="input-item">
						<text class="tit">手机号码</text>
						<input 
							type="number" 
							:value="form.phoneNumber" 
							placeholder="请输入手机号码"
							maxlength="11"
							data-key="phoneNumber"
							@input="inputChange"
						/>
					</view>
					<view class="input-item">
						<text class="tit">性别</text>
						<!-- <switch color="#fa436a" @change="switchSexChange" /> -->
						<view class="content">
							<text class="cell-tit" v-if="form.sex==0">男</text>
							<text class="cell-tit" v-if="form.sex==1">女</text>
							<switch color="#fa436a" @change="switchSexChange" />
						</view>
					</view>
					<view class="input-item">
						<text class="tit">密码</text>
						<input 
							:value="form.userPassword" 
							placeholder="8-18位不含特殊字符的数字、字母组合"
							placeholder-class="input-empty"
							maxlength="18"
							password 
							data-key="userPassword"
							@input="inputChange"
						/>
					</view>
					<view class="input-item">
						<text class="tit">确认密码</text>
						<input 
							v-model="userPassword2" 
							placeholder="8-18位不含特殊字符的数字、字母组合"
							placeholder-class="input-empty"
							maxlength="18"
							password 
							data-key="userPassword2"
						/>
					</view>
					<view class="input-item">
						<text class="tit">邮箱</text>
						<input 
							type="" 
							:value="form.email" 
							placeholder="请输入邮箱"
							maxlength="100"
							data-key="email"
							@input="inputChange"
						/>
					</view>
					<view class="input-item">
						<text class="tit">销售人员手机号</text>
						<input 
							type="number" 
							v-model="form.salesPersonPhoneNumber" 
							placeholder="请输入销售人员手机号"
						/>
					</view>
					<view class="input-item">
						<text class="tit">公司名称</text>
						<input 
							type="" 
							:value="form.companyName" 
							placeholder="请输入公司名称"
							maxlength="50"
							data-key="companyName"
							@input="inputChange"
						/>
					</view>
					<view class="input-item">
						<text class="tit">联系人</text>
						<input 
							:value="form.linkMan" 
							placeholder="请输入联系人"
							maxlength="20"
							data-key="linkMan"
							@input="inputChange"
						/>
					</view>
					<view class="input-item">
						<text class="tit">办公电话</text>
						<input 
							type="number"
							:value="form.officePhone" 
							placeholder="请输入电话"
							maxlength="12"
							data-key="officePhone"
							@input="inputChange"
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
						<text class="tit">公司地址</text>
						<input 
							type="" 
							:value="form.companyAddress" 
							placeholder="请输入公司地址"
							maxlength="100"
							data-key="companyAddress"
							@input="inputChange"
						/>
					</view>
					<view class="input-item2">
						<text class="tit" @tap="uploadCert">上传营业执照</text>
						<image :src="showImg" mode=""></image>
					</view>
				</view>
				<button class='confirm-btn' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="toRegister">注册</button>
				<view class="forget-section">
					<!-- 忘记密码? -->
				</view>
				<view class="register-section">
					您已阅读并同意
					<text @click="toDoc">《用户注册协议和隐私政策》</text>
				</view>
			</view>
			
		</view>
		
		<view class="agree" v-show="showAgreement">
			<!-- 弹出层 -->
			<!-- 做黑色阴影颜色 -->
			<view class="uni-mask" v-show="showAgreement">
				<view class="uni-banner" v-show="showAgreement">
					<view class="agreement">
						<view class="content-box">
							<view class="title">用户注册协议</view>
							<scroll-view class="content">
								<jyf-parser domain="https://6874-html-foe72-1259071903.tcb.qcloud.la" gesture-zoom lazy-load ref="article" selectable
								 show-with-animation use-anchor @error="error" @imgtap="imgtap" @linkpress="linkpress" @parse="parse" @ready="ready">加载中...</jyf-parser>
							</scroll-view>
							<view class="notice">
								<text class="text-box">点击同意即表示您已经阅读并同意</text>
								<text class="touch-box">《用户注册协议》</text>
								<text class="text-box">、</text>
								<text class="touch-box">《用户隐私协议》</text>
							</view>
							<view class="btn-box">
								<button class="cancel" @tap.stop="agreeNo">不同意</button>
								<button class="confirm" @tap.stop="agreeYes">同意</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 弹出层 -->
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import {wxToAuth} from '@/api/login.js'
	import {RESOURCE } from '@/api/resource.js'
	import {isMobile,isPwd,isAccount,isPhone,isEmail} from '@/api/validate.js'
	import pickerAddress from '@/components/pickerAddress/pickerAddress.vue'
	import jyfParser from '@/components/jyf-parser/jyf-parser'; // HBuilderX 2.5.5 及以上可以不需要
	
	export default{
		components:{
			jyfParser,
			pickerAddress
		},
		data(){
			return {
				showAgreement:true,
				form:{
					tag:1,//用户标识 （0：企业管理人员 1：企业客户 2：厂家 3：销售人员）
					sex:0,//性别（0：男 1：女）
					email:'',
					userName:'',
					userPassword: '',
					companyName:'',
					companyAddress:'',
					addressName:'请选择省市区',
					address:'',
					linkMan:'',
					phoneNumber: '',
					officePhone:'',
					filePath:'',
					province:'',
					city:'',
					district:'',
					salesPersonPhoneNumber:''
				},
				showImg:'',
				userPassword2: '',
				agreement:''
			}
		},
		onLoad(query){
			// scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
			if(query.scene){
				const scene = decodeURIComponent(query.scene)
				console.log("scence:",scence)
				this.form.salesPersonPhoneNumber = scence.phoneNumber
			}
			this.form.userName = this.weChat.nickName
			this.form.sex=this.weChat.gender==0?1:0
			this.initArguement()
			
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			...mapMutations(['login','setWeChat']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this.form[key] = e.detail.value;
			},
			initArguement(){
				this.$api.httpPost('protocol/api/list',{
					protocolType:'2'
				}).then(r=>{
					console.log("用户注册协议请求结果：",r)
					this.agreement=r.data.content
					this.$refs.article.setContent(this.agreement);
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
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
			navBack(){
				uni.navigateBack();
			},
			agreeNo(){
				uni.navigateTo({
					url:'/pages/public/login'
				})
			},
			agreeYes(){
				this.showAgreement=false
			},
			toDoc(){
				this.showAgreement=true
			},
			uploadCert(){
				let _this = this
				uni.chooseImage({count:1}).then(r=>{
					const [err,res]=r
					if(err){return}
					_this.form.filePath=res.tempFilePaths[0]
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
								_this.form.filePath = r.msg;
								_this.showImg=RESOURCE.URL_SHOW+r.msg
							}else{
								_this.$api.msg('上传失败')
							}
						}
					});
				})
			},
			toRegister(){
				// 数据验证模块
				if(this.verifyForm()){
					//授权注册
					// this.$api.msg('注册提交')
					wxToAuth(this.form).then(infoData=>{
						console.log(infoData)
						const {userInfo,loginData}=infoData
						console.log('注册请求参数：',this.form)
						this.setWeChat(userInfo.userInfo)
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息 及 前端输入的注册信息
						return this.$api.httpPost('userInfo/api/save',{
									code: loginData.code,
									rawData:userInfo.rawData,
									signature:userInfo.signature,
									encrypteData:userInfo.encryptedData,
									iv:userInfo.iv,
									...this.form
								})
					}).then(r=>{
						console.log('注册请求响应：',r)
						if(r.code==0){
							// this.login(r.data)
							this.$api.msg(r.msg||'注册成功')
							uni.navigateTo({
								url:'/pages/public/login'
							})
						}else{
							this.$api.msg(r.msg||'网络异常请重试')
						}
						uni.hideLoading();
					}).catch(e=>{
						console.log("注册请求错误：",e)
						this.$api.msg(e.msg||'网络异常请重试')
						uni.hideLoading();
					})
				}
			},
			//校验参数
			verifyForm(){
				if(!this.form.userName){
					this.$api.msg('请输入用户名')
					return false
				}
				// if(this.form.userName.length>20){
				// 	this.$api.msg('用户名不能超过20个字符')
				// 	return false
				// }
				if(!this.form.phoneNumber){
					this.$api.msg('请输入手机号码')
					return 
				}
				if(!isMobile(this.form.phoneNumber)){
					this.$api.msg('手机号码格式不正确')
					return false
				}
				if(!this.form.userPassword){
					this.$api.msg('请输入密码')
					return false
				}
				if(!isPwd(this.form.userPassword)){
					this.$api.msg('密码格式不正确')
					return 
				}
				if(!this.userPassword2){
					this.$api.msg('请输入确认密码')
					return false
				}
				if(this.form.userPassword!=this.userPassword2){
					this.$api.msg('两次密码不一致')
					return 
				}
				if(this.form.email && !isEmail(this.form.email)){
					this.$api.msg('邮箱格式错误')
					return 
				}
				if(this.form.salesPersonPhoneNumber && !isMobile(this.form.salesPersonPhoneNumber)){
					this.$api.msg('销售人员手机号码格式不正确')
					return 
				}
				if(!this.form.companyName){
					this.$api.msg('请输入公司名称')
					return false
				}
				if(this.form.companyName.length>50){
					this.$api.msg('公司名称不能超过50个字符')
					return false
				}
				if(!this.form.linkMan){
					this.$api.msg('请输入联系人')
					return false
				}
				if(!this.form.officePhone){
					this.$api.msg('请输入办公电话')
					return 
				}
				if(!isPhone(this.form.officePhone)){
					this.$api.msg('办公电话格式不正确')
					return false
				}
				if(!this.form.address){
					this.$api.msg('请选择省市区')
					return false
				}
				if(!this.form.companyAddress){
					this.$api.msg('请输入公司地址')
					return false
				}
				if(this.form.companyAddress.length>100){
					this.$api.msg('公司地址不能超过100个字符')
					return false
				}
				if(!this.form.filePath){
					this.$api.msg('请上传营业执照')
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
		width: 90%;
		height: 80%;
		position: fixed;
		left: 5%;
		z-index: 2001;
		margin-top: 20%;
		background: #ffffff;
		border-radius: 10rpx;
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
				height: 72%;
				jyf-parser{
					height: 100%;
				}
			}
			.notice{
				height: 10%;
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

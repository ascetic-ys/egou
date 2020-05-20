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
					<view class="list-cell m-t">
						<text class="cell-tit" :class="[tag==4?'':'typeDis']">普通用户</text>
						<switch color="#fa436a" @change="switchTypeChange" />
						<text class="cell-tit" :class="[tag==1?'':'typeDis']">企业用户</text>
					</view>
					<block v-if="tag==1">
						<view class="input-item">
							<text class="tit">姓名</text>
							<input 
								v-model="form.userName" 
								placeholder="请输入姓名"
								maxlength="20"
							/>
						</view>
						<view class="input-item">
							<text class="tit">手机号码</text>
							<input 
								type="number" 
								v-model="form.phoneNumber" 
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
							<text class="tit">密码</text>
							<input 
								v-model="form.userPassword" 
								placeholder="8-18位不含特殊字符的数字、字母组合"
								placeholder-class="input-empty"
								maxlength="18"
								password 
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
							/>
						</view>
						<view class="input-item">
							<text class="tit">邮箱</text>
							<input 
								type="" 
								v-model="form.email" 
								placeholder="请输入邮箱"
								maxlength="100"
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
								v-model="form.companyName" 
								placeholder="请输入公司名称"
								maxlength="50"
							/>
						</view>
						<view class="input-item">
							<text class="tit">联系人</text>
							<input 
								v-model="form.linkMan" 
								placeholder="请输入联系人"
								maxlength="20"
							/>
						</view>
						<view class="input-item">
							<text class="tit">办公电话</text>
							<input 
								type="number"
								v-model="form.officePhone" 
								placeholder="请输入电话"
								maxlength="12"
							/>
						</view>
						<view class="input-item">
							<text class="tit">银行卡号</text>
							<input 
								type="number"
								v-model="form.cardNumber" 
								placeholder="请输入银行卡号"
								maxlength="20"
							/>
						</view>
						<view class="input-item">
							<text class="tit">开户行</text>
							<input 
								v-model="form.openingBank" 
								placeholder="请输入开户行"
								maxlength="50"
							/>
						</view>
						<view class="input-item">
							<text class="tit">省市区</text>
							<view class="input">
								<pickerAddress @change="changeAddress">{{form.addressName}}</pickerAddress>
							</view>
						</view>
						<view class="input-item">
							<text class="tit">公司地址</text>
							<input 
								type="" 
								v-model="form.companyAddress" 
								placeholder="请输入公司地址"
								maxlength="100"
							/>
						</view>
						<view class="input-item2">
							<text class="tit" @tap="uploadCert(1)">上传营业执照</text>
							<image :src="showImg1" mode=""></image>
						</view>
						<view class="input-item2">
							<text class="tit" @tap="uploadCert(2)">上传门头照片</text>
							<image :src="showImg2" mode=""></image>
						</view>
					</block>
					
					<block v-if="tag==4">
						<view class="input-item">
							<text class="tit">姓名</text>
							<input 
								v-model="generalUser.userName" 
								placeholder="请输入姓名"
								maxlength="20"
							/>
						</view>
						<view class="input-item">
							<text class="tit">手机号码</text>
							<input 
								type="number" 
								v-model="generalUser.userPhone" 
								placeholder="请输入手机号码"
								maxlength="11"
							/>
						</view>
						<view class="input-item">
							<text class="tit">性别</text>
							<view class="content">
								<text class="cell-tit" v-if="generalUser.sex==0">男</text>
								<text class="cell-tit" v-if="generalUser.sex==1">女</text>
								<switch color="#fa436a" @change="switchSexChange" />
							</view>
						</view>
						<view class="input-item">
							<text class="tit">密码</text>
							<input 
								v-model="generalUser.userPassword" 
								placeholder="8-18位不含特殊字符的数字、字母组合"
								placeholder-class="input-empty"
								maxlength="18"
								password 
							/>
						</view>
						<view class="input-item">
							<text class="tit">确认密码</text>
							<input 
								v-model="userPassword3" 
								placeholder="8-18位不含特殊字符的数字、字母组合"
								placeholder-class="input-empty"
								maxlength="18"
								password 
							/>
						</view>
						<view class="input-item">
							<text class="tit">邮箱</text>
							<input 
								type="" 
								v-model="generalUser.email" 
								placeholder="请输入邮箱"
								maxlength="100"
							/>
						</view>
						<view class="input-item">
							<text class="tit">推荐人姓名</text>
							<input 
								type="number" 
								v-model="generalUser.referrerName" 
								placeholder="请输入推荐人姓名"
							/>
						</view>
						<view class="input-item">
							<text class="tit">推荐人手机号</text>
							<input 
								type="number" 
								v-model="generalUser.referrerPhone" 
								placeholder="请输入推荐人手机号"
							/>
						</view>
						<view class="input-item">
							<text class="tit">银行卡号</text>
							<input 
								type="number"
								v-model="generalUser.cardNumber" 
								placeholder="请输入银行卡号"
								maxlength="20"
							/>
						</view>
						<view class="input-item">
							<text class="tit">开户行</text>
							<input 
								v-model="generalUser.openingBank" 
								placeholder="请输入开户行"
								maxlength="50"
							/>
						</view>
						<view class="input-item">
							<text class="tit">身份证号码</text>
							<input 
								v-model="generalUser.idCardNumber" 
								placeholder="请输入身份证号码"
								maxlength="18"
							/>
						</view>
						<view class="input-item">
							<text class="tit">省市区</text>
							<view class="input">
								<pickerAddress @change="changeAddress">{{generalUser.addressName}}</pickerAddress>
							</view>
						</view>
						<view class="input-item3">
							<text class="tit" @tap="uploadCert(3)">上传身份证正面</text>
							<view class="image">
								<image :src="showImg3" mode=""></image>
							</view>
						</view>
						<view class="input-item3">
							<text class="tit" @tap="uploadCert(4)">上传身份证反面</text>
							<view class="image">
								<image :src="showImg4" mode=""></image>
							</view>
						</view>
					</block>
					
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
				showAgreement:true,
				tag:4,
				form:{
					tag:1,//用户标识 （0：企业管理人员 1：企业客户 2：厂家 3：销售人员 4:普通用户）
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
				generalUser:{
					userName:'',//	是	string	姓名
					userPassword:'',//	是	string	密码
					userPhone:'',//	否	string	手机号
					sex:0,//	是	int	性别（0：男 1：女）
					email:'',
					openingBank:'',//	是	string	开户行
					cardNumber:'',//	是	string	银行卡号
					idCardFront:'',//	是	string	身份证正面
					idCardReverse:'',//	是	string	身份证反面
					idCardNumber:'',//	是	string	身份证号码
					referrerName:'',//	否	string	推荐人姓名
					referrerPhone:'',//	否	string	推荐人手机号
					addressName:'请选择省市区',
					address:'',
					province:'',
					city:'',
					district:'',
				},
				showImg1:'',
				showImg2:'',
				showImg3:'',
				showImg4:'',
				userPassword2: '',
				userPassword3: '',
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
			// this.form.userName = this.weChat.nickName
			this.form.sex=this.weChat.gender==0?1:0
			this.initArguement()
			
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			...mapMutations(['login','setWeChat']),
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
				if(this.tag==1){
					this.form.province=data.data[0]
					this.form.city=data.data[1]
					this.form.district=data.data[2]
					this.form.addressName = data.data.join('');
					this.form.address = data.data.join('');
				}else if(this.tag==4){
					this.generalUser.province=data.data[0]
					this.generalUser.city=data.data[1]
					this.generalUser.district=data.data[2]
					this.generalUser.addressName = data.data.join('');
					this.generalUser.address = data.data.join('');
				}
				console.log('省市区',data.data.join(''))
			},
			switchTypeChange(e){
				console.log("switch:",e.detail.value)
				if(e.detail.value){
					//公司用户
					this.form.tag=1
					this.tag=1
				}else{
					//普通用户
					this.form.tag=4
					this.tag=4
				}
			},
			switchSexChange(e){
				console.log("switch:",e.detail.value)
				if(e.detail.value){
					//女
					if(this.tag==1){
						this.form.sex=1
					}else if(this.tag==4){
						this.generalUser.sex=1
					}
				}else{
					//男
					if(this.tag==1){
						this.form.sex=0
					}else if(this.tag==4){
						this.generalUser.sex=0
					}
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
			uploadCert(type){
				let _this = this
				uni.chooseImage({count:1}).then(r=>{
					const [err,res]=r
					if(err){return}
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
								if(type==1){
									_this.form.filePath = r.msg;
									_this.showImg1=RESOURCE.URL_SHOW+r.msg
								}else if(type==2){
									_this.form.imgPath = r.msg;
									_this.showImg2=RESOURCE.URL_SHOW+r.msg
								}else if(type==3){
									_this.generalUser.idCardFront = r.msg;
									_this.showImg3=RESOURCE.URL_SHOW+r.msg
								}else if(type==4){
									_this.generalUser.idCardReverse = r.msg;
									_this.showImg4=RESOURCE.URL_SHOW+r.msg
								}
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
					wxToAuth().then(infoData=>{
						console.log(infoData)
						const {userInfo,loginData}=infoData
						console.log('注册请求参数this.form：',this.form)
						console.log('注册请求参数this.generalUser：',this.generalUser)
						this.setWeChat(userInfo.userInfo)
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息 及 前端输入的注册信息
						if(this.tag==1){
							return this.$api.httpPost('userInfo/api/save',{
										code: loginData.code,
										rawData:userInfo.rawData,
										signature:userInfo.signature,
										encrypteData:userInfo.encryptedData,
										iv:userInfo.iv,
										...this.form
									})
						}else if(this.tag==4){
							return this.$api.httpPost('generalUser/api/save',{
										code: loginData.code,
										rawData:userInfo.rawData,
										signature:userInfo.signature,
										encrypteData:userInfo.encryptedData,
										iv:userInfo.iv,
										...this.generalUser
									})
						}
						
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
				if(this.tag==1){
					if(!this.form.userName){
						this.$api.msg('请输入姓名')
						return false
					}
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
					if(!this.form.cardNumber){
						this.$api.msg('请输入银行卡号')
						return false
					}
					if(!this.form.openingBank){
						this.$api.msg('请输入开户行')
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
					if(!this.form.imgPath){
						this.$api.msg('请上传门头照片')
						return false
					}
				}else if(this.tag==4){
					if(!this.generalUser.userName){
						this.$api.msg('请输入姓名')
						return false
					}
					if(!this.generalUser.userPhone){
						this.$api.msg('请输入手机号码')
						return 
					}
					if(!isMobile(this.generalUser.userPhone)){
						this.$api.msg('手机号码格式不正确')
						return false
					}
					if(!this.generalUser.userPassword){
						this.$api.msg('请输入密码')
						return false
					}
					if(!isPwd(this.generalUser.userPassword)){
						this.$api.msg('密码格式不正确')
						return 
					}
					if(!this.userPassword3){
						this.$api.msg('请输入确认密码')
						return false
					}
					if(this.generalUser.userPassword!=this.userPassword3){
						this.$api.msg('两次密码不一致')
						return 
					}
					if(this.generalUser.email && !isEmail(this.generalUser.email)){
						this.$api.msg('邮箱格式错误')
						return 
					}
					if(this.generalUser.referrerPhone && !isMobile(this.generalUser.referrerPhone)){
						this.$api.msg('推荐人手机号码格式不正确')
						return 
					}
					if(!this.generalUser.cardNumber){
						this.$api.msg('请输入银行卡号')
						return false
					}
					if(!this.generalUser.openingBank){
						this.$api.msg('请输入开户行')
						return false
					}
					if(!this.generalUser.idCardNumber){
						this.$api.msg('请输入身份证号码')
						return false
					}
					if(!isIdCard(this.generalUser.idCardNumber)){
						this.$api.msg('身份证号码格式不正确')
						return 
					}
					if(!this.generalUser.address){
						this.$api.msg('请选择省市区')
						return false
					}
					if(!this.generalUser.idCardFront){
						this.$api.msg('请上传身份证正面')
						return false
					}
					if(!this.generalUser.idCardReverse){
						this.$api.msg('请上传身份证反面')
						return false
					}
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
	.input-item3{
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

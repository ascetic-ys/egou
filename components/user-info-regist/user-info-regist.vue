<template>
	<view>
		<!-- <view class="input-item">
			<text class="tit">用户类别</text>
			
			<view class="input">
				<checkbox-group @change="userTypeCheckChange">
					<label v-for="item in userTypeList" :key="item.id" style="margin-right: 10px;">
						<checkbox :value="item.id" style="transform:scale(0.7)"/> {{item.typeLabel}}
					</label>
					
				</checkbox-group>
			</view>
			
		</view> -->
		<view class="input-item">
			<text class="tit">邀请码</text>
			<input 
				v-model="form.activationCode" 
				placeholder="请输入邀请码"
				maxlength="6"
			/>
		</view>
		<view class="input-item2">
			<ocr-navigator @onSuccess="businessLicenseSuccess" certificateType="businessLicense" :opposite="false">
			  <!-- <button class="ocr-wrapper">营业执照</button> -->
				<view class="upCarm">
					<image src="../../static/carm.png" mode=""></image>
					<text>营业执照</text>
				</view>
			</ocr-navigator>
			<image :src="showImg1" mode=""></image>
		</view>
		<view class="input-item">
			<text class="tit">公司名称</text>
			<input 
				type="" 
				v-model="form.companyName" 
				placeholder="请输入公司名称"
				maxlength="50"
				disabled="true"
			/>
		</view>
		<view class="input-item">
			<text class="tit">公司地址</text>
			<input 
				type="" 
				v-model="form.companyAddress" 
				placeholder="请输入公司地址"
				maxlength="100"
				disabled="true"
			/>
		</view>
		<view class="input-item">
			<text class="tit">税号</text>
			<input 
				type="" 
				v-model="form.duty" 
				placeholder="请输入税号"
				maxlength="50"
				disabled="true"
			/>
		</view>
		
		<view class="input-item">
			<text class="tit">姓名</text>
			<input 
				v-model="form.userName" 
				placeholder="请输入姓名"
				maxlength="20"
			/>
		</view>
		<view class="input-item sendCode-item">
			<text class="tit">手机号码</text>
			<input 
				type="number" 
				v-model="form.phoneNumber" 
				placeholder="请输入手机号码"
				maxlength="11"
			/>
			<button class="sendCode" :disabled='time>0' @tap='sendCode'>{{`${time>0?'已发送('+time+'s)':'发送验证码'}`}}</button>
		</view>
		<view class="input-item">
			<text class="tit">验证码</text>
			<input 
				v-model="form.smsCode" 
				placeholder="请输入验证码"
				maxlength="6"
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
				
				v-model="form.officePhone" 
				placeholder="请输入电话"
				maxlength="15"
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
		
		<!-- <view class="input-item2">
			<ocr-navigator @onSuccess="businessLicenseSuccess" certificateType="businessLicense" :opposite="false">
			  <button class="ocr-wrapper">营业执照</button>
			</ocr-navigator>
			<image :src="showImg1" mode=""></image>
		</view> -->
		
		<view class="input-item2">
			<!-- <text class="tit" @tap="uploadCert(2)">上传门头照片</text> -->
			<view class="upCarm" @tap="uploadCert(2)">
				<image src="../../static/carm.png" mode=""></image>
				<text>上传门头照片</text>
			</view>
		</view>
		<button class='confirm-btn' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="toRegister">注册</button>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import {wxToAuth} from '@/api/login.js'
	import {RESOURCE } from '@/api/resource.js'
	import {isMobile,isPwd,isAccount,isPhone,isEmail,isIdCard} from '@/api/validate.js'
	import pickerAddress from '@/components/pickerAddress/pickerAddress.vue'
	
	export default{
		components:{
			pickerAddress
		},
		data(){
			return {
				time:-1,
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
					salesPersonPhoneNumber:'',
					smsCode:'',
					duty:'',
					userInfoTypeList:[]
				},
				showImg1:'',
				showImg2:'',
				showImg3:'',
				showImg4:'',
				userPassword2: '',
				userTypeList:[],
				userTypeIndex:0
			}
		},
		onLoad(query){
			
			this.initArguement()
			this.initUserType()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			...mapMutations(['login','setWeChat']),
			
			initUserType(){
				this.$api.httpGet('userType/api/list').then(r=>{
					console.log("用户分类请求结构：",r)
					this.userTypeList=r.data
				})
			},
			userTypeCheckChange(e){
				let values = e.target.value;
			   this.form.userInfoTypeList=[]
			    const userTypeList=this.userTypeList
				for (let item of userTypeList) {
					if(values.includes(item.id.toString())){
						let obj={userTypeId:item.id,userTypeLabel:item.typeLabel}
					}
				} 
			},
			sendCode(){
				let phone=this.form.phoneNumber
				if(!isMobile(phone)){
					this.$api.msg('手机号码格式不正确')
					return false
				}
				//校验手机号是否唯一
				this.$api.httpPost('userInfo/api/checkPhone',{
					phoneNumber:phone
				}).then(r=>{
					console.log("校验手机号是否唯一请求结果：",r)
					return wxToAuth()
				}).then(infoData=>{
					console.log(infoData)
					const {userInfo,loginData}=infoData
					//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息 
					return this.$api.httpPost('userInfo/api/sendCode',{
								code: loginData.code,
								rawData:userInfo.rawData,
								signature:userInfo.signature,
								encrypteData:userInfo.encryptedData,
								iv:userInfo.iv,
								phoneNumber:phone
							})
				}).then(r=>{
					//验证码发送成功
					if(this.time>0){return}
					this.time=60
					this.startTimeout()
					uni.hideLoading();
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			startTimeout(){
				setTimeout(() => {
					this.time--
					if(this.time>0){
						this.startTimeout()
					}
				}, 1000);
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
			uploadCert(type){
				let _this = this
				uni.chooseImage({count:1}).then(r=>{
					const [err,res]=r
					if(err){return}
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
								if(type==1){
									_this.form.filePath = r.msg;
									_this.showImg1=r.msg
								}else if(type==2){
									_this.form.imgPath = r.msg;
									_this.showImg2=r.msg
								}else if(type==3){
									_this.generalUser.idCardFront = r.msg;
									_this.showImg3=r.msg
								}else if(type==4){
									_this.generalUser.idCardReverse = r.msg;
									_this.showImg4=r.msg
								}
							}else{
								_this.$api.msg('上传失败')
							}
						}
					});
				})
			},
			//身份证识别
			idCardSuccess(res){
				this.generalUser.userName = res.detail.name.text
				this.generalUser.idCardNumber = res.detail.id.text
				let filePath=res.detail.image_path
				let _this = this
				uni.uploadFile({
					url: RESOURCE.URL_API + 'order/orderMainInfo/api/uploadImage', //仅为示例，非真实的接口地址
					filePath:filePath ,
					name: 'uploadFile',
					formData: {},
					success: (uploadFileRes) => {
						console.log("上传图片结果string：",uploadFileRes);
						if(uploadFileRes.statusCode===200){
							let r = JSON.parse(uploadFileRes.data);
							_this.generalUser.idCardFront = r.msg;
							_this.showImg3=r.msg
						}else{
							_this.$api.msg('上传失败')
						}
					}
				});
			},
			//营业执照识别
			businessLicenseSuccess(res){
				this.form.companyName = res.detail.enterprise_name.text
				this.form.companyAddress = res.detail.address.text
				this.form.duty = res.detail.reg_num.text
				let _this = this
				uni.uploadFile({
					url: RESOURCE.URL_API + 'order/orderMainInfo/api/uploadImage', //仅为示例，非真实的接口地址
					filePath:res.detail.image_path ,
					name: 'uploadFile',
					formData: {},
					success: (uploadFileRes) => {
						console.log("上传图片结果string：",uploadFileRes);
						if(uploadFileRes.statusCode===200){
							let r = JSON.parse(uploadFileRes.data);
							_this.form.filePath = r.msg;
							_this.showImg1=r.msg
						}else{
							_this.$api.msg('上传失败')
						}
					}
				});
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
						uni.hideLoading();
						if(r.code==0){
							// this.login(r.data)
							this.$api.msg(r.msg||'注册成功')
							uni.navigateTo({
								url:'/pagesUser/public/login'
							})
						}else{
							this.$api.msg(r.msg||'网络异常请重试')
						}
					}).catch(e=>{
						console.log("注册请求错误：",e)
						uni.hideLoading();
						this.$api.msg(e.msg||'网络异常请重试')
					})
				}
			},
			//校验参数
			verifyForm(){
				if(!this.form.activationCode){
					this.$api.msg('请输入邀请码')
					return false
				}
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
				if(!this.form.smsCode){
					this.$api.msg('请输入验证码')
					return 
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
				/* if(!this.form.officePhone){
					this.$api.msg('请输入办公电话')
					return 
				} */
				/* if(!isPhone(this.form.officePhone)){
					this.$api.msg('办公电话格式不正确')
					return false
				} */
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
				return true
			},
			
			
		},
	}
</script>

<style scoped lang="scss">
	
	.input-item2{
		display:flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 220upx;
		margin-bottom: 50upx;
		border-radius: 4px;
		image{
			width: 30%;
			height: 100%;
		}
		.upCarm{
			height: 180rpx;
			width: 300rpx;
			padding: 20rpx;
			display: flex;
			border-radius: 12rpx;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			border: 1rpx dashed #4CD964;
			
			image{
				width: 90rpx;
				height: 90rpx;
			}
			text{
				color: #909399;
				padding-top: 20rpx;
				font-size: 24rpx;
			}
			
		}
		.tit{
			font-size: $font-lg;
			background-color: #ccc;
			padding: 20upx;
			border-radius: 10upx;
			color:#303133
		}
		.tit2{
			font-size: 24rpx;
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
	
	view {
		display: block;
		line-height: 1.2;
		overflow: hidden;
		white-space: normal;
		pointer-events: auto;
		font-family: -apple-system;
	}
	
	
	
	.sendCode-item{
		position: relative;
		button{
			position: absolute;
			right: 20rpx;
			background: #fa436a;
			color: #FFFFFF;
			font-size: 26rpx;
			z-index: 9;

		}
		button::after{
			border: none;
		}
	}
	/* ocr 识别按钮样式 */
	.ocr-wrapper {
	  font-size: 24rpx;
	  /* background-color: #ccc; */
	  padding: 20upx 0;
	  height: 170rpx;
	  width: 360rpx;
	  line-height: 30rpx; 
	  border-radius: 10upx;
		border: 1rpx dashed #55ff00;
	  color:#303133
	}
</style>

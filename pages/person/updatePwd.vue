<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<!-- <view class="left-top-sign">LOGIN</view> -->
			<view class="welcome">
				请输入旧密码和新密码！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">旧密码</text>
					<input 
						:value="form.oldPassword" 
						placeholder="请输入旧密码"
						placeholder-class="input-empty"
						maxlength="18"
						password 
						data-key="oldPassword"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">新密码</text>
					<input 
						:value="form.newPassword" 
						placeholder="8-18位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="18"
						password 
						data-key="newPassword"
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
			</view>
			<button class="confirm-btn" @click="updatePwd">提交</button>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import {isPwd} from '@/api/validate.js'
	
	export default{
		data(){
			return {
				form:{
					id:'',
					oldPassword:'',
					newPassword:''
				},
				userPassword2: ''
			}
		},
		onLoad(){
			this.form.id=this.userInfo.id
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			...mapMutations(['logout']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this.form[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			//修改密码
			updatePwd(){
				// 数据验证模块
				if(this.verifyForm()){
					// this.$api.msg('提交')
					this.$api.loading('请求中...')
					this.$api.httpPost('order/userInfo/api/updatePassword',this.form).then(r=>{
						console.log('请求响应：',r)
						if(r.code==0){
							this.$api.msg(r.msg||'修改成功')
							this.logout()
							uni.navigateTo({
								url:'/pages/public/login'
							})
						}else{
							this.$api.msg(r.msg||'网络异常请重试')
						}
						uni.hideLoading();
					}).catch(e=>{
						console.log("请求错误：",e)
						this.$api.msg(e.msg||'网络异常请重试')
						uni.hideLoading();
					})
				}
			},
			//校验参数
			verifyForm(){
				if(!this.form.oldPassword){
					this.$api.msg('请输入旧密码')
					return false
				}
				if(!this.form.newPassword){
					this.$api.msg('请输入新密码')
					return false
				}
				if(!isPwd(this.form.newPassword)){
					this.$api.msg('新密码格式不正确')
					return 
				}
				if(!this.userPassword2){
					this.$api.msg('请输入确认密码')
					return false
				}
				if(this.form.newPassword!=this.userPassword2){
					this.$api.msg('两次密码不一致')
					return 
				}
				return true
			}
		},
	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
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
</style>

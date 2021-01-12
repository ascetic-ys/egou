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
						<text class="cell-tit" :class="[tag==1?'':'typeDis']">企业用户</text>
						<switch color="#fa436a" @change="switchTypeChange" />
						<text class="cell-tit" :class="[tag==3?'':'typeDis']">城市渠道商</text>
					</view>
					
						<!-- <general-user-regist></general-user-regist> -->
					<block v-if="tag==1">
						<user-info-regist></user-info-regist>
					</block>
					<block v-if="tag==3">
						<partner-regist></partner-regist>
					</block>
					
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
	export default{
		
		data(){
			return {
				showAgreement:true,
				tag:1,
				agreement:'',
			}
		},
		onLoad(query){
			// scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
			if(query.scene){
				const scene = decodeURIComponent(query.scene)
				console.log("scene:",scene)
				/* this.form.salesPersonPhoneNumber = scene.phoneNumber
				this.generalUser.referrerPhone = scene.phoneNumber */
			}
			this.initArguement()
		},
		methods: {
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
			
			switchTypeChange(e){
				console.log("switch:",e.detail.value)
				if(e.detail.value){
					this.tag=3
				}else{
					//公司用户
					this.tag=1
				}
			},
			navBack(){
				uni.navigateBack();
			},
			agreeNo(){
				uni.navigateTo({
					url:'/pagesUser/public/login'
				})
			},
			agreeYes(){
				this.showAgreement=false
			},
			toDoc(){
				this.showAgreement=true
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
	.input-item4{
		display:flex;
		flex-direction: column;
		/* align-items:flex-start;
		justify-content: center;*/
		padding: 0 30upx; 
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
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
	}
	.input-item5{
		display:flex;
		align-items:flex-start;
		justify-content: center;
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

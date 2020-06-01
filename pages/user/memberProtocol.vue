<template>
	<view class="container">
		<view class="agree">
			<!-- 弹出层 -->
			<!-- 做黑色阴影颜色 -->
			<view class="uni-mask">
				<view class="uni-banner">
					<view class="agreement">
						<view class="content-box">
							<view class="title">注册会员协议</view>
							
							<scroll-view class="content">
								<view class="user-info">
									<text class="text-title">甲方：{{partnerForm.aName}}</text>
									<view class="text-title">
										<text class="text-desc" style="margin-right: 40rpx;">乙方：{{partnerForm.bName}}</text>
										<text class="text-desc">身份证号码：{{partnerForm.bCard||''}}</text>
									</view>
								</view>
								<view class="text-box">
									<jyf-parser domain="https://6874-html-foe72-1259071903.tcb.qcloud.la" gesture-zoom lazy-load ref="article" selectable
									 show-with-animation use-anchor @error="error" @imgtap="imgtap" @linkpress="linkpress" @parse="parse" @ready="ready">加载中...</jyf-parser>
								</view>
								 <view class="user-info user-info-bottom">
								 	<text class="text-title">甲方：{{partnerForm.aName}}</text>
								 	<text class="text-title">乙方：{{partnerForm.bName}}</text>
								 	<text class="text-title">日期：{{partnerForm.signDate}}</text>
								 </view>
							</scroll-view>
							
							<view class="notice">
								<text class="text-box">点击同意即表示您已经阅读并同意</text>
								<text class="touch-box">《注册会员协议》</text>
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
				regBtnDisabled:false,
				parentId:'',
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
		onLoad(options){
			this.parentId=options.parentId
			this.partnerForm.signDate=this.getDate()
			this.initArguement()
			this.initPartnerParams()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			initArguement(){
				this.$api.httpPost('protocol/api/list',{
					protocolType:'7'
				}).then(r=>{
					console.log("公司用户会员协议请求结果：",r)
					this.protocol=r.data
					this.$refs.article.setContent(this.protocol.content);
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}else if (type === 'lastmouth') {
					month = month - 1;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			agreeNo(){
				uni.navigateBack();
			},
			initPartnerParams(){
				this.partnerForm={
					aName:RESOURCE.COMPANY_NAME,//甲方
					bName:this.userInfo.userName,//乙方
					bCard:this.userInfo.cardNumber,//乙方身份证号
					content:this.protocol.content,//协议内容
					signDate:this.getDate(),//签字日期（yyyy-mm-dd）
					parentId:this.userInfo.id,//合伙人ID（销售员）
				}
			},
			agreeYes(){
				this.initPartnerParams()
				console.log("`/pages/user/memberPay?price=${this.protocol.fee}&parentId=${this.userInfo.id}`")
				this.$api.httpPost('protocolRecord/api/save',{
					...this.partnerForm
				}).then(r=>{
					console.log('协议记录保存请求响应：',r)
					if(r.code==0){
						this.$api.msg(r.msg||'保存成功')
						uni.navigateTo({
							url:`/pages/user/memberPay?price=${this.protocol.fee}&parentId=${this.userInfo.id}&protocolRecordId=${r.data.id}`
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
				height: 15%;
				
				.text-title{
					color: #232323;
					line-height: 60rpx;
					font-size: 26rpx;
				}
				.text-desc{
					
				}
			}
			.user-info-bottom{
				height: 20%;
				.text-title{
					margin-left: 50%;
				}
			}
			.text-box{
				height: 63%;
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

<template>
	<view class="container">
		<view class="agree">
			<!-- 弹出层 -->
			<!-- 做黑色阴影颜色 -->
			<view class="uni-mask">
				<view class="uni-banner">
					<view class="agreement">
						<view class="content-box">
							<view class="title">{{isB==1?'城市渠道商':'城市渠道商B端'}}协议</view>
							
							<scroll-view class="content">
								<view class="user-info">
									<text class="text-title">甲方：{{partner.aName}}</text>
									<view class="text-title">
										<text class="text-desc" style="margin-right: 40rpx;">乙方：{{partner.bName}}</text>
										<text class="text-desc">身份证号码：{{partner.bCard}}</text>
									</view>
								</view>
								<view class="text-box">
									<jyf-parser domain="https://6874-html-foe72-1259071903.tcb.qcloud.la" gesture-zoom lazy-load ref="article" selectable
									 show-with-animation use-anchor @error="error" @imgtap="imgtap" @linkpress="linkpress" @parse="parse" @ready="ready">加载中...</jyf-parser>
								</view>
								 <view class="user-info user-info-bottom">
								 	<text class="text-title">甲方：{{partner.aName}}</text>
								 	<text class="text-title">乙方：{{partner.bName}}</text>
								 	<text class="text-title">日期：{{partner.signDate}}</text>
								 </view>
							</scroll-view>
						</view>
						<!-- 底部 -->
						<!-- <view class="footer">
							<view class="footer-btn">
								<button class="submit" @click="continueProtocol">协议续签</button>
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 弹出层 -->
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import jyfParser from '@/components/jyf-parser/jyf-parser'; // HBuilderX 2.5.5 及以上可以不需要
	
	export default{
		components:{
			jyfParser
		},
		data(){
			return {
				id:'',
				isB:1,
				partner:{},
			}
		},
		onLoad(option){
			this.id=option.id
			if(options.isB){
				this.isB=options.isB
			}
			this.initData()
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
			initData(){
				this.$api.httpPost('protocolRecord/api/detail',{id:this.id}).then(r=>{
					console.log("请求结果：",r)
					this.partner=r.data
					this.$refs.article.setContent(this.partner.content);
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			//协议续签
			continueProtocol(){
				uni.navigateTo({
					url:`/pagesUser/partner/partnerProtocolAgree?parentId=${this.partner.parentId}&isB=${this.userInfo.isB}`
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
				height: 11%;
				
				.text-title{
					color: #232323;
					line-height: 60rpx;
					font-size: 26rpx;
				}
				.text-desc{
					
				}
			}
			.user-info-bottom{
				height: 18%;
				.text-title{
					margin-left: 50%;
				}
			}
			.text-box{
				height: 68%;
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
				height: 90%;
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
	
	.footer{
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 995;
			display: flex;
			align-items: center;
			width: 100%;
			height: 90upx;
			justify-content: space-between;
			font-size: 30upx;
			background-color: #fff;
			z-index: 998;
			color: $font-color-base;
			box-shadow: 0 -1px 5px rgba(0,0,0,.1);
			.price-content{
				padding-left: 30upx;
			}
			.price-tip{
				color: $base-color;
				margin-left: 8upx;
			}
			.price{
				font-size: 36upx;
				color: $base-color;
			}
			.footer-btn{
				width: 100%;
				.submit{
					width: 280upx;
					height: 100%;
					color: #fff;
					font-size: 32upx;
					background-color: $base-color;
				}
			}
		}
</style>

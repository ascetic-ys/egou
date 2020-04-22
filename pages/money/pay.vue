<template>
	<view class="app">
		<view class="price-box">
			<!-- <text>支付金额</text> -->
			<text class="price">请上传支付凭证！</text>
		</view>

		<view class="pay-type-list">
			<!-- <progress :percent="percent" strock-width="10" ></progress> -->
			<view class="pzBox" v-if="flag==1">
				<img :src="pzPic" alt="" >
			</view>
			<!-- <view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥198.5</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view>-->
		</view> 
		
		<text class="mix-btn" v-if="flag===0" @tap="cI">点击上传支付凭证</text>
		<text class="mix-btn" v-else @click="confirm">提交支付凭证</text>
	</view>
</template>

<script>
 // 注册一个进度条
    var _self;
	export default {
		data() {
			return {
				flag:0,
				// pzPic:'/static/uplod.png',
				pzPic:'',
				percent:'0',
				payType: 1,
				orderInfo: {}
			};
		},
		computed: {
		
		},
		onLoad(options) {
			 _self = this;
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			cI(){
			    uni.chooseImage({
			        count: 1,
			        sizeType:['copressed'],
			        success(res) {
			            //因为有一张图片， 输出下标[0]， 直接输出地址
			            var imgFiles = res.tempFilePaths[0]
									_self.pzPic =imgFiles
			            console.log(imgFiles)
										_self.flag = 1
			            // 上传图片
			            // 做成一个上传对象
			            var uper = uni.uploadFile({
			                // 需要上传的地址
			                url:'http://demo.hcoder.net/index.php?c=uperTest',
			                // filePath  需要上传的文件
			                filePath: imgFiles,
			                name: 'file',
			                success(res1) {
			                    // 显示上传信息
			                    console.log(res1)
												
			                }
			            });
			            // onProgressUpdate 上传对象更新的方法
			            uper.onProgressUpdate(function(res){
			                // 进度条等于 上传到的进度
			                _self.percent = res.progress
			                console.log('上传进度' + res.progress)
			                console.log('已经上传的数据长度' + res.totalBytesSent)
			                console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend)
			            })
			        }
			    })
			},
			//确认支付
			confirm: async function() {
				uni.redirectTo({
					url: '/pages/money/paySuccess'
				})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				/* content: '￥'; */
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		/* padding-left: 60upx; */
		.pzBox {
			width: 100%;
			height: 400upx;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
			 	width: 100%;
				height: 100%; 
			}
		}
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>

<template>
	<view class="container">
		<view class="pay-box">
			<view class="order-info-box">
				<view class="order-info">
					<text class="title">会员费用：</text>
					<view class="info price-box">
						<text>¥</text>
						<input
							type="number" 
							v-model="memberPayRecord.price" 
							placeholder="请输入会员费用"
							maxlength="11"
						/>
						<text>元</text>
					</view>
					
					<!-- <text class="info" style="color: #fa436a;">¥{{memberPayRecord.price||0}}元</text> -->
				</view>
				<!-- <view class="order-info">
					<text class="title">会员起始日期：</text>
					<text class="info">{{memberPayRecord.startDate}}</text>
				</view>
				<view class="order-info">
					<text class="title">会员终止日期：</text>
					<text class="info">{{memberPayRecord.endDate}}</text>
				</view> -->
				<view class="input-item2">
					<text class="tit" @tap="uploadCert(1)">上传转账记录图片</text>
					<view class="image">
						<image :src="showImg" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<button class="mix-btn" :disabled='disabledPay' @click="paySubmitImage">确定</button>
		<!-- <button class="mix-btn" :disabled='disabledPay' @click="paySubmit">立即支付</button> -->
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	export default {
		data() {
			return {
				id:'',
				memberPayRecord: {
					parentId:'',
					price:'',
					// startDate:'',
					// endDate:'',
					// type:2,
					userId:'',
					payImgPath:'',
					protocolRecordId:''
				},
				showImg:'',
				disabledPay:false
			};
		},
		onLoad(options) {
			console.log("options:",options)
			this.memberPayRecord.parentId=options.parentId
			this.memberPayRecord.price=options.price
			this.memberPayRecord.protocolRecordId=options.protocolRecordId
			// if(options.startDate){
			// 	this.memberPayRecord.startDate=options.startDate
			// }else{
			// 	this.memberPayRecord.startDate=this.getDate()
			// }
			// if(options.endDate){
			// 	this.memberPayRecord.endDate=options.endDate
			// }else{
			// 	this.memberPayRecord.endDate=this.getDate('year')
			// }
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods: {
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
				}else if(type === 'year'){
					date.setFullYear(date.getFullYear()+1);
					date.setDate(date.getDate()-1);
					year = date.getFullYear();
					month = date.getMonth() + 1;
					day = date.getDate();
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}年${month}月${day}日`;
			},
			uploadCert(tag){
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
								if(tag==1){
									_this.memberPayRecord.payImgPath = r.msg;
									_this.showImg=r.msg
								}
							}else{
								_this.$api.msg('上传失败')
							}
						}
					});
				})
			},
			//提交支付记录
			paySubmitImage(){
				this.disabledPay=true
				this.memberPayRecord.userId==this.userInfo.id
				this.$api.loading('请求中...')
				this.$api.httpPost('memberPayRecord/api/save',{
					...this.memberPayRecord
				}).then(r=>{
					console.log('请求结果：',r)
					if(r.code==0){
						this.$api.msg(r.msg||'操作成功')
						uni.switchTab({
							url: `/pages/user/user`
						})
					}else{
						this.disabledPay=false
						this.$api.msg(r.msg||'网络错误请重试')
					}
					uni.hideLoading()
				}).catch(e=>{
					this.disabledPay=false
					console.log('请求错误：',e)
					this.$api.msg(e.msg||'网络错误请重试')
					uni.hideLoading()
				})
			},
			//确认支付
			paySubmit: async function() {
				this.disabledPay=true
				console.log("支付请求：",this.memberPayRecord)
				this.memberPayRecord.type==2//会员费支付
				this.memberPayRecord.userId==this.userInfo.id
				this.$api.httpPost('wechatPayInfo/api/payMoney',this.memberPayRecord).then(r=>{
					console.log("支付结果：",r)
					if(r.code==0){
						let _this = this
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: r.data.resp.timeStamp,
							nonceStr: r.data.resp.nonceStr,
							package: r.data.resp.package,
							signType: r.data.resp.signType,
							paySign: r.data.resp.sign,
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
								// this.$api.msg(r.msg||'支付成功')
								//跳转至支付结果
								uni.redirectTo({
									url: `/pages/partner/paySuccess`
								})
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
								_this.$api.msg(err||'网络异常请重试')
								_this.disabledPay=false;
							}
						});
					}else{
						this.$api.msg(r.msg||'网络异常请重试')
						this.disabledPay=false;
					}
					uni.hideLoading()
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading()
					this.disabledPay=false;
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
		}
	}
</script>

<style lang='scss'>
	.container {
		width: 100%;
	}
	.order-state{
		margin: 100rpx;
		text-align: center;

	}
	
	.pay-box{
		padding: 40rpx;
		white-space: nowrap;
		background: #F8F8F8;
		margin: 40rpx;
		border-radius: 40rpx;
		box-shadow: 0 2rpx 10rpx #dcdcdc;
		white-space: nowrap;
		.order-info-box{
			margin: 40rpx 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.order-info{
				flex: 2;
				display: flex;
				justify-content: space-between;
				line-height: 70rpx;
				.info{
					
					font-size: 26rpx;
					color: #606266;
				}
				.price-box{
					display: flex;
					input{
						line-height: 70rpx;
						height: 70rpx;
						text-align: center;
						border: 1rpx solid #ccc;
						border-radius: 20rpx;
						margin: 0 10rpx;
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
				margin-top: 40rpx;
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

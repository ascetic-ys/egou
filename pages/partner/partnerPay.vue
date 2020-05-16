<template>
	<view class="container">
		<view class="pay-box">
			<view class="order-info-box">
				<view class="order-info">
					<text class="title">会员费用：</text>
					<text class="info" style="color: #fa436a;">¥{{memberPayRecord.price||0}}元</text>
				</view>
				<view class="order-info">
					<text class="title">会员起始日期：</text>
					<text class="info">{{memberPayRecord.startDate}}</text>
				</view>
				<view class="order-info">
					<text class="title">会员终止日期：</text>
					<text class="info">{{memberPayRecord.endDate}}</text>
				</view>
			</view>
		</view>
		<button class="mix-btn" :disabled='disabledPay' @click="paySubmit">立即支付</button>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				id:'',
				memberPayRecord: {
					parentId:'',
					price:'',
					startDate:'',
					endDate:'',
					type:2,
					userId:'',
				},
				disabledPay:false
			};
		},
		onLoad(options) {
			console.log("options:",options)
			this.memberPayRecord.parentId=options.parentId
			this.memberPayRecord.price=options.price
			this.memberPayRecord.recordId=options.recordId
			if(options.startDate){
				this.memberPayRecord.startDate=options.startDate
			}else{
				this.memberPayRecord.startDate=this.getDate()
			}
			if(options.endDate){
				this.memberPayRecord.endDate=options.endDate
			}else{
				this.memberPayRecord.endDate=this.getDate('year')
			}
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

<template>
	<view class="content">
		<view class="step-box">
			<u-steps :list="stepList" :current="1"></u-steps>
		</view>
		
		<view class="wrap">
			<!-- <view class="title">
				平台鉴别
			</view> -->
			<u-time-line>
				
				<u-time-line-item>
					<template v-slot:content>
						<view>
							<view class="u-order-title unacive">待平台发后</view>
							<view class="u-order-desc">鉴别已通过，正在出仓。</view>
							<view class="u-order-time">2019-12-02 12:55</view>
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:content>
						<view>
							<view class="u-order-title unacive">平台正在鉴别</view>
							<view class="u-order-desc">渠道商正在为您鉴别，请耐性等待</view>
							<view class="u-order-time">2019-12-02 08:23</view>
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item nodeTop="0">
					<template v-slot:node>
						<view class="u-node">
							<u-icon name="file-text-fill" color="#fff" :size="24"></u-icon>
						</view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-title unacive">平台已收货</view>
							<view class="u-order-desc">平台已收货，正在安排检查</view>
							<view class="u-order-time">2019-12-01 07:00</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
		<view class="wrap">
			<!-- <view class="title">
				卖家发货
			</view> -->
			<u-time-line>
				<u-time-line-item nodeTop="2">
					<template v-slot:node>
						<view class="u-node">
							<u-icon name="car-fill" color="#fff" :size="24"></u-icon>
						</view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-title unacive">已签收</view>
							<view class="u-order-desc">您的快件平台已签收</view>
							<view class="u-order-time">2019-05-07 08:05</view>
						</view>
					</template>
				</u-time-line-item>
				
				<u-time-line-item>
					<template v-slot:content>
						<view>
							<view class="u-order-title unacive">运输中</view>
							<view class="u-order-desc">【深圳市】快件已到达 深圳运转中心</view>
							<view class="u-order-time">2019-12-04 16:42</view>
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:content>
						<view>
							<view class="u-order-title unacive">运输中</view>
							<view class="u-order-desc">【郑州市】快件已从郑州运转中心出发，正在发往深圳运转中心</view>
							<view class="u-order-time">2019-12-02 12:55</view>
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:content>
						<view>
							<view class="u-order-title unacive">运输中</view>
							<view class="u-order-desc">【郑州市】快件已到达 郑州运转中心</view>
							<view class="u-order-time">2019-12-02 08:23</view>
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item nodeTop="0">
					<template v-slot:node>
						<view class="u-node">
							<u-icon name="file-text-fill" color="#fff" :size="24"></u-icon>
						</view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-title unacive">已揽件</view>
							<view class="u-order-desc">顺丰快递已收取快件，广州市</view>
							<view class="u-order-time">2019-12-01 07:00</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				stepList: [{
					name: '卖家发货'
				}, {
					name: '平台鉴别'
				}, {
					name: '平台发货'
				},],
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #e6e6e6;
	}
	.step-box {
		background-color: #fff;
		padding: 20upx 0;
	}
	
	.wrap {
		background-color: #fff;
		//width: 90%;
		margin-top: 12upx;
		//border: 1upx solid #dfdfdf;
		padding: 36rpx 36rpx 36rpx 48rpx;
		
		.title {
			//padding-left: 10upx;
			height: 80upx;
			line-height: 80upx;
			font-size: 40upx;
			border: 900;
			margin-bottom: 20upx;
		}
	}
	
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}
	
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-title.unacive {
		color: rgb(150, 150, 150);
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
	
	.tel {
		color: $u-type-primary;
	}
</style>

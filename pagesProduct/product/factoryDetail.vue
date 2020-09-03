<template>
	<view class="content">
		<view class="head">
			<view class="title">
				<text>公司介绍</text>
			</view>
			<scroll-view scroll-x="true" class="imgScroll">
				<view class="sroll-item" v-for="item in factoryDetail.filePathList" :key="item.id">
					<image :src="item.filePath"  class="sroll-img"></image>
				</view>
			</scroll-view>
			<view class="address">
				<text>{{factoryDetail.factoryAddress||'-'}}</text>
			</view>
		</view>
		<view class="middle">
			<view class="card">
				<view class="card-title">
					<text>基础信息</text>
				</view>
				<view class="row-item">
					<view class="left">公司名称：</view>
					<view class="right">{{factoryDetail.companyName||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">经营地址：</view>
					<view class="right">{{factoryDetail.companyAdress||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">成立日期：</view>
					<view class="right">{{factoryDetail.establishDate||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">经营访问：</view>
					<view class="right">{{factoryDetail.businessScope||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">注册号：</view>
					<view class="right">{{factoryDetail.registNum||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">企业类型：</view>
					<view class="right">{{factoryDetail.companyType||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">营业期限：</view>
					<view class="right">{{factoryDetail.businessTerm||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">登记机关：</view>
					<view class="right">{{factoryDetail.registAuthority||'-'}}</view>
				</view>
			</view>
			<view class="card">
				<view class="card-title">
					<text>工厂信息</text>
				</view>
				<view class="row-item">
					<view class="left">厂房面积：</view>
					<view class="right">{{factoryDetail.factoryArea||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">员工人数：</view>
					<view class="right">{{factoryDetail.employeesNum||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">月产量：</view>
					<view class="right">{{factoryDetail.researchStaffNum||'-'}}</view>
				</view>
				<view class="row-item">
					<view class="left">研发人数：</view>
					<view class="right">{{factoryDetail.monthlyOutput||'-'}}</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				factoryDetail: {}
			}
		},
		onLoad(option) {
			this.factoryDetail = JSON.parse(decodeURIComponent(option.factoryDetail))
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #eaeaea;
		height: 100%;
	}
	.head {
		background-color: #FFFFFF;
		padding:0 2.5%;
		
		.imgScroll {
			padding: 20upx 0;
			white-space: nowrap;
			
			.sroll-item {
				display: inline-block;
				margin-right: 15upx;
			}
			.sroll-img {
				height: 200upx;
				width: 300upx;
			}
			
			
		}
		
		.title {
			padding-top: 20upx;
		}
		
		.address {
			border-top: 2rpx solid #eaeaea;
			padding: 20upx 0;
			font-size: 22upx;
			color: #616161;
		}
	}
	
	.middle {
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #eaeaea;
		.card {
			margin-top: 20upx;
			width: 95%;
			background-color: #FFFFFF;
			
			.card-title {
				margin: 20upx 0;
				font-size: 26upx;
				border-left: 4upx solid #ff0000;
				
				>text {
					padding: 20upx 20upx;
				}
			}
			
			
			.row-item {
				display: flex;
				margin: 20upx 0;
				padding: 0 20upx;
				font-size: 22upx;
				color: #616161;
				
				
				.left {
					flex: 1;
				}
				
				.right {
					flex: 5;
				}
			}
		}
	}
	
	
	
</style>

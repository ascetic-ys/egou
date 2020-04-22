<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/person/person')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/address/address')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">收货地址</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!-- <view class="list-cell" @click="navTo('实名认证')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">实名认证</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		
		<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view>
		<!-- <view class="list-cell m-t b-b" @click="navTo('清除缓存')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<!-- <view class="list-cell b-b" @click="navTo('关于Dcloud')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于Dcloud</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<view class="list-cell" @tap="checkUpdate">
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 1.0.0</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import {  
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations(['logout']),

			navTo(url){
				this.$api.msg(`跳转到${url}`);
				uni.navigateTo({
					url:url
				})
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.logout();
				    		setTimeout(()=>{
				    			uni.navigateBack();
				    		}, 200)
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},
			checkUpdate(){
				let _this = this
				const updateManager = uni.getUpdateManager();
					
				updateManager.onCheckForUpdate(function (res) {
				  // 请求完新版本信息的回调
				  console.log('res.hasUpdate',res.hasUpdate);
				  if(!res.hasUpdate){
					  _this.$api.msg('当期为最新版本')
				  }
				});
					
				updateManager.onUpdateReady(function (res) {
				  uni.showModal({
				    title: '更新提示',
				    content: '新版本已经准备好，是否重启应用？',
				    success(res) {
				      if (res.confirm) {
				        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
				        updateManager.applyUpdate();
				      }
				    }
				  });
				});
					
				updateManager.onUpdateFailed(function (res) {
				  // 新的版本下载失败
				});
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>

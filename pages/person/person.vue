<template>
	<view class="container">
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">头像</text>
			<view class="cell-img"><image :src="weChat.avatarUrl || '/static/missing-face.png'" mode=""></image></view>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">用户名</text>
			<text class="cell-tip">{{userInfo.userName}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">手机号</text>
			<text class="cell-tip">{{userInfo.phoneNumber||''}}</text>
		</view>
		<view class="list-cell  b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">性别</text>
			<text class="cell-tip">{{userInfo.sex==0?'男':'女'}}</text>
		</view>
		<view v-if="[1,4].indexOf(userInfo.tag)>-1" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">邮箱</text>
			<text class="cell-tip">{{userInfo.email||''}}</text>
		</view>
		<view v-if="userInfo.tag==1" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">归属销售手机号</text>
			<text class="cell-tip">{{userInfo.salesPersonPhoneNumber||''}}</text>
		</view>
		<view v-if="userInfo.tag==1" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">公司名称</text>
			<text class="cell-tip">{{userInfo.companyName||''}}</text>
		</view>
		<view v-if="userInfo.tag==1" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">联系人</text>
			<text class="cell-tip">{{userInfo.linkMan||''}}</text>
		</view>
		<view v-if="userInfo.tag==1" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">办公电话</text>
			<text class="cell-tip">{{userInfo.officePhone||''}}</text>
		</view>
		<view v-if="userInfo.tag==1" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">公司地址</text>
			<text class="cell-tip">{{userInfo.companyAddress||''}}</text>
		</view>
		<view v-if="userInfo.tag==1" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">营业执照</text>
			<view class="cell-img2" @tap.stop="previewImg(showImage)"><image :src="showImage" mode=""></image></view>
		</view>
		
		<view class="list-cell log-out-btn"  @tap="navTo('/pages/person/updatePerson')" v-if="userInfo.tag==1">
			<text class="cell-tit">修改个人信息</text>
		</view>
		<view class="list-cell log-out-btn" @tap="navTo('/pages/person/updatePwd')">
			<text class="cell-tit">修改密码</text>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex';
	import {RESOURCE } from '@/api/resource.js'
	export default {
		data() {
			return {
				showImage:''
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		onLoad() {
			this.showImage=this.userInfo.filePath?this.userInfo.filePath:''
		},
		methods:{
			...mapMutations(['login','logout']),
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			previewImg(imgUrl){
				// 预览图片
				let imgList = [imgUrl]
				uni.previewImage({
					urls: imgList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.container{
		margin-bottom: 100rpx;
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
			margin-left:20upx;
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
		.cell-img{
			position: absolute;
			top: 16upx;
			right: 20upx;
			border-radius: 50%;
			overflow: hidden;
			width: 80upx;
			height: 80upx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.cell-img2{
			position: absolute;
			top: 16upx;
			right: 20upx;
			overflow: hidden;
			width: 60upx;
			height: 60upx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>

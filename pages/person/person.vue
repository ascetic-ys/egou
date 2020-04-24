<template>
	<view class="container">
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">头像</text>
			<view class="cell-img"><image :src="weChat.avatarUrl || '/static/missing-face.png'" mode=""></image></view>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">用户名</text>
			<text class="cell-tip">{{userInfo.userName}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">手机号</text>
			<text class="cell-tip">{{userInfo.phoneNumber||''}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		
	<!-- 	<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view> -->
		<view class="list-cell  b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">性别</text>
			<picker @change="sexChange" :value="userInfo.sex" :range="sexarray">
			   <text class="cell-tip">{{sexarray[userInfo.sex]}}</text>                   
			</picker>
			
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">邮箱</text>
			<text class="cell-tip">{{userInfo.email||''}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">公司名称</text>
			<text class="cell-tip">{{userInfo.companyName||''}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">联系人</text>
			<text class="cell-tip">{{userInfo.linkMan||''}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">办公电话</text>
			<text class="cell-tip">{{userInfo.officePhone||''}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">公司地址</text>
			<text class="cell-tip">{{userInfo.companyAddress||''}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">营业执照</text>
			<view class="cell-img"><image :src="userInfo.filePath" mode=""></image></view>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		
		<!-- <view class="list-cell log-out-btn" @tap="saveUser">
			<text class="cell-tit">保存个人信息</text>
		</view> -->
		<view class="list-cell log-out-btn" @tap="navTo('/pages/person/updatePwd')">
			<text class="cell-tit">修改密码</text>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex';
	export default {
		data() {
			return {
				nikname:'zhangsan',
				sexarray:['男','女'],
				email:''
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		methods:{
			...mapMutations(['logout']),

			navTo(url){
				// this.$api.msg(`跳转到${url}`);
				uni.navigateTo({
					url:url
				})
			},
			sexChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.userInfo.sex = e.target.value
			},
			DateChange(e) {
				this.birthday = e.target.value
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},
			saveUser(){
				uni.showLoading({title: '请求中...'})
				this.$api.httpPost('userInfo/api/save',this.form).then(r=>{
					if(r.code==0){
						this.$api.msg(r.msg||'保存成功')
					}else{
						this.$api.msg(r.msg||'网络异常请重试')
					}
					uni.hideLoading()
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
					uni.hideLoading()
				})
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
			right: 75upx;
			border-radius: 50%;
			overflow: hidden;
			width: 80upx;
			height: 80upx;
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

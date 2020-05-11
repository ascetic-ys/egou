<template>  
    <view class="container">  
		
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box" @click="navTo('/pages/person/person')">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.id?weChat.avatarUrl : '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{userInfo.userName || '游客'}}</text>
				</view>
				<view class="code-box" v-if="hasLogin && userInfo.tag==3" @tap.stop="toMyQrCode">
					<image src="/static/images/qr-code.png"></image>
				</view>
			</view>
		<!-- 	<view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<view class="b-btn">
					立即开通
				</view>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					DCloud会员
				</view>
				<text class="e-m">DCloud Union</text>
				<text class="e-b">开通会员开发无bug 一测就上线</text>
			</view> -->
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/arc.png"></image>
			
			<!-- <view class="tj-sction">
				<view class="tj-item">
					<text class="num">128.8</text>
					<text>余额</text>
				</view>
				<view class="tj-item">
					<text class="num">0</text>
					<text>优惠券</text>
				</view>
				<view class="tj-item">
					<text class="num">20</text>
					<text>积分</text>
				</view>
			</view> -->
			<!-- 订单 -->
			<view class="order-section" v-if='userInfo.tag==1'>
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-shouye"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-daifukuan"></text>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/refundList')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>退款申请</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<list-cell v-if='userInfo.tag==1' icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<list-cell v-if='userInfo.tag==1' icon="icon-shouye" iconColor="#54b4ef" title="发票管理" @eventClick="navTo('/pages/invoice/invoice')"></list-cell>
				<list-cell v-if='userInfo.tag==1' icon="icon-iLinkapp-" iconColor="#9789f7" title="售后反馈" @eventClick="navTo('/pages/order/serviceList')"></list-cell>
				<list-cell v-if='userInfo.tag==2' icon="icon-shouye" iconColor="#e07472" title="我的订单" @eventClick="navTo('/pages/myOrder/myOrder')"></list-cell>
				<list-cell v-if='userInfo.tag==0' icon="icon-share" iconColor="#9789f7" title="订单统计" tips="查看最近订单图表信息" @eventClick="navTo('/pages/orderTj/orderTj?state=0')"></list-cell>
				<!-- <list-cell v-if='userInfo.tag==0' icon="icon-pinglun-copy" iconColor="#ee883b" title="待办事项" tips="有新的消息" @eventClick="navTo('/pages/notice/notice')"></list-cell> -->
				<list-cell v-if='userInfo.tag==3' icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#e07472" title="我的客户" border="" @eventClick="navTo('/pages/myUser/myUser?state=0')"></list-cell>
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
				
				
			</view>
			<view class="order-panel" v-if='[0,3].indexOf(userInfo.tag)>-1'>
				<view class="left blue">
					<image :src="`/static/images/order-num.png`" mode="scaleToFill"></image>
				</view>
				<view class="right">
					<text class="title">今日订单数</text>
					<text class="num">{{orderNum}}</text>
				</view>
			</view>
			<view class="order-panel" v-if='[0,3].indexOf(userInfo.tag)>-1'>
				<view class="left red">
					<image :src="`/static/images/order-price.png`" mode="scaleToFill"></image>
				</view>
				<view class="right">
					<text class="title">今日订单额</text>
					<text class="num">{{orderPrice}}</text>
				</view>
			</view>
			<view class="order-panel" v-if='userInfo.tag==3'>
				<view class="left yellow">
					<image :src="`/static/images/client.png`" mode="scaleToFill"></image>
				</view>
				<view class="right">
					<text class="title">今日注册用户</text>
					<text class="num">{{clientNum}}</text>
				</view>
			</view>
			<view class="ad-1">
				<image src="http://img0.imgtn.bdimg.com/it/u=2883970925,4093911839&fm=26&gp=0.jpg" mode="scaleToFill"></image>
			</view>
		</view>
		
		<view v-show="false">
			<list-cell icon="icon-yiguoqi1" title="icon-yiguoqi1"></list-cell>
			<list-cell icon="icon-iconfontshanchu1" title="icon-iconfontshanchu1"></list-cell>
			<list-cell icon="icon-iconfontweixin" title="icon-iconfontweixin"></list-cell>
			<list-cell icon="icon-alipay" title="icon-alipay"></list-cell>
			<list-cell icon="icon-shang" title="icon-shang"></list-cell>
			<list-cell icon="icon-shouye" title="icon-shouye"></list-cell>
			<list-cell icon="icon-shanchu4" title="icon-shanchu4"></list-cell>
			<list-cell icon="icon-xiaoxi" title="icon-xiaoxi"></list-cell>
			<list-cell icon="icon-jiantour-copy" title="icon-jiantour-copy"></list-cell>
			<list-cell icon="icon-fenxiang2" title="icon-fenxiang2"></list-cell>
			<list-cell icon="icon-pingjia" title="icon-pingjia"></list-cell>
			<list-cell icon="icon-daifukuan" title="icon-daifukuan"></list-cell>
			<list-cell icon="icon-pinglun-copy" title="icon-pinglun-copy"></list-cell>
			<list-cell icon="icon-dianhua-copy" title="icon-dianhua-copy"></list-cell>
			<list-cell icon="icon-shoucang" title="icon-shoucang"></list-cell>
			<list-cell icon="icon-xuanzhong2" title="icon-xuanzhong2"></list-cell>
			<list-cell icon="icon-gouwuche_" title="icon-gouwuche_"></list-cell>
			<list-cell icon="icon-icon-test" title="icon-icon-test"></list-cell>
			<list-cell icon="icon-icon-test1" title="icon-icon-test1"></list-cell>
			<list-cell icon="icon-bianji" title="icon-bianji"></list-cell>
			<list-cell icon="icon-jiazailoading-A" title="icon-jiazailoading-A"></list-cell>
			<list-cell icon="icon-zuoshang" title="icon-zuoshang"></list-cell>
			<list-cell icon="icon-jia2" title="icon-jia2"></list-cell>
			<list-cell icon="icon-huifu" title="icon-huifu"></list-cell>
			<list-cell icon="icon-sousuo" title="icon-sousuo"></list-cell>
			<list-cell icon="icon-arrow-fine-up" title="icon-arrow-fine-up"></list-cell>
			<list-cell icon="icon-hot" title="icon-hot"></list-cell>
			<list-cell icon="icon-lishijilu" title="icon-lishijilu"></list-cell>
			<list-cell icon="icon-zhengxinchaxun-zhifubaoceping-" title="icon-zhengxinchaxun-zhifubaoceping-"></list-cell>
			<list-cell icon="icon-naozhong" title="icon-naozhong"></list-cell>
			<list-cell icon="icon-xiatubiao--copy" title="icon-xiatubiao--copy"></list-cell>
			<list-cell icon="icon-shoucang_xuanzhongzhuangtai" title="icon-shoucang_xuanzhongzhuangtai"></list-cell>
			<list-cell icon="icon-jia1" title="icon-jia1"></list-cell>
			<list-cell icon="icon-bangzhu1" title="icon-bangzhu1"></list-cell>
			<list-cell icon="icon-arrow-left-bottom" title="icon-arrow-left-bottom"></list-cell>
			<list-cell icon="icon-arrow-right-bottom" title="icon-arrow-right-bottom"></list-cell>
			<list-cell icon="icon-arrow-left-top" title="icon-arrow-left-top"></list-cell>
			<list-cell icon="icon-icon--" title="icon-icon--"></list-cell>
			<list-cell icon="icon-zuojiantou-up" title="icon-zuojiantou-up"></list-cell>
			<list-cell icon="icon-xia" title="icon-xia"></list-cell>
			<list-cell icon="icon--jianhao" title="icon--jianhao"></list-cell>
			<list-cell icon="icon-weixinzhifu" title="icon-weixinzhifu"></list-cell>
			<list-cell icon="icon-comment" title="icon-comment"></list-cell>
			<list-cell icon="icon-weixin" title="icon-weixin"></list-cell>
			<list-cell icon="icon-fenlei1" title="icon-fenlei1"></list-cell>
			<list-cell icon="icon-erjiye-yucunkuan" title="icon-erjiye-yucunkuan"></list-cell>
			<list-cell icon="icon-Group-" title="icon-Group-"></list-cell>
			<list-cell icon="icon-you" title="icon-you"></list-cell>
			<list-cell icon="icon-forward" title="icon-forward"></list-cell>
			<list-cell icon="icon-tuijian" title="icon-tuijian"></list-cell>
			<list-cell icon="icon-bangzhu" title="icon-bangzhu"></list-cell>
			<list-cell icon="icon-share" title="icon-share"></list-cell>
			<list-cell icon="icon-yiguoqi" title="icon-yiguoqi"></list-cell>
			<list-cell icon="icon-shezhi1" title="icon-shezhi1"></list-cell>
			<list-cell icon="icon-fork" title="icon-fork"></list-cell>
			<list-cell icon="icon-kafei" title="icon-kafei"></list-cell>
			<list-cell icon="icon-iLinkapp-" title="icon-iLinkapp-"></list-cell>
			<list-cell icon="icon-saomiao" title="icon-saomiao"></list-cell>
			<list-cell icon="icon-shezhi" title="icon-shezhi"></list-cell>
			<list-cell icon="icon-shouhoutuikuan" title="icon-shouhoutuikuan"></list-cell>
			<list-cell icon="icon-gouwuche" title="icon-gouwuche"></list-cell>
			<list-cell icon="icon-dizhi" title="icon-dizhi"></list-cell>
			<list-cell icon="icon-fenlei" title="icon-fenlei"></list-cell>
			<list-cell icon="icon-xingxing" title="icon-xingxing"></list-cell>
			<list-cell icon="icon-tuandui" title="icon-tuandui"></list-cell>
			<list-cell icon="icon-zuanshi" title="icon-zuanshi"></list-cell>
			<list-cell icon="icon-zuo" title="icon-zuo"></list-cell>
			<list-cell icon="icon-shoucang2" title="icon-shoucang2"></list-cell>
			<list-cell icon="icon-shouhuodizhi" title="icon-shouhuodizhi"></list-cell>
			<list-cell icon="icon-yishouhuo" title="icon-yishouhuo"></list-cell>
			<list-cell icon="icon-dianzan-ash" title="icon-dianzan-ash"></list-cell>
		</view>
    </view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
    import {mapState} from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				orderNum:0,
				orderPrice:0,
				clientNum:0
			}
		},
		onLoad(){
			this.initData()
		},
		onShow() {
			this.initData()
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
        computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
        methods: {
			initData(){
				this.initPageTitle()
				if(this.userInfo.tag==0){
					this.$api.httpPost('orderMainInfo/api/list',{
						pageNum:1,
						pageSize:10,
						queryType:"day",
					}).then(r=>{
						console.log("请求结果：",r)
						this.orderNum=r.total||0
						this.orderPrice=r.totalPrice||0
					}).catch(e=>{
						console.log("请求错误：",e)
						this.$api.msg(e.msg||'网络异常请重试')
					})
				}else if(this.userInfo.tag==3){
					this.$api.httpPost('userInfo/api/myCustomer',{
						pageNum:1,
						pageSize:10,
						id:this.userInfo.id
					}).then(r=>{
						console.log("请求结果：",r)
						this.clientNum=r.data.newUsers||0
					}).catch(e=>{
						console.log("请求错误：",e)
						this.$api.msg(e.msg||'网络异常请重试')
					})
					
					this.$api.httpPost('userInfo/api/myGrade',{
						pageNum:1,
						pageSize:10,
						id:this.userInfo.id,
						orderDateStart:this.getDate(),
						orderDateEnd:this.getDate()
					}).then(r=>{
						console.log("请求结果：",r)
						this.orderNum=r.data.totalNum||0
						this.orderPrice=r.data.totalPrice||0
						return r
					}).catch(e=>{
						console.log("请求错误：",e)
						this.$api.msg(e.msg||'网络异常请重试')
					})
				}
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
				day=day-1
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			toMyQrCode(){
				uni.navigateTo({
					url:'/pages/user/myQrCode'
				}) 
			},
			clickTab(item){
				uni.navigateTo({
					url:item.pagePath
				})
			},
			initPageTitle(){
				if(this.userInfo&&[0,2].indexOf(this.userInfo.tag)>-1){
					uni.setTabBarItem({
					  index: 2,
					  text: '订单',
					  iconPath: "static/tab-order.png",
					  selectedIconPath: "static/tab-order-current.png",
					})
				}else if(this.userInfo&&this.userInfo.tag==3){
					uni.setTabBarItem({
					  index: 2,
					  text: '业绩',
					  iconPath: "static/tab-achieve.png",
					  selectedIconPath: "static/tab-achieve-current.png",
					})
				}
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				if(!this.hasLogin){
					url = '/pages/public/login';
				}
				uni.navigateTo({  
					url
				})  
			}, 
	
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
        }  
    }  
</script>  
<style lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
		.code-box{
			flex: 1;
			text-align: right;
			margin-right: 50rpx;
			image{
				height: 60rpx;
				width: 60rpx;
			}
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
		
	}
	
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 10upx 10upx;
		background: #fff;
		margin-top: 20rpx;
		image{
			width:100%;
			height: 100%; 
		}
	}
	
	.order-panel{
		height: 160rpx;
		margin: 20rpx 0;
		background: #fff;
		padding: 10rpx;
		.left{
			float: left;
			width: 140rpx;
			height: 140rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			image{
				width: 90%;
				height: 90%;
				padding: 10%;
			}
		}
		.right{
			padding: 10rpx 40rpx;
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			.title{
				color: #fa436a;
				line-height: 60rpx;
			}
			.num{
				line-height: 60rpx;
			}
			
		}
		.blue{
			background: #4399FC;
		}
		.yellow{
			background: #F0AD4E;
		}
		.red{
			background: #DD524D;
		}
		
	}
	
</style>
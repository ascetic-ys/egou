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
			<view class="order-section" v-if='!userInfo.tag||userInfo.tag==1'>
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-shouye"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-daifukuan"></text>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>退款/售后</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<!-- <view class="sec-header">
					<text class="yticon icon-lishijilu"></text>
					<text>浏览历史</text>
				</view>
				<scroll-view scroll-x class="h-list">
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105231218&di=09534b9833b5243296630e6d5b728eff&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM05%2FD1%2FAC%2FwKhQcFQ3iN2EQTo8AAAAAHQU6_8355.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105320890&di=c743386be51f2c4c0fd4b75754d14f3c&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ1OTg4ODY0MDA3Ny05OTQ4ODY1NDQ%3D.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691146630,2165926318&fm=26&gp=0.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105443324&di=8141bf13f3f208c61524d67f9bb83942&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ac9a5548d29b0000019ae98e6d98.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg" mode="aspectFill"></image>
				</scroll-view> -->
				<!-- <list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="我的购物车" tips="您的购物车共有20件商品" @eventClick="navTo('/pages/cart/cart')"></list-cell> -->
				<list-cell v-if='!userInfo.tag||userInfo.tag==1' icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<list-cell v-if='!userInfo.tag||userInfo.tag==1' icon="icon-shouye" iconColor="#e07472" title="发票管理" @eventClick="navTo('/pages/invoice/invoice')"></list-cell>
				<list-cell v-if='userInfo.tag==0' icon="icon-share" iconColor="#9789f7" title="订单统计" tips="查看最近订单图表信息" @eventClick="navTo('/pages/orderTj/orderTj?state=0')"></list-cell>
				<list-cell v-if='userInfo.tag==0' icon="icon-pinglun-copy" iconColor="#ee883b" title="待办事项" tips="有新的消息" @eventClick="navTo('/pages/notice/notice')"></list-cell>
				<!-- <list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></list-cell> -->
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
				<list-cell v-if='userInfo.tag==3' icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#e07472" title="我的客户" border="" @eventClick="navTo('/pages/myUser/myUser?state=0')"></list-cell>
				<list-cell v-if='userInfo.tag==3' icon="icon-iconfontweixin" iconColor="#e0ae70" title="我的业绩" border="" @eventClick="navTo('/pages/myAchievement/myAchievement?state=0')"></list-cell>
				<!-- <list-cell icon="icon-shezhi1" title=""></list-cell> -->
				<view v-show="true">
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
		</view>
			<!-- 底部自定义tabbar -->
			<!-- <tab-bar :current="4" @clickTab="clickTab"></tab-bar> -->
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
			}
		},
		onLoad(){
			this.initPageTitle()
		},
		onShow() {
			this.initPageTitle()
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
	
</style>
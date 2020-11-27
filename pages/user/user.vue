<template>  
    <view class="container">  
		
		<view class="user-section">
			<!-- <image class="bg" src="/static/user-bg.jpg"></image> -->
			<view class="user-info-box" @click="navTo('/pagesUser/person/person')">
				<!-- <view>
					<image class="portraitBorder" :src="portraitBorderPath"></image>
				</view> -->
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.id?weChat.avatarUrl : '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<view class="name-box">
						<text class="username">{{userInfo.userName || '游客'}}</text>
						<view class="vip-box">
							<image class="vipImg" mode="scaleToFill" :src="portraitBorderPath"></image>
						</view>
					</view>
					<!-- <text class="address">{{userInfo.province||''}}{{userInfo.city||''}}{{userInfo.district||''}}</text> -->
					<text class="address">ID:{{bfid}}</text>
				</view>
				<view class="code-box" v-if="hasLogin && userInfo.tag==3" @tap.stop="toMyQrCode">
					<image src="/static/images/qr-code.png"></image>
				</view>
				<!-- <view class="code-box"  @tap.stop="toMyQrCode">
					<image src="/static/images/qr-code.png"></image>
				</view> -->
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
			
			<view class="like-list" v-if='[1,4].indexOf(userInfo.tag)>-1'>
				<view class="like-box" @click="navTo('/pagesProduct/order/favoriteList')">
					<text class="num">{{favoriteNum}}</text>
					<text class="item yticon icon-shoucang">收藏夹</text>
				</view>
				<view class="like-box" @click="navTo('/pagesProduct/order/historyList')">
					<text class="num">{{historyNum}}</text>
					<text class="item yticon icon-lishijilu">浏览足迹</text>
				</view>
			</view>
			
			<view class="top-bg-img">
				<!-- <image src="http://img0.imgtn.bdimg.com/it/u=2883970925,4093911839&fm=26&gp=0.jpg" mode="scaleToFill"></image> -->
				<image src="/static/background/user-back1.png" mode="scaleToFill"></image>
			</view>
		</view>
		
		<view style="height: 320rpx;background: #f5f5f5;"></view>
		
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
			<!-- <image class="arc" src="/static/arc.png"></image> -->
			
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
			<view class="order-section" v-if='[1,4].indexOf(userInfo.tag)>-1'>
				<view class="info-box">
					<text class="info-title">我的订单</text>
					<view class="info-more" @click="navTo('/pagesProduct/order/order?state=0')">
						<text>查看更多</text>
						<text class="yticon icon-you"></text>
					</view>
				</view>
				<view class="btn-box">
					<view class="order-item" @click="navTo('/pagesProduct/order/order?state=1')" hover-class="common-hover"  :hover-stay-time="50">
						<text class="yticon icon-daifukuan"></text>
						<text>待付款</text>
					</view>
					<view class="order-item" @click="navTo('/pagesProduct/order/order?state=2')"  hover-class="common-hover" :hover-stay-time="50">
						<text class="yticon icon-shouye"></text>
						<text>待确认</text>
					</view>
					<view class="order-item" @click="navTo('/pagesProduct/order/order?state=4')" hover-class="common-hover"  :hover-stay-time="50">
						<text class="yticon icon-yishouhuo"></text>
						<text>待收货</text>
					</view>
					<view class="order-item" @click="navTo('/pagesProduct/order/refundList')" hover-class="common-hover"  :hover-stay-time="50">
						<text class="yticon icon-shouhoutuikuan"></text>
						<text>退款申请</text>
					</view>
				</view>
			</view>
			<view class="today-section" v-if='[0,3].indexOf(userInfo.tag)>-1'>
				<view class="info-box">
					<text class="info-title">今日数据</text>
					<view class="info-more">
						<!-- <text class="yticon icon-you"></text> -->
					</view>
				</view>
				<view class="btn-box">
					<view class="today-item" v-if='[0,3].indexOf(userInfo.tag)>-1' hover-class="common-hover"  :hover-stay-time="50">
						<text class="num">{{todayOrderNum}}</text>
						<text>今日订单数</text>
						<view class="change">较昨日
							<text :class="[todayOrderNumChange>0?'red':todayOrderNumChange==0?'gray':'green']">
								{{todayOrderNumChange==0?`+${todayOrderNumChange}`:todayOrderNumChange}}
							</text>
						</view>
					</view>
					<view class="today-item" v-if='[0,3].indexOf(userInfo.tag)>-1' hover-class="common-hover" :hover-stay-time="50">
						<text class="num">{{todayOrderPrice}}</text>
						<text>今日订单额</text>
						<view class="change">较昨日
							<text :class="[todayOrderPriceChange>0?'red':todayOrderPriceChange==0?'gray':'green']">
								{{todayOrderPriceChange==0?`+${todayOrderPriceChange}`:todayOrderPriceChange}}
							</text>
						</view>
					</view>
					<view class="today-item" v-if='[3].indexOf(userInfo.tag)>-1' hover-class="common-hover"  :hover-stay-time="50">
						<text class="num">{{todayUser}}</text>
						<text>今日注册用户</text>
						<view class="change">较昨日
							<text :class="[todayUserChange>0?'red':todayUserChange==0?'gray':'green']">
								{{todayUserChange==0?`+${todayUserChange}`:todayUserChange}}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="mybtn-section ">
				<button-cell v-if='!userInfo.id || [1,4].indexOf(userInfo.tag)>-1' icon="icon-icon--" iconColor="#6E7070" title="城市渠道商注册" border="" @eventClick="navTo('/pagesUser/partner/partner?isB=1',true)"></button-cell>
				<button-cell v-if='!userInfo.id || [1,4].indexOf(userInfo.tag)>-1' icon="icon-fenlei" iconColor="#6E7070" title="渠道商B端注册" border="" @eventClick="navTo('/pagesUser/partner/partner?isB=2',true)"></button-cell>
				<button-cell v-if='[0].indexOf(userInfo.tag)>-1' icon="icon-icon--" iconColor="#6E7070" title="城市渠道商信息" tips="查看已注册的城市渠道商" border="" @eventClick="navTo('/pagesUser/partner/partnerList')"></button-cell>
				<button-cell v-if='[1].indexOf(userInfo.tag)>-1' icon="icon-shoucang" iconColor="#6E7070" title="会员中心" tips="访问会员中心" border="" @eventClick="navTo('/pagesUser/user/membershipCenter')"></button-cell>
				<button-cell v-if='[3].indexOf(userInfo.tag)>-1' icon="icon-saomiao" iconColor="#6E7070" title="我的二维码" tips="查看我的二维码" border="" @eventClick="navTo('/pagesUser/user/myQrCode')"></button-cell>
				<button-cell v-if='[3].indexOf(userInfo.tag)>-1' icon="icon-saomiao" iconColor="#6E7070" title="游客二维码" tips="查看我的二维码" border="" @eventClick="navTo('/pagesUser/user/myQrCode?type=3')"></button-cell>
				<!-- <button-cell v-if='hasLogin' icon="icon-lishijilu" iconColor="#6E7070" title="浏览足迹" border="" tips="查看我最近浏览过的商品" @eventClick="navTo('/pagesProduct/order/historyList')"></button-cell> -->
				<!-- <button-cell v-if='hasLogin' icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#6E7070" title="收藏夹" border="" tips="查看我收藏的商品列表" @eventClick="navTo('/pagesProduct/order/favoriteList')"></button-cell> -->
				<button-cell v-if='hasLogin' icon="icon-dianhua-copy" iconColor="#6E7070" title="意见反馈" border="" tips="查看我反馈的意见" @eventClick="navTo('/pagesProduct/order/opinionList')"></button-cell>
				<button-cell v-if='[1,4].indexOf(userInfo.tag)>-1' icon="icon-dizhi" iconColor="#6E7070" title="地址管理" border="" tips="查看我录入的地址信息" @eventClick="navTo('/pagesInfo/address/address')"></button-cell>
				<button-cell v-if='[1,4].indexOf(userInfo.tag)>-1' icon="icon-shouye" iconColor="#6E7070" title="发票管理" border="" tips="查看我记录的发票信息" @eventClick="navTo('/pagesInfo/invoice/invoice')"></button-cell>
				<button-cell v-if='[1,4].indexOf(userInfo.tag)>-1' icon="icon-pingjia" iconColor="#6E7070" title="售后反馈" border="" tips="查看我的售后反馈申请" @eventClick="navTo('/pagesProduct/order/serviceList')"></button-cell>
				<button-cell v-if='userInfo.tag==2' icon="icon-shouye" iconColor="#6E7070" title="我的订单" border="" tips="查看我提交的订单" @eventClick="navTo('/pagesInfo/myOrder/myOrder')"></button-cell>
				<button-cell v-if='userInfo.tag==0' icon="icon-share" iconColor="#6E7070" title="订单统计" border="" tips="查看最近订单图表信息" @eventClick="navTo('/pagesProduct/orderTj/orderTj?state=0')"></button-cell>
				<!-- <button-cell v-if='userInfo.tag==0' icon="icon-pinglun-copy" iconColor="#6E7070" title="待办事项" tips="有新的消息" @eventClick="navTo('/pagesInfo/notice/notice')"></button-cell> -->
				<button-cell icon="icon-pinglun-copy" iconColor="#6E7070" title="通知消息" tips="我的消息" border="" @eventClick="navTo('/pagesInfo/notice/message')"></button-cell>
				<button-cell v-if='userInfo.tag==3 && userInfo.isB==1' icon="icon-fenlei" iconColor="#6E7070" title="城市渠道商B端" border="" tips="查看我的城市渠道商B端信息" @eventClick="navTo('/pagesInfo/myUser/myBUser?state=0')"></button-cell>
				<button-cell v-if='userInfo.tag==3' icon="icon-tuandui" iconColor="#6E7070" title="我的客户" border="" tips="查看我的客户信息" @eventClick="navTo('/pagesInfo/myUser/myUser?state=0')"></button-cell>
				<button-cell v-if='userInfo.tag==3' icon="icon-bianji" iconColor="#6E7070" title="城市渠道商协议" border="" tips="查看曾签订的协议" @eventClick="navTo('/pagesUser/partner/partnerProtocol')"></button-cell>
				<button-cell v-if='userInfo.tag==3' icon="icon-iconfontweixin" iconColor="#6E7070" title="会员费用支付" tips="查看会员续费记录" border="" @eventClick="navTo('/pagesUser/partner/partnerVipPay')"></button-cell>
				<button-cell icon="icon-shezhi1" iconColor="#6E7070" title="设置" border="" @eventClick="navTo('/pagesUser/set/set')"></button-cell>
				<button-cell icon="icon-iLinkapp-" iconColor="#6E7070" title="服务须知" border="" @eventClick="navTo('/pagesUser/set/service')"></button-cell>
				<button-cell icon="icon-tuijian" iconColor="#6E7070" title="关于我们" border="" @eventClick="navTo('/pagesUser/set/aboutUs')"></button-cell>
				<button-cell icon="icon-weixin" iconColor="#6E7070" title="平台客服(人工)" border="" :service="true"></button-cell>
				<!-- #6E7070 -->
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
	import buttonCell from '@/components/mix-button-cell';
    import {mapState} from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell,
			buttonCell
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				todayOrderPrice:0,//	今日新增订单总金额
				todayOrderPriceUp:0,//	今日新增订单总金额较昨日是否增加-1减少，0持平，1增加
				todayOrderPriceChange:0,//	今日新增订单总金额较昨日变化值
				todayOrderNum:0,//	今日新增订单数量
				todayOrderNumUp:0,//	今日新增订单数量较昨日是否增加-1减少，0持平，1增加
				todayOrderNumChange:0,//	今日新增订单数量较昨日变化值
				todayProductNum:0,//	今日新增订单商品总数量
				yesterdayOrderPrice:0,//	昨日新增订单总金额
				yesterdayOrderNum:0,//	昨日新增订单数量
				yesterdayProductNum:0,//	昨日新增订单商品总数量
				todayUser:0,//	今日新增用户
				todayUserUp:0,//	今日新增用户较昨日是否增加-1减少，0持平，1增加
				todayUserChange:0,//	今日新增用户较昨日变化值
				yesterdayUser:0,//	昨日新增用户
				favoriteNum:0,
				historyNum:0,
				portraitBorderPath:'',
				bfid:'',
			}
		},
		created() {
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
				this.navTo('/pagesUser/set/set');
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
					url: '/pagesInfo/notice/notice'
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
					this.getNewOrder()
				}else if(this.userInfo.tag==3){
					this.getNewUser()
					this.getNewOrder()
				}
				this.getFavoriteNum()
				this.getHistoryNum()
				this.portraitBorderLoad()
				this.bfidLoad()
				this.dateDiff()
				
			},
			/*
			 * 获取指定日期(字符串类型)到当前时间的天数
			 */
			 dateDiff(){
				if(this.userInfo.ifVip==2&&this.userInfo.vipState==1){
					let date2 = new Date();
					let validDate=this.userInfo.validDate
					var date1 = new Date(Date.parse(validDate.replace(/-/g,   "/")));
					var iDays = parseInt(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24); 
					console.log(iDays)
					if(iDays>=0&&iDays<=7){
						this.$api.msg("您的会员即将到期，请尽快充值！")
					}
				}
				
			 },
			bfidLoad(){
				const id=this.userInfo.id.toString()
				let bfid='BF'
				for(let i=id.length;i<6;i++){
					bfid+='0'
				}
				this.bfid=bfid+id
			},
			portraitBorderLoad(){
				this.portraitBorderPath='/static/vip/1.png'
				if(this.userInfo.ifVip==2&&this.userInfo.vipState==1){
					this.portraitBorderPath='/static/vip/2.png'
				}
			},
			getFavoriteNum(){
				this.$api.httpPost('footmark/api/list',{
					pageNum:1,
					pageSize:1,
					userId:this.userInfo.id,
					isFavorite:1
				}).then(r=>{
					console.log("请求结果：",r)
					this.favoriteNum=r.total
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			getHistoryNum(){
				this.$api.httpPost('footmark/api/list',{
					pageNum:1,
					pageSize:1,
					userId:this.userInfo.id,
					isFavorite:'0'
				}).then(r=>{
					console.log("请求结果：",r)
					this.historyNum=r.total
				}).catch(e=>{
					console.log("请求错误：",e)
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			getNewOrder(){
				let params={}
				if(this.userInfo.tag==3){
					params={
						salesManId:this.userInfo.id
					}
				}
				this.$api.httpPost('userInfo/api/newOrder',{
					...params
				}).then(r=>{
					console.log("商家新增订单请求结果：",r)
					this.todayOrderNum=r.data.todayOrderNum||0
					this.yesterdayOrderNum=r.data.yesterdayOrderNum||0
					this.todayOrderNumChange=this.todayOrderNum-this.yesterdayOrderNum
					if(this.todayOrderNumChange<0){
						this.todayOrderNumUp=0
					}else if(this.todayOrderNumChange==0){
						this.todayOrderNumUp=1
					}else if(this.todayOrderNumChange>0){
						this.todayOrderNumUp=2
					}
					this.todayOrderPrice=r.data.todayOrderPrice||0
					this.yesterdayOrderPrice=r.data.yesterdayOrderPrice||0
					this.todayOrderPriceChange=this.todayOrderPrice-this.yesterdayOrderPrice
					if(this.todayOrderPriceChange<0){
						this.todayOrderPriceUp=0
					}else if(this.todayOrderPriceChange==0){
						this.todayOrderPriceUp=1
					}else if(this.todayOrderPriceChange>0){
						this.todayOrderPriceUp=2
					}
					
					// this.todayOrderNumChange=Math.abs(this.todayOrderNumChange);
					// this.todayOrderPriceChange=Math.abs(this.todayOrderPriceChange);
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			getNewUser(){
				this.$api.httpPost('userInfo/api/newUser',{
					id:this.userInfo.id
				}).then(r=>{
					console.log("销售人员新增客户请求结果：",r)
					this.todayUser=r.data.todayUser||0
					this.yesterdayUser=r.data.yesterdayUser||0
					this.todayUserChange=this.todayUser-this.yesterdayUser
					if(this.todayUserChange<0){
						this.todayUserUp=0
					}else if(this.todayUserChange==0){
						this.todayUserUp=1
					}else if(this.todayUserChange>0){
						this.todayUserUp=2
					}
					// this.todayUserChange=Math.abs(this.todayUserChange);
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
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
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				}
				uni.navigateTo({
					url:'/pagesUser/user/myQrCode'
				}) 
			},
			clickTab(item){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pagesUser/public/login'
					})
					return
				}
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
			navTo(url,flag){
				if(!flag && !this.hasLogin){
					url = '/pagesUser/public/login';
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
	
	.container {
		height: 100%;
		background-color: #F5F5F5;
	}

	.user-section{
		height: 270upx;
		padding: 10upx 30upx 0;
		position:relative;
		background-color: #232323;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			/* filter: blur(1px); */
			/* opacity: .7; */
		}
	}
	.user-info-box{
		height: 140upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait-box{
			
		}
		.portraitBorder{
			width: 164upx;
			height: 145upx;
			border-radius: 50%;
			position: absolute;
			z-index: 1;
			left: 0;
			right: 0;
			bottom: 0;
			right: 0;
		}
		.portrait{
			width: 120upx;
			height: 120upx;
			/* border:5upx solid #fff; */
			border-radius: 50%;
			margin-left: 10px;
			border: 4upx solid #CD723D; 
		}
		.info-box{
			display: flex;
			flex-direction: column;
			.username{
				font-size: $font-lg + 6upx;
				color: #C29B41;
				margin-left: 20upx;
			}
			.address{
				font-size: 22rpx;
				color: #DCDFE6;
				margin-left: 20rpx;
				margin-top: 10rpx;
			}
			.name-box {
				display: flex;
			}
			.vip-box {
				margin-top: 10upx;
				.vipImg {
					height: 34upx;
					width: 120upx;
					transform: scale(0.9);
				}
			}
			
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
		display: flex;
		flex-direction: column;
		.info-box{
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #F8F6FC;
			padding: 0 20rpx 10rpx 20rpx;
			font-size: 28rpx;
			color: #43494C;
			.info-more{
				font-size: 28rpx;
				color: #43494C;
			}
		}
		.btn-box{
			display: flex;
			justify-content: space-around;
			padding: 10rpx 10rpx 0 10rpx;
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
				color: #DF8750;
			}
			.icon-shouhoutuikuan{
				font-size:44upx;
			}
		}
		
	}
	.mybtn-section{
		padding: 30rpx 20rpx;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
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
	
	.today-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		display: flex;
		flex-direction: column;
		.info-box{
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #F8F6FC;
			padding: 0 20rpx 10rpx 20rpx;
			font-size: 28rpx;
			color: #43494C;
			.info-more{
				font-size: 28rpx;
				color: #43494C;
			}
		}
		.btn-box{
			display: flex;
			justify-content: space-around;
			padding-top: 20rpx;
			.today-item{
				@extend %flex-center;
				/* width: 120upx; */
				height: 120upx;
				border-radius: 10upx;
				font-size: 24rpx;
				color: $font-color-dark;
			}
			.num{
				font-size: 24upx;
				margin: 18upx 0rpx;
				color: #fa436a;
			}
			.change{
				font-size: 20upx;
				margin-top: 10rpx;
				color: #606266;
			}
			.red{
				color: red;
			}
			.green{
				color: green;
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
		height: 190rpx;
		margin: 20rpx 0;
		background: #fff;
		padding: 10rpx;
		.left{
			float: left;
			width: 170rpx;
			height: 170rpx;
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
				line-height: 50rpx;
			}
			.num{
				line-height: 50rpx;
			}
			.static{
				color: green;
				line-height: 50rpx;
				text-align: right;
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
	
	.like-list{
		display: flex;
		justify-content: space-around;
		z-index: 1;
		.like-box{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			text-align: center;
			z-index: 1;
			color: #828282;
			opacity: .8;
			text{
				font-size: 26rpx;
			}
		}
	}
	
	.top-bg-img{
		width: 90%;
		height: 200rpx;
		position: absolute;
		bottom: -160rpx;
		z-index: 1;
		left: 5%;
		image{
			width: 100%;
			height: 100%;
			border-radius: 20rpx;

		}
	}
	
</style>
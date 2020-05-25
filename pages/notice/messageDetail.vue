<template>
	<view class="container">
		<view class="title">{{dataInfo.noticeTitle}}</view>
		<view class="time">{{dataInfo.createTime}}</view>
		<view class="content">
			<jyf-parser domain="https://6874-html-foe72-1259071903.tcb.qcloud.la" gesture-zoom lazy-load ref="article" selectable
			 show-with-animation use-anchor @error="error" @imgtap="imgtap" @linkpress="linkpress" @parse="parse" @ready="ready">加载中...</jyf-parser>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import jyfParser from '@/components/jyf-parser/jyf-parser'; // HBuilderX 2.5.5 及以上可以不需要
	export default {
		components:{
			jyfParser
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		data() {
			return {
				id:'',
				noticeType:1,
				dataInfo:{}
			}
		},
		onLoad(option){
			this.id=option.id
			this.noticeType=option.noticeType
			let title = "公告信息详情"
			if(this.noticeType==1){
				title = "公告信息详情"
			}else if(this.noticeType==2){
				title = "预售信息详情"
			}else if(this.noticeType==3){
				title = "系统信息详情"
			}else if(this.noticeType==4){
				title = "客服信息详情"
			}
			uni.setNavigationBarTitle({
			    title: title
			})
			this.initData()
		},
		methods: {
			initData(){
				this.$api.httpPost('notice/api/detail',{
					noticeId:this.id,
				},'system').then(r=>{
					console.log("请求结果：",r)
					this.dataInfo=r.data
					this.$refs.article.setContent(this.dataInfo.noticeContent);
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			parse(e) {
				console.log('parse finish', e);
			},
			ready(e) {
				console.log('ready', e);
				// console.log('api: getText', this.$refs.article.getText());
				console.log('imgList', this.$refs.article.imgList);
			},
			imgtap(e) {
				console.log('imgtap', e);
			},
			linkpress(e) {
				console.log('linkpress', e);
			},
			error(e) {
				console.error(e);
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}
	.container{
		padding-bottom: 100upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx;
		.title{
			font-size: 30rpx;
			font-weight: 800;
			padding: 40rpx;
			color: #303133;
		}
		.time{
			font-size: 24rpx;
			color: #999999;
		}
		.content{
			text-align: left;
			width: 100%;
			padding: 50rpx 0;
		}
	}



</style>

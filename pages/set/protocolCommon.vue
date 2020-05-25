<template>
	<view class="container">
		<view class="content">
			<jyf-parser domain="https://6874-html-foe72-1259071903.tcb.qcloud.la" gesture-zoom lazy-load ref="article" selectable
				 show-with-animation use-anchor @error="error" @imgtap="imgtap" @linkpress="linkpress" @parse="parse" @ready="ready">加载中...</jyf-parser>
		</view>
		<view class="footer-btn">
			<button @tap='confirm'>确定</button>
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
		data() {
			return {
				flag:1,
				type:5
			};
		},
		computed: {
			...mapState(['hasLogin','userInfo','weChat'])
		},
		onLoad(options){
			this.flag=options.flag
			if(this.flag==1){
				this.type=5
			}else if(this.flag==2){
				this.type=6
			}
			this.initArticle()
			this.initPageTitle()
		},
		methods:{
			initArticle(){
				this.$api.httpPost('protocol/api/list',{
					protocolType:this.type
				}).then(r=>{
					console.log("协议type请求结果：",this.type,r)
					this.$refs.article.setContent(r.data.content);
				}).catch(e=>{
					console.log("请求错误：",e)
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			initPageTitle(){
				if(this.flag==1){
					uni.setNavigationBarTitle({
					    title: '7天无理由退换货规则'
					});
				}else if(this.flag==2){
					uni.setNavigationBarTitle({
					    title: '包邮服务及物流费用说明'
					});
				}
			},
			confirm(){
				uni.navigateBack()
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

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.content{
		padding: 20rpx;
	}
	.footer-btn{
		position: fixed;
		bottom: 10rpx;
		width: 100%;
		button{
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}
</style>

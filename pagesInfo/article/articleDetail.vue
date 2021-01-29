<template>
	<view class="body">
		<view class="title">
			<text>{{article.title}}</text>
		</view>
		<view class="content">
			<u-parse :html="article.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				article: {}
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getArticle()
		},
		methods: {
			getArticle(){
				this.$api.httpGet('article/api/detail/'+this.id,{}).then(r=>{
					this.article = r.data
				}).catch(e=>{
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.body {
		padding: 0 30rpx;
		
		.title{
			font-size: 38rpx;
			font-weight: 700;
		}
		
		.content{
			margin-top: 20rpx;
		}
	}
	
</style>

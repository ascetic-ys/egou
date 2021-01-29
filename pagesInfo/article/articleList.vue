<template>
	<view class="content">
		
		<scroll-view scroll-y style="height: 100%;width: 100%;"  @scrolltolower="scrollDown">
			<view class="guess-section guess-card no-padding" >
				<block v-for="(item, index) in articleList" :key="index">
					<u-card :title="item.title"  border-radius="0" margin="8rpx 0" padding="15" :border="false" :head-border-bottom="false" @click="index=>{toArticleDetail(index,item)}">
						<view class="" slot="body">
							<view class="video-wrapper" v-if="item.filePath">
								<video id="myVideo" :src="item.filePath" @error="videoErrorCallback" 
								controls 
								show-center-play-btn="true" 
								enable-play-gesture="true" 
								show-mute-btn="true" 
								muted="true" 
								@click.stop="avoid"
								></video>
							</view>
							<view class="u-body-item u-flex  u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">{{item.content|filtersText}}</view>
								
							</view>
						</view>
						<!-- <view class="" slot="foot"><u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon></view> -->
					</u-card>
					
				</block>
			</view>	
			<view class="load-more">
				<u-loadmore :status="loadStatus" ></u-loadmore>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				total: 0,
				loadStatus: 'loadmore', //loadmore,loading,nomore
				params:{
					pageNum: 1,
					pageSize: 10,
					orderByColumn: '',
					isAsc:'',
					
				},
				articleList: []
			};
		},
		filters: {
			filtersText(val) {
				if(val){
					var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
					var text = val.replace(re1,'');//执行替换成空字符
					if(text.length>60){
						return text.substr(0,60)
					}
					return text;
				}
				return val
			}
		},
		async onLoad(options){
			this.loadData()
		},
		methods: {
			
			loadData() {
				this.loadStatus = 'loadmore'
				this.$api.loading('加载中...')
				return this.$api.httpPost('article/api/list',this.params).then(r=>{
					uni.hideLoading();
					this.articleList=r.rows
					this.total = r.total
					if(this.total===0||this.total===this.articleList.length){
						this.loadStatus = 'nomore'
					}
					return r
				}).catch(e=>{
					uni.hideLoading();
					this.$api.msg(e.msg||'网络异常请重试')
				})
			},
			
			scrollDown(){
				if(this.total!==0&&this.articleList.length<this.total){
					this.params.pageNum += 1
					this.loadStatus = 'loading'
					this.$api.httpPost('article/api/list',this.params).then(r=>{
						this.articleList=this.articleList.concat(r.rows)
						this.total = r.total
						this.loadStatus = 'loadmore'
					}).catch(e=>{
						this.loadStatus = 'loadmore'
						this.$api.msg(e.msg||'网络异常请重试')
					})
				}else{
					this.loadStatus = 'nomore'
				}
				
			},
			avoid(){
				console.log("avoid")
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			toArticleDetail(index,item){
				uni.navigateTo({
					url: `/pagesInfo/article/articleDetail?id=${item.id}`
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	page, .content{
		background: $page-color-base;
	}
	
	.content {
		min-height: 100vh;
		height: 1200upx;
	}
	
	.load-more {
		//margin-top: 20upx;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		
		.video-wrapper {
			height: 330upx;
			width: 100%;
			overflow: hidden;
			margin-bottom: 20rpx;
			video {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	
	.guess-card {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		background-color: #f0f0f0;
	}
	
	.no-padding {
		padding: 0;
	}


</style>

<template>
	<view class="content">
		<view v-if="!service" class="mix-button-cell" :class="border" @click="eventClick" hover-class="cell-hover"  :hover-stay-time="50">
			<text
				v-if="icon"
				class="cell-icon yticon"
				:style="[{
					color: iconColor,
				}]"
				:class="icon"
			></text>
			<!-- <image :src="image" v-if="image" class="cell-img" mode="aspectFill"></image> -->
			<text class="cell-tit clamp">{{title}}</text>
		</view>
		<button v-if="service" class="mix-button-cell btn-service" open-type="contact" @contact="getContact">
			<text
				v-if="icon"
				class="cell-icon yticon"
				:style="[{
					color: iconColor,
				}]"
				:class="icon"
			></text>
			<!-- <image :src="image" v-if="image" class="cell-img" mode="aspectFill"></image> -->
			<text class="cell-tit clamp">{{title}}</text>
		</button>

	</view>
</template>
 
<script>
	/**
	 *  简单封装了下， 应用范围比较狭窄，可以在此基础上进行扩展使用
	 *  比如加入image， iconSize可控等
	 */
	export default {
		data() {
			return {
				typeList: {
					left: 'icon-zuo',
					right: 'icon-you',
					up: 'icon-shang',
					down: 'icon-xia'
				},
			}
		},
		props: {
			service: {
				type: Boolean,
				default: false
			},
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '标题'
			},
			tips: {
				type: String,
				default: ''
			},
			navigateType: {
				type: String,
				default: 'right'
			},
			border: {
				type: String,
				default: 'b-b'
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			iconColor: {
				type: String,
				default: '#333'
			},
			image: {
				type: String,
				default: ''
			},
		},
		methods: {
			eventClick(){
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
	.content{
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		margin: 5rpx 10px;

	}
	.icon .mix-button-cell.b-b:after{
		left: 90upx;
	}
	.btn-service::after{
		border: none;
	}
	.btn-service{
		height: 100%;
		background: none;
		padding: 0;
		
	}
	.mix-button-cell{
		display:flex;
		flex-direction: column;
		align-items: center;
		line-height:60upx;
		position:relative;
		
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		.cell-img{
			align-self:center;
			width:56upx;
			max-height:56upx;
		}
		.cell-icon{
			align-self:center;
			width:56upx;
			max-height:60upx;
			font-size:56upx;
		}
		.cell-more{
			align-self: center;
			font-size:30upx;
			color:$font-color-base;
			margin-left:$uni-spacing-row-sm;
		}
		.cell-tit{
			flex: 1;
			font-size: 22rpx;
			color: $font-color-dark;
		}
		.cell-tip{
			font-size: $font-sm+2upx;
			color: $font-color-light;
		}
	}
</style>

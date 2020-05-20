<template>
  <div class="total-wrap">
    <div class="logistics-title">物流跟踪</div>
    <block v-for="(item, index) in tracesData" :key="index">
      <trackNode :is-first="index===tracesData.length-1" :is-newest="index===0" :is-main-node="item.isMainNode" :node-data="item"></trackNode>
    </block>
  </div>
</template>

<script>
import trackNode from '@/components/wuliuInfo/trackNode.vue'
export default {
	components: {
		trackNode
	},
	data () {
		return {
			orderId:'',
			factoryNo:'',
			orderInfo:{},
			tracesData: []
		}
	},
	onLoad(options){
		console.log("options:",options)
		this.orderId=options.orderId
		this.factoryNo=options.factoryNo
		this.initData()
	},
	methods:{
		initData(){
			this.tracesData=[]
			this.$api.httpPost('orderMainInfo/api/logisticsDescription',{
				orderId:this.orderId,
				factoryNo:this.factoryNo,
			}).then(r=>{
				console.log("请求结果：",r)
				if(r.data && r.data.length>0){
					this.initTraceItem(r.data)
				}
			}).catch(e=>{
				console.log("请求错误：",e)
				this.$api.msg(e.msg||'网络异常请重试')
			})
		},
		initTraceItem(item){
			item.forEach(e=>{
				let data = {
					acceptStation: e.description,
					createTime: e.logisticsdate,
					status: '',
					statusName: '',
					isMainNode: false
				}
				this.tracesData.push(data)
			})
		}
	
	}
}
</script>

<style lang="scss" scoped>
.total-wrap {
  width: 100vw;
  height: auto;
  box-sizing: border-box;
  padding: 0upx 40upx 0upx 20upx;
  .logistics-title {
    height: 72rpx;
    box-sizing: border-box;
    padding: 36rpx 0 8rpx;
    line-height: 28rpx;
    color: #4B4B4B;
    font-size: 26rpx;
    font-family: 'PingFangSC-Medium';
    text-align: left;
  }
}
</style>

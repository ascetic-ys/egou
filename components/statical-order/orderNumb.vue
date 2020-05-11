<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">订单数量（{{year}}年度）</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaColumn=null;
	export default {
			data() {
				return {
					cWidth:'',
					cHeight:'',
					pixelRatio:1,
					serverData:'',
					params:{},
					list:[],
					year:''
				}
			},
			created() {
				_self = this;
				this.cWidth=uni.upx2px(750);
				this.cHeight=uni.upx2px(500);
				this.year=new Date().getFullYear()
				this.initParams()
				this.getServerData();
			},
			computed: {
				...mapState(['hasLogin','userInfo','weChat'])
			},
			methods: {
				initParams(){
					this.params={
						type:"year",
						orderDate:this.year
					}
				},
				getServerData(){
					let nowMonth = new Date().getMonth()
					let mnArr = []
					let flagArr = []
					for(var i=1;i<=nowMonth+1;i++){
						mnArr.push(i)
						flagArr.push(true)
					}
					this.$api.httpPost('orderMainInfo/api/sum',{
						...this.params
					}).then(r=>{
						console.log("请求结果：",r)
						this.list=r.data
						let dataArr=[]
						let monthArr=[]
						mnArr.forEach((a,index)=>{
							if(flagArr[index]){
								flagArr[index]=false
								dataArr.push(0)
								monthArr.push(a+'月')
								this.list.forEach(e=>{
									let month =''
									let ms = e.month.slice(5,-1)
									if(ms==0){
										month=e.month.slice(6,7)
									}else{
										month = e.month.slice(5,7)
									}
									let totalNum = e.totalNum
									let totalPrice = e.totalPrice
									if(a==month){
										dataArr[index]=totalNum
										// dataArr[index]={"value": totalNum,"color": "#f04864"}
									}
								})
							}
						})
						let data = {"Column": {
										"categories":monthArr,
										"series": [{
											"name": "订单数",
											"data": dataArr
											}]
										},
									}
						_self.serverData=data;
						let Column={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Column.categories=data.Column.categories;
						Column.series=data.Column.series;
						_self.showColumn("canvasColumn",Column);
						return r
					}).catch(e=>{
						console.log("请求错误：",e)
						this.$api.msg(e.msg||'网络异常请重试')
					})
				},
				showColumn(canvasId,chartData){
					canvaColumn=new uCharts({
						$this:_self,
						canvasId: canvasId,
						type: 'column',
						legend:{show:true},
						fontSize:11,
						background:'#FFFFFF',
						pixelRatio:_self.pixelRatio,
						animation: true,
						categories: chartData.categories,
						series: chartData.series,
						xAxis: {
							disableGrid:true,
						},
						yAxis: {
							//disabled:true
						},
						dataLabel: true,
						width: _self.cWidth*_self.pixelRatio,
						height: _self.cHeight*_self.pixelRatio,
						padding: [25,15,5,15],
						extra: {
							column: {
								type:'group',
								width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
							}
						  }
					});
					
				},
				touchColumn(e){
					canvaColumn.showToolTip(e, {
						format: function (item, category) {
							if(typeof item.data === 'object'){
								return category + ' ' + item.name + ':' + item.data.value 
							}else{
								return category + ' ' + item.name + ':' + item.data 
							}
						}
					});
				},
			}
		}
	</script>
	
	<style>
	page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
	.qiun-padding{padding:2%; width:96%;}
	.qiun-wrap{display:flex; flex-wrap:wrap;}
	.qiun-rows{display:flex; flex-direction:row !important;}
	.qiun-columns{display:flex; flex-direction:column !important;}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF;}
	.qiun-title-bar{width:100%; padding:10upx 2%; flex-wrap:nowrap;z-index: 9;}
	.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
	.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	</style>
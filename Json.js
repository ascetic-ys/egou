/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: '测试用户',
		portrait: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2471723103,4261647594&fm=26&gp=0.jpg'
	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = [{
		src: "http://img1.imgtn.bdimg.com/it/u=4222416775,91990084&fm=15&gp=0.jpg",
		background: "rgb(239,239,239)",
	},
	{
		src: "http://img5.imgtn.bdimg.com/it/u=1887769118,3142741585&fm=26&gp=0.jpg",
		background: "rgb(227,227,227)",
	},
	{
		src: "http://img0.imgtn.bdimg.com/it/u=1443002370,3400884796&fm=15&gp=0.jpg",
		background: "rgb(186,187,182)",
	}
]
/* 商品列表 */
const goodsList = [{
		image: "http://img1.imgtn.bdimg.com/it/u=1476382546,2999714239&fm=26&gp=0.jpg",
		image2: "https://cbu01.alicdn.com/img/ibank/2020/532/734/14355437235_772797507.220x220.jpg?_=2020",
		image3: "https://cbu01.alicdn.com/img/ibank/2019/366/067/12167760663_1421470042.220x220.jpg?_=2020",
		title: "乘风装饰",
		price: 179,
		sales: 61,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖2",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖3",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖4",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖5",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖6",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖7",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖8",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖9",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖10",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖11",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖12",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖13",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖14",
		price: 78,
		sales: 16,
	},
	{
		image: "http://img5.imgtn.bdimg.com/it/u=1957887963,2553893514&fm=26&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "卫浴地砖15",
		price: 78,
		sales: 16,
	}
	
]

/* 购物车 */
const cartList = [{
		id: 1,
		image: 'https://cbu01.alicdn.com/img/ibank/2019/174/339/11162933471_431565728.220x220.jpg?_=2020',
		attr_val: '80*80 褐色',
		stock: 15,
		title: 'OVBE 木地板',
		price: 278.00,
		number: 1
	},
	{
		id: 2,
		image: 'https://cbu01.alicdn.com/img/ibank/2020/770/611/14014116077_773349266.220x220.jpg?_=2020',
		attr_val: '80*30 咖啡色',
		stock: 10,
		title: '复合地板',
		price: 148.00,
		number: 5
	},
	{
		id: 3,
		image: 'https://cbu01.alicdn.com/img/ibank/2020/303/877/13972778303_387505191.220x220.jpg?_=2020',
		attr_val: '40*40',
		stock: 55,
		title: '方形地板',
		price: 175.88,
		number: 1
	},
	{
		id: 4,
		image: 'https://cbu01.alicdn.com/img/ibank/2020/303/877/13972778303_387505191.220x220.jpg?_=2020',
		attr_val: '40*40',
		stock: 55,
		title: '方形地板',
		price: 175.88,
		number: 1
	},
	{
		id: 5,
		image: 'https://cbu01.alicdn.com/img/ibank/2020/770/611/14014116077_773349266.220x220.jpg?_=2020',
		attr_val: '80*30 咖啡色',
		stock: 10,
		title: '复合地板',
		price: 148.00,
		number: 5
	},
	{
		id: 6,
		image: 'https://cbu01.alicdn.com/img/ibank/2020/303/877/13972778303_387505191.220x220.jpg?_=2020',
		attr_val: '40*40',
		stock: 55,
		title: '方形地板',
		price: 175.88,
		number: 1
	},
	
	
];
//详情展示页面
const detailData = {
	title: '纯种金毛幼犬活体有血统证书',
	title2: '拆家小能手 你值得拥有',
	favorite: true,
	imgList: [{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
		},
		{
			src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
		},
	],
	episodeList: [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	],
	guessList: [{
			src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
			title: '猫眼指甲油',
			title2: '独树一帜的免照灯猫眼指甲'
		},
		{
			src: 'http://m.china-7.net/uploads/14778449362891.jpg',
			title: '创意屋',
			title2: '创意屋形上下双层高低床'
		},
		{
			src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
			title: 'MissCandy 指甲油',
			title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
			title: 'RMK 2017星空海蓝唇釉',
			title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。'
		}
	],
	evaList: [{
			src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '楼上说的好有道理。'
		}
	]
}
const shareList = [{
		type: 1,
		icon: '/static/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]
const orderListTj=[
		{
			time: '2019-04-06 11:37',
			state: 1,
			khName:'张三',
			orderNum:'0001',
			phone:13035121118,
			address:'湖北武汉红三区12号'
		},
		{
			time: '2019-08-06 11:37',
			state: 2,
			khName:'李四',
			orderNum:'0001',
			phone:13035181118,
			address:'湖北武汉红三区12号'
		},
		{
			time: '2019-07-06 11:37',
			state: 1,
			khName:'李四',
			orderNum:'0001',
			phone:13035121108,
			address:'北京红三区12号'
		},
		{
			time: '2019-04-08 11:37',
			state: 9,
			khName:'李四',
			orderNum:'0001',
			phone:13035121118,
			address:'上海红三区12号'
		},
		{
			time: '2019-07-06 11:37',
			state: 2,
			khName:'李四',
			phone:13035121118,
			orderNum:'0001',
			address:'北京红三区12号'
		},
	]
const orderList = [{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://cbu01.alicdn.com/img/ibank/2019/174/339/11162933471_431565728.220x220.jpg?_=2020',
			},
			{
				image: 'https://cbu01.alicdn.com/img/ibank/2019/491/859/10428958194_431565728.220x220.jpg?_=2020',
			},
			{
				image: 'https://cbu01.alicdn.com/img/ibank/2019/174/339/11162933471_431565728.220x220.jpg?_=2020',
			},
			{
				image: 'https://cbu01.alicdn.com/img/ibank/2019/491/859/10428958194_431565728.220x220.jpg?_=2020',
			},
			{
				image: 'https://cbu01.alicdn.com/img/ibank/2019/174/339/11162933471_431565728.220x220.jpg?_=2020',
			},
			{
				image: 'https://cbu01.alicdn.com/img/ibank/2019/491/859/10428958194_431565728.220x220.jpg?_=2020',
			},
			
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		goodsList: [{
			title: '木地板 2019新款',
			price: 179.5,
			image: 'https://cbu01.alicdn.com/img/ibank/2019/491/859/10428958194_431565728.220x220.jpg?_=2020',
			number: 1,
			attr: '褐色 M'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 2,
		goodsList: [{
				image: 'https://cbu01.alicdn.com/img/ibank/2020/303/877/13972778303_387505191.220x220.jpg?_=2020',
			},
			{
				image: 'https://cbu01.alicdn.com/img/ibank/2020/303/877/13972778303_387505191.220x220.jpg?_=2020',
			},
			{
				image: 'https://cbu01.alicdn.com/img/ibank/2020/303/877/13972778303_387505191.220x220.jpg?_=2020',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 3,
		goodsList: [{
			title: '塑木木塑户外长条地板室外庭院公园花园园林防腐木木塑板材栏杆',
			price: 69,
			image: 'https://cbu01.alicdn.com/img/ibank/2018/846/325/8891523648_387505191.220x220.jpg?_=2020',
			number: 1,
			attr: '白色 39'
		}]
	},
]
const cateList = [{
	// 一级分类
		id: 101,
		name: '墙地面材料'
	},{
		id: 102,
		name: '灯饰照明'
	},{
		id: 103,
		name: '厨房卫浴'
	},{
		id: 104,
		name: '卧室家具'
	},{
		id: 105,
		name: '客厅家具'
	},{
		id: 106,
		name: '书房家具'
	},{
		id: 107,
		name: '办公家具'
	},
	// 二级分类
	{
		id: 201,
		pid: 101,
		name: '墙砖地板木材板材',
	},{
		id: 202,
		pid: 102,
		name: '灯饰照明开关',
	},{
		id: 203,
		pid: 103,
		name: '厨房卫浴饰品',
	},{
		id: 204,
		pid: 104,
		name: '卧室家具',
	},{
		id: 205,
		pid: 105,
		name: '客厅家具',
	},{
		id: 206,
		pid: 106,
		name: '书房家具用品',
	},{
		id: 207,
		pid: 107,
		name: '办公室家具',
	},
	// 三级分类
	{
		id: 301,
		pid: 201,
		name: '地板',
		picture: '/static/temp/Cate4.jpg'
	},{
		id: 302,
		pid: 201,
		name: '瓷砖',
		picture: '/static/temp/Cate5.jpg'
	},{
		id: 303,
		pid: 201,
		name: '油漆',
		picture: '/static/temp/Cate1.jpg'
	},{
		id: 304,
		pid: 201,
		name: '木材/板材',
		picture: '/static/temp/Cate2.jpg'
	},{
		id: 305,
		pid: 201,
		name: '墙纸',
		picture: '/static/temp/Cate3.jpg'
	},{
		id: 306,
		pid: 202,
		name: '吊灯',
		picture: '/static/temp/Cate4.jpg'
	},{
		id: 307,
		pid: 202,
		name: '台灯',
		picture: '/static/temp/Cate5.jpg'
	},{
		id: 308,
		pid: 202,
		name: '落地灯',
		picture: '/static/temp/Cate4.jpg'
	},{
		id: 309,
		pid: 202,
		name: '镜前灯',
		picture: '/static/temp/Cate3.jpg'
	},{
		id: 310,
		pid: 202,
		name: '壁灯',
		picture: '/static/temp/Cate2.jpg'
	},{
		id: 311,
		pid: 203,
		name: '马桶',
		picture: '/static/temp/Cate1.jpg'
	},{
		id: 312,
		pid: 203,
		name: '淋浴房',
		picture: '/static/temp/Cate5.jpg'
	},{
		id: 313,
		pid: 203,
		name: '水龙头',
		picture: '/static/temp/Cate4.jpg'
	},{
		id: 314,
		pid: 203,
		name: '花洒',
		picture: '/static/temp/Cate3.jpg'
	},{
		id: 315,
		pid: 203,
		name: '水槽',
		picture: '/static/temp/Cate2.jpg'
	},{
		id: 316,
		pid: 203,
		name: '智能马桶盖',
		picture: '/static/temp/Cate1.jpg'
	},{
		id: 317,
		pid: 203,
		name: '挂件',
		picture: '/static/temp/Cate5.jpg'
	},{
		id: 318,
		pid: 204,
		name: '床',
		picture: '/static/temp/Cate4.jpg'
	},{
		id: 319,
		pid: 204,
		name: '双人床',
		picture: '/static/temp/Cate3.jpg'
	},{
		id: 320,
		pid: 204,
		name: '实木床',
		picture: '/static/temp/Cate2.jpg'
	},{
		id: 321,
		pid: 204,
		name: '床垫',
		picture: '/static/temp/Cate1.jpg'
	},{
		id: 322,
		pid: 204,
		name: '衣柜',
		picture: '/static/temp/Cate5.jpg'
	},{
		id: 323,
		pid: 204,
		name: '床头柜',
		picture: '/static/temp/Cate4.jpg'
	},{
		id: 324,
		pid: 205,
		name: '真皮沙发',
		picture: '/static/temp/Cate3.jpg'
	},{
		id: 325,
		pid: 205,
		name: '布艺沙发',
		picture: '/static/temp/Cate2.jpg'
	},{
		id: 326,
		pid: 205,
		name: '电视柜',
		picture: '/static/temp/Cate1.jpg'
	},{
		id: 327,
		pid: 205,
		name: '茶几',
		picture: '/static/temp/Cate5.jpg'
	},{
		id: 328,
		pid: 205,
		name: '屏风',
		picture: '/static/temp/Cate4.jpg'
	},{
		id: 329,
		pid: 205,
		name: '鞋柜',
		picture: '/static/temp/Cate3.jpg'
	},{
		id: 330,
		pid: 206,
		name: '书桌',
		picture: '/static/temp/Cate2.jpg'
	},{
		id: 331,
		pid: 206,
		name: '书架',
		picture: '/static/temp/Cate1.jpg'
	},{
		id: 332,
		pid: 206,
		name: '椅子',
		picture: '/static/temp/Cate5.jpg'
	},{
		id: 333,
		pid: 207,
		name: '电脑桌',
		picture: '/static/temp/Cate4.jpg'
	},{
		id: 334,
		pid: 207,
		name: '电脑椅',
		picture: '/static/temp/Cate3.jpg'
	}
]

const sizeList= [
	{
		id: 1,
		type:'size',
		name: '20*40',
	},
	{
		id: 2,
		type:'size',
		name: '40*40',
	},
	{
		id: 3,
		type:'size',
		name: '80*80',
	},
	{
		id: 4,
		type:'size',
		name: '20*30',
	},
	{
		id: 5,
		type:'size',
		name: '30*30',
	},
	{
		id: 6,
		type:'size',
		name: '30*40',
	}
]

const colorList=[
	{
		id: 7,
		type:'color',
		name: '白色',
	},
	{
		id: 8,
		type:'color',
		name: '褐色',
	},
	{
		id: 9,
		type:'color',
		name: '暗红',
	},
]

export default {
	carouselList,
	cartList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	orderList,
	orderListTj,
	cateList,
	sizeList,
	colorList
}

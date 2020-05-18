var aVariable = {
	webview: {
		current: null,
		listComponent: null
	},
	box: {
		scroll: document.getElementById("pullrefresh"),
		tradingList: document.getElementById("trading-list"),
		sliderImg: document.getElementById("sliderImg"), //应用页面滚动图片
		sliderIndicator: document.getElementById("sliderIndicator") //滚动点
	},
	btn: {
		btnAllOrder: document.getElementById("all_order"),
		btnBack: document.getElementById("btn_back")
	},
	ipt: {
         iptSearch:document.getElementById("ipt-search")
	},
	list: {
		page: {
			item_num: 10, // 一次获取多少个，-1代表全部获取
			item_all: 0, // 总共有多少个
			item_sum: 0, // 已经获取了多少个
			item_page: 1 //页数
		}
	},
};

var aVariable = {
	webview: {
		current: null,
		listComponent: null
	},
	box: {
		scroll: document.getElementById("box-scroll"),
		jyList: document.getElementById("jy-list")
	},
	btn: {
		btnRecord: document.getElementById("btn_record")
	},
	ipt: {

	},
	list: {
		page: {
			item_num: 8, // 一次获取多少个，-1代表全部获取
			item_all: 0, // 总共有多少个
			item_sum: 0, // 已经获取了多少个
			item_page: 1 //页数
		}
	},
};

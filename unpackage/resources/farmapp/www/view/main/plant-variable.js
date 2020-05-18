var aVariable = {
	webview: {
		current: null,
		listComponent: null
	},
	box: {
		scroll: document.getElementById("box-scroll"),
		tdList: document.getElementById("td_list"),
		jc: document.getElementById("box_jc")
	},
	btn: {
		btnZhongzi: document.getElementById("btn_zhongzi"),
		btnZhongzhi: document.getElementById("btn_zhongzhi"),
		btnExit: document.getElementById("btn_exit"),
		btnExitTd: document.getElementById("btn_exit_td"),
		btnJia: document.getElementById("btn_jia"),
		btnHar: document.getElementById("btn_har"),
		btnEradicate: document.getElementById("btn_eradicate"),
		btnShouye: document.getElementById("btn_shouye"),
		btnWatering: document.getElementById("btn_watering"),
		btnTask: document.getElementById("btn_task"),
		btnFert: document.getElementById("btn_fert"),
		btnBroad: document.getElementById("btn_broad"),
		btnToucai: document.getElementById("btn_toucai"),
		btnHuishou: document.getElementById("btn_huishou"),
		btnOneWater: document.getElementById("btn_one_water"),
		btnOneTask: document.getElementById("btn_one_task")
	},
	div: {
		divZhongzi: document.getElementById("div_zhongzi"),
		divTudi: document.getElementById("div_tudi"),
		divCangku: document.getElementById("zhongzi_list"),
		divPland: document.getElementById("div_pland"),
		divPlant: document.getElementById("div_plant"),
		divLanz: document.getElementById("div_lanz"),
		divLanz2: document.getElementById("div_lanz2"),
		divLand: document.getElementById("div_land")
	},
	ipt: {
		iptZhongzi: document.getElementById("ipt_zhongzi"),
		iptShuliang: document.getElementById("ipt_shuliang"),
		iptNum: document.getElementById("ipt_num"),
		iptTx: document.getElementById("ipt_tx"),
		iptJf: document.getElementById("ipt_ji"),
		iptLevel: document.getElementById("ipt_level"),
		iptPlantName: document.getElementById("ipt-plant-name"),
		iptPlantDay: document.getElementById("ipt-plant-day"),
		iptFarmCount: document.getElementById("ipt-farm-count")
	},
	params: {
		unique: '',
		size: '',
		num:0,
		landId:'',
		seedId:''
	},
	list: {
		page: {
			item_num: 9, // 一次获取多少个，-1代表全部获取
			item_all: 0, // 总共有多少个
			item_sum: 0, // 已经获取了多少个
			item_page: 1 //页数
		}
	},
};

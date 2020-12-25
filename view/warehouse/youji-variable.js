var aVariable = {
	webview: {
		current: null,
		listComponent: null
	},
	box: {
         recordList: document.getElementById("record_list")
	},
	btn: {
		btnChoose: document.getElementById("btn_choose"),
		btnChooseNew: document.getElementById("btn_choose_new"),
		btnYouji: document.getElementById("btn_youji"),
		btnShandong: document.getElementById("btn_shandong"),
		btnYunnan: document.getElementById("btn_yunnan"),
		btnHainan: document.getElementById("btn_hainan")
	},
	ipt: {
		iptPlantName: document.getElementById("ipt_plant_name"),
		iptPlant: document.getElementById("ipt_plant"),
		iptGet: document.getElementById("ipt_get"),
		iptSum: document.getElementById("ipt_sum"),
		iptNum: document.getElementById("ipt_num"),
		iptName: document.getElementById("ipt_name"),
		iptPhone: document.getElementById("ipt_phone"),
		iptAddress: document.getElementById("ipt_address"),
		iptImage: document.getElementById("ipt_image"),
		iptYunfei: document.getElementById("ipt_yunfei"),
		iptTishi: document.getElementById("ipt_tishi"),
		iptChandi: document.getElementById("warehouse_record")
	},
	params: {
		vegetablesId:'',
		addressId:'',
		name:'',
		sum:'',
		plant:'',
		get:'',
		image:'',
		sendList:[],
		chandi:0
	},
};

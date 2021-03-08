var aVariable = {
	webview: {
		current: null,
		listComponent : null
	},
	box: {
		moneyList: document.getElementById("chongzhi-list"),
		bankList: document.getElementById("bank-list")
	},
	btn: {
        btnPay:document.getElementById("btn_pay"),
		btnNew:document.getElementById("btn_new")
	},
	ipt: {
        iptMoney:document.getElementById("ipt_money"),
		iptJiFen:document.getElementById("ipt_jifen"),
		realMoney:document.getElementById("user_yue")
	},
	params:{
		apple_id:'',
		phone:'',
		cardId:'',
		type:0,
		real_money:0
	}
};
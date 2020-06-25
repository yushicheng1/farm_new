var aVariable = {
	webview: {
		current: null,
		listComponent : null
	},
	box: {
		scroll: document.getElementById("box-scroll"),
		bankList: document.getElementById("bank-list")
	},
	btn: {
        btnRecord:document.getElementById("btn_record"),
		btnSubmit:document.getElementById("btn_submit"),
		btnChoose:document.getElementById("btn_choose"),
		btnPay:document.getElementById("btn_pay"),
		btnQuanbu:document.getElementById("btn_quanbu")
	},
	ipt: {
        iptMoney:document.getElementById("ipt_money"),
		iptExtract:document.getElementById("ipt_extract"),
		iptNumber:document.getElementById("ipt_number"),
		iptName:document.getElementById("ipt_name"),
		iptNo:document.getElementById("ipt_no"),
		iptTixian:document.getElementById("ipt_tixian"),
		iptTxje:document.getElementById("ipt_txje")
	},
	params:{
		cardId:'',
		no:'',
		name:'',
		money:'',
		phone:''
	}
};
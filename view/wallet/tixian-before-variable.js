var aVariable = {
	webview: {
		current: null,
		listComponent : null
	},
	box: {
		scroll: document.getElementById("box-scroll"),
		bankList: document.getElementById("bank-list"),
		ruleOne: document.getElementById("box_rule_one"),
		ruleTwo: document.getElementById("box_rule_two")
	},
	btn: {
        btnRecord:document.getElementById("btn_record"),
		btnExtract:document.getElementById("btn_extract"),
		btnChoose:document.getElementById("btn_choose"),
		btnSubmit:document.getElementById("btn_submit"),
		btnQuanbu:document.getElementById("btn_quanbu")
	},
	ipt: {
        iptMoney:document.getElementById("ipt_money"),
		iptExtract:document.getElementById("ipt_extract"),
		iptNumber:document.getElementById("ipt_number"),
		iptName:document.getElementById("ipt_name"),
		iptNo:document.getElementById("ipt_no"),
		iptTixian:document.getElementById("ipt_tixian"),
		iptTxje:document.getElementById("ipt_txje"),
		iptRuleOne:document.getElementById("ipt_rule_one")
	},
	params:{
		cardId:'',
		no:'',
		name:'',
		money:0
	}
};
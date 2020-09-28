var aVariable = {
	webview: {
		current: null,
		listComponent: null
	},
	box: {
		scroll: document.getElementById("box-scroll"),
		logotop: document.getElementById("logotop")
	},
	ipt: {
		iptAccount: document.getElementById("ipt-account"),
		iptAccountNew: document.getElementById("ipt-account-new"),
		iptPassword: document.getElementById("ipt-password"),
		iptRegisterAccount:document.getElementById("ipt-register-account"),
		iptLoginCode:document.getElementById("ipt-login-code"),
		iptRegisterName:document.getElementById("ipt-register-name"),
		  iptRegisterCode:document.getElementById("ipt-register-code"),
		  iptInvite:document.getElementById("ipt-invite"),
		iptRegisterPasswordOne:document.getElementById("ipt-register-passwordOne"),
		iptRegisterPasswordTwo:document.getElementById("ipt-register-passwordTwo"),
		iptChkRem:document.getElementById("ipt-chkRem"),
		iptAgree:document.getElementById("ipt_agree"),
		iptImgCode: document.getElementById("ipt-img-code")
	},
	btn: {
		btnOne:document.getElementById("btn-one"),
		btnTwo:document.getElementById("btn-two"),
		btnLogin: document.getElementById("btn_login"),
		btnRegister: document.getElementById("btn_register"),
		btnForgetPsw:document.getElementById("forget_psw"),
		btnCode:document.getElementById("btn-code"),
		btnCodeNew:document.getElementById("btn-code-new"),
		btnUseCode:document.getElementById("btn_user_code"),
		btnUsePwd:document.getElementById("btn_use_psw"),
		btnAgreement:document.getElementById("btn_agreement"),
		btnYzm:document.getElementById("btn_yzm")
	},
	div:{
		itemOne:document.getElementById("itemOne"),
		itemTwo:document.getElementById("itemTwo"),
		itemThree:document.getElementById("itemThree"),
		divLogin:document.getElementById("div_login"),
		divRegister:document.getElementById("div_register")
	},
	value:{
		code:true,
		codeNew:true,
		loginWay:'psw',
		version:0,
		version_new:0,
		url:'',
		desc:''
	}
};
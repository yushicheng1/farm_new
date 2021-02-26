/**
 * 依赖aServer.js, log.js
 */
var bankServer = mui.extend(aServer || {}, {
	isDebug: true,
	//发起绑定
	createMember: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/createMember", "绑定失败", data, success, error);
	},
	
	//解除绑定
	unbind: function(id,success, error) {
		var data = {
			id:id
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/unbindBanKCard", "解除失败", data, success, error);
	},

	//获取银行卡
	getBankList: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/bankList", "获取失败", data, success, error);
	},
	
	//设置默认银行卡
	setDefaultBank: function(id,success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/setDefaultBank/"+id, "设置失败", data, success, error);
	},

	//获取验证码
	getVerifyCode: function(phone, success, error) {
		var data = {
			phone: phone
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/sendVerifyCode", "获取失败", data, success, error);
	},

	//实名认证
	checkRealName: function(name, idcard, success, error) {
		var data = {
			username: name,
			idnumber: idcard
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/checkRealName", "验证失败", data, success, error);
	},
	
	//绑定手机
	bindPhone: function(phone, code, success, error) {
		var data = {
			phone: phone,
			code: code
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/bindPhone", "绑定失败", data, success, error);
	},
	
	//修改第三方手机
	updatePhone: function(real_name,idNo,phone,cardId, success, error) {
		var data = {
			phone: phone,
			cardId: cardId,
			real_name:real_name,
			idNo:idNo
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/changeBindPhone", "修改失败", data, success, error);
	},
	
	//确认修改第三方手机
	agreeUpdate: function(phone,tranceNum,code, success, error) {
		var data = {
			phone: phone,
			tranceNum: tranceNum,
			code:code
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/verifyChangePhone", "修改失败", data, success, error);
	},

	//绑定银行卡
	bindBankCard: function(name,phone,cardNo,idNo, success, error) {
		var data = {
			real_name: name,
			phone: phone,
			cardNo:cardNo,
			idNo:idNo
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/applyBindBankCard", "绑定失败", data, success, error);
	},
	
	//绑定银行卡(新)
	bindBankCardNew: function(name,phone,cardNo,idno, success, error) {
		var data = {
			acctname: name,
			mobile: phone,
			acctno:cardNo,
			idno:idno
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/agreeapply", "绑定失败", data, success, error);
	},
	
	//确认绑定银行卡
	agreeBind: function(phone,tranceNum,code, success, error) {
		var data = {
			phone: phone,
			tranceNum: tranceNum,
			code:code
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/bindBankCard", "绑定失败", data, success, error);
	},
	
	//确认绑定银行卡(新)
	agreeBindNew: function(name,phone,cardNo,idno,code,thpinfo, success, error) {
		var data = {
			acctname: name,
			mobile: phone,
			acctno:cardNo,
			idno:idno,
			smscode:code,
			thpinfo:thpinfo
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/agreeconfirm", "绑定失败", data, success, error);
	},
	
	//电子协议
	signContract: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/signContract", "获取失败", data, success, error);
	},
	
	//会员解锁
	unlock: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/unlock", "解锁失败", data, success, error);
	},
	
	//获取可到账金额
	getMoney: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/thirdBalance", "获取失败", data, success, error);
	},
	
	//获取默认银行
	defaultBank: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/defaultBank", "获取失败", data, success, error);
	},
	
	//提现
	// extract: function(money,type,token,success, error) {
	// 	var data = {
	// 		extract_money:money,
	// 		type:type,			
	// 		token:token
	// 	};
	// 	aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/extract", "提现失败", data, success, error);
	// },
	
	//提现
	extractNew: function(money,type,bank_id,token,success, error) {
		var data = {
			extract_money:money,
			type:type,			
			bank_id:bank_id,
			token:token
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/extract", "提现失败", data, success, error);
	},
	
	//第三方支付提现
	withDraw: function(money,bankId,success, error) {
		var data = {
			amount:money,
			bank_id:bankId
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/withDraw", "提现失败", data, success, error);
	},
	
	//第三方支付提现
	confirmDraw: function(bizOrderNo,verificationCode,success, error) {
		var data = {
			bizOrderNo:bizOrderNo,
			verificationCode:verificationCode
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/confirmDraw", "提现失败", data, success, error);
	},
	
	//查询第三方支付信息
	getThirdInfo: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/getThirdInfo", "获取失败", data, success, error);
	},
	
	//查询第三方电子协议签订结果
	 signContractQuery: function(success, error) {
	  var data = {};
	  aServer.executeActionOfServerGET(this.isDebug, "api/user/signContractQuery", "获取失败", data, success, error);
	 }
})

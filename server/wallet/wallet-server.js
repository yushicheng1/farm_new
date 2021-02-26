/**
 * 依赖aServer.js, log.js
 */
var walletServer = mui.extend(aServer || {}, {
	isDebug: true,

	//获取账单记录
	getRecordList: function(type,pages, size, success, error) {
		var data = {
			"type":type,
			"page": pages,
			"limit": size
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/wallet/moneylog", "获取记录失败", data, success, error);
	},

	//提现
	extract: function(money, type, number, bankAddress, name, success, error) {
		var data = {
			extract_money: money,
			type: type,
			number: number,
			bank_address: bankAddress,
			realname: name
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/extract", "提现失败", data, success, error);
	},

	//充值
	charge: function(money, type,cardId,success, error) {
		var data = {
			'level': money,
			'pay_type': type,
			'card_id':cardId
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/charge", "充值失败", data, success, error);
	},
	
	//充值(新)
	confirmChargeNew: function(orderid,bankid, smscode,thpinfo,success, error) {
		var data = {
			'orderid': orderid,
			'bankid': bankid,
			'smscode':smscode,
			'thpinfo':thpinfo
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/payagreeconfirm", "充值失败", data, success, error);
	},
	
	//确认充值
	ConfirmCharge: function(bizOrderNo, code,success, error) {
		var data = {
			'bizOrderNo': bizOrderNo,
			'verificationCode': code
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/confirmPay", "充值失败", data, success, error);
	},
	
	//代充值
	chargeOther: function(money, type,cardId,phone,success, error) {
		var data = {
			'level': money,
			'pay_type': type,
			'card_id':cardId,
			'oth_phone':phone
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/charge", "充值失败", data, success, error);
	},
	
	//转账
	largecharge: function(realname, cardNo,number,success, error) {
		var data = {
			'realname': realname,
			'cardNo': cardNo,
			'number':number
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/largecharge", "充值失败", data, success, error);
	},
	
	//获取转账记录
	getTransferList: function(pages, size, success, error) {
		var data = {
			"page": pages,
			"limit": size
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/wallet/largechargelog", "获取记录失败", data, success, error);
	},
	
	//解除绑定(新)
	unbindNew: function(id,success, error) {
		var data = {
			id:id
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/wallet/unbind", "解除失败", data, success, error);
	},
	
	//农行确认支付
	confirmABC: function(order_id,success, error) {
		var data = {
			order_id:order_id
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/wallet/confirmABC", "支付失败", data, success, error);
	}
});

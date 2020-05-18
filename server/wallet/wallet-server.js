/**
 * 依赖aServer.js, log.js
 */
var walletServer = mui.extend(aServer || {}, {
	isDebug: true,

	//获取账单记录
	getRecordList: function(pages, size, success, error) {
		var data = {
			"page": pages,
			"rows": size
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/wallet/moneylog", "获取账单记录失败", data, success, error);
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
	charge: function(money, success, error) {
		var data = {
			'pay_number': money,
			'pay_type': 'alipay'
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/charge", "充值失败", data, success, error);
	},
	//充值(apple)
	chargeApple: function(data, success, error) {
		var data = {
			'data': data
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/wallet/appleCharge", "充值失败", data, success, error);
	}
});

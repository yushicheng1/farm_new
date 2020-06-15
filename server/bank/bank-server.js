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

	//获取银行卡
	getBankList: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/bankList", "获取失败", data, success, error);
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
	
	//电子协议
	signContract: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/signContract", "获取失败", data, success, error);
	},
	
	//会员解锁
	unlock: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "api/user/unlock", "解锁失败", data, success, error);
	}
})

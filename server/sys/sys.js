/**
 *  依赖aServer.js
 */
var sysServer = mui.extend(aServer || {}, {
	isDebug: true,
	/**
	 * 登录功能
	 * @param {Object} uid
	 * @param {Object} pwd  
	 * @param {Object} success
	 * @param {Object} error
	 */
	login: function(phone, pwd, type, success, error) {
		var data = {
			"phone": phone,
			"password": pwd,
			"type": type

		};
		aServer.executeActionOfServer(this.isDebug, "api/login", "登陆失败", data, success, error);
	},
	/**
	 * 注册功能
	 * @param {Object} account
	 * @param {Object} pwd  
	 * @param {Object} success
	 * @param {Object} error
	 */
	register: function(phone, nick, verify, password, invite, success, error) {
		var data = {
			"phone": phone,
			"password": password,
			"verify": verify,
			"nick_name": nick,
			"spread_code": invite
		};
		aServer.executeActionOfServer(this.isDebug, "api/register", "注册失败", data, success, error);
	},

	getVerify: function(phone, capcha,code, type, success, error) {
		var data = {
			'phone': phone,
			'type': type,
			'capcha': capcha,
			'code':code
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/verify", "获取失败", data, success, error);
	},

	//获取邀请码
	getSpreadCode: function(success, error) {
		var data = {

		};
		aServer.executeActionOfServerGET(this.isDebug, "api/my/spread_code", "获取失败", data, success, error);
	},

	//找回密码
	findPsw: function(phone, code, pwd, success, error) {
		var data = {
			phone: phone,
			code: code,
			passwd: pwd
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/user/resetpwd", "获取失败", data, success, error);
	},

	//获取今日热推
	getSeedHot: function(isHot, success, error) {
		var data = {
			is_hot: isHot
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/seed/list", "获取失败", data, success, error);
	},
	//检查更新
	checkVersion: function(system, success, error) {
		var data = {
			system: system
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/checkversion", "获取失败", data, success, error);
	},
	//获取banner
	getBanner: function(success, error) {
		var data = {

		};
		aServer.executeActionOfServerGET(this.isDebug, "api/banner", "获取失败", data, success, error);
	},
	//获取监控
	getJiankong: function(success, error) {
		var data = {

		};
		aServer.executeActionOfServerGET(this.isDebug, "api/message/getYSToken", "获取失败", data, success, error);
	},

	//获取公告
	getNotice: function(success, error) {
		var data = {

		};
		aServer.executeActionOfServerGET(this.isDebug, "api/message/getNotice", "获取失败", data, success, error);
	},
	
	//获取农场数据
	getData: function(success, error) {
		var data = {
	
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/getdata", "获取失败", data, success, error);
	},

	//获取图片验证码
	getYzmImg: function(success, error) {
		var data = {

		};
		aServer.executeActionOfServerNew(this.isDebug, "api/verify_code", "获取失败", data, success, error);
	}
})

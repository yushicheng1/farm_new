/**
 * 依赖aServer.js, log.js
 */
var indexServer = mui.extend(aServer || {}, {
	isDebug: true,

	//检测版本
	updateVersion: function(type,success, error) {
		var data = {  
			type:type
			  };
		aServer.executeActionOfServerGET(this.isDebug, "app/updateVersion", "检测更新", data, success, error);
	},
	//获取用户信息
	getUserInfo: function(success, error) {
		var data = {  };
		aServer.executeActionOfServerGET(this.isDebug, "app/getUserInfo", "获取用户信息失败", data, success, error);
	},
	//绑定授权信息
	saveAuthinfo: function(uuidCode, clientid, success, error) {
		var data = {
			"uniqueCode": uuidCode,
			"clientid": clientid
		};
		aServer.executeActionOfServerPOST(this.isDebug, "user/saveAuthinfo", "绑定信息失败", data, success, error);
	},
	//更新设备信息
	updateMessage: function(uuidCode, clientid, success, error) {
		var data = {
			"uuidCode": uuidCode,
			"clientId": clientid
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/updateMessage", "更新信息失败", data, success, error);
	},
	//安装应用
	saveUserApp: function(appId, success, error) {
		var data = {};
		aServer.executeActionOfServerPOST(this.isDebug, "user/saveUserApp?appId=" + appId, "安装应用失败", data, success, error);
	},
	//获取top8应用列表
	getTopAppList: function(success, error) {
		var data = {   
			"page": 1,
			"rows": 8 
		};
		aServer.executeActionOfServerGET(this.isDebug, "app/getTopAppList", "获取应用列表失败", data, success, error);

	},
	//获取top7个人已安装应用列表
	getSevenAppList: function(success, error) {
		var data = {   
			"page": 1,
			"rows": 7
		};
		aServer.executeActionOfServerGET(this.isDebug, "user/getSevenAppList", "获取应用列表失败", data, success, error);

	},
	//获取所有分组
	getGroupList: function(success, error) {
		var data = {};
		aServer.executeActionOfServerGET(this.isDebug, "user/findGroupsTop", "获取失败", data, success, error);
	},
	//获取分组下的app
	getGroupAppList: function(id, success, error) {
		var data = {
			"id": id
		};
		aServer.executeActionOfServerGET(this.isDebug, "user/findGroups", "获取失败", data, success, error);
	}

});
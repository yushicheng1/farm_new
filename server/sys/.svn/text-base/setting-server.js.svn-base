/**
 * 依赖aServer.js, log.js
 */
var settingServer = mui.extend(aServer || {}, {
	isDebug: true,

	//检测版本
	updateVersion: function(success, error) {
		var data = {   
			 };
		aServer.executeActionOfServerGET(this.isDebug, "api/updateVersion", "检测更新", data, success, error);
	}
	
});
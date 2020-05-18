/**
 * 依赖aServer.js, log.js
 */
var userappServer = mui.extend(aServer || {}, {
	isDebug: true,

	//分页获取已安装应用
	getUserAppList: function(pages, size, success, error) {
		var data = { 
			"page": pages,
			"rows": size, 
		};
		aServer.executeActionOfServerGET(this.isDebug, "user/getUserAppList", "获取已安装应用失败", data, success, error);
	},
	
	//获取全部已安装应用
	getAllUserAppList: function( success, error) {
		var data = {   
		};
		aServer.executeActionOfServerGET(this.isDebug, "user/getAllUserAppList", "获取已安装应用失败", data, success, error);
	},
	//删除已安装应用
	deleteUserApp: function(list, success, error) {

		var data = { 
			"json": list
		};
		aServer.executeActionOfServerGET(this.isDebug, "user/deleteUserApp", "删除已安装应用失败", data, success, error);
	},
	//排序已安装应用
	sequenceUserApp: function(list, success, error) {
		var data = { 
			"json": list
		};
		aServer.executeActionOfServerGET(this.isDebug, "user/sequenceUserApp", "排序已安装应用失败", data, success, error);
	}

	
});
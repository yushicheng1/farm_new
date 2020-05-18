/**
 * 依赖aServer.js, log.js
 */
var aboutusServer = mui.extend(aServer || {}, {
	isDebug: true,

	//获取内容
	getMessage:function(success,error){
	
		var data = { 
			"category" : 1
			   };
		aServer.executeActionOfServerGET(this.isDebug, "baseinfo/getMessage", "获取失败", data, success, error);
	}
	
	
})
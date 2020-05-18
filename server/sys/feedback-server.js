/**
 * 依赖aServer.js, log.js
 */
var feedbackServer = mui.extend(aServer || {}, {
	isDebug: true,

	//提交反馈内容
	saveFeedback:function(type,message,success,error){	
		var data = { 
			"type" : type,
			"message" :message
			   };
		aServer.executeActionOfServerGET(this.isDebug, "user/saveFeedback", "反馈失败", data, success, error);
	}
	
	
})
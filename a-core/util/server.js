var aServer = {
	// ApiUrl: "http://farmapi.yiqianyun.com/",   
	// ApiUrl: "http://newapi.sdnongzhu.com/",
	ApiUrl: "http://testapi.sdnongzhu.com:8880/",
	// ServiceUrl: "http://140.143.244.242:8080",,,,,,,,,,,,,,./.
	Wating: null,
	WatingTimeInterval: null,
	WatingSeconds: 60,
	showWating: function() {
		this.Wating = plus.nativeUI.showWaiting("请等待...");
		this.WatingTimeInterval = setInterval(function() {
			aServer.WatingSeconds--;
			aServer.Wating.setTitle("请等待...");

			if (aServer.WatingSeconds <= 0) {
				clearInterval(aServer.WatingTimeInterval);
				

				if (!aServer.Wating) {
					aServer.closeWating();
					mui.toast("网络状况不好，请稍后尝试");
				} else {
					aServer.closeWating();
				}
			}
		}, 1000);
	},
	closeWating: function() {
		if (!this.Wating) {
			return;
		}
		clearInterval(aServer.WatingTimeInterval);
		plus.nativeUI.closeWaiting();
	},
	//默认请求 无AuthToken
	executeActionOfServer: function(isDebug, methodName, errMsg, postData, success, error) {
		aUtil.aLog.deb(isDebug, methodName + " postData is " + JSON.stringify(postData));
		aServer.showWating();
		var success4Post = function(result) {
			aServer.closeWating();
			if (!result) {
				if (error) error(errMsg);
			} else {
				aUtil.aLog.deb(isDebug, methodName + " return is " + JSON.stringify(result));
				if (result.status && (result.status == "200" || result.status == "400")) {
					success(result);
				} else {
					if(result.status==401){
						serverError(result);
					}else{
						if (error) error(errMsg);
					}				
				}
			}
		};
		mui.ajax(this.ApiUrl + methodName, {
			data: postData,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: success4Post,
			error: function(xhr, type, errorThrown) {
				if (error) error(xhr.responseText);
				console.log("" + xhr.status + "  " + xhr.readyState + xhr.responseText);
				aServer.closeWating();
			}
		});
	},
	//默认请求POST
	executeActionOfServerPOST: function(isDebug, methodName, errMsg, postData, success, error) {
		aUtil.aLog.deb(isDebug, methodName + " postData is " + JSON.stringify(postData));
		aServer.showWating();
		var success4Post = function(result) {
			aServer.closeWating();
			if (!result) {
				if (error) error(errMsg);
			} else {
				aUtil.aLog.deb(isDebug, methodName + " return is " + JSON.stringify(result));
				if (result.status && (result.status == "200" || result.status == "409" || result.status == "405" || result.status ==
						'400'|| result.status == "401")) //200 成功  409资源冲突  405不允许删除
				{
					serverError(result);
					success(result);
				} else {
					if (error) error(errMsg);
				}
			}
		};
		console.log(JSON.stringify(postData));
		mui.ajax(this.ApiUrl + methodName, {
			data: postData,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒
			headers: {
				'Authorization': 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token)
			},
			success: success4Post,
			error: function(xhr, type, errorThrown) {
				if (error) error(xhr.responseText);
				console.log("" + xhr.status + "  " + xhr.readyState + xhr.responseText);
				aServer.closeWating();
			}
		});
	},

	//默认请求POST
	executeActionOfServerFilePOST: function(isDebug, methodName, errMsg, postData, success, error) {
		aUtil.aLog.deb(isDebug, methodName + " postData is " + JSON.stringify(postData));
		aServer.showWating();
		var success4Post = function(result) {
			aServer.closeWating();
			if (!result) {
				if (error) error(errMsg);
			} else {
				aUtil.aLog.deb(isDebug, methodName + " return is " + JSON.stringify(result));
				if (result.status && (result.status == "200" || result.status == "409" || result.status == "405"|| result.status == "401")) //200 成功  409资源冲突  405不允许删除
				{
					serverError(result);
					success(result);
				} else {
					if (error) error(errMsg);
				}
			}
		};
		// console.log(JSON.stringify(postData));

		mui.ajax(this.ApiUrl + methodName, {
			data: postData,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒
			headers: {
				'Authorization': 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token),
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: success4Post,
			error: function(xhr, type, errorThrown) {
				if (error) error(xhr.responseText);
				console.log("" + xhr.status + "  " + xhr.readyState + xhr.responseText);
				aServer.closeWating();
			}
		});
	},

	executeActionOfServerGET: function(isDebug, methodName, errMsg, postData, success, error) {

		aUtil.aLog.deb(isDebug, methodName + " postData is " + JSON.stringify(postData));
		var success4GET = function(result) {
			aServer.closeWating();
			if (!result) {
				aUtil.aLog.err(isDebug, errMsg);
				if (error) error();
			} else {
				aUtil.aLog.deb(isDebug, methodName + " return is " + JSON.stringify(result));
				if (success) {
					serverError(result);
					success(result);
				} else {
					aUtil.aLog.err(isDebug, errMsg + ":" + result.message);
					//验证token是否过期,服务器返回clientid或者tokenstate标明出本地token失效还是其他终端登录导致token失效
					if (result.state == 1) {
						mui.toast(result.message);
					} else {
						// @TODO 确定result.tokenState在此处是否有不为0的情况(暂无)
					}
					if (error) error();
				}
			}
		};
		mui.ajax(this.ApiUrl + methodName, {
			data: postData,
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			headers: {
				'Authorization': 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token)
			},
			success: success4GET,
			error: function(xhr, type, errorThrown) {
				if (xhr.status == "401") {
					mui.toast("登录超时，重新登录...");
					mui.openWindow({
						id: 'login',
						url: '/view/sys/login.html',
						extras: {}
					});
				} else {
					if (error) error(xhr.responseText);
					console.log(xhr.status + "  " + xhr.readyState + xhr.responseText);
					aServer.closeWating();
				}

			}
		});
	},
	executeActionOfServerGETTest: function(isDebug, methodName, errMsg, postData, success, error) {

		aUtil.aLog.deb(isDebug, methodName + " postData is " + JSON.stringify(postData));
		var success4GET = function(result) {
			if (!result) {
				aUtil.aLog.err(isDebug, errMsg);
				if (error) error();
			} else {
				aUtil.aLog.deb(isDebug, methodName + " return is " + JSON.stringify(result));
				if (success) {
					success(result);
				} else {
					aUtil.aLog.err(isDebug, errMsg + ":" + result.message);
					//验证token是否过期,服务器返回clientid或者tokenstate标明出本地token失效还是其他终端登录导致token失效
					if (result.state == 1) {
						mui.toast(result.message);
					} else {
						// @TODO 确定result.tokenState在此处是否有不为0的情况(暂无)
					}
					if (error) error();
				}
			}
		};
		mui.ajax(this.ApiUrlTest + methodName, {
			data: postData,
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			headers: {
				'Content-Type': 'application/json',
				'Authorization': LocalStorage.getItem(LocalStorage.keys.Auth_Token)
			},
			success: success4GET,
			error: function(xhr, type, errorThrown) {
				if (error) error(xhr.responseText);
				console.log(xhr.status + "  " + xhr.readyState + xhr.responseText);
				aServer.closeWating();
			}
		});
	},
	//默认请求 无AuthToken
	executeActionOfServerNew: function(isDebug, methodName, errMsg, postData, success, error) {
		aUtil.aLog.deb(isDebug, methodName + " postData is " + JSON.stringify(postData));
		aServer.showWating();
		var success4Post = function(result) {
			aServer.closeWating();
			if (!result) {
				if (error) error(errMsg);
			} else {
				// aUtil.aLog.deb(isDebug, methodName + " return is " + JSON.stringify(result));
				// if (result.status && (result.status == "200" || result.status == "400")) {
					console.log(11111111111)
					success(result);
				// } else {
				// 	if(result.status==401){
				// 		serverError(result);
				// 	}else{
				// 		if (error) error(errMsg);
				// 	}				
				// }
			}
		};
		mui.ajax(this.ApiUrl + methodName, {
			data: postData,
			// dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: success4Post,
			error: function(xhr, type, errorThrown) {
				if (error) error(xhr.responseText);
				console.log("" + xhr.status + "  " + xhr.readyState + xhr.responseText);
				aServer.closeWating();
			}
		});
	},

}
function serverError(result){
	if (result.status == 100000){
		mui.toast("登录失效,请重新登录");
		var wvs = plus.webview.all();
		
		for (var i = 0,
				len = wvs.length; i < len; i++) {
			if (wvs[i].getURL() != null) {
				if (wvs[i].getURL().indexOf("login") == -1) {
					plus.webview.close(wvs[i]);
				}
			}
		}
	}else if(result.status==401){
		mui.alert(result.msg,' ');
		var wvs = plus.webview.all();		
		for (var i = 0,
				len = wvs.length; i < len; i++) {
			if (wvs[i].getURL() != null) {
				if (wvs[i].getURL().indexOf("login") == -1) {
					plus.webview.close(wvs[i]);
				}
			}
		}
	}
}
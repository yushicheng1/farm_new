"use strict";
var aUtil = aUtil || {};
aUtil.aLog = {
	deb: function(isDebug, msg) {
		if (!isDebug) {
			return;
		}
		console.log(msg);
		
	},
	info: function(isDebug, msg) {
		if (!isDebug) {
			return;
		}
		this.deb(isDebug, "信息：" + msg);
	},
	err: function(isDebug, msg) {
		if (!isDebug) {
			return;
		}
		this.deb(isDebug, "错误：" + msg);
	}
}
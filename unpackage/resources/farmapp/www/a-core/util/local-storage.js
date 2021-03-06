/**
 * 此文件依赖log.js,请在页面中先引入log.js
 */
var LocalStorage = {
	isDebug: false, //是否为调试
	keys: {
		Auth_Token: "Auth_Token", //Auth_Token
		Expires_Time: "Expires_Time", //过期时间
		User_Account: "User_Account", //帐号
		User_Password: "User_Password", //密码
		Auto_Save:"Auto_Save",//记住密码0:不记住 1:记住
		User_Id: "User_Id", //用户id
		User_Money:"User_Money",
		Auto_Message: "Auto_Message", //自动接受消息
		Auto_Version: "Auto_Version", //自动检测更新
		Group_List:"Group_List",
		ContactList:"ContactList",
		launchFlag:"launchFlag",//第一次启动
		guideFlag:"guideFlag", //第一次登录
		ids:"ids",//公告id集合
		Rules:"Rules"//后台规则集合
	},
	setItem: function(itemKey, itemValue) {
		plus.storage.setItem(itemKey, itemValue + "");
		aUtil.aLog.deb(this.isDebug, "Add LocalStorage is [" + itemKey + " : " + plus.storage.getItem(itemKey) + "]");
	},
	getItem: function(itemKey) {
		var itemValue = plus.storage.getItem(itemKey);
		aUtil.aLog.deb(this.isDebug, "LocalStorage[" + itemKey + "] : " + itemValue);
		return itemValue;
	},
	clearAll: function() {
		aUtil.aLog.deb(this.isDebug, "remove all");
		var serverurl = plus.storage.getItem(LocalStorage.keys.SERVER_URL);
		plus.storage.clear();
	},
	removeItem: function(itemKey) {
		aUtil.aLog.deb(this.isDebug, "remove [" + itemKey + "] ");
		plus.storage.removeItem(itemKey);
	}

}
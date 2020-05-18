/**
 * 依赖aServer.js, log.js
 */
var friendServer = mui.extend(aServer || {}, {
	isDebug: true,

	//获取我的好友
	getFriendList: function(success, error) {
		var data = {

		}
		aServer.executeActionOfServerGET(this.isDebug, "api/friend/list", "获取失败", data, success, error);
	},
	
	//查找用户
	searchFriend: function(phone,success, error) {
		var data = {
	
		}
		aServer.executeActionOfServerGET(this.isDebug, "api/friend/search/"+phone, "查找失败", data, success, error);
	},
	
	//添加好友
	addFriend: function(id,success, error) {
		var data = {
	
		}
		aServer.executeActionOfServerGET(this.isDebug, "api/friend/add/"+id, "添加失败", data, success, error);
	},
	
	//添加我好友的信息
	getAddMe: function(success, error) {
		var data = {
	
		}
		aServer.executeActionOfServerGET(this.isDebug, "api/friend/notification", "获取失败", data, success, error);
	},
	
	//拒绝好友申请
	refuseFriend: function(notification_id,success, error) {
		var data = {
	
		}
		aServer.executeActionOfServerGET(this.isDebug, "api/friend/refuse/"+notification_id, "获取失败", data, success, error);
	},
	
	//同意好友申请
	agreeFriend: function(notification_id,success, error) {
		var data = {
	
		}
		aServer.executeActionOfServerGET(this.isDebug, "api/friend/confirm/"+notification_id, "获取失败", data, success, error);
	},
	
	//发送消息
	sendMessage: function(to_uid,message,success, error) {
		var data = {
	     'to_uid':to_uid,
		 'message':message
		}
		aServer.executeActionOfServerPOST(this.isDebug, "api/message/send_msg", "发送失败", data, success, error);
	},
	
	//获取聊天记录
	getMessageList: function(page,limit,friend_uid,success, error) {
		var data = {
	     'page':page,
		 'limit':limit,
		 'friend_uid':friend_uid
		}
		aServer.executeActionOfServerPOST(this.isDebug, "api/message/lst_msg", "获取失败", data, success, error);
	},

	//修改用户信息
	updateUserInfo: function(name, phone, success, error) {
		var data = {
			nick_name: name,
			phone: phone
		}
		aServer.executeActionOfServerPOST(this.isDebug, "api/my/update", "修改失败", data, success, error);
	},
	
	//修改头像
	updateUserImg: function(avatar, success, error) {
		                

		// var data = {
		// 	avatar: avatar
		// }
		aServer.executeActionOfServerFilePOST(this.isDebug, "api/my/avatar", "修改失败", avatar, success, error);
	},

	//获取我的地址
	getAddressList: function(success, error) {
		var data = {

		}
		aServer.executeActionOfServerGET(this.isDebug, "api/my/address", "获取失败", data, success, error);
	},

	//新增地址
	addAddress: function(name, phone, province, city, district, detail, is_default, success, error) {
		var data = {
			real_name: name,
			phone: phone,
			province: province,
			city: city,
			district: district,
			detail: detail,
			is_default: is_default
		}
		aServer.executeActionOfServerPOST(this.isDebug, "api/address/add", "新增失败", data, success, error);
	},

	//编辑地址
	editAddress: function(id, name, phone, province, city, district, detail, is_default, success, error) {
		var data = {
			real_name: name,
			phone: phone,
			province: province,
			city: city,
			district: district,
			detail: detail,
			is_default: is_default
		}
		aServer.executeActionOfServerPOST(this.isDebug, "api/address/update/" + id, "编辑失败", data, success, error);
	},

	//删除地址
	deleteAddress: function(id, success, error) {
		var data = {

		}
		aServer.executeActionOfServerGET(this.isDebug, "api/address/delete/" + id, "删除失败", data, success, error);
	}
})

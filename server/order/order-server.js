/**
 * 依赖aServer.js, log.js
 */
var myServer = mui.extend(aServer || {}, {
	isDebug: true,

	//获取用户信息
	getUserInfo: function(success, error) {
		var data = {

		}
		aServer.executeActionOfServerGET(this.isDebug, "api/userinfo", "获取失败", data, success, error);
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
	deleteAddress: function(id,success, error) {
		var data = {

		}
		aServer.executeActionOfServerGET(this.isDebug, "api/address/delete/"+id, "删除失败", data, success, error);
	}
})

/**
 * 依赖aServer.js, log.js
 */
var gmzzServer = mui.extend(aServer || {}, {
	isDebug: true,

	//获取种子列表
	getSeedList: function(pages, size,type, success, error) {
		var data = {
			"page": pages,
			"limit": size,
			"type":type
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/seed/list", "获取种子列表失败", data, success, error);
	},

	//获取种子详情
	getSeedDetail: function(id, success, error) {
		var data = {

		};
		aServer.executeActionOfServerGET(this.isDebug, "api/seed/detail/" + id, "获取种子详情失败", data, success, error);
	},

	//添加到购物车
	addSeedCart: function(id, num, uniqueId, size, success, error) {
		var data = {
			product_id: id,
			cartNum: num,
			is_new: 1,
			uniqueId: uniqueId,
			size: size
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/seedcart/add", "添加到购物车失败", data, success, error);
	},

	//确认种子订单
	confirmSeedOrder: function(cartId, success, error) {
		var data = {
			cart_id: cartId
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/order/confirm_seed_order", "确认订单失败", data, success, error);
	},

	//生成订单
	createSeedOrder: function(orderKey, success, error) {
		var data = {
			payType: 'yue'
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/order/create_seed_order/"+orderKey, "确认订单失败", data, success, error);
	}
});

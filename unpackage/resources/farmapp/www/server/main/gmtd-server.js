/**
 * 依赖aServer.js, log.js
 */
var gmtdServer = mui.extend(aServer || {}, {
	isDebug: true,

	//获取土地套餐(大棚)
	getDpList: function(success, error) {
		var data = {
			farm_cate_id:1
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/farm/packege", "获取大棚列表失败", data, success, error);
	},
	
	//获取土地套餐(露天)
	getLtList: function(success, error) {
		var data = {
			farm_cate_id:2
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/farm/packege", "获取露天列表失败", data, success, error);
	},

	//添加到购物车
	addFarmCart: function(id, num, success, error) {
		var data = {
			product_id: id,
			cartNum: num,
			is_new: 1
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/farmcart/add", "添加到购物车失败", data, success, error);
	},

	//确认土地订单
	confirmFarmOrder: function(cartId, success, error) {
		var data = {
			cart_id: cartId
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/order/confirm_farm_order", "确认订单失败", data, success, error);
	},

	//生成订单
	createFarmOrder: function(orderKey, success, error) {
		var data = {
			payType: 'yue'
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/order/create_farm_order/"+orderKey, "生成订单失败", data, success, error);
	}
});

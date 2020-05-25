/**
 * 依赖aServer.js, log.js
 */
var warehouseServer = mui.extend(aServer || {}, {
	isDebug: true,

	//获取我的仓库
	getMyStore: function(success, error) {
		var data = {
			
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/my/store", "获取仓库失败", data, success, error);
	},
	
	//邮寄到家
	sendToHmoe: function(vegetables,address_id,success, error) {
		var data = {
			vegetables:vegetables,
			address_id:address_id,
			payType:'yue'
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/my/post", "邮寄失败", data, success, error);
	},
	
	//获取送货到家记录
	getPostOrder: function(page,rows,status,success, error) {
		var data = {
			page:page,
			limit:rows,
			status:status
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/order/post_order", "获取记录失败", data, success, error);
	},
	
	//获取邮寄详情
	getPostDetail: function(id,success, error) {
		var data = {
			
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/order/post_details/"+id, "获取失败", data, success, error);
	},
	
	//挂到交易大厅
	sale: function(vegetablesId,num,price,success, error) {
		var data = {
			vegetables_id:vegetablesId,
			num:num,
			sales_price:price
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/trading/sale", "挂到交易大厅失败", data, success, error);
	},
	
	//系统回收
	recycle: function(vegetablesId,num,success, error) {
		var data = {
			vegetables_id:vegetablesId,
			num:num
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/my/recycle", "回收失败", data, success, error);
	},
	
	//丢弃
	discard: function(vegetablesId,success, error) {
		var data = {
			vegetables_id:vegetablesId
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/my/discard", "丢弃失败", data, success, error);
	},
	
	//确认收货
	confirmOrder: function(order_id,success, error) {
		var data = {
			
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/order/confirm_get/"+order_id, "确认收货失败", data, success, error);
	},
	
	//仓库记录
	getRecord: function(page,limit,success, error) {
		var data = {
			page:page,
			limit:limit
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/store/log", "确认记录失败", data, success, error);
	}
	
	// //获取土地套餐(露天)
	// getLtList: function(success, error) {
	// 	var data = {
	// 		farm_cate_id:2
	// 	};
	// 	aServer.executeActionOfServerGET(this.isDebug, "api/farm/packege", "获取露天列表失败", data, success, error);
	// },

	// //添加到购物车
	// addFarmCart: function(id, num, success, error) {
	// 	var data = {
	// 		product_id: id,
	// 		cartNum: num,
	// 		is_new: 1
	// 	};
	// 	aServer.executeActionOfServerPOST(this.isDebug, "api/farmcart/add", "添加到购物车失败", data, success, error);
	// },

	// //确认土地订单
	// confirmFarmOrder: function(cartId, success, error) {
	// 	var data = {
	// 		cart_id: cartId
	// 	};
	// 	aServer.executeActionOfServerPOST(this.isDebug, "api/order/confirm_farm_order", "确认订单失败", data, success, error);
	// },

	// //生成订单
	// createFarmOrder: function(orderKey, success, error) {
	// 	var data = {
	// 		payType: 'alipay'
	// 	};
	// 	aServer.executeActionOfServerPOST(this.isDebug, "api/order/create_farm_order/"+orderKey, "确认订单失败", data, success, error);
	// }
});

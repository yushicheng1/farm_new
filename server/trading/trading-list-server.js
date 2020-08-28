/**
 * 依赖aServer.js, log.js
 */
var tradingListServer = mui.extend(aServer || {}, {
	isDebug: true,

	//获取交易大厅
	getTradingList: function(page,limit,name, success, error) {
		var data = {
			page: page,
			limit: limit,
			name:name
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/trading/list", "获取失败", data, success, error);
	},
	
	//购买
	tradingBuy: function(id,num,address_id,success, error) {
		var data = {
			id: id,
			num:num,
			pay_type:'yue',
			address_id:address_id
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/trading/buy", "购买失败", data, success, error);
	},
	
	//我的交易大厅
	myTradingList: function(page,limit,success, error) {
		var data = {
			page:page,
			limit:limit
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/my/trading_list", "获取失败", data, success, error);
	},
	
	//我的交易大厅
	withDraw: function(id,success, error) {
		var data = {
			
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/trading/withdraw/"+id, "下架失败", data, success, error);
	},
});

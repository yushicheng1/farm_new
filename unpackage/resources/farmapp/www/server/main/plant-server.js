/**
 * 依赖aServer.js, log.js
 */
var plantServer = mui.extend(aServer || {}, {
	isDebug: true,
	
	// 获取我的土地面积
	getFarmCount: function(success, error) {
		var data = {
			
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/my/farmcount", "获取失败", data, success, error);
	},
	
	// 获取我的土地
	getFarmPackage: function(success, error) {
		var data = {
			
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/my/farmpackage", "获取失败", data, success, error);
	},


	//获取正在使用的土地
	tuDi: function(page,limit,success, error) {
		var data = {
			page:page,
			limit:limit
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/my/farmland", "获取失败", data, success, error);
	},
	//种植
	ZhongZhi: function(unique, size, num,success,error) {
		var data = {
				unique:unique,
				// 产品唯一id
				size:size,
				// // 使用土地面积
				num:num
				// // 使用数量
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/options/plant" , "种植失败", data,success,error);
	},

	//浇水
	JiaoShui: function(landId,success, error) {
		var data = {
				
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/options/watering/"+landId , "浇水失败", data, success, error);
	},
	//一键浇水
	JiaoShuiALL: function(success, error) {
		var data = {
				
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/options/wateringall", "浇水失败", data, success, error);
	},
	//施肥
	ShiFei: function(landId,success, error) {
		var data = {
		
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/options/fertilize/"+landId , "施肥失败", data, success, error);
	},
	//一键施肥
	ShiFeiAll: function(success, error) {
		var data = {
		
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/options/fertilizeall", "施肥失败", data, success, error);
	},
	//铲除
	ChanCu: function(land_id, success, error) {
		var data = {
			land_id	:land_id
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/options/plough" , "铲除失败", data, success, error);
	},
	//收割
	ShouGe: function(land_id,seed_id,success, error) {
		var data = {
			land_id	:land_id,
			seed_id	:seed_id
		};
		aServer.executeActionOfServerPOST(this.isDebug, "api/options/harvest" , "收割失败", data, success, error);
	},
	// 偷菜
	touCai: function(success, error) {
			var data = {
				// vegetables_id:vegetables_id,
				// // 蔬菜的id
				// num:num
			};
			aServer.executeActionOfServerPOST(this.isDebug, "api/options/steal", "偷菜失败", data, success, error);
		},
		// 偷菜列表
		touCaiBiao: function(page,limit,success, error) {
				var data = {
					page:page,
					limit:limit
				};
				aServer.executeActionOfServerGET(this.isDebug, "api/options/vegetables_list", "偷菜列表失败", data, success, error);
			},
	
	//仓库
	getMySeed: function(success, error) {
		var data = {
			
		};
		aServer.executeActionOfServerGET(this.isDebug, "api/my/seed", "获取种子失败", data, success, error);
	}
})

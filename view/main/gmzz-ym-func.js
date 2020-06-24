var aFunc = {
	initData: function() {
		
	},
	bindEvent: function() {
		//查看详情
		mui(aVariable.box.scroll).on("tap", "li", function(e) {
			var card = this;
			var seedId = card.getAttribute("data-id");
			var seedName = card.getAttribute("data-name");
			var seedImg = card.getAttribute("data-img");
			mui.openWindow({
				id: "gmzz_detail",
				url: 'gmzz-detail.html',
				extras: {
			       seedId:seedId,
				   seedName:seedName,
				   seedImg:seedImg
				}
			});
		});

		//全部订单
		// aVariable.btn.btnAllOrder.addEventListener("tap", function() {
		// 	mui.openWindow({
		// 		id: "allOrder",
		// 		url: '/view/order/order.html',
		// 		extras: {
		
		// 		}
		// 	});
		// })
		
		//返回
		// aVariable.btn.btnBack.addEventListener("tap", function() {
		// 	mui.back()
		// })

	},

	up2Refresh: function() {
		setTimeout(function() {
					var pages = aVariable.list.page.item_page;
					var size = aVariable.list.page.item_num;
					gmzzServer.getSeedList(pages,size,'1',function(data) {
						if(data.status == 200) {
							aVariable.box.seedList.innerHTML += aUi.seed.seedCsList(data.data);
							aVariable.list.page.item_sum += data.data.length;
							aVariable.list.page.item_page += 1;
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length<=0)
						} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true)
						}
					}, function() {
		
					});
				}, 100);
	},
	down2Refresh: function() {
		aVariable.list.page.item_page = 1;
		aVariable.box.seedList.innerHTML = "";
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		setTimeout(function() {			
			gmzzServer.getSeedList(pages,size,'1',function(data) {
				if(data.status == 200) {
					aVariable.box.seedList.innerHTML = aUi.seed.seedCsList(data.data);
					aVariable.list.page.item_sum = data.data.length;
					aVariable.list.page.item_page += 1;
					mui('#pullrefresh').pullRefresh().endPulldown();
					mui('#pullrefresh').pullRefresh().refresh(true);
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length<=0)
				} else {
			
				}
			
			}, function() {
		
			});
		}, 100);
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	initView: function() {
		
		// mui(aVariable.box.scroll).pullToRefresh({
		// 	up: {
		// 		callback: function() {
		// 			aFunc.up2Refresh(this);
		// 		}
		// 	},
		// 	down: {
		// 		callback: function() {
		// 			aFunc.down2Refresh(this);
		// 		}
		// 	}
		// }).pullUpLoading();
	},
	plusReady: function() {
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		// aVariable.webview.current = plus.webview.currentWebview();
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					style:'circle',
					callback: aFunc.down2Refresh
				},
				up: {
					auto:true, 
					contentrefresh: '正在加载...',
					contentdown:' ',
					callback: aFunc.up2Refresh
				}
			}
		});
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

function enterSearch(event){
	console.log('321')
}



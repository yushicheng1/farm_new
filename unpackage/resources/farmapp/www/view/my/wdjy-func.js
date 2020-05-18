var aFunc = {
	initData: function() {

	},
	bindEvent: function() {
		//查看详情
		mui(aVariable.box.scroll).on("tap", "li button", function(e) {
			var id = this.getAttribute("data-id");
			tradingListServer.withDraw(id,function(data) {
				if (data.status == 200) {
					mui.toast('下架成功');
				  aFunc.down2Refresh();
				} else {
					
				}
			}, function() {
			
			});
			// var seedName = card.getAttribute("data-name");
			// var seedImg = card.getAttribute("data-img");
			// mui.openWindow({
			// 	id: "gmzz_detail",
			// 	url: 'gmzz-detail.html',
			// 	extras: {
			//                 seedId:seedId,
			// 	   seedName:seedName,
			// 	   seedImg:seedImg
			// 	}
			// });
		});
		//全部订单
		// aVariable.btn.btnRecord.addEventListener("tap", function() {
		// 	mui.openWindow({
		// 		id: "gmzz_record",
		// 		url: 'gmzz-record.html'
		// 	});
		// })
	},
	up2Refresh: function(refreshComponent) {
		setTimeout(function() {
			var pages = aVariable.list.page.item_page;
			var size = aVariable.list.page.item_num;
			tradingListServer.myTradingList(pages, size, function(data) {
				if (data.status == 200) {
					aVariable.box.jyList.innerHTML += aUi.tradingList.myTradingList(data.data);
					aVariable.list.page.item_page += 1;
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length <8)

				} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true)
				}
			}, function() {

			});
		}, 400);
	},
	down2Refresh: function(refreshComponent) {
		aVariable.list.page.item_page = 1;
		aVariable.box.jyList.innerHTML = "";
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		setTimeout(function() {
			tradingListServer.myTradingList(pages, size, function(data) {
				if (data.status == 200) {
					aVariable.box.jyList.innerHTML = aUi.tradingList.myTradingList(data.data);
					aVariable.list.page.item_page += 1;
					mui('#pullrefresh').pullRefresh().endPulldown();
					mui('#pullrefresh').pullRefresh().refresh(true);
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length <8 )
				} else {

				}
			}, function() {

			});
		}, 400);
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
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					style: 'circle',
					callback: aFunc.down2Refresh
				},
				up: {
					auto: true,
					contentrefresh: '正在加载...',
					callback: aFunc.up2Refresh
				}
			}
		});
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

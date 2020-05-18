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
		// aVariable.btn.btnRecord.addEventListener("tap", function() {
		// 	mui.openWindow({
		// 		id: "gmzz_record",
		// 		url: 'gmzz-record.html'
		// 	});
		// })
	},
	up2Refresh: function(refreshComponent) {
		setTimeout(function() {
			aVariable.webview.listComponent = refreshComponent;
			var pages = aVariable.list.page.item_page;
			var size = aVariable.list.page.item_num;
			gmzzServer.getSeedList(pages, size, function(data) {
				if (data.status == 200) {
					aVariable.box.seedList.innerHTML += aUi.seed.seedList(data.data);
					aVariable.list.page.item_sum += data.data.length;
					aVariable.list.page.item_page += 1;
					refreshComponent.endPullUpToRefresh(data.data.length <= 0);
				} else {
					refreshComponent.endPullUpToRefresh(true);
				}
			}, function() {

			});
		}, 800);
	},
	down2Refresh: function(refreshComponent) {
		aVariable.list.page.item_sum = 5;
		aVariable.list.page.item_page = 1;
		aVariable.box.seedList.innerHTML = "";
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		setTimeout(function() {
			gmzzServer.getSeedList(pages, size, function(data) {
				if (data.status == 200) {
					refreshComponent.refresh(true);
					refreshComponent.endPullDownToRefresh();
					aVariable.box.seedList.innerHTML = aUi.seed.seedList(data.data);
					aVariable.list.page.item_sum = data.data.length;
					aVariable.list.page.item_page += 1;
				} else {
					refreshComponent.endPullDownToRefresh();
				}
			}, function() {

			});
		}, 800);
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	initView: function() {
		mui(aVariable.box.scroll).pullToRefresh({
			up: {
				callback: function() {
					aFunc.up2Refresh(this);
				}
			},
			down: {
				callback: function() {
					aFunc.down2Refresh(this);
				}
			}
		}).pullUpLoading();
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

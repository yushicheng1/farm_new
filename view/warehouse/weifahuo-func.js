var aFunc = {
	initData: function() {

	},
	bindEvent: function() {

	},
	up2Refresh: function(refreshComponent) {
		setTimeout(function() {
			aVariable.webview.listComponent = refreshComponent;
			var pages = aVariable.list.page.item_page;
			var size = aVariable.list.page.item_num;
			warehouseServer.getPostOrder(pages, size, 1, function(data) {
				if (data.status == 200) {
					console.log(JSON.stringify(data.data));
					aVariable.box.wfhList.innerHTML += aUi.wfh.wfhList(data.data);
					// refreshComponent.endPullUpToRefresh(true);
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
		aVariable.list.page.item_sum = 0;
		aVariable.list.page.item_page = 1;
		aVariable.box.wfhList.innerHTML = "";
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		setTimeout(function() {
			warehouseServer.getPostOrder(pages, size, 1, function(data) {
				if (data.status == 200) {
					console.log(JSON.stringify(data.data))
					aVariable.box.wfhList.innerHTML = aUi.wfh.wfhList(data.data);
					aVariable.list.page.item_sum = data.data.length;
					aVariable.list.page.item_page += 1;
					refreshComponent.refresh(true);
					refreshComponent.endPullDownToRefresh();
				} else {
					refreshComponent.endPullDownToRefresh();
				}
				refreshComponent.endPullDownToRefresh();
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
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

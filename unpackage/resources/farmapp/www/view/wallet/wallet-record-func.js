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

			walletServer.getRecordList(pages, size, function(data) {
				if (data.status == 200) {
					aVariable.box.recordList.innerHTML += aUi.record.recordList(data.data);
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
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		setTimeout(function() {
			walletServer.getRecordList(pages, size, function(data) {
				if (data.status == 200) {
					refreshComponent.refresh(true);
					refreshComponent.endPullDownToRefresh();
					aVariable.box.recordList.innerHTML = aUi.record.recordList(data.data);
					aVariable.list.page.item_sum = data.data.length;
					aVariable.list.page.item_page += 1;
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

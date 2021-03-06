var aFunc = {
	initData: function() {
		
	},
	bindEvent: function() {
	
	},

	up2Refresh: function(refreshComponent) {
		setTimeout(function() {
			var pages = aVariable.list.page.item_page;
			var size = aVariable.list.page.item_num;
			warehouseServer.getRecord(pages, size,aVariable.params.store_id, function(data) {
				if(data.status == 200) {
					aVariable.box.recordList.innerHTML += aUi.warehouse.recordList(data.data);
					aVariable.list.page.item_page += 1;
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length <10);
				} else {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				}
			}, function() {

			});
		}, 400);
	},
	down2Refresh: function(refreshComponent) {
		aVariable.list.page.item_sum = 0;
		aVariable.list.page.item_page = 1;
		aVariable.box.recordList.innerHTML = "";
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		setTimeout(function() {
		warehouseServer.getRecord(pages, size,aVariable.params.store_id, function(data) {
				if(data.status == 200) {
					aVariable.box.recordList.innerHTML += aUi.warehouse.recordList(data.data);
					aVariable.list.page.item_page += 1;
					mui('#pullrefresh').pullRefresh().endPulldown();
					mui('#pullrefresh').pullRefresh().refresh(true);
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length<10);
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
		// 	}
		// 	down: {
		// 		callback: function() {
		// 			aFunc.down2Refresh(this);
		// 		}
		// 	}
		// }).pullUpLoading();
	},
	plusReady: function() {
		aVariable.webview.current = plus.webview.currentWebview();
		var id= aVariable.webview.current.vegetablesId;
		if(id==null||id==''){
			
		}else{
			aVariable.params.store_id=id;
		}
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		// aVariable.webview.current = plus.webview.currentWebview();
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

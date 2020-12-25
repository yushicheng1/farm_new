var aFunc = {
	initData: function() {
		aVariable.box.warehouseList.innerHTML = '';
		warehouseServer.getMyStore(function(data) {
				if (data.status == 200) {
					console.log(JSON.stringify(data.data))
					aVariable.box.warehouseList.innerHTML = aUi.warehouse.warehouseList(data.data);
				} else {
					aVariable.box.warehouseList.innerHTML = ''
				}
			},
			function() {

			});
	},
	bindEvent: function() {
		mui(aVariable.box.scroll).on("tap", "li img", function(e) {
			var type = this.getAttribute("data-type");
			var vegetablesId = this.getAttribute("data-id");
			var name = this.getAttribute("data-name");
			var price = this.getAttribute("data-price");
			var plant = this.getAttribute("data-plant");
			var get = this.getAttribute("data-get");
			var sum = this.getAttribute("data-sum");
			var image = this.getAttribute("data-image");
			var count = this.getAttribute("data-count");
			if (type == 1) {
				mui.openWindow({
					id: "warehouseYouji",
					url: '/view/warehouse/youji.html',
					extras: {
						vegetablesId: vegetablesId,
						sum: sum,
						name: name,
						plant: plant,
						get: get,
						image: image
					}
				});
				// mui.toast('暂未开放')
			} else if (type == 2) {
				mui.openWindow({
					id: "warehouseXiangqing",
					url: '/view/warehouse/warehouse-record.html',
					extras: {
						vegetablesId: vegetablesId
						// sum: sum,
						// name: name,
						// plant: plant,
						// get: get,
						// price: price,
						// image: image
					}
				});
				// mui.toast('暂未开放')
			} else if (type == 3) {
				mui.openWindow({
					id: "warehouseXths",
					url: '/view/warehouse/xths.html',
					extras: {
						vegetablesId: vegetablesId,
						sum: sum,
						name: name,
						plant: plant,
						get: get,
						price: price,
						image: image,
						count: count,
					}
				});

			} else if (type == 4) {
				var btnArray = ['是', '否'];
				mui.confirm("确定要丢弃吗?", "提示", btnArray, function(e) {
					if (e.index == 0) {
						warehouseServer.discard(vegetablesId, function(data) {
								if (data.status == 200) {
									mui.toast("丢弃成功");
									aFunc.initData();
								} else {
									mui.toast("丢弃失败");
								}
							},
							function() {

							});
					} else {

					}
				});

			}
		});
		
		// mui(aVariable.box.scroll).on("tap", "li", function(e) {
		// 	var vegetablesId = this.getAttribute("data-id");
		// 	var sum = this.getAttribute("data-sum");
		// 	warehouseServer.recycle(vegetablesId, sum, function(data) {
		// 			if (data.status == 200) {
		// 				mui.toast("回收成功");
		// 				aFunc.down2Refresh();
		// 			} else {
						
		// 			}
		// 		},
		// 		function() {
			
		// 		});		
		// });

		aVariable.btn.btnWarehouseRecord.addEventListener("tap", function() {
			mui.openWindow({
				id: "warehouseRecord",
				url: '/view/warehouse/warehouse-record.html',
				extras: {

				}

			});
		})

		window.addEventListener('refreshWarehouse', function(e) {
			aFunc.down2Refresh();
		});
	},
	up2Refresh: function(refreshComponent) {
		setTimeout(function() {
			var pages = aVariable.list.page.item_page;
			var size = aVariable.list.page.item_num;
			warehouseServer.getMyStore(pages, size, function(data) {
				if(data.status == 200) {
					aVariable.box.warehouseList.innerHTML += aUi.warehouse.warehouseList(data.data);
					aVariable.list.page.item_page += 1;
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length <10);
				} else {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				}
			}, function() {
	
			});
		}, 100);
	},
	down2Refresh: function(refreshComponent) {
		aVariable.list.page.item_sum = 0;
		aVariable.list.page.item_page = 1;
		aVariable.box.warehouseList.innerHTML = "";
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		setTimeout(function() {
			warehouseServer.getMyStore(pages, size, function(data) {
					if (data.status == 200) {
						aVariable.box.warehouseList.innerHTML += aUi.warehouse.warehouseList(data.data);
						aVariable.list.page.item_page += 1;
						mui('#pullrefresh').pullRefresh().endPulldown();
						mui('#pullrefresh').pullRefresh().refresh(true);
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length < 10);
					} else {

					}
				},
				function() {

				});
		}, 100);
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
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
		aFunc.bindEvent();
	}
};

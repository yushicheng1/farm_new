var aFunc = {
	initData: function() {
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
						image:image
					}
				});
				// mui.toast('暂未开放')
			} else if (type == 2) {
				mui.openWindow({
					id: "warehouseGdjydt",
					url: '/view/warehouse/gdjydt.html',
					extras: {
						vegetablesId: vegetablesId,
						sum: sum,
						name: name,
						plant: plant,
						get: get,
						price: price,
						image:image
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
						image:image,
						count:count,
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

		aVariable.btn.btnWarehouseRecord.addEventListener("tap", function() {
			mui.openWindow({
				id: "warehouseRecord",
				url: '/view/warehouse/warehouse-record.html',
				extras: {

				}

			});
		})

		window.addEventListener('refreshWarehouse', function(e) {
			aFunc.initData();
		});
	},
	down2Refresh: function(refreshComponent) {
		aVariable.box.warehouseList.innerHTML = '';
		warehouseServer.getMyStore(function(data) {
				if (data.status == 200) {
					console.log(JSON.stringify(data.data))
					aVariable.box.warehouseList.innerHTML = aUi.warehouse.warehouseList(data.data);
					refreshComponent.refresh(true);
					refreshComponent.endPullDownToRefresh();

				} else {
					refreshComponent.refresh(true);
					refreshComponent.endPullDownToRefresh();
				}
			},
			function() {

			});
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	initView: function() {
		mui(aVariable.box.scroll).pullToRefresh({
			// up: {
			// 	callback: function() {
			// 		aFunc.up2Refresh(this);
			// 	}
			// },
			down: {
				callback: function() {
					aFunc.down2Refresh(this);
				}
			}
		})
	},
	plusReady: function() {
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		// aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

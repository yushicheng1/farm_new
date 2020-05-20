var aFunc = {
	initData: function() {
		aVariable.ipt.iptName.innerText = aVariable.params.name;
		aVariable.ipt.iptSum.innerText = aVariable.params.sum;
		aVariable.ipt.iptPlant.innerText = aVariable.params.plant;
		aVariable.ipt.iptGet.innerText = aVariable.params.get;
		aVariable.ipt.iptPrice.innerText = aVariable.params.price;
		aVariable.ipt.iptImage.src = aServer.ApiUrl + aVariable.params.image;
	},
	bindEvent: function() {
		aVariable.btn.btnSubmit.addEventListener("tap", function() {
			var sum = aVariable.params.sum;
			var price = aVariable.ipt.iptPriceReal.value;
			if (price == 0 || price == null) {
				price = aVariable.params.price;
			}

			warehouseServer.sale(aVariable.params.vegetablesId, sum, price, function(data) {
					if (data.status == 200) {
						mui.toast("挂到交易大厅成功");
						var main = plus.webview.currentWebview().opener();
						mui.fire(main, 'refreshWarehouse', {});
						mui.back();
					} else {
						mui.toast(data.msg);
					}
				},
				function() {

				});
			// }
		})
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	initView: function() {

	},
	plusReady: function() {
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		aVariable.webview.current = plus.webview.currentWebview();
		aVariable.params.vegetablesId = aVariable.webview.current.vegetablesId;
		aVariable.params.name = aVariable.webview.current.name;
		aVariable.params.sum = aVariable.webview.current.sum;
		aVariable.params.plant = aVariable.webview.current.plant;
		aVariable.params.get = aVariable.webview.current.get;
		aVariable.params.price = aVariable.webview.current.price;
		aVariable.params.image = aVariable.webview.current.image;
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

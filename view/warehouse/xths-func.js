var aFunc = {
	initData: function() {
		aVariable.ipt.iptName.innerText = aVariable.params.name;
		aVariable.ipt.iptSum.innerText = aVariable.params.sum;
		aVariable.ipt.iptPlant.innerText = aVariable.params.plant;
		aVariable.ipt.iptGet.innerText = aVariable.params.get;
		aVariable.ipt.iptPrice.innerText = aVariable.params.price;
		aVariable.ipt.iptImage.src = aServer.ApiUrl + aVariable.params.image;
		aVariable.ipt.iptcount.innerText = aVariable.params.count;
	},
	bindEvent: function() {
		aVariable.btn.btnSubmit.addEventListener("tap", function() {
			aVariable.btn.btnSubmit.disabled=true;
			var sum = aVariable.params.sum;
			warehouseServer.recycle(aVariable.params.vegetablesId, sum, function(data) {
					if (data.status == 200) {
						mui.toast("回收成功");
						var main = plus.webview.currentWebview().opener();
						mui.fire(main, 'refreshWarehouse', {});
						mui.back();
					} else {
						aVariable.btn.btnSubmit.disabled=false;
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
		aVariable.params.count = aVariable.webview.current.count;
		aFunc.initData();
		aFunc.bindEvent();
	}
};

var aFunc = {
	initData: function() {
		aVariable.ipt.iptName.innerText = aVariable.params.name;
		aVariable.ipt.iptSum.innerText = aVariable.params.sum;
		aVariable.ipt.iptPlant.innerText = aVariable.params.plant;
		aVariable.ipt.iptGet.innerText = aVariable.params.get;
		aVariable.ipt.iptPrice.innerText = aVariable.params.price;
		aVariable.ipt.iptImage.src = aServer.ApiUrl+aVariable.params.image;
	},
	bindEvent: function() {
		aVariable.btn.btnSubmit.addEventListener("tap", function() {
			var num = aVariable.ipt.iptNum.value;
			if (num == 0 || num == null) {
				mui.toast('请填写回收数量');
				return;
			}
			var sum = aVariable.params.sum;
			// if (num > sum) {
			// 	mui.toast("回收数量不能超过剩余数量");
			// 	return;
			// } else {
				warehouseServer.recycle(aVariable.params.vegetablesId, parseFloat(num).toFixed(2), function(data) {
						if (data.status == 200) {
							mui.toast("回收成功");
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
		aFunc.initData();
		aFunc.bindEvent();
	}
};

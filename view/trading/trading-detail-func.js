var aFunc = {
	initData: function() {
		aVariable.ipt.iptName.innerText = aVariable.params.name;
		aVariable.ipt.iptPlant.innerText = aVariable.params.plantTime;
		aVariable.ipt.iptGet.innerText = aVariable.params.getTime;
		aVariable.ipt.iptNum.innerText = aVariable.params.num;
		aVariable.ipt.iptPrice.innerText = aVariable.params.price;
		aVariable.ipt.iptImage.src = aServer.ApiUrl + aVariable.params.image;
		var num = aVariable.params.num;
		var price = aVariable.params.price;
		aVariable.ipt.iptTotal.innerText = parseFloat(num * price).toFixed(2);
	},
	bindEvent: function() {
		aVariable.btn.btnPay.addEventListener("tap", function() {
			var id = aVariable.params.exchange_info_id;
			var num = aVariable.params.num;
			tradingListServer.tradingBuy(id, num, function(data) {
				if (data.status == 200) {
					if (data.data.status == 'SUCCESS') {
						mui.toast('购买成功');
						var main = plus.webview.currentWebview().opener();
						mui.fire(main, 'refreshTrading', {});
						mui.back();
					} else {
						mui.toast(data.msg)
					}
				} else {
					mui.toast(data.msg)
				}
			}, function() {

			});

		})
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		aVariable.webview.current = plus.webview.currentWebview();
		aVariable.params.exchange_info_id = aVariable.webview.current.exchange_info_id;
		aVariable.params.plantTime = aVariable.webview.current.plantTime;
		aVariable.params.getTime = aVariable.webview.current.getTime;
		aVariable.params.name = aVariable.webview.current.name;
		aVariable.params.num = aVariable.webview.current.num;
		aVariable.params.price = aVariable.webview.current.price;
		aVariable.params.image = aVariable.webview.current.image;
		aFunc.initData();
		aFunc.bindEvent();
	}
};

var aFunc = {
	initData: function() {

	},
	bindEvent: function() {
		aVariable.btn.btnNewAdress.addEventListener("tap", function() {
			mui.openWindow({
				id: "addressNew",
				url: '/view/address/address-new.html'
			});
		})
		
		//选择地址
		mui(aVariable.box.addressList).on("tap", "li", function(e) {
			var card = this;
			var aaa = card.getAttribute("data-id");
			var main=plus.webview.currentWebview().opener();
							//自定义事件,事件名为changeAddress
							mui.fire(main,'changeAddress',{aaa:aaa});
							//关闭子页面
							mui.back();
		
		});
	},

	initView: function() {

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

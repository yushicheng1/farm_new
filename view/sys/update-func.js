var aFunc = {
	initData: function() {

	},
	bindEvent: function() {
		aVariable.btn.btnUpdate.addEventListener("tap", function() {
			mui.toast("当前已是最新版本")
		}, false);
	},
	plusReady: function() {
		// if(mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// 	aVariable.webview.current = plus.webview.currentWebview();
		// }
		aFunc.initData();
		aFunc.bindEvent();
	}
};
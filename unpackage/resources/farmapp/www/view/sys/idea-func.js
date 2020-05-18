var aFunc = {
	initData: function() {
		// aboutusServer.getMessage(function(data) {
		// 	if(data.code == 200) {
		// 		aVariable.ipt.iptContent.innerHTML =data.body.content;
		// 	} else {}
		// }, function() {});

	},
	bindEvent: function() {
		aVariable.btn.btnSubmit.addEventListener("tap", function() {
			mui.toast("提交成功");
			aVariable.ipt.iptContent.value="";
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
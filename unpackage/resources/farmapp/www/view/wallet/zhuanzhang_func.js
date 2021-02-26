var aFunc = {
	initData: function() {
		aVariable.ipt.iptNumber.value=123456;
	},
	bindEvent: function() {
		
	},
	plusReady: function() {
		aFunc.initData();
		// aFunc.initView();
		aFunc.bindEvent();
		aVariable.webview.current = plus.webview.currentWebview();
		aVariable.ipt.iptNumber.value=aVariable.webview.current.code;
	}
};

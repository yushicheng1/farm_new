var aFunc = {
	initData: function() {

	},
	bindEvent: function() {
		// aVariable.btn.btnUpdate.addEventListener("tap", function() {
		// 	mui.toast("当前已是最新版本")
		// }, false);
		aVariable.btn.btnService.addEventListener("tap",function(){
			mui.openWindow({
				id: 'service-agreement',
				url: 'service-agreement.html'
			});
		},false);
		aVariable.btn.btnPrivacy.addEventListener("tap",function(){
			// mui.toast("展示隐私协议");
			mui.openWindow({
				id: 'privacy-agreement',
				url: 'privacy-agreement.html'
			});
		},false);
	},
	plusReady: function() {
		// if(mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// 	aVariable.webview.current = plus.webview.currentWebview();
		// }
		plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
		aVariable.ipt.phoneNumber.innerText="当前版本："+wgtinfo.version
		})
		aFunc.initData();
		aFunc.bindEvent();
	}
};
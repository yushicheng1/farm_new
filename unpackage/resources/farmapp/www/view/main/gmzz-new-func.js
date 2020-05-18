var subPages = ["gmzz-zz.html", "gmzz-ym.html"];
var subPageStyle = {
	top: '96px',
	bottom: '0'
}
var aFunc = {
	initData: function() {

	},
	bindEvent: function() {

	},


	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	initView: function() {

	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}

		aVariable.webview.current = plus.webview.currentWebview();

		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();

		var self = plus.webview.currentWebview();
		var page = aVariable.webview.current.page;
		for (var i = 0; i < subPages.length; i++) {
			var sub = plus.webview.create(subPages[i].replace("order/", ""), subPages[i], subPageStyle);
			self.append(sub);
		}
		if (page == 2) {
			plus.webview.show(subPages[1]);
			 activeTab = subPages[1];
			document.getElementById("bbbsChannel_zhongzi").classList.remove('mui-active');
			document.getElementById("bbbsChannel_youmiao").classList.add('mui-active');
		} else {
			plus.webview.show(subPages[0]);
			activeTab = subPages[0];
			document.getElementById("bbbsChannel_zhongzi").classList.add('mui-active');
			document.getElementById("bbbsChannel_youmiao").classList.remove('mui-active');
		}
		mui('.mui-bar-tab').on('tap', 'a', function(e) {
			targetTab = this.dataset.href;
			if (targetTab == activeTab) {
				return;
			}
			plus.webview.show(targetTab);
			//隐藏当前;
			plus.webview.hide(activeTab);
			//更改当前活跃的选项卡
			activeTab = targetTab;
		});
	}
};

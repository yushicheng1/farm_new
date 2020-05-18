var subPages = ["main/zltd-dp.html", "main/zltd-lt.html"];
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
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();

		var self = plus.webview.currentWebview();
		var page = aVariable.webview.current.page;
		for (var i = 0; i < subPages.length; i++) {
			var sub = plus.webview.create(subPages[i].replace("main/", ""), subPages[i], subPageStyle);
			self.append(sub);
		}
		// if (page == 2) {
		// 	plus.webview.show(subPages[1]);
		// 	//底部切換
		// 	var activeTab = subPages[1];
		// 	mui('.mui-tab-item').each(function() {
		// 		this.setAttribute('class', 'mui-tab-item');
		// 	})
		// 	document.getElementById("bbsChannel_lt").setAttribute('class', 'mui-tab-item mui-active');
		// 	plus.webview.show(subPages[1]);
		// 	//隐藏当前;
		// 	plus.webview.hide(subPages[0]);
		// 	//更改当前活跃的选项卡
		// 	activeTab = subPages[1];
		// } else {
			plus.webview.show(subPages[0]);
			//底部切換
			var activeTab = subPages[0];
		// }


		var targetTab = '';
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

		//前往频道
		// window.addEventListener('goChannel', function() {
		// 	mui('.mui-tab-item').each(function() {
		// 		this.setAttribute('class', 'mui-tab-item');
		// 	})
		// 	document.getElementById("bbsChannel_lt").setAttribute('class', 'mui-tab-item mui-active');
		// 	plus.webview.show(subPages[1]);
		// 	//隐藏当前;
		// 	plus.webview.hide(activeTab);
		// 	//更改当前活跃的选项卡
		// 	activeTab = subPages[1];
		// })
	}
};

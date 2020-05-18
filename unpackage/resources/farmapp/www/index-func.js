var closeLoad = false;
mui.init();
var showMenu = false,
	showPop = "";

var subPages = ["view/main/main.html","view/warehouse/warehouse.html","view/my/my.html"];
var subPagesLoad = [false, false, false, false];
var subPageStyle = {
	top: '0',
	bottom: '51px',
	zindex: '0',
	position: 'relative'
}
  
var subPageStyleIos = {
	top: '0',
	bottom: '91px',
	zindex: '0',
	position: 'relative'
}

var self, pkbtn_def, pkbtn_activity, defstyle, deftxt, activetxt, activestyle, activeTab, targetTab, firstPage,
	tabindex;

var aFunc = {
	//检查更新
	updeVersion: function() {
		var local_version;
		var type;
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			local_version = inf.version;
			if (mui.os.android) {
				type = 0;
				indexServer.updateVersion(type, function(data) {
					var android_version = data.body.version;
					var android_desc = data.body.newFeatures;
					if (local_version < android_version) {
						mui.alert(android_desc, "版本更新", "确定", function() {
							plus.runtime.openURL(data.body.url);
						});
					}
				}, function() {});
			} else {
				type = 1;
				indexServer.updateVersion(type, function(data) {
					var ios_version = data.body.version;
					var ios_desc = data.body.newFeatures;
					if (local_version < ios_version) {
						mui.alert(ios_desc, "版本更新", "确定", function() {
							plus.runtime.openURL(data.body.url);
						});
					}
				}, function() {});

			}

		});
	},
	bindEvent: function() {
		//底部菜单点击事件
		//首页
		aVariable.btn.btnPageSy.addEventListener("tap", function() {

			// aVariable.box.pageHome.style.display = "block";
			// aVariable.box.pageJydt.style.display = "none";
			// aVariable.box.pageMine.style.display = "none";
			aVariable.img.imgMenuSy.src = "images/homemenu/sy.png";
			// aVariable.img.imgMenuHy.src = "images/homemenu/hywxz.png";
			// aVariable.img.imgMenuJydt.src = "images/homemenu/jydtwxz.png";
			aVariable.img.imgMenuCk.src = "images/homemenu/ckwxz.png";
			aVariable.img.imgMenuWd.src = "images/homemenu/wdwxz.png";
		});
		//好友
		// aVariable.btn.btnPageHy.addEventListener("tap", function() {
		// 	aVariable.img.imgMenuSy.src = "images/homemenu/sywxz.png";
		// 	aVariable.img.imgMenuHy.src = "images/homemenu/hy.png";
		// 	aVariable.img.imgMenuJydt.src = "images/homemenu/jydtwxz.png";
		// 	aVariable.img.imgMenuCk.src = "images/homemenu/ckwxz.png";
		// 	aVariable.img.imgMenuWd.src = "images/homemenu/wdwxz.png";
		// });
		//交易大厅
		// aVariable.btn.btnPageJydt.addEventListener("tap", function() {
		// 	aVariable.img.imgMenuSy.src = "images/homemenu/sywxz.png";
		// 	// aVariable.img.imgMenuHy.src = "images/homemenu/hywxz.png";
		// 	// aVariable.img.imgMenuJydt.src = "images/homemenu/jydt.png";
		// 	aVariable.img.imgMenuCk.src = "images/homemenu/ckwxz.png";
		// 	aVariable.img.imgMenuWd.src = "images/homemenu/wdwxz.png";
		// });
		//仓库
		aVariable.btn.btnPageCk.addEventListener("tap", function() {
			aVariable.img.imgMenuSy.src = "images/homemenu/sywxz.png";
			// aVariable.img.imgMenuHy.src = "images/homemenu/hywxz.png";
			// aVariable.img.imgMenuJydt.src = "images/homemenu/jydtwxz.png";
			aVariable.img.imgMenuCk.src = "images/homemenu/ck.png";
			aVariable.img.imgMenuWd.src = "images/homemenu/wdwxz.png";
		});
		//我的
		aVariable.btn.btnPageWd.addEventListener("tap", function() {
			aVariable.img.imgMenuSy.src = "images/homemenu/sywxz.png";
			// aVariable.img.imgMenuHy.src = "images/homemenu/hywxz.png";
			// aVariable.img.imgMenuJydt.src = "images/homemenu/jydtwxz.png";
			aVariable.img.imgMenuCk.src = "images/homemenu/ckwxz.png";
			aVariable.img.imgMenuWd.src = "images/homemenu/wd.png";
		});
	},

	initData: function() {
		// var slider = mui("#slider_one");
		// slider.slider({
		//  interval:1500
		// });
	},
	/***
	 * 自动登陆
	 */
	initLogin: function() {
		// var token = LocalStorage.getItem(LocalStorage.keys.Auth_Token);
		// if(token == null || token == '') {
		// mui.openWindow({
		// 	id: 'login',
		// 	url: '/view/sys/login.html',
		// 	extras: {}
		// });
		// 	return;
		// } else {
		// 	aFunc.getUserInfo();
		// }
		// mui.openWindow({
		// 	id: 'login',
		// 	url: '/view/sys/login.html',
		// 	extras: {}
		// });
	},
	getUserInfo: function() {
		//存在 获取用户信息
		indexServer.getUserInfo(function(data) {
			if (data.code == 200) {
				console.log(JSON.stringify(data.body));
				aVariable.ipt.txtUserName.innerText = data.body.baseInfo.name;
				LocalStorage.setItem(LocalStorage.keys.User_Id, data.body.id);
			}
		}, function() {});
	},
	//图片加载失败
	nofind: function(item) {
		item.src = "images/default.png";
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		self = plus.webview.currentWebview();
		// storage.init();
		plus.navigator.setStatusBarBackground('#fff');
		plus.navigator.setStatusBarStyle('dark');
		// aVariable.webview.current = plus.webview.currentWebview();
		//				if(mui.os.android)
		//					document.getElementsByClassName('mui-scroll')[0].className = '';
		aFunc.initLogin();
		// 绑定事件
		aFunc.bindEvent();
		aFunc.initData();

		if (mui.os.android) {
			for (var i = 0; i < subPages.length; i++) {
				var sub = plus.webview.create(subPages[i], subPages[i], subPageStyle);
				if (i == 0) {
					firstPage = sub;
				}
				self.append(sub);
			}
		} else {
			console.log(screen.height);
			if (screen.height >= 812) {
				for (var i = 0; i < subPages.length; i++) {
					var sub = plus.webview.create(subPages[i], subPages[i], subPageStyleIos);
					if (i == 0) {
						firstPage = sub;
					}
					self.append(sub);
				}
			}else{
				for (var i = 0; i < subPages.length; i++) {
					var sub = plus.webview.create(subPages[i], subPages[i], subPageStyle);
					if (i == 0) {
						firstPage = sub;
					}
					self.append(sub);
				}
			}
		}

		plus.webview.show(subPages[0]);

		//底部切換
		activeTab = "view/main/main.html";
		mui('.mui-bar-tab').on('tap', 'a', function(e) {
			targetTab = this.dataset.href;
			tabindex = this.dataset.index;
			if (targetTab == 'my/user.html') {
				plus.navigator.setStatusBarBackground('#13D1BE');
				plus.navigator.setStatusBarStyle('light');
			} else {
				plus.navigator.setStatusBarBackground('#fff');
				plus.navigator.setStatusBarStyle('dark');
			}
			// updatePKBtn(0);
			if (targetTab == activeTab) {
				return;
			}

			// log("我是第" + tabindex + ",targetTab=" + targetTab)
			plus.webview.show(targetTab); //显示页面
			if (subPagesLoad[tabindex] == false) {
				mui.fire(plus.webview.getWebviewById(targetTab), 'refreshPage'); //初次刷新页面
				subPagesLoad[tabindex] = true;
			}
			//隐藏当前;
			plus.webview.hide(activeTab);
			//更改当前活跃的选项卡
			activeTab = targetTab;
		});

		//监听popover的状态，用于按下Back的时候逻辑处理
		// mui('body').on('shown', '.mui-popover', function(e) {
		// 	//		plus.nativeUI.closeWaiting();
		// 	showPop = true
		// })

		// var backButtonPress = 0;
		// mui.back = function(event) {
		// 	backButtonPress++;
		// 	if(backButtonPress > 1) {
		// 		plus.runtime.quit();
		// 	} else {
		// 		plus.nativeUI.toast('再按一次退出应用');
		// 	}
		// 	setTimeout(function() {
		// 		backButtonPress = 0;
		// 	}, 1000);
		// 	return false;
		// };
	},
	initMessage: function() {

		var info = plus.push.getClientInfo();

		// 监听点击消息事件
		plus.push.addEventListener("click", function(msg) {
			//plus.ui.alert(msg.content);
		}, false);
		// 监听在线消息事件
		plus.push.addEventListener("receive", function(msg) {
			if (msg.aps) { // Apple APNS message
				console.log("接收到在线APNS消息：");
			} else {
				console.log("接收到在线透传消息：");
			}
			//			plus.nativeUI.alert(msg.content);
			//创建本地消息
			//			plus.push.createMessage(msg.content, "", {
			//				cover: false
			//			});
			//
			//			mui.openWindow({
			//				id: 'aboutus',
			//				url: '/view/sys/aboutus.html'
			//			});
		});
	},
	initPushSetting: function() {
		var mainActivity = plus.android.runtimeMainActivity();
		var notificationManager = mainActivity.getSystemService(Context.NOTIFICATION_SERVICE);
		var appIntent = new Intent(Intent.ACTION_MAIN, null);
		appIntent.addCategory(Intent.CATEGORY_LAUNCHER);
		appIntent.setComponent(new ComponentName(mainActivity, mainActivity.getClass()));
		appIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);

		var contentIntent = PendingIntent.getActivity(mainActivity, 0, appIntent, 0);

		var builder = new Notification.Builder(mainActivity);
		builder.setContentIntent(contentIntent);
		builder.setSmallIcon(17301620);
		builder.setAutoCancel(true);
		//		builder.setContentTitle( & quot; title & quot;);
		//		builder.setContentText( & quot; content & quot;);
		builder.setDefaults(Notification.DEFAULT_ALL);

	}
};

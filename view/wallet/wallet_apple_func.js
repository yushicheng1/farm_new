var payObject = plus.ios.newObject("PayObject");
var IAPOrders = ['danongzhu_jifenchongzhi1_6', 'danongzhu_jifenchongzhi1_30', 'danongzhu_jifenchongzhi1_68',
	'danongzhu_jifenchongzhi1_198', 'danongzhu_jifenchongzhi1_348', 'danongzhu_jifenchongzhi1_648'
];
var aFunc = {
	initData: function() {
		var patInfo = plus.ios.invoke(payObject, "iniSS:", "null");
		//默认选中第一个套餐
		var tc = document.getElementsByClassName('li-xz')[0];
		aVariable.ipt.iptMoney.innerText = tc.getAttribute("data-price");
		aVariable.params.apple_id = tc.getAttribute("data-id");
		//获取我的积分
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				LocalStorage.setItem(LocalStorage.keys.User_Money, data.data.money);
				aVariable.ipt.iptJiFen.innerHTML = LocalStorage.getItem(LocalStorage.keys.User_Money);
			} else {

			}
		}, function() {

		});

	},
	bindEvent: function() {
		//绑定套餐选择事件
		mui(aVariable.box.moneyList).on("tap", "li", function(e) {
			var card = this;
			document.getElementsByClassName('li-xz')[0].className = 'li-wxz'
			card.className = 'li-xz'
			aVariable.ipt.iptMoney.innerText = card.getAttribute("data-price");
			aVariable.params.apple_id = card.getAttribute("data-id");
		});

		aVariable.btn.btnPay.addEventListener("tap", function() {
			aVariable.btn.btnPay.disabled=true;
			var id = aVariable.params.apple_id;
			if (id == '' || id == null) {
				mui.toast('请选择套餐');
				return;
			}
			plus.payment.request(iapChannel, {
				"productid": id,
				"username": "appusername",
				"quantity": 1,
			}, function(result) {
				aVariable.btn.btnPay.disabled=false;
				//调用OC的方法；
				var patInfo = plus.ios.invoke(payObject, "encode:", "null");
				
				walletServer.chargeApple(patInfo, function(data) {
					if (data.status == 200) {
						mui.toast('支付成功!');
						plus.ios.invoke(payObject, "finish:", "null");
						mui.fire(main, 'getMoney', {});
						mui.back();
					} else {
						mui.toast('支付失败!');
					}
				}, function() {

				});

			}, function(e) {
				aVariable.btn.btnPay.disabled=false;
				// plus.nativeUI.alert("更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html", null, "支付失败：" + e.code);
			});
		})
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		//获取支付通道
		plus.payment.getChannels(function(s) {
			for (var i in s) {
				if (s[i].id == 'appleiap') {
					iapChannel = s[i];
					iapChannel.requestOrder(IAPOrders, function(event) {

					}, function(errormsg) {
						console.log("获取支付通道失败：" + errormsg.message);
					});
				}
			};
		}, function(e) {
			alert("获取支付通道列表失败：" + e.message);
		});

		aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

var channel = null;
var ALIPAYSERVER = aServer.ApiUrl + 'api/wallet/charge';
var WXPAYSERVER = '';
var total = 0;
var aFunc = {
	initData: function() {
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
			var money = aVariable.ipt.iptMoney.innerText;
			if (money == '' || money == undefined || money == 0) {
				mui.toast('充值金额不能为零');
				return;
			}
			
			total = parseFloat(money);
			console.log(total)
			// pay('alipay');
			pay_new();
		})
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		// 获取支付通道
		plus.payment.getChannels(function(channels) {
			channel = channels[0];
		}, function(e) {
			alert("获取支付通道失败：" + e.message);
		});

		aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

function pay_new() {
	walletServer.charge(total, function(data) {
		// console.log(data.data)
		var zhifu=data.data
		plus.payment.request(channel, zhifu.toString(), function(result) {
			plus.nativeUI.alert("支付成功！", function() {
				var main = plus.webview.currentWebview().opener();
				mui.fire(main, 'getMoney', {});
				mui.back();
			});
		}, function(error) {
			plus.nativeUI.alert("支付失败!");
		});

	}, function() {

	});
}

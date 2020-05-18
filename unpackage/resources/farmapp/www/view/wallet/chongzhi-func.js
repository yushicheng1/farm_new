var channel = null;
var ALIPAYSERVER = aServer.ApiUrl + 'api/wallet/charge';
var WXPAYSERVER = '';
var total = 0;
var aFunc = {
	initData: function() {

	},
	bindEvent: function() {
		aVariable.btn.btnChongzhi.addEventListener("tap", function() {
			var money = aVariable.ipt.iptMoney.value;
			if (money == '' || money == undefined || money == 0) {
				mui.toast('充值金额不能为零');
				return;
			}

			total = parseFloat(money);
			console.log(total)
			// pay('alipay');
			pay_new();

			// walletServer.charge(money, function(data) {
			// 		if (data.status == 200) {
			// 			location.reload();
			// 			mui.toast('充值成功');
			// 			var main = plus.webview.currentWebview().opener();
			// 			mui.fire(main, 'getMoney', {});
			// 		} else {
			// 			mui.toast('充值失败');
			// 		}
			// 	},
			// 	function() {

			// 	});
		})
	},

	initView: function() {

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
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

function pay(id) {
	// 从服务器请求支付订单  
	var PAYSERVER = '';
	if (id == 'alipay') {
		PAYSERVER = ALIPAYSERVER;
	} else if (id == 'wxpay') {
		PAYSERVER = WXPAYSERVER;
	} else {
		plus.nativeUI.alert("不支持此支付通道！", null, "");
		return;
	}
	var xhr = new XMLHttpRequest(); //uni-app中请使用uni的request api联网  
	xhr.open('POST', PAYSERVER);
	xhr.setRequestHeader('Authorization', 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token));
	var data = new FormData();
	data.append("pay_number", total);
	data.append("pay_type", 'alipay');
	xhr.onreadystatechange = function() {
		switch (xhr.readyState) {
			case 4:
				if (xhr.status == 200) {
					console.log(xhr.responseText)
					plus.payment.request(channel, xhr.responseText, function(result) {
						plus.nativeUI.alert("支付成功！", function() {
							back();
						});
					}, function(error) {
						plus.nativeUI.alert("支付失败：" + error.code);
					});
				} else {
					alert("获取订单信息失败！");
				}
				break;
			default:
				break;
		}
	}

	xhr.send(data);
}

function pay_new() {
	// walletServer.charge(total,function(data){
	// 	console.log(data);

	// 	plus.payment.request(channel,data,function(result){
	// 	    plus.nativeUI.alert("支付成功！",function(){  
	// 	        back();  
	// 	    });  
	// 	},function(error){  
	// 	    plus.nativeUI.alert("支付失败：" + error.code);  
	// 	});  
	// },function(){

	// })
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

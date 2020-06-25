var aFunc = {
	initData: function() {
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptMoney.innerHTML =data.data.real_money;
			} else {

			}
		}, function() {

		});
		
		bankServer.getMoney(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptYue.innerHTML =data.msg;
			} else {
		
			}
		}, function() {
		
		});

	},
	bindEvent: function() {
		aVariable.btn.btnRecord.addEventListener("tap", function() {
			mui.openWindow({
				id: "moneyRecord",
				url: '/view/wallet/money-record.html'
			});
		})

		aVariable.btn.btnTixian.addEventListener("tap", function() {
			// mui.toast('暂未开放');
			mui.openWindow({
				id: "tixian_before",
				url: 'tixian-before.html'
			});
		})

		aVariable.btn.btnYhk.addEventListener("tap", function() {
			bankServer.getThirdInfo(function(data) {
				if (data.status == 200) {
					if(data.data.isSignContract){
						mui.openWindow({
							id: "tixian",
							url: 'tixian.html'
						});
					}else{
						mui.toast('请前往个人中心签订电子协议');
					}
				} else {
			
				}
			}, function() {
			
			});
			
			bankServer.getBankList(function(data) {
				if (data.status == 200) {
					if(data.data.length>0){
						mui.openWindow({
							id: "tixian",
							url: 'tixian.html'
						});
					}else{
						mui.toast('请前往个人中心绑定银行卡');
					}
				} else {
			
				}
			}, function() {
			
			});
			
			// mui.openWindow({
			// 	id: "tixian",
			// 	url: 'tixian.html'
			// });
		})

		window.addEventListener('getMoney', function(e) {
			aFunc.initData();
		});

		// aVariable.btn.btnExtract.addEventListener("tap", function() {
		// 	var money = aVariable.ipt.iptExtract.value;
		// 	var number = aVariable.ipt.iptNumber.value;
		// 	var name = aVariable.ipt.iptName.value;
		// 	if (money == '' || money == undefined || money == 0) {
		// 		mui.toast('提现金额不能为零');
		// 		return;
		// 	}

		// 	if (number == '' || number == undefined) {
		// 		mui.toast('支付宝账号不能为空');
		// 		return;
		// 	}

		// 	if (name == '' || name == undefined) {
		// 		mui.toast('姓名不能为空');
		// 		return;
		// 	}
		// 	var type = 'alipay';
		// 	var bankAddress = '';
		// 	walletServer.extract(money, type, number, bankAddress, name, function(data) {
		// 			if (data.status == 200) {
		// 				myServer.getUserInfo(function(data) {
		// 					if (data.status == 200) {
		// 						LocalStorage.setItem(LocalStorage.keys.User_Money, data.data.money);
		// 						location.reload();
		// 						mui.toast('提现成功');
		// 					} else {
		// 						mui.toast('提现失败');
		// 					}
		// 				}, function() {
		// 					mui.toast('提现失败');
		// 				});

		// 			} else {
		// 				mui.toast('提现失败');
		// 			}
		// 		},
		// 		function() {

		// 		});
		// })
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
	}
};

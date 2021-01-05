var aFunc = {
	initData: function() {
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				LocalStorage.setItem(LocalStorage.keys.User_Money, data.data.money);
				aVariable.ipt.iptMoney.innerHTML = LocalStorage.getItem(LocalStorage.keys.User_Money);
			} else {

			}
		}, function() {

		});
		
		//发起绑定请求
		bankServer.createMember(function(data) {
			console.log(JSON.stringify(data));
			if (data.status == 200) {
		
			} else {
		
			}
		}, function() {
		
		});

	},
	bindEvent: function() {
		aVariable.btn.btnRecord.addEventListener("tap", function() {
			mui.openWindow({
				id: "walletRecord",
				url: '/view/wallet/wallet-record.html'
			});
		})

		aVariable.btn.btnChongzhi.addEventListener("tap", function() {
			bankServer.getBankList(function(data) {
				if (data.status == 200) {
					if(data.data.length>0){
						plus.runtime.getProperty(plus.runtime.appid, function(inf) {
							if (mui.os.android) {			
								mui.openWindow({
									id: "chongzhi",
									url: '/view/wallet/wallet_android.html'
								});
							} else {
								mui.openWindow({
									id: "chongzhi",
									url: '/view/wallet/wallet_android.html'
								});				
							}						
						});
					}else{
						mui.toast('请先绑定银行卡')
						mui.openWindow({
							id: "wdyhk",
							url: '/view/my/wdyhk.html'
						});	
					}
				} else {
			
				}
			}, function() {
			
			});
			
		})
		
		aVariable.btn.btnChongzhiOther.addEventListener("tap", function() {
			bankServer.getBankList(function(data) {
				if (data.status == 200) {
					if(data.data.length>0){
						plus.runtime.getProperty(plus.runtime.appid, function(inf) {							
								mui.openWindow({
									id: "chongzhiother",
									url: '/view/wallet/wallet_other.html'
								});			
						});
					}else{
						mui.toast('请先绑定银行卡')
						mui.openWindow({
							id: "wdyhk",
							url: '/view/my/wdyhk.html'
						});	
					}
				} else {
			
				}
			}, function() {
			
			});
			
		})

		// aVariable.btn.btnTixian.addEventListener("tap", function() {
		// 	mui.openWindow({
		// 		id: "tixian",
		// 		url: '/view/wallet/tixian.html'
		// 	});
		// })

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

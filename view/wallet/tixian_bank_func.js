var aFunc = {
	initData: function() {
		// var rules=JSON.parse(LocalStorage.getItem(LocalStorage.keys.Rules));
		// var to_bank_description=rules.to_bank_description;
		// aVariable.box.ruleOne.innerHTML+=to_bank_description;
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptTixian.innerText = "您有" + data.data.real_money + "元可提现";
				aVariable.params.money = data.data.real_money;
				aVariable.params.token = data.data.token;
				console.log(data.data.token)
			} else {
		
			}
		}, function() {
		
		});

		bankServer.defaultBank(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptName.innerText = data.data.bankname;
				aVariable.ipt.iptNo.innerText = data.data.cardnumber;
				aVariable.params.cardId = data.data.id;
			} else {

			}
		}, function() {

		});

		bankServer.getBankList(function(data) {
			if (data.status == 200) {
				aVariable.box.bankList.innerHTML += aUi.bank.bankTwoList(data.data);
			} else {

			}
		}, function() {

		});

		// bankServer.getThirdInfo(function(data) {
		// 	if (data.status == 200) {
		// 		aVariable.params.phone = data.data.phone;
		// 	} else {

		// 	}
		// }, function() {

		// });
	},
	bindEvent: function() {
		mui(aVariable.box.bankList).on("tap", "li", function(e) {
			aVariable.params.cardId = this.getAttribute("data-cardId");
			aVariable.params.no = this.getAttribute("data-no");
			aVariable.params.name = this.getAttribute("data-name");
		});


		aVariable.btn.btnPay.addEventListener("tap", function() {
			mui('#popover').popover('hide');
			if (aVariable.params.name == '' || aVariable.params.name == null || aVariable.params.no == '' || aVariable.params
				.no == null) {

			} else {
				aVariable.ipt.iptName.innerText = aVariable.params.name;
				aVariable.ipt.iptNo.innerText = aVariable.params.no;
			}
		})

		aVariable.btn.btnQuanbu.addEventListener("tap", function() {
			aVariable.ipt.iptTxje.value = aVariable.params.money;
		})

		aVariable.btn.btnSubmit.addEventListener("tap", function() {
			aVariable.btn.btnSubmit.disabled=true;
			var btnArray = ['是', '否'];
			mui.confirm("确定要提现吗?", "提示", btnArray, function(e) {
				if (e.index == 0) {
					var money =parseFloat(aVariable.ipt.iptTxje.value).toFixed(2);
					if(money>parseFloat(aVariable.params.money)){
						mui.toast('可提现余额不足');
						aVariable.btn.btnSubmit.disabled=false;
					}else{
						bankServer.extract(money, 'bank',aVariable.params.token,aVariable.params.cardId, function(data) {
								if (data.status == 200) {
									mui.toast(data.msg);
									var my = plus.webview.getWebviewById('my');
									mui.fire(my, 'refreshJf', {});
									//刷新积分界面
									var main = plus.webview.currentWebview().opener();
									mui.fire(main, 'getMoney', {});
									mui.back();
								} else {
									mui.toast(data.msg);
									aVariable.btn.btnSubmit.disabled=false;
								}
							},
							function() {
						
							});
					}
				} else {
			aVariable.btn.btnSubmit.disabled=false;
				}
			});
			
		
		})
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

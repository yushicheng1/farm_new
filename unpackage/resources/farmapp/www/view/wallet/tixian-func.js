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
				console.log(aVariable.params.token)
				bankServer.defaultBank(function(data1) {
					if (data1.status == 200) {
						aVariable.ipt.iptName.innerText = data1.data.bankname;
						aVariable.ipt.iptNo.innerText = data1.data.cardnumber;
						aVariable.params.cardId = data1.data.id;
					} else {
				
					}
				}, function() {
				
				});
				
				bankServer.getBankList(function(data2) {
					if (data2.status == 200) {
						aVariable.box.bankList.innerHTML += aUi.bank.bankTwoList(data2.data);
					} else {
				
					}
				}, function() {
				
				});
			} else {
		
			}
		}, function() {
		
		});
	},
	bindEvent: function() {
		//绑定支付方式选择事件
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
			
			var money = parseFloat(aVariable.ipt.iptTxje.value).toFixed(2);
			var bankId = aVariable.params.cardId;
			if(bankId==null||bankId==''){
				mui.toast('请选择银行卡');
				return;
			}
			var phone = aVariable.params.phone;
			console.log(bankId)
			console.log(aVariable.params.token)
			if(money>parseFloat(aVariable.params.money)){
				mui.toast('可提现余额不足');
			}else{
				bankServer.extractNew(money,'bank',bankId,aVariable.params.token,function(data) {
					console.log(JSON.stringify(data))
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
			// bankServer.withDraw(money, bankId, function(data) {
			// 		if (data.status == 200) {
			// 			var zhifu = data.data.bizOrderNo;
			// 			var a = mui.prompt('已发送至' + phone, '', '验证码', ['取消', '确认'], function(e) {
			// 				if (e.index == 1) {
			// 					var agreeCode = document.getElementById("ipt-agree-code").value;
			// 					bankServer.confirmDraw(zhifu, agreeCode, function(data) {
			// 						if (data.status == 200) {
			// 							plus.nativeUI.alert("提现成功！", function() {
			// 								//刷新我的界面的积分
			// 								var my = plus.webview.getWebviewById('my');
			// 								mui.fire(my, 'refreshJf', {});
			// 								//刷新积分界面
			// 								var main = plus.webview.currentWebview().opener();
			// 								mui.fire(main, 'getMoney', {});
			// 								mui.back();
			// 							});
			// 						} else {
			// 							mui.toast(data.msg);
			// 						}
			// 					}, function() {

			// 					});

			// 				} else {
			// 					console.log('取消');
			// 				}
			// 			}, 'div');
			// 			var lihh = document.querySelector('.mui-popup-input');
			// 			lihh.innerHTML =
			// 				'<input  id="ipt-agree-code" type="number" style="height:40px;text-align: center;width: 50%;"></input>';
			// 		} else {
			// 			mui.toast(data.msg);
			// 		}
			// 	},
			// 	function() {

			// 	});
				}
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

var aFunc = {
	initData: function() {
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				LocalStorage.setItem(LocalStorage.keys.User_Money, data.data.money);
				aVariable.ipt.iptTixian.innerText = "您有" + data.data.real_money + "元可提现";
				aVariable.params.money = data.data.real_money;
				aVariable.params.token = data.data.token;
			} else {

			}
		}, function() {

		});

		// bankServer.getBankList(function(data) {
		// 			if (data.status == 200) {
		// aVariable.box.bankList.innerHTML += aUi.bank.bankOneList(data.data);
		// 			} else {

		// 			}
		// 		}, function() {

		// 		});
	},
	bindEvent: function() {
		// //为选择单选选项添加监听事件
		// document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected',function(e){
		//      // console.log("当前选中的文本值为："+e.detail.el.innerText);

		// });

		// //绑定支付方式选择事件
		// mui(aVariable.box.bankList).on("tap", "li", function(e) {
		// 	aVariable.params.cardId = this.getAttribute("data-cardId");
		// 	aVariable.params.no = this.getAttribute("data-no");
		// 	aVariable.params.name = this.getAttribute("data-name");
		// });


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
						bankServer.extract(money, 'bank',aVariable.params.token, function(data) {
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



		aVariable.btn.btnQuanbu.addEventListener("tap", function() {
			aVariable.ipt.iptTxje.value = aVariable.params.money;
		})

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
		// 				location.reload();
		// 				var main = plus.webview.currentWebview().opener();
		// 				mui.fire(main, 'getMoney', {});					
		// 				mui.toast('提现成功');
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

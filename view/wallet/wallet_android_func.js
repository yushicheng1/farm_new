var zfchannel = null;
var wxchannel = null;
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
				// console.log(JSON.stringify(data.data))
				LocalStorage.setItem(LocalStorage.keys.User_Money, data.data.money);
				aVariable.ipt.iptJiFen.innerHTML = LocalStorage.getItem(LocalStorage.keys.User_Money);
				aVariable.params.real_money=data.data.real_money;
				aVariable.ipt.realMoney.innerText='('+data.data.real_money+')'+'(试运行)';
			} else {

			}
		}, function() {

		});

		bankServer.getBankList(function(data) {
			if (data.status == 200) {
				aVariable.box.bankList.innerHTML = aUi.bank.bankOneList(data.data)+aVariable.box.bankList.innerHTML;
			} else {

			}
		}, function() {

		});

		bankServer.createMember(function(data) {
			if (data.status == 200) {

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

		//绑定支付方式选择事件
		mui(aVariable.box.bankList).on("tap", "li", function(e) {
			var card = this;
			aVariable.params.type = card.getAttribute("data-type");
			aVariable.params.phone = card.getAttribute("data-phone");
			aVariable.params.cardId = card.getAttribute("data-cardId");
		});

		aVariable.btn.btnPay.addEventListener("tap", function() {
			var money = aVariable.ipt.iptMoney.innerText;
			if (money == '' || money == undefined || money == 0) {
				mui.toast('充值金额不能为零');
				return;
			}

			total = parseFloat(money);
			pay_new();
		})

		aVariable.btn.btnNew.addEventListener("tap", function() {
			mui.openWindow({
				id: "newcard",
				url: '/view/my/bangding.html'
			});
		})

		window.addEventListener('refreshBank', function(e) {
			myServer.getUserInfo(function(data) {
				if (data.status == 200) {
					// console.log(JSON.stringify(data.data))
					LocalStorage.setItem(LocalStorage.keys.User_Money, data.data.money);
					aVariable.ipt.iptJiFen.innerHTML = LocalStorage.getItem(LocalStorage.keys.User_Money);
					aVariable.params.real_money=data.data.real_money;
					bankServer.getBankList(function(data) {
						if (data.status == 200) {
							var html = '<li class="mui-table-view-cell" data-type="1" style="color: #000000;" >' +
								'<a class="mui-navigate-right">支付宝<span style="color: red;">(千分之二手续费)</a>' +
								'</li>';+
								'<li class="mui-table-view-cell" data-type="2" style="color: #000000;" >' +
									'<a class="mui-navigate-right">微信<span style="color: red;">(千分之二手续费)</a>' +
									'</li>';
									'<li class="mui-table-view-cell" data-type="4" style="color: #000000;" >' +
										'<a class="mui-navigate-right">余额<span style="color: red;">('+aVariable.params.real_money+')(试运行)</a>' +
										'</li>';
							aVariable.box.bankList.innerHTML = html + aUi.bank.bankOneList(data.data);
						} else {
					
						}
					}, function() {
					
					});
				} else {
			
				}
			}, function() {
			
			});
			
			
		});
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		// 获取支付通道
		plus.payment.getChannels(function(channels) {
			for (var i in channels) { 
			                        if (channels[i].id == "wxpay") { 
			                             wxchannel=channels[i];  
			                        }else{ 
			                            zfchannel=channels[i];  
			                        } 
			                    }     
		}, function(e) {
			alert("获取支付通道失败：" + e.message);
		});

		aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

function pay_new() {
	var type = aVariable.params.type;
	var phone = aVariable.params.phone;
	var cardId = aVariable.params.cardId;
	if (type == 1) {
		mui('#popover').popover('hide');
		bankServer.getThirdInfo(function(data) {
			if (data.status == 200) {
				if (data.data.isPhoneChecked) {
					//正式环境参数传alipay  测试环境参数传alipayThird
					walletServer.charge(total, 'alipay', '', function(data) {
						// console.log(data.data
						if(data.status=='400'){
							mui.toast(data.msg);
						}
						var zhifu = data.data;

						plus.payment.request(zfchannel, zhifu[0].toString(), function(result) {
							plus.nativeUI.alert("支付成功！", function() {
								//刷新土地界面的积分
								var plant = plus.webview.getWebviewById('plant');
								mui.fire(plant, 'refreshJifen', {});
								//刷新我的界面的积分
								var my = plus.webview.getWebviewById('my');
								mui.fire(my, 'refreshJf', {});
								//刷新积分界面
								var main = plus.webview.currentWebview().opener();
								mui.fire(main, 'getMoney', {});
								mui.back();
							});
						}, function(error) {
							plus.nativeUI.alert("支付失败!");
						});
					}, function() {

					});

				} else {
					mui.toast('请先绑定手机号');
					mui.openWindow({
						id: "bdsjh",
						url: '/view/my/phone.html'
					});
				}
			} else {

			}
		}, function() {

		});
	} else if(type==2){
		mui('#popover').popover('hide');
		bankServer.getThirdInfo(function(data) {
			if (data.status == 200) {
				if (data.data.isPhoneChecked) {
					//正式环境参数传alipay  测试环境参数传alipayThird
					walletServer.charge(total, 'weixin', '', function(data) {
						// console.log(data.data
						if(data.status=='400'){
							mui.toast(data.msg);
						}
						var zhifu = data.data;
						plus.payment.request(wxchannel, zhifu[0], function(result) {
							plus.nativeUI.alert("支付成功！", function() {
								//刷新土地界面的积分
								var plant = plus.webview.getWebviewById('plant');
								mui.fire(plant, 'refreshJifen', {});
								//刷新我的界面的积分
								var my = plus.webview.getWebviewById('my');
								mui.fire(my, 'refreshJf', {});
								//刷新积分界面
								var main = plus.webview.currentWebview().opener();
								mui.fire(main, 'getMoney', {});
								mui.back();
							});
						}, function(error) {
							plus.nativeUI.alert("支付失败!");
						});
					}, function() {
		
					});
		
				} else {
					mui.toast('请先绑定手机号');
					mui.openWindow({
						id: "bdsjh",
						url: '/view/my/phone.html'
					});
				}
			} else {
		
			}
		}, function() {
		
		});
	}else if (type == 3) {
		mui('#popover').popover('hide');
		bankServer.getThirdInfo(function(data) {
			if (data.status == 200) {
				if (data.data.isPhoneChecked) {
					walletServer.charge(total, 'bank', cardId, function(data) {
						var zhifu = data.data;
						console.log(zhifu)
						var a = mui.prompt('已发送至' + phone, '', '验证码', ['取消', '确认'], function(e) {
							if (e.index == 1) {
								var agreeCode = document.getElementById("ipt-agree-code").value;
								walletServer.ConfirmCharge(zhifu[0], agreeCode, function(data) {
									if (data.status == 200) {
										plus.nativeUI.alert("支付成功！", function() {
											//刷新土地界面的积分
											var plant = plus.webview.getWebviewById('plant');
											mui.fire(plant, 'refreshJifen', {});
											//刷新我的界面的积分
											var my = plus.webview.getWebviewById('my');
											mui.fire(my, 'refreshJf', {});
											//刷新积分界面
											var main = plus.webview.currentWebview().opener();
											mui.fire(main, 'getMoney', {});
											mui.back();
										});
									} else {
										mui.toast(data.msg);
									}
								}, function() {

								});

							} else {
								console.log('取消');
							}
						}, 'div');
						var lihh = document.querySelector('.mui-popup-input');
						lihh.innerHTML =
							'<input  id="ipt-agree-code" type="number" style="height:40px;text-align: center;width: 50%;"></input>';

					}, function() {

					});
				} else {
					mui.toast('请先绑定手机号');
					mui.openWindow({
						id: "bdsjh",
						url: '/view/my/phone.html'
					});
				}
			} else {

			}
		}, function() {

		});
	} else if (type == 0) {
		mui.toast('请选择支付方式');
	}else if(type==4){
		var btnArray = ['是', '否'];
		mui.confirm("确定要用余额充值吗?", "提示", btnArray, function(e) {
			if (e.index == 0) {
				mui('#popover').popover('hide');
				bankServer.getThirdInfo(function(data) {
					if (data.status == 200) {
						if (data.data.isPhoneChecked) {
							//正式环境参数传alipay  测试环境参数传alipayThird
							walletServer.charge(total, 'realmoney', '', function(data) {
								// console.log(data.data
								if(data.status=='400'){
									mui.toast(data.msg);
								}
								if(data.status=='200'){
									mui.toast(data.data)
									//刷新土地界面的积分
									var plant = plus.webview.getWebviewById('plant');
									mui.fire(plant, 'refreshJifen', {});
									//刷新我的界面的积分
									var my = plus.webview.getWebviewById('my');
									mui.fire(my,'refreshJf', {});
									//刷新积分界面
									var main = plus.webview.currentWebview().opener();
									mui.fire(main, 'getMoney', {});
									mui.back();
								}
							}, function() {
				
							});
				
						} else {
							mui.toast('请先绑定手机号');
							mui.openWindow({
								id: "bdsjh",
								url: '/view/my/phone.html'
							});
						}
					} else {
				
					}
				}, function() {
				
				});
			} else {
		
			}
		});
	}
}

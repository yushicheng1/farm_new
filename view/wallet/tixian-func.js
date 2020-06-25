var aFunc = {
	initData: function() {
		bankServer.getMoney(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptTixian.innerText ="您有"+data.msg+"元可提现";
			} else {
		
			}
		}, function() {
		
		});
		
		bankServer.defaultBank(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptName.innerText =data.data.bankname;
				aVariable.ipt.iptNo.innerText =data.data.cardnumber;
				aVariable.params.phone=data.data.phone;
				aVariable.params.cardId =data.data.id;
			} else {
		
			}
		}, function() {
		
		});
		
		bankServer.getBankList(function(data) {
					if (data.status == 200) {
		aVariable.box.bankList.innerHTML += aUi.bank.bankOneList(data.data);
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
			if(aVariable.params.name==''||aVariable.params.name==null||aVariable.params.no==''||aVariable.params.no==null){
				
			}else{
				aVariable.ipt.iptName.innerText=aVariable.params.name;
				aVariable.ipt.iptNo.innerText=aVariable.params.no;
			}		
		})
		
		aVariable.btn.btnQuanbu.addEventListener("tap", function() {
			aVariable.ipt.iptTxje.value=aVariable.params.money;
		})
	
		aVariable.btn.btnSubmit.addEventListener("tap", function() {
			var money =parseFloat(aVariable.ipt.iptTxje.value).toFixed(2);
			var bankId=aVariable.params.cardId;
			var phone=aVariable.params.phone;
			bankServer.withDraw(money, bankId, function(data) {
					if (data.status == 200) {
						var zhifu = data.data.bizOrderNo;
						var a = mui.prompt('已发送至' + phone, '','验证码' , ['取消', '确认'], function(e) {
							if (e.index == 1) {
								var agreeCode = document.getElementById("ipt-agree-code").value;
								bankServer.confirmDraw(zhifu, agreeCode, function(data) {
									if (data.status == 200) {
										plus.nativeUI.alert("提现成功！", function() {
											//刷新我的界面的积分
											var my = plus.webview.getWebviewById('my');
											mui.fire(my,'refreshJf', {});
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
					} else {
						mui.toast(data.msg);
					}
				},
				function() {

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

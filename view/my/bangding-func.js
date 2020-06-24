var aFunc = {
	initData: function() {
		//发起绑定请求
		bankServer.createMember(function(data) {
			console.log(JSON.stringify(data));
			if (data.status == 200) {

			} else {

			}
		}, function() {

		});
	},
	// initView: function() {
	// 	//获取银行卡
	// 	bankServer.getBankList(function(data) {
	// 		console.log(JSON.stringify(data));
	// 		if (data.status == 200) {

	// 		} else {

	// 		}
	// 	}, function() {

	// 	});
	// },
	bindEvent: function() {
		//登录验证码
		aVariable.btn.btnCode.addEventListener('tap', function(event) {
			//验证身份
			var name = aVariable.ipt.iptName.value;
			var idNo = aVariable.ipt.iptIdCard.value;
			if (name == "") {
				mui.toast("请填写姓名!");
				return;
			}
			if (idNo == "") {
				mui.toast("请填写身份证号码!");
				return;
			}
			bankServer.checkRealName(name, idNo, function(data) {
				console.log(JSON.stringify(data));
				if (data.status == 200) {
					//发送验证码
					if (aVariable.value.code == true) {
						var phone = aVariable.ipt.iptPhone.value;
						if (phone == "") {
							mui.toast("请填写手机号!");
							return;
						}

						if (!(/^1[3456789]\d{9}$/.test(phone))) {
							mui.toast("请输入正确的手机号码");
							return;
						}

						bankServer.getVerifyCode(phone, function(data) {
							console.log(JSON.stringify(data))
							if (data.status == 200) {

							} else {
								mui.toast(data.msg);
							}
						}, function() {

						});
						aFunc.freshBtnNew(60)
					}

				} else {
					mui.toast(data.msg)
				}
			}, function() {

			});

		})

		aVariable.btn.btnSubmit.addEventListener('tap', function(event) {
			// var a = mui.prompt(' ', '', '请输入验证码', ['取消', '确认'], function(e) {
			// 	if (e.index == 1) {
			// 		var agreeCode = document.getElementById("ipt-agree-code").value;
			// 	} else {
			// 		console.log('取消');
			// 	}
			// }, 'div');
			// var lihh = document.querySelector('.mui-popup-input');
			// lihh.innerHTML =
			// 	'<input id="ipt-agree-code" type="number" style="height:40px;text-align: center;width: 50%;"></input>';


			//绑定手机
			var phone = aVariable.ipt.iptPhone.value;
			var code = aVariable.ipt.iptCode.value;
			var name = aVariable.ipt.iptName.value;
			var idNo = aVariable.ipt.iptIdCard.value;
			var bankNo = aVariable.ipt.iptBank.value.replace(/\s+/g, "");
			if (name == "") {
				mui.toast("请填写姓名!");
				return;
			}
			if (idNo == "") {
				mui.toast("请填写身份证号码!");
				return;
			}
			if (bankNo == "") {
				mui.toast("请填写银行卡号!");
				return;
			}
			if (phone == "") {
				mui.toast("请填写手机号!");
				return;
			}
			if (code == "") {
				mui.toast("请填写验证码!");
				return;
			}

			//綁定手机
			bankServer.bindPhone(phone, code, function(data) {
				console.log(JSON.stringify(data));
				if (data.status == 200) {
					//绑定银行卡
					bankServer.bindBankCard(name, phone, bankNo, idNo, function(data) {
						// console.log(data.data.tranceNum);
						if (data.status == 200) {

							var a = mui.prompt(' ', '', '请输入验证码', ['取消', '确认'], function(e) {
								if (e.index == 1) {
									var agreeCode = document.getElementById("ipt-agree-code").value;
									var tranceNum = data.data.tranceNum;
									bankServer.agreeBind(phone, tranceNum, agreeCode, function(data) {
										console.log(JSON.stringify(data))
										if (data.status == 200) {
											mui.toast('绑定成功');
											var list = plus.webview.currentWebview().opener();
											mui.fire(list, 'refreshBank');
											mui.back();
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
							lihh.innerHTML = '<input  id="ipt-agree-code" type="number" style="height:40px;text-align: center;width: 50%;"></input>';

						} else {
							mui.toast(data.msg);
						}
					}, function() {

					});

				} else {
					mui.toast(data.msg);
				}
			}, function() {

			});
		})
	},
	plusReady: function() {
		aFunc.initData();
		// aFunc.initView();
		aFunc.bindEvent();
	},
	freshBtnNew: function(num) {
		// console.log(num)
		var getSmsBtn = document.getElementById('btn-code');
		num--;
		if (num == 0) {
			getSmsBtn.innerText = "重新发送";
			aVariable.value.code = true;
			num = 5;
			return false;
		} else {
			//var sec_counts = 120-num;
			aVariable.value.code = false;
			getSmsBtn.innerText = "验证码(" + num + ")";
		}
		setTimeout("aFunc.freshBtnNew(" + num + ")", 1000);
	}
};

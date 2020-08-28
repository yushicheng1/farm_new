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

		bankServer.getThirdInfo(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptName.value = data.data.name;
				aVariable.ipt.iptIdCard.value = data.data.identityCardNo;
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
		// aVariable.btn.btnCode.addEventListener('tap', function(event) {
		// 	//验证身份
		// 	var name = aVariable.ipt.iptName.value;
		// 	var idNo = aVariable.ipt.iptIdCard.value;
		// 	if (name == "") {
		// 		mui.toast("请填写姓名!");
		// 		return;
		// 	}
		// 	if (idNo == "") {
		// 		mui.toast("请填写身份证号码!");
		// 		return;
		// 	}
		// 	bankServer.checkRealName(name, idNo, function(data) {
		// 		console.log(JSON.stringify(data));
		// 		if (data.status == 200) {
		// 			//发送验证码
		// 			if (aVariable.value.code == true) {
		// 				var phone = aVariable.ipt.iptPhone.value;
		// 				if (phone == "") {
		// 					mui.toast("请填写手机号!");
		// 					return;
		// 				}

		// 				if (!(/^1[3456789]\d{9}$/.test(phone))) {
		// 					mui.toast("请输入正确的手机号码");
		// 					return;
		// 				}

		// 				bankServer.getVerifyCode(phone, function(data) {
		// 					console.log(JSON.stringify(data))
		// 					if (data.status == 200) {

		// 					} else {
		// 						mui.toast(data.msg);
		// 					}
		// 				}, function() {

		// 				});
		// 				aFunc.freshBtnNew(60)
		// 			}

		// 		} else {
		// 			mui.toast(data.msg)
		// 		}
		// 	}, function() {

		// 	});

		// })

		aVariable.btn.btnSubmit.addEventListener('tap', function(event) {
			bankServer.getThirdInfo(function(data) {
				if (data.data.isIdentityChecked) {
					mui.toast('您已实名认证');
				} else {
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
							mui.toast(data.msg);
							mui.back();
						} else {
							mui.toast(data.msg);
						}
					}, function() {

					});
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

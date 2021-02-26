var aFunc = {
	verifyValue: function() {
		//@TODO 增加校验内容
		return true;
	},
	bindEvent: function() {
		aVariable.btn.btnBack.addEventListener('tap', function(event) {
			mui.back();
		});

		aVariable.btn.btnYzm.addEventListener('tap', function(event) {
			aVariable.value.suiji=Math.random();
			// sysServer.getYzmImg(function(data) {
				aVariable.btn.btnYzm.src = 'http://farmapi.yiqianyun.com/api/verify_code?code='+aVariable.value.suiji; 
				// aVariable.btn.btnYzm.src = 'http://farmapi.yiqianyun.com/api/verify_code'
			// }, function() {

			// });
		})

		//验证码
		aVariable.btn.btnCode.addEventListener('tap', function(event) {
			if (aVariable.value.code == true) {
				var phone = aVariable.ipt.iptAccount.value;
				var code = aVariable.ipt.iptImgCode.value;
				if (phone == "") {
					mui.toast("请填写手机号!");
					return;
				}

				if (!(/^1[3456789]\d{9}$/.test(phone))) {
					alert("请输入正确的手机号码");
					return;
				}

				if (code.trim() == '') {
					mui.toast("请填写验证码!");
					return;
				}


				sysServer.getVerify(phone, code,aVariable.value.suiji, 'reset', function(data) {
					console.log(JSON.stringify(data))
					if (data.status == "400") {
						mui.toast(data.msg);
					} else {
						aFunc.freshBtn(60);
					}
				}, function() {

				});
			}
		})
		//确认修改
		aVariable.btn.btnEdit.addEventListener('tap', function(event) {
			console.log(123)
			var account = aVariable.ipt.iptAccount.value;
			var code = aVariable.ipt.iptCode.value;
			var passwordOne = aVariable.ipt.iptPasswordOne.value;
			var passwordTwo = aVariable.ipt.iptPasswordTwo.value;
			if (account == "") {
				mui.toast("手机号不能为空");
				return;
			}
			if (!(/^1[3456789]\d{9}$/.test(account))) {
				alert("请输入正确的手机号码");
				return;
			}
			if (code == "") {
				mui.toast("验证码不能为空");
				return;
			}
			if (passwordOne == "") {
				mui.toast("密码不能为空");
				return;
			}
			if (passwordOne.trim().length < 6 || passwordOne.trim().length > 20) {
				mui.toast("请输入6-20位的密码");
				return;
			}
			if (passwordTwo == "") {
				mui.toast("确认密码不能为空");
				return;
			}
			if (passwordOne != passwordTwo) {
				mui.toast("两次输入密码不一致");
				return;
			}
			sysServer.findPsw(account, code, passwordOne, function(data) {
				console.log(JSON.stringify(data))
				if (data.status == "200") {
					mui.toast('密码重置成功')
					mui.back();
				} else {
					mui.toast(data.msg);
				}
			}, function() {

			});

		})
	},
	initData: function() {
		var random=Math.random();
		aVariable.value.suiji=random;
		aVariable.btn.btnYzm.src = 'http://farmapi.yiqianyun.com/api/verify_code?code='+aVariable.value.suiji; 
		// var account = LocalStorage.getItem(LocalStorage.keys.account);
		// var password = LocalStorage.getItem(LocalStorage.keys.password);
		// if(account && password) {
		// 	aVariable.ipt.account.value = account;
		// 	aVariable.ipt.password.value = password;
		// }
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
			aVariable.webview.current = plus.webview.currentWebview();
		}
		aFunc.initData();
		// 绑定事件
		aFunc.bindEvent();
	},
	freshBtn: function(num) {
		console.log(num)
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
		setTimeout("aFunc.freshBtn(" + num + ")", 1000);
	}
};

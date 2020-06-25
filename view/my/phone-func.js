var aFunc = {
	initData: function() {

	},
	bindEvent: function() {
		//登录验证码
		aVariable.btn.btnCode.addEventListener('tap', function(event) {
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
		})

		aVariable.btn.btnSubmit.addEventListener('tap', function(event) {
			//绑定手机
			var phone = aVariable.ipt.iptPhone.value;
			var code = aVariable.ipt.iptCode.value;

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
					mui.toast(data.msg);
					mui.back();
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

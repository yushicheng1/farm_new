var aFunc = {
	initData: function() {
		bankServer.createMember(function(data) {
			if (data.status == 200) {

			} else {

			}
		}, function() {

		});
	},
	bindEvent: function() {
		aVariable.btn.btnSubmit.addEventListener('tap', function(event) {
			//绑定手机
			var phone = aVariable.ipt.iptPhone.value;
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


			//修改綁定手机
			bankServer.updatePhone(name,idNo,phone,bankNo, function(data) {
				if (data.status == 200) {
					var a = mui.prompt(' ', '', '请输入验证码', ['取消', '确认'], function(e) {
						if (e.index == 1) {
							var agreeCode = document.getElementById("ipt-agree-code").value;
							var tranceNum = data.data.tranceNum;
							bankServer.agreeUpdate(phone, tranceNum, agreeCode, function(data) {
								if (data.status == 200) {
									mui.toast(data.msg);
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
					lihh.innerHTML =
						'<input  id="ipt-agree-code" type="number" style="height:40px;text-align: center;width: 50%;"></input>';
					
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
	}
};

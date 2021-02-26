var aFunc = {
	initData: function() {
		//发起绑定请求
		// bankServer.createMember(function(data) {
		// 	console.log(JSON.stringify(data));
		// 	if (data.status == 200) {

		// 	} else {

		// 	}
		// }, function() {

		// });


	},
	bindEvent: function() {
		aVariable.btn.btnSubmit.addEventListener('tap', function(event) {
			var name = aVariable.ipt.iptName.value;
			var idNo = aVariable.ipt.iptIdCard.value;
			var number = aVariable.ipt.iptNumber.value;
			if (name == "") {
				mui.toast("请填写姓名!");
				return;
			}
			if (idNo == "") {
				mui.toast("请填写银行卡号!");
				return;
			}
			if (number == "") {
				mui.toast("请填写转账金额!");
				return;
			}
			var btnArray = ['是', '否'];
			mui.confirm("确定要提交吗?", "提示", btnArray, function(e) {
				if (e.index == 0) {
					walletServer.largecharge(name, idNo, number, function(data) {
						aVariable.ipt.iptName.value = '';
						aVariable.ipt.iptIdCard.value = '';
						aVariable.ipt.iptNumber.value = '';
						if (data.status == 200) {
							mui.openWindow({
								id: "zhuanzhang",
								url: '/view/wallet/zhuanzhang.html',
								extras: {
									code: data.msg
								}
							});
						} else {
							mui.toast(data.msg);
						}
					}, function() {

					});
				} else {

				}
			})
		})

		aVariable.btn.btnRecord.addEventListener('tap', function(event) {
			mui.openWindow({
				id: "zhuanzhangrecord",
				url: '/view/wallet/zhuanzhang-record.html'
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

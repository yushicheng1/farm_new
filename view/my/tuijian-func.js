var aFunc = {
	initData: function() {
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptName.innerText = data.data.realname;
				aVariable.ipt.iptPhone.innerText = data.data.phone;
				aVariable.ipt.iptYaoqing.innerText = data.data.spread_code;
				aVariable.ipt.iptCardNo.innerText = data.data.idnumber.substr(0, 3) + "***********" + data.data.idnumber.substr(
					14);
			}
		}, function() {

		});
	},
	bindEvent: function() {
		aVariable.btn.btnBack.addEventListener('tap', function(event) {
			console.log(111111111)
			mui.back()
		})
	},

	initView: function() {

	},
	plusReady: function() {
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

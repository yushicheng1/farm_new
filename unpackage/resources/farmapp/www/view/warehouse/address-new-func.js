var aFunc = {
	initData: function() {

	},
	bindEvent: function() {
		aVariable.ipt.iptArea.addEventListener('tap', function(event) {
			cityPicker3.show(function(items) {
				aVariable.ipt.iptArea.value = _getParam(items[0], 'text') + " " + _getParam(items[1],
					'text') + " " + _getParam(items[2], 'text');
				//返回 false 可以阻止选择框的关闭
				//return false;
			});

		}, false);

		aVariable.btn.btnSave.addEventListener('tap', function(event) {
			var is_default = 0;
			var name = aVariable.ipt.iptName.value;
			var address = aVariable.ipt.iptArea.value.split(' ');
			var province = address[0];
			var city = address[1];
			var district = address[2];
			var detail = aVariable.ipt.iptAddress.value;
			var phone = aVariable.ipt.iptPhone.value;
			var ipt_default = aVariable.ipt.iptDefault.checked;
			if (ipt_default) {
				is_default = 1;
			}
			if (name == '' || name == undefined) {
				mui.toast('姓名不能为空');
				return;
			}
			if (province == '' || province == undefined || city == '' || city == undefined || district ==
				undefined) {
				mui.toast('所在地区不能为空');
				return;
			}
			if (detail == '' || detail == undefined) {
				mui.toast('详细地址不能为空');
				return;
			}
			if (phone == '' || phone == undefined) {
				mui.toast('手机号不能为空');
				return;
			}
			if (!(/^1[3456789]\d{9}$/.test(phone))) {
				alert("请输入正确的手机号码");
				return;
			}
			myServer.addAddress(name, phone, province, city, district, detail, is_default, function(data) {
					if (data.status == 200) {
						var list = plus.webview.currentWebview().opener();
						mui.fire(list, 'wrefresh');
						mui.back();
					} else {
						mui.toast(data.msg)
					}
				},
				function() {

				});
			// mui.back()

		}, false);
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

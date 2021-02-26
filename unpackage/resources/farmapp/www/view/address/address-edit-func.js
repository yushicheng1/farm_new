var aFunc = {
	initData: function() {
		aVariable.ipt.iptName.value = aVariable.params.name;
		aVariable.ipt.iptArea.value = aVariable.params.province + " " + aVariable.params.city + " " + aVariable.params.district;
		aVariable.ipt.iptAddress.value = aVariable.params.detail;
		aVariable.ipt.iptPhone.value = aVariable.params.phone;
		if (aVariable.params.is_default == 1) {
			aVariable.ipt.iptDefault.checked = true;
		}
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
			if (province == '' || province == undefined || city == '' || city == undefined ||  district ==
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
			
			myServer.editAddress(aVariable.webview.current.addressId, name, phone, province, city, district, detail,
				is_default,
				function(data) {
					if (data.status == 200) {
						var list = plus.webview.currentWebview().opener();
						mui.fire(list, 'refresh');
						mui.back();
					} else {

					}
				},
				function() {

				});
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
		aVariable.params.addressId = aVariable.webview.current.addressId;
		aVariable.params.name = aVariable.webview.current.name;
		aVariable.params.phone = aVariable.webview.current.phone;
		aVariable.params.province = aVariable.webview.current.province;
		aVariable.params.city = aVariable.webview.current.city;
		aVariable.params.district = aVariable.webview.current.district;
		aVariable.params.detail = aVariable.webview.current.detail;
		aVariable.params.is_default = aVariable.webview.current.is_default;
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

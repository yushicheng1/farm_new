var aFunc = {
	initData: function() {
		aVariable.ipt.iptPlantName.innerText = aVariable.params.name;
		aVariable.ipt.iptSum.innerText = aVariable.params.sum;
		aVariable.ipt.iptPlant.innerText = aVariable.params.plant;
		aVariable.ipt.iptGet.innerText = aVariable.params.get;
		aVariable.ipt.iptImage.src = aServer.ApiUrl+aVariable.params.image;
	},
	bindEvent: function() {
		aVariable.btn.btnChoose.addEventListener("tap", function() {
			mui.openWindow({
				id: "waddress",
				url: 'address.html'
			});
		})

		aVariable.btn.btnChooseNew.addEventListener("tap", function() {
			mui.openWindow({
				id: "waddress",
				url: 'address.html'
			});
		})

		aVariable.btn.btnYouji.addEventListener("tap", function() {
			var num = aVariable.ipt.iptNum.value;
			if (num == 0 || num == null) {
				mui.toast('请填写邮寄数量');
				return;
			}
			var vegetablesId = aVariable.params.vegetablesId;
			var addressId = aVariable.params.addressId;
			var sum = aVariable.params.sum;
			if (addressId == '' || addressId == null) {
				mui.toast('请选择地址');
				return;
			}
			// if (num > sum) {
			// 	mui.toast('邮寄数量超出剩余数量');
			// 	return;
			// }

			warehouseServer.sendToHmoe(vegetablesId, addressId, parseFloat(num).toFixed(2), function(data) {
				if (data.status == 200) {
					if (data.data.status == 'SUCCESS') {
						mui.toast('邮寄成功')
						mui.back();
					} else {
						mui.toast(data.msg)
					}
				} else {}
			}, function() {

			});
		})

		window.addEventListener('wchoose', function(e) {
			aVariable.params.addressId = e.detail.addressId;
			aVariable.ipt.iptName.innerText = e.detail.name;
			aVariable.ipt.iptPhone.innerText = e.detail.phone;
			aVariable.ipt.iptAddress.innerText = e.detail.province + e.detail.city + e.detail.district + e.detail.detail;
			aVariable.btn.btnChoose.hidden = "";
			aVariable.btn.btnChooseNew.hidden = "hidden";
		})
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	initView: function() {

	},
	plusReady: function() {
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		aVariable.webview.current = plus.webview.currentWebview();
		aVariable.params.vegetablesId = aVariable.webview.current.vegetablesId;
		aVariable.params.name = aVariable.webview.current.name;
		aVariable.params.sum = aVariable.webview.current.sum;
		aVariable.params.plant = aVariable.webview.current.plant;
		aVariable.params.get = aVariable.webview.current.get;
		aVariable.params.image = aVariable.webview.current.image;
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

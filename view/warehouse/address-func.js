var aFunc = {
	initData: function() {
		myServer.getAddressList(function(data) {
				if (data.status == 200) {
					aVariable.box.addressList.innerHTML = aUi.address.addressListNew(data.data);
				} else {

				}
			},
			function() {

			});
	},
	bindEvent: function() {
		aVariable.btn.btnNewAdress.addEventListener("tap", function() {
			mui.openWindow({
				id: "waddressNew",
				url: 'address-new.html'
			});
		})

		//修改地址
		mui(aVariable.box.addressList).on("tap", "li", function(e) {
			var card = this;
			var addressId = card.getAttribute("data-id");
			var name = card.getAttribute("data-name");
			var phone = card.getAttribute("data-phone");
			var province = card.getAttribute("data-province");
			var city = card.getAttribute("data-city");
			var district = card.getAttribute("data-district");
			var detail = card.getAttribute("data-detail");
			var list = plus.webview.currentWebview().opener();
			mui.fire(list, 'wchoose',{
				addressId:addressId,
				name:name,
				phone:phone,
				province:province,
				city:city,
				district:district,
				detail:detail
				});
			mui.back();
			// var name = card.getAttribute("data-name");
			// var phone = card.getAttribute("data-phone");
			// var province = card.getAttribute("data-province");
			// var city = card.getAttribute("data-city");
			// var district = card.getAttribute("data-district");
			// var detail = card.getAttribute("data-detail");
			// var is_default = card.getAttribute("data-default");
			// mui.openWindow({
			// 	id: "waddressEdit",
			// 	url: '/view/address/address-edit.html',
			// 	extras: {
			// 		addressId: addressId,
			// 		name: name,
			// 		phone: phone,
			// 		province: province,
			// 		city: city,
			// 		district: district,
			// 		detail: detail,
			// 		is_default: is_default
			// 	}
			// });
		});

		window.addEventListener('wrefresh', function() {
			location.reload();
		})

		mui(aVariable.box.scroll).on("tap", ".mui-btn", function(e) {
			console.log('删除')
			var btnArray = ['是', '否'];
			var li = this.parentNode.parentNode;
			var id = li.getAttribute("data-id");

			mui.confirm("确定要删除吗?", "提示", btnArray, function(e) {
				if (e.index == 0) {
					myServer.deleteAddress(id, function(data) {
						if (data.status == 200) {
							// li.parentNode.removeChild(li);
							location.reload();
						} else {
							mui.swipeoutClose(li);
						}
					}, function() {
						mui.swipeoutClose(li);
					});
				} else {
					mui.swipeoutClose(li);
				}
			});
		});
	},

	initView: function() {

	},
	plusReady: function() {
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		// aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

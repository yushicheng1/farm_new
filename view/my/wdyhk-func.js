var aFunc = {
	initData: function() {
		bankServer.getBankList(function(data) {
			if (data.status == 200) {
				aVariable.box.bankList.innerHTML = aUi.bank.bankList(data.data);
			} else {

			}
		}, function() {

		});
	},
	bindEvent: function() {
		mui(aVariable.box.scroll).on("tap", "li", function(e) {
			var bank_id = this.getAttribute('data-id');
			aVariable.value.bank_id = bank_id;
			console.log(bank_id);
			var btnArray = [{
				title: "设为默认"
			},{"解除绑定"}];
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: btnArray
			}, function(event) {
				var index = event.index;
				switch (index) {
					case 1:
						bankServer.setDefaultBank(aVariable.value.bank_id,function(data) {
							if (data.status == 200) {
								mui.toast(data.msg);
								aFunc.initData();
							} else {
								mui.toast(data.msg);
							}
						}, function() {

						});
						break;
					case 2:
                       bankServer.unbind(aVariable.value.bank_id,function(data) {
                       	if (data.status == 200) {
                       		mui.toast(data.msg);
                       		aFunc.initData();
                       	} else {
                       		mui.toast(data.msg);
                       	}
                       }, function() {
                       
                       });
						break;
				}
			});
		}, function() {

		});
		// var seedName = card.getAttribute("data-name");
		// var seedImg = card.getAttribute("data-img");
		// mui.openWindow({
		// 	id: "gmzz_detail",
		// 	url: 'gmzz-detail.html',
		// 	extras: {
		//                 seedId:seedId,
		// 	   seedName:seedName,
		// 	   seedImg:seedImg
		// 	}
		// });
		// });
		//添加银行卡
		aVariable.btn.btnAdd.addEventListener("tap", function() {
			// myServer.getUserInfo(function(data) {
			// 	if (data.status == 200) {
			// 		if (data.data.is_signed == 0) {
			// 			bankServer.createMember(function(data) {
			// 				if (data.status == 200) {
			// 					bankServer.signContract(function(data) {
			// 						if (data.status == 200) {
			// 							mui.openWindow({
			// 								id: "dzxy",
			// 								url: 'xieyi.html',
			// 								extras: {
			// 									url: data.msg
			// 								}
			// 							});
			// 						} else {

			// 						}
			// 					}, function() {

			// 					});
			// 				} else {

			// 				}
			// 			}, function() {

			// 			});

			// 		} else {
			// 			mui.openWindow({
			// 				id: "newcard",
			// 				url: 'bangding.html'
			// 			});
			// 		}
			// 	}
			// }, function() {

			// });
			mui.openWindow({
				id: "newcard",
				url: 'bangding.html'
			});
		})
		window.addEventListener('refreshBank', function() {
			location.reload();
		})
	},

	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	plusReady: function() {
		aFunc.initData();
		aFunc.bindEvent();
	}
};

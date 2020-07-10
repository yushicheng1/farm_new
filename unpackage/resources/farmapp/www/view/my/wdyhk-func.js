var aFunc = {
	initData: function() {
		bankServer.getBankList(function(data) {
			if (data.status == 200) {
aVariable.box.bankList.innerHTML=aUi.bank.bankList(data.data);
			} else {

			}
		}, function() {

		});


	},
	bindEvent: function() {
		//查看详情
		// mui(aVariable.box.scroll).on("tap", "li button", function(e) {
		// 	var id = this.getAttribute("data-id");
		// 	tradingListServer.withDraw(id,function(data) {
		// 		if (data.status == 200) {
		// 			mui.toast('下架成功');
		// 		  aFunc.down2Refresh();
		// 		} else {

		// 		}
		// 	}, function() {

		// 	});
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

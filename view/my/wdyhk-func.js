var aFunc = {
	initData: function() {
		bankServer.getBankList(function(data) {
			if (data.status == 200) {

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
			mui.openWindow({
				id: "newcard",
				url: 'bangding.html'
			});
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

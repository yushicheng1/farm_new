var aFunc = {
	initData: function() {
		console.log('11')
		// noticeServer.getSliderList(pages, size, function(data) {
		// 		if(data.code == 200) {
		// 			var imgLen = data.body.length;
		// 			if(imgLen > 1) {
		// 				var sliderInfo = aUi.notice.sliderInfo(data.body);
		// 				//轮播图  ---动态生成
		// 				var outputimg = sliderInfo.item;
		// 				var outputright = sliderInfo.indicator;
		// 				aVariable.box.sliderImg.innerHTML = outputimg;
		// 				aVariable.box.sliderIndicator.innerHTML = outputright;

		// 				mui('#box-slider-notice').slider({
		// 					interval: 3000
		// 				});

		// 			} else {

		// 			}
		// 		}
		// 	},
		// 	function() {

		// 	});

	},
	bindEvent: function() {

		//查看详情
		// mui(aVariable.box.scroll).on("tap", "li", function(e) {
		// 	var card = this;
		// 	// var noticeId = card.getAttribute("data-id");
		// 	mui.openWindow({
		// 		id: "noticeDetail",
		// 		url: '/view/notice/notice-detail.html',
		// 		extras: {

		// 		}

		// 	});
		// });

		aVariable.btn.btnWarehouseRecord.addEventListener("tap", function() {
			mui.openWindow({
				id: "warehouseRecord",
				url: '/view/warehouse/warehouse-record.html',
				extras: {

				}

			});
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

		// aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

var aFunc = {
	initData: function() {
		 // var slider = mui("#slider_one");
		 //        slider.slider({
		 //            interval: 1500
		 //        });
				
				$('#countdown17').ClassyCountdown({
					theme: "flat-colors-very-wide",
					end: '1'
				});
		// var id = aVariable.params.noticeId;
		sysServer.getBanner(function(data) {
			if(data.status == 200) {
				console.log(JSON.stringify(data))
				var imgLen = data.data.length;
				if(imgLen > 1) {
					var sliderInfo = aUi.main.sliderInfo(data.data);
					//轮播图  ---动态生成
					var outputimg = sliderInfo.item;
					var outputright = sliderInfo.indicator;
					aVariable.box.sliderImg.innerHTML = outputimg;
					// aVariable.box.sliderIndicator.innerHTML = outputright;
				
					mui('#slider_one').slider({
						interval: 2000
					});
				
				} else {
				
				}
			}
		}, function() {
		
		});
		
		sysServer.getSeedHot(1, function(data) {
			if(data.status == 200) {
				console.log(JSON.stringify(data))
				aVariable.div.divRt.innerHTML=aUi.seed.hotList(data.data)
				console.log(1)
			}
		}, function() {

		});

	},
	bindEvent: function() {
		aVariable.btn.btnWdnc.addEventListener("tap", function() {
			mui.openWindow({
				id: "plant",
				url: 'plant.html'
			});
		});
		aVariable.btn.btnGmzz.addEventListener("tap", function() {
			mui.openWindow({
				id: "gmzz",
				url: 'gmzz-new.html'
			});
		});
		aVariable.btn.btnJydt.addEventListener("tap", function() {
			// mui.toast('暂未开放')
			mui.openWindow({
				id: "jytt",
				url: '../trading/trading-list.html'
			});
		});
		aVariable.btn.btnTgm.addEventListener("tap", function() {
			sysServer.getSpreadCode(function(data) {
					if (data.status == 200) {
						mui.alert(data.msg,'我的邀请码','确定',function(){},'div')
					} else {
                        mui.toast('获取失败')
					}
				},
				function() {

				});			
			// mui.toast("暂未开放")
		});
		
		//查看详情
		mui(aVariable.div.divRt).on("tap", "div", function(e) {
			var card = this;
			var seedId = card.getAttribute("data-id");
			var seedName = card.getAttribute("data-name");
			var seedImg = card.getAttribute("data-image");
			mui.openWindow({
				id: "gmzz_detail",
				url: 'gmzz-detail.html',
				extras: {
			       seedId:seedId,
				   seedName:seedName,
				   seedImg:seedImg
				}
			});
		});
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		aVariable.webview.current = plus.webview.currentWebview();
		// aVariable.params.noticeId = aVariable.webview.current.noticeId;
		// console.log(aVariable.params.noticeId);
		// var page = null;
		// page = mui.preload({
		// 	url: 'plant.html',
		// 	id: 'plant'
		// });
		aFunc.initData();
		mui.previewImage();
		aFunc.bindEvent();
	}
};

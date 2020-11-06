var aFunc = {
	initData: function() {
		sysServer.getData(function(data) {
			if (data.status == 200) {
				$('#countdown17').ClassyCountdown({
					theme: "flat-colors-very-wide",
					end: '1',
					wendu: data.data.temperature,
					shidu: data.data.humidity,
					eyht: data.data.ppm,
					shiwai: data.data.out_temperature
				});
			} else {


			}
		}, function() {

		});
		setInterval(function() {
			document.getElementById('countdown17').innerHTML = '';
			sysServer.getData(function(data) {
				if (data.status == 200) {
					$('#countdown17').ClassyCountdown({
						theme: "flat-colors-very-wide",
						end: '1',
						wendu: data.data.temperature,
						shidu: data.data.humidity,
						eyht: data.data.ppm,
						shiwai: data.data.out_temperature
					});
				} else {


				}
			}, function() {

			});
		}, 600000);
		sysServer.getNotice(function(data) {
			if (data.status == 200) {
				aVariable.params.number = data.data.length;
				if (data.data.length > 0) {
					alertTwo(data.data);
				}
			} else {


			}
		}, function() {

		});


		sysServer.getBanner(function(data) {
			if (data.status == 200) {
				var imgLen = data.data.length;
				if (imgLen > 1) {
					var sliderInfo = aUi.main.sliderInfo(data.data);
					//轮播图  ---动态生成
					var outputimg = sliderInfo.item;
					var outputright = sliderInfo.indicator;
					aVariable.box.sliderImg.innerHTML = outputimg;
					mui('#slider_one').slider({
						interval: 2000
					});
				} else {

				}
			}
		}, function() {

		});

		sysServer.getSeedHot(1, function(data) {
			if (data.status == 200) {
				aVariable.div.divRt.innerHTML = aUi.seed.hotList(data.data);
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
				id: "grzx",
				url: '../my/my.html'
			});
		});
		aVariable.btn.btnJydt.addEventListener("tap", function() {
			// mui.toast('暂未开放')
			// mui.openWindow({
			// 	id: "jiankong",
			// 	url: '../sys/jiankong.html'
			// });

			mui.openWindow({
				id: "trading",
				url: '../trading/trading-list.html'
			});
			// mui.openWindow({
			// 	id: "my",
			// 	url: '../my/my.html'
			// });
		});
		aVariable.btn.btnTgm.addEventListener("tap", function() {
			sysServer.getSpreadCode(function(data) {
					if (data.status == 200) {
						mui.alert(data.msg, '我的邀请码', '复制', function() {
							if (mui.os.ios) {
								//ios
								var UIPasteboard = plus.ios.importClass("UIPasteboard");
								var generalPasteboard = UIPasteboard.generalPasteboard();
								//设置/获取文本内容:
								generalPasteboard.plusCallMethod({
									setValue: data.msg,
									forPasteboardType: "public.utf8-plain-text"
								});
								generalPasteboard.plusCallMethod({
									valueForPasteboardType: "public.utf8-plain-text"
								});
							} else {
								//安卓
								var context = plus.android.importClass("android.content.Context");
								var main = plus.android.runtimeMainActivity();
								var clip = main.getSystemService(context.CLIPBOARD_SERVICE);
								plus.android.invoke(clip, "setText", data.msg);
								mui.toast('复制成功');
							}
						}, 'div')
					} else {
						mui.toast('获取失败')
					}
				},
				function() {

				});
			// mui.toast("暂未开放")
		});

		aVariable.btn.btnService.addEventListener("tap", function() {
			mui.openWindow({
				id: 'service-agreement',
				url: '../sys/service-agreement.html'
			});
		}, false);
		aVariable.btn.btnPrivacy.addEventListener("tap", function() {
			// mui.toast("展示隐私协议");
			mui.openWindow({
				id: 'privacy-agreement',
				url: '../sys/privacy-agreement.html'
			});
		}, false);

		//查看详情
		mui(aVariable.div.divRt).on("tap", "div", function(e) {
			var card = this;
			var seedId = card.getAttribute("data-id");
			var seedName = card.getAttribute("data-name");
			var seedImg = card.getAttribute("data-image");
			var shengzhang = card.getAttribute("data-shengzhang");
			var jieguo = card.getAttribute("data-jieguo");
			var chanliang = card.getAttribute("data-chanliang");
			mui.openWindow({
				id: "gmzz_detail",
				url: 'gmzz-detail.html',
				extras: {
					seedId: seedId,
					seedName: seedName,
					seedImg: seedImg,
					shengzhang: shengzhang,
					jieguo: jieguo,
					chanliang: chanliang
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


var i = 0;

function alertTwo(data) {
	mui.alert(data[i].msg, data[i].title, '下一条', function() {
		i = i + 1;
		if (i == aVariable.params.number - 1) {
			alertThree(data[i]);
		} else {
			alertTwo(data);
		}
	});
}

function alertThree(data) {
	mui.alert(data.msg, data.title, '关闭', function() {

	});
}

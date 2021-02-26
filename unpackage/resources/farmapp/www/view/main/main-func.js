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
		
		sysServer.getRules(function(data) {
			if (data.status == 200) {
				console.log(JSON.stringify(data));
				LocalStorage.setItem(LocalStorage.keys.Rules,JSON.stringify(data.data))
			} else {
		
			}
		}, function() {
		
		});
		
		sysServer.getNotice(function(data) {
			if (data.status == 200) {
				aVariable.params.number = data.data.length;
				if (data.data.length > 0) {
					alertTwo(data.data);
					var notice = data.data;
					aVariable.ipt.iptNotice.innerHTML =
						'<marquee><span style="font-size: 15px;width: 100%;display:-moz-inline-box;display: inline-block;padding-left: 10px;">' +
						notice[0].msg + '</span></marquee>';
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
				id: "my",
				url: '../my/my.html'
			});
		});
		aVariable.btn.btnNotice.addEventListener("tap", function() {
			mui.openWindow({
				id: "notice",
				url: '../my/notice.html'
			});
		});
		aVariable.btn.btnJydt.addEventListener("tap", function() {
			mui.openWindow({
				id: "trading",
				url: '../trading/trading-list.html'
			});
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
		});

		aVariable.btn.btnService.addEventListener("tap", function() {
			mui.openWindow({
				id: 'service-agreement',
				url: '../sys/service-agreement.html'
			});
		}, false);
		aVariable.btn.btnPrivacy.addEventListener("tap", function() {
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
		aFunc.initData();
		mui.previewImage();
		aFunc.bindEvent();
	}
};

var i = 0
function alertTwo(data) {
	var xtIds = LocalStorage.getItem(LocalStorage.keys.ids);
	var ids = [];
	if (xtIds == null) {       
        	mui.alert(data[i].msg, data[i].title, '下一条', function() {
        		i = i + 1;
        		if (i == aVariable.params.number - 1) {
        			alertThree(data[i],data);
        		} else {
        			alertTwo(data);
        		}
        	});
	} else {
		ids = xtIds.split(',');
		if (ids.indexOf(data[i].id + '') > -1) {
			if (i == aVariable.params.number - 1) {
		 	
			} else {
				i = i + 1;
				if (i == aVariable.params.number - 1) {
					alertFour(data); 
				} else {
					alertTwo(data);
				}
			}
		} else {
			mui.alert(data[i].msg, data[i].title, '下一条', function() {
				i = i + 1;
				if (i == aVariable.params.number - 1) {
					alertThree(data[i],data);
				} else {
					alertTwo(data);
				}
			});
		}
	}	
}

function alertThree(data,all) {
	mui.alert(data.msg, data.title, '关闭', function() {
		var ids = '';
		for (var i = 0; i < all.length; i++) {
			if (i == 0) {
				ids += all[i].id;
			} else {
				ids += ',' + all[i].id; 
			}  
		}
		LocalStorage.setItem(LocalStorage.keys.ids, ids);
	});
}

function alertFour(all) {	
		var ids = '';
		for (var i = 0; i < all.length; i++) {
			if (i == 0) {
				ids += all[i].id;
			} else {
				ids += ',' + all[i].id; 
			}  
		}
		LocalStorage.setItem(LocalStorage.keys.ids, ids);
}


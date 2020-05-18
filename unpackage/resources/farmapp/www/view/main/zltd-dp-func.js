function accMul(num1, num2) {
	var m = 0,
		s1 = num1.toString(),
		s2 = num2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {};

	try {
		m += s2.split(".")[1].length
	} catch (e) {};
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
var aFunc = {
	initData: function() {
		gmtdServer.getDpList(function(data) {
			if (data.status == 200) {
				aVariable.box.dpList.innerHTML = aUi.dp.dpList(data.data);
				var card = document.getElementsByTagName('li')[0]
				card.children[0].className = 'li-xz'
				aVariable.ipt.iptTotal.innerText = card.getAttribute("data-price")
			}
		}, function() {

		});

	},
	bindEvent: function() {
		mui(aVariable.box.dpList).on("tap", "li", function(e) {
			var card = this;
			document.getElementsByClassName('li-xz')[0].className = 'li-wxz'
			card.children[0].className = 'li-xz'
			aVariable.ipt.iptTotal.innerText = card.getAttribute("data-price");
		});
		aVariable.btn.btnSubtract.addEventListener("tap", function() {
			var xz = document.getElementsByClassName('li-xz')[0].parentNode;
			var price = xz.getAttribute("data-price");
			var num = aVariable.ipt.iptNumber.value;
			aVariable.ipt.iptTotal.innerText = accMul(num,price);
		})
		aVariable.btn.btnAdd.addEventListener("tap", function() {
			var xz = document.getElementsByClassName('li-xz')[0].parentNode;
			var price = xz.getAttribute("data-price");
			var num = aVariable.ipt.iptNumber.value;
			aVariable.ipt.iptTotal.innerText =accMul(num,price);
		})
		aVariable.btn.btnBuy.addEventListener("tap", function() {
			var xz = document.getElementsByClassName('li-xz')[0].parentNode;
			var id = xz.getAttribute("data-id");
			var num = aVariable.ipt.iptNumber.value;
			//添加到购物车
			gmtdServer.addFarmCart(id, num, function(data) {
				if (data.status == 200) {
					var cartId = data.data.cartId;
					//确认土地订单
					gmtdServer.confirmFarmOrder(cartId, function(data) {
						if (data.status == 200) {
							var orderKey = data.data.orderKey;
							console.log('11111111')
							
							console.log(orderKey)
									// mui.toast('租赁成功');
									// mui.back();
							//生成订单
							gmtdServer.createFarmOrder(orderKey, function(data) {
								console.log(22222222222)
								console.log(data)
								if (data.status == 200) {
									if(data.data.status=="SUCCESS"){
									console.log("订单生成成功");
									console.log(JSON.stringify(data));
									mui.toast('租赁成功');
									var plant=plus.webview.getWebviewById('plant');
									mui.fire(plant, 'refreshJifen', {});
									mui.back();
									}else{
										mui.toast(data.msg)
									}
								}
							}, function(data) {
console.log(data)
							});
						}
					}, function() {

					});
				}
			}, function() {

			});
		})
	},
	// up2Refresh: function(refreshComponent) {
	// 	setTimeout(function() {
	// 		aVariable.webview.listComponent = refreshComponent;
	// 		var pages = aVariable.list.page.item_page;
	// 		var size = aVariable.list.page.item_num;
	// 		console.log('2222')
	// 		// noticeServer.getNoticeList(pages, size, function(data) {
	// 		// 	if(data.code == 200) {
	// 		// 		aVariable.box.noticeList.innerHTML += aUi.notice.noticeList(data.body);
	// 		// 		aVariable.list.page.item_sum += data.body.length;
	// 		// 		aVariable.list.page.item_page += 1;
	// 		// 		refreshComponent.endPullUpToRefresh(data.body.length <= 0);
	// 		// 	} else {
	// 		refreshComponent.endPullUpToRefresh(true);
	// 		// 	}
	// 		// }, function() {

	// 		// });
	// 	}, 800);
	// },
	// down2Refresh: function(refreshComponent) {
	// 	aVariable.list.page.item_sum = 0;
	// 	aVariable.list.page.item_page = 1;
	// 	// aVariable.box.noticeList.innerHTML = "";
	// 	var pages = aVariable.list.page.item_page;
	// 	var size = aVariable.list.page.item_num;
	// 	setTimeout(function() {
	// 		console.log('3333')
	// 		// noticeServer.getNoticeList(pages, size, function(data) {
	// 		// 	if(data.code == 200) {
	// 		refreshComponent.refresh(true);
	// 		refreshComponent.endPullDownToRefresh();
	// 		// 		aVariable.box.noticeList.innerHTML = aUi.notice.noticeList(data.body);
	// 		// 		aVariable.list.page.item_sum = data.body.length;
	// 		// 		aVariable.list.page.item_page += 1;
	// 		// 	} else {
	// 		// refreshComponent.endPullDownToRefresh();
	// 		// 	}
	// 		// refreshComponent.endPullDownToRefresh();
	// 		// }, function() {

	// 		// });
	// 	}, 800);
	// },

	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},

	initView: function() {

		// mui(aVariable.box.scroll).pullToRefresh({
		// 	up: {
		// 		callback: function() {
		// 			aFunc.up2Refresh(this);
		// 		}
		// 	},
		// 	down: {
		// 		callback: function() {
		// 			aFunc.down2Refresh(this);
		// 		}
		// 	}
		// }).pullUpLoading();
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

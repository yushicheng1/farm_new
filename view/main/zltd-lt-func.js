var aFunc = {
	initData: function() {

	},
	bindEvent: function() {
		mui(aVariable.box.ltList).on("tap", "li", function(e) {
			 
			document.getElementsByClassName('li-xz')[0].className = 'li-wxz'
			card.children[0].className = 'li-xz'
			aVariable.ipt.iptTotal.innerText = card.getAttribute("data-price")
		});
		aVariable.btn.btnSubtract.addEventListener("tap", function() {
			var xz = document.getElementsByClassName('li-xz')[0].parentNode;
			var price = xz.getAttribute("data-price");
			var num = aVariable.ipt.iptNumber.value;
			aVariable.ipt.iptTotal.innerText = num * price;
		})
		aVariable.btn.btnAdd.addEventListener("tap", function() {
			var xz = document.getElementsByClassName('li-xz')[0].parentNode;
			var price = xz.getAttribute("data-price");
			var num = aVariable.ipt.iptNumber.value;
			aVariable.ipt.iptTotal.innerText = num * price;
		})
		aVariable.btn.btnBuy.addEventListener("tap", function() {
			mui.toast('未选择套餐')
		// 		var id = aVariable.params.seedId;
		// 		var num = aVariable.ipt.iptNumber.value;
		// 		var unique = aVariable.params.uniqueId;
		// 		var size = aVariable.params.size;
		// 		//添加到购物车
		// 		gmzzServer.addSeedCart(id, num, unique, size, function(data) {
		// 				if (data.status == 200) {
		// 					var cartId = data.data.cartId;
		// 					//确认种子订单
		// 					gmzzServer.confirmSeedOrder(cartId, function(data) {
		// 						if (data.status == 200) {
		// 							var orderKey=data.data.orderKey;
		// 							//生成订单
		// 							gmzzServer.createSeedOrder(orderKey, function(data) {
		// 								if (data.status == 200) {
		// 									console.log("订单生成成功");
		// 									console.log(JSON.stringify(data));	
		// 								}
		// 							}, function() {
									
		// 							});					
		// 						}
		// 					}, function() {
		
		// 					});
		// 		}
		// 	}, function() {
		
		// 	});
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
		// var card = document.getElementsByTagName('li')[0]
		// card.children[0].className = 'li-xz'
		// aVariable.ipt.iptTotal.innerText = card.getAttribute("data-price")
		// mui(aVariable.box.scroll).pullToRefresh({
		// 			up: {
		// 				callback: function() {
		// 					aFunc.up2Refresh(this);
		// 				}
		// 			},
		// 			down: {
		// 				callback: function() {
		// 					aFunc.down2Refresh(this);
		// 				}
		// 			}
		// 		}).pullUpLoading();
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

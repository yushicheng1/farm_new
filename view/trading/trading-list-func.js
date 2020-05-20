var aFunc = {
	initData: function() {

	},
	bindEvent: function() {

		//查看详情
		mui(aVariable.box.scroll).on("tap", "li button", function(e) {
			console.log('222')
			// var card = this;
			var vegetable_id = this.getAttribute("data-id");
			var name = this.getAttribute("data-name");
			var plantTime = this.getAttribute("data-plant");
			var getTime = this.getAttribute("data-get");
			var num = this.getAttribute("data-num");
			var price = this.getAttribute("data-price");
			var image = this.getAttribute("data-image");
			mui.openWindow({
				id: "tradingDetail",
				url: '/view/trading/trading-detail.html',
				extras: {
					exchange_info_id: vegetable_id,
					name: name,
					plantTime: plantTime,
					getTime: getTime,
					num: num,
					price: price,
					image:image
				}

			});
		});

		//全部订单
		// aVariable.btn.btnAllOrder.addEventListener("tap", function() {
		// 	mui.openWindow({
		// 		id: "allOrder",
		// 		url: '/view/order/order.html',
		// 		extras: {

		// 		}
		// 	});
		// })

		//返回
		aVariable.btn.btnBack.addEventListener("tap", function() {
			// mui.back()
			mui.openWindow({
				id: 'plant',
				url: '../../view/main/plant.html'
			});
		})
		
		window.addEventListener('refreshTrading', function(e) {
			aFunc.down2Refresh();
		});

	},

	up2Refresh: function() {
		setTimeout(function() {
			// aVariable.webview.listComponent = refreshComponent;
			var pages = aVariable.list.page.item_page;
			var size = aVariable.list.page.item_num;
			var name = aVariable.ipt.iptSearch.value;
			tradingListServer.getTradingList(pages, size, name, function(data) {
				if (data.status == 200) {
					aVariable.box.tradingList.innerHTML += aUi.tradingList.tradingList(data.data);
					aVariable.list.page.item_page += 1;
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length <= 0)
				} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true)
				}
			}, function() {

			});
		}, 400);
	},
	down2Refresh: function() {
		aVariable.list.page.item_page = 1;
		aVariable.box.tradingList.innerHTML = "";
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		var name = aVariable.ipt.iptSearch.value;
		setTimeout(function() {
			tradingListServer.getTradingList(pages, size, name, function(data) {
				if (data.status == 200) {
					aVariable.box.tradingList.innerHTML = aUi.tradingList.tradingList(data.data);
					aVariable.list.page.item_sum = data.data.length;
					aVariable.list.page.item_page += 1;				
					mui('#pullrefresh').pullRefresh().endPulldown();
					mui('#pullrefresh').pullRefresh().refresh(true);
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length<=0)
				} else {
					
				}
			}, function() {

			});
		}, 400);
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
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					style: 'circle',
					callback: aFunc.down2Refresh
				},
				up: {
					auto: true,
					contentrefresh: '正在加载...',
					callback: aFunc.up2Refresh
				}
			}
		});
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

function enterSearch(e) {
	 if(e.keyCode == 13) {  
		 aFunc.down2Refresh();
		 
		 }
	
}

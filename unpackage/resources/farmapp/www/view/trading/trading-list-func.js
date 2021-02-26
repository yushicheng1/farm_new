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
			var stock = this.getAttribute("data-stock");
			var price = this.getAttribute("data-price");
			var image = this.getAttribute("data-image");
			var unit = this.getAttribute("data-unit");
			var dis=this.getAttribute("data-dis");
			mui.openWindow({
				id: "tradingDetail",
				url: '/view/trading/trading-detail.html',
				extras: {
					exchange_info_id: vegetable_id,
					name: name,
					stock: stock,
					price: price,
					image:image,
					unit:unit,
					dis:dis
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
			mui.back();
			// mui.openWindow({
			// 	id: 'plant',
			// 	url: '../../view/main/gmzz-new.html'
			// });
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
			// var name = aVariable.ipt.iptSearch.value;
			var name = '';
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
		}, 100);
	},
	down2Refresh: function() {
		aVariable.list.page.item_page = 1;
		aVariable.box.tradingList.innerHTML = "";
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		// var name = aVariable.ipt.iptSearch.value;
		var name = '';
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
		}, 100);
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
					contentdown:' ',
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

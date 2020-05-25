var aFunc = {
	initData: function() {

	},
	bindEvent: function() {
		//复制
		mui(aVariable.box.scroll).on("tap", "li img", function(e) {
			if(mui.os.ios){
			//ios
			var UIPasteboard = plus.ios.importClass("UIPasteboard");
			    var generalPasteboard = UIPasteboard.generalPasteboard();
			    //设置/获取文本内容:
			    generalPasteboard.plusCallMethod({
			        setValue:this.getAttribute('data-num'),
			        forPasteboardType: "public.utf8-plain-text"
			    });
			    generalPasteboard.plusCallMethod({
			        valueForPasteboardType: "public.utf8-plain-text"
			    });
			}else{
			//安卓
			var context = plus.android.importClass("android.content.Context");
			  var main = plus.android.runtimeMainActivity();
			  var clip = main.getSystemService(context.CLIPBOARD_SERVICE);
			  plus.android.invoke(clip,"setText",this.getAttribute('data-num'));
			  mui.toast('复制成功');
			}
		})
		//确认收货
		mui(aVariable.box.scroll).on("tap", "li button", function(e) {
			var order_id = this.getAttribute("data-id");
			warehouseServer.confirmOrder(order_id, function(data) {
				if (data.status == 200) {
					mui.toast('已确认收货')
					aFunc.down2Refresh();
				} else {
					
				}
			}, function() {
			
			});
		})
		
		//查看详情
		mui(aVariable.box.scroll).on("tap", "li div[class='mui-Received']", function(e) {
			var name=this.getAttribute('data-name');
			var phone=this.getAttribute('data-phone');
			var address=this.getAttribute('data-address');
			var order_id = this.getAttribute("data-id");
			var total = this.getAttribute("data-total");
			mui.openWindow({
				id: "youji_detail",
				url: '/view/warehouse/youji-detail.html',
				extras:{
					name:name,
					phone:phone,
					address:address,
					order_id:order_id,
					total:total
				}
			});
		})
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	up2Refresh: function(refreshComponent) {
		setTimeout(function() {
			var pages = aVariable.list.page.item_page;
			var size = aVariable.list.page.item_num;
			warehouseServer.getPostOrder(pages, size, 2, function(data) {
				if (data.status == 200) {			
					aVariable.box.yfhList.innerHTML += aUi.yfh.yfhList(data.data);
					aVariable.list.page.item_page += 1;
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length <8)
				} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true)
				}
			}, function() {

			});
		}, 400);
	},
	down2Refresh: function(refreshComponent) {
		aVariable.list.page.item_sum = 0;
		aVariable.list.page.item_page = 1;
		aVariable.box.yfhList.innerHTML = "";
		var pages = aVariable.list.page.item_page;
		var size = aVariable.list.page.item_num;
		setTimeout(function() {
			warehouseServer.getPostOrder(pages, size, 2, function(data) {
				if (data.status == 200) {				
					aVariable.box.yfhList.innerHTML = aUi.yfh.yfhList(data.data);					
					aVariable.list.page.item_page += 1;
					mui('#pullrefresh').pullRefresh().endPulldown();
					mui('#pullrefresh').pullRefresh().refresh(true);
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.data.length<8)
				} else {
					
				}
				
			}, function() {

			});
		}, 400);
	},
	initView: function() {
		
	},
	plusReady: function() {
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

		// aVariable.webview.current = plus.webview.currentWebview();
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

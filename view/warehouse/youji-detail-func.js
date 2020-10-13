var aFunc = {
	initData: function() {
		aVariable.ipt.iptName.innerText = aVariable.params.name;
		aVariable.ipt.iptPhone.innerText = aVariable.params.phone;
		aVariable.ipt.iptAddress.innerText = aVariable.params.address;
		aVariable.ipt.iptTotal.innerText = aVariable.params.total;
		warehouseServer.getPostDetail(aVariable.params.order_id,function(data) {
				if (data.status == 200) {
					aVariable.ipt.iptUnit.innerText=data.data[0].unit;
					aVariable.box.recordList.innerHTML = aUi.yfh.detailList(data.data);
				} else {
					
				}
			},
			function() {
		
			});		
	},
	bindEvent: function() {

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

		aVariable.webview.current = plus.webview.currentWebview();
		aVariable.params.vegetables = aVariable.webview.current.vegetables;
		aVariable.params.name = aVariable.webview.current.name;
		aVariable.params.phone = aVariable.webview.current.phone;
		aVariable.params.address = aVariable.webview.current.address;
		aVariable.params.order_id = aVariable.webview.current.order_id;
		aVariable.params.total = aVariable.webview.current.total;
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

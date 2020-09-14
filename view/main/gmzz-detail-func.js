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

function tuoguan(checkbox){
	if ( checkbox.checked == true){
		aVariable.params.auto=1;
aVariable.ipt.iptPrice.innerHTML =aVariable.params.autoPrice;
aVariable.ipt.iptNumber.value=1;
aVariable.ipt.iptTotal.innerText = accMul(1, aVariable.params.autoPrice);
	}else{
		aVariable.params.auto=0;
	 aVariable.ipt.iptPrice.innerHTML =aVariable.params.price;
	 aVariable.ipt.iptNumber.value=1;
	 aVariable.ipt.iptTotal.innerText = accMul(1, aVariable.params.price);
	}
}
var aFunc = {
	initData: function() {
		aVariable.ipt.iptName.innerHTML = aVariable.params.seedName;
		aVariable.ipt.iptShengzhang.innerHTML = aVariable.params.shengzhang;
		aVariable.ipt.iptJieguo.innerHTML = aVariable.params.jieguo;
		aVariable.ipt.iptChanliang.innerHTML = aVariable.params.chanliang;
		aVariable.ipt.iptImage.src = aServer.ApiUrl + aVariable.params.seedImg;
		var id = aVariable.params.seedId;
		gmzzServer.getSeedDetail(id, function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptStock.innerHTML = data.data.seedValue.小份.stock;
				aVariable.ipt.iptPrice.innerHTML = data.data.seedValue.小份.price;
				aVariable.params.price = data.data.seedValue.小份.price;
				aVariable.params.autoPrice = data.data.autoPrice;
				// aVariable.ipt.iptPrice.innerHTML = data.data.autoPrice;
				aVariable.params.size = data.data.seedValue.小份.size;
				aVariable.params.uniqueId = data.data.seedValue.小份.unique;
				var num = aVariable.ipt.iptNumber.value;
				var price = aVariable.ipt.iptPrice.innerText;
				aVariable.ipt.iptTotal.innerText = accMul(num, price);
			}
		}, function() {

		});
	},
	bindEvent: function() {
		aVariable.btn.btnSubtract.addEventListener("tap", function() {
			var num = aVariable.ipt.iptNumber.value;
			var price = aVariable.ipt.iptPrice.innerText;
			aVariable.ipt.iptTotal.innerText = accMul(num, price);
		})
		aVariable.btn.btnAdd.addEventListener("tap", function() {
			var num = aVariable.ipt.iptNumber.value;
			var price = aVariable.ipt.iptPrice.innerText;
			aVariable.ipt.iptTotal.innerText = accMul(num, price);
		})
		aVariable.btn.btnBuy.addEventListener("tap", function() {
			var btnArray = ['是', '否'];
			mui.confirm("本次操作共消耗积分"+aVariable.ipt.iptTotal.innerText+",确定要支付吗?", "提示", btnArray, function(e) {
				if (e.index == 0) {
					aVariable.btn.btnBuy.disabled = true;
					var id = aVariable.params.seedId;
					var num = aVariable.ipt.iptNumber.value;
					var unique = aVariable.params.uniqueId;
					var size = aVariable.params.size;
					//添加到购物车
					gmzzServer.addSeedCart(id, num, unique, size, function(data) {
						if (data.status == 200) {
							var cartId = data.data.cartId;
							//确认种子订单
							gmzzServer.confirmSeedOrder(cartId, function(data) {
								if (data.status == 200) {
									var orderKey = data.data.orderKey;
									//生成订单
									gmzzServer.createSeedOrder(orderKey,aVariable.params.auto, function(data) {
										if (data.status == 200) {
											if (data.data.status == "SUCCESS") {
												console.log("订单生成成功");
												console.log(JSON.stringify(data));
												mui.toast('购买成功');
												var plant = plus.webview.getWebviewById('plant');
												mui.fire(plant, 'refreshJifenAndPlant', {});
												mui.back();
											} else {
												aVariable.btn.btnBuy.disabled = false;
					
												mui.alert(data.msg);
					
												plus.runtime.getProperty(plus.runtime.appid, function(inf) {
													if (mui.os.android) {
														mui.openWindow({
															id: "chongzhi",
															url: '/view/wallet/wallet_android.html'
														});
													} else {
														mui.openWindow({
															id: "chongzhi",
															url: '/view/wallet/wallet_android.html'
														});
													}
												});
											}
										} else {
											aVariable.btn.btnBuy.disabled = false;
											mui.toast(data.msg);
										}
									}, function() {
					
									});
								} else {
									aVariable.btn.btnBuy.disabled = false;
									mui.alert(data.msg);
								}
							}, function() {
					
							});
						} else {
							aVariable.btn.btnBuy.disabled = false;
							mui.toast(data.msg);
						}
					}, function() {
					
					});
					
				} else {
			
				}
			});
			
			
		})
	},
	plusReady: function() {

		aVariable.webview.current = plus.webview.currentWebview();
		aVariable.params.seedId = aVariable.webview.current.seedId;
		aVariable.params.seedName = aVariable.webview.current.seedName;
		aVariable.params.seedImg = aVariable.webview.current.seedImg;
		aVariable.params.shengzhang = aVariable.webview.current.shengzhang;
		aVariable.params.jieguo = aVariable.webview.current.jieguo;
		aVariable.params.chanliang = aVariable.webview.current.chanliang;
		aFunc.initData();
		aFunc.bindEvent();
	}
};

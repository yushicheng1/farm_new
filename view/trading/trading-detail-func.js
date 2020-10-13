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
		tradingListServer.getTradingDetails(aVariable.params.exchange_info_id,function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptDis.innerHTML = data.data.description;
			} else {
				
			}
		}, function() {
		
		});
		aVariable.ipt.iptName.innerText = aVariable.params.name;
		aVariable.ipt.iptStock.innerText = aVariable.params.stock;
		aVariable.ipt.iptPrice.innerText = aVariable.params.price;
		aVariable.ipt.iptUnit.innerText = aVariable.params.unit;
		aVariable.ipt.iptImage.src = aServer.ApiUrl + aVariable.params.image;
		aVariable.ipt.iptDis.innerText = aVariable.params.dis;
		var num = aVariable.ipt.iptNumber.value;
		var price = aVariable.params.price;
		aVariable.ipt.iptTotal.innerText = accMul(num, price);
	},
	bindEvent: function() {
		aVariable.btn.btnChoose.addEventListener("tap", function() {
			mui.openWindow({
				id: "waddress",
				url: '../warehouse/address.html'
			});
		})
		
		aVariable.btn.btnChooseNew.addEventListener("tap", function() {
			mui.openWindow({
				id: "waddress",
				url: '../warehouse/address.html'
			});
		})
		
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
		
		aVariable.btn.btnPay.addEventListener("tap", function() {
			aVariable.btn.btnPay.disabled=true;
			var id = aVariable.params.exchange_info_id;
			var num = aVariable.ipt.iptNumber.value;
			var address_id=aVariable.params.addressId;
			if(address_id==''||address_id==null){
				mui.toast('请选择地址');
				aVariable.btn.btnPay.disabled=false;
				return;
			}
			tradingListServer.tradingBuy(id,num,address_id,function(data) {
				console.log(data)
				if (data.status == 200) {
					if (data.data.status == 'SUCCESS') {
						mui.toast('购买成功');
						var main = plus.webview.currentWebview().opener();
						mui.fire(main, 'refreshTrading', {});
						//刷新土地界面的积分
						var plant = plus.webview.getWebviewById('plant');
						mui.fire(plant, 'refreshJifen', {});
						mui.back();
					} else {
						aVariable.btn.btnPay.disabled=false;
						mui.toast(data.msg)
					}
				} else {
					aVariable.btn.btnPay.disabled=false;
					mui.toast(data.msg)
				}
			}, function() {

			});

		})
		
		window.addEventListener('wchoose', function(e) {
			aVariable.params.addressId = e.detail.addressId;
			aVariable.ipt.iptNamePerson.innerText = e.detail.name;
			aVariable.ipt.iptPhone.innerText = e.detail.phone;
			aVariable.ipt.iptAddress.innerText = e.detail.province + e.detail.city + e.detail.district + e.detail.detail;
			aVariable.btn.btnChoose.hidden = "";
			aVariable.btn.btnChooseNew.hidden = "hidden";
			warehouseServer.getYunFei(e.detail.addressId,function(data) {
					if (data.status == 200) {
						aVariable.ipt.iptYunfei.innerText=data.data.freight_price;
					} else {
						
					}
				},
				function() {
			
				});
		})
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		aVariable.webview.current = plus.webview.currentWebview();
		aVariable.params.exchange_info_id = aVariable.webview.current.exchange_info_id;
		aVariable.params.name = aVariable.webview.current.name;
		aVariable.params.stock = aVariable.webview.current.stock;
		aVariable.params.price = aVariable.webview.current.price;
		aVariable.params.image = aVariable.webview.current.image;
		aVariable.params.unit = aVariable.webview.current.unit;
		aVariable.params.dis = aVariable.webview.current.dis;
		aFunc.initData();
		aFunc.bindEvent();
	}
};

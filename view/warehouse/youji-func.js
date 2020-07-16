var aFunc = {
	initData: function() {
		// aVariable.ipt.iptPlantName.innerText = aVariable.params.name;
		// aVariable.ipt.iptSum.innerText = aVariable.params.sum;
		// aVariable.ipt.iptPlant.innerText = aVariable.params.plant;
		// aVariable.ipt.iptGet.innerText = aVariable.params.get;
		// aVariable.ipt.iptImage.src = aServer.ApiUrl+aVariable.params.image;
		aVariable.box.recordList.innerHTML = '';
		warehouseServer.getMyStore(function(data) {
				if (data.status == 200) {
					// console.log(JSON.stringify(data.data));
					aVariable.box.recordList.innerHTML = aUi.warehouse.youJiList(data.data);
					mui(aVariable.box.recordList).on("tap", "li", function(e) {
						if (this.getAttribute("data-choose") == 0) {
							this.style.backgroundImage = 'url(../../images/nongchang/yxz.png)';
							this.setAttribute("data-choose", 1);
						} else {
							this.style.backgroundImage = 'url(../../images/nongchang/wxz.png)'
							this.setAttribute("data-choose", 0);
						}
					});
				} else {
					aVariable.box.recordList.innerHTML = ''
				}
			},
			function() {

			});
	},
	bindEvent: function() {
		aVariable.btn.btnChoose.addEventListener("tap", function() {
			mui.openWindow({
				id: "waddress",
				url: 'address.html'
			});
		})

		aVariable.btn.btnChooseNew.addEventListener("tap", function() {
			mui.openWindow({
				id: "waddress",
				url: 'address.html'
			});
		})

		aVariable.btn.btnYouji.addEventListener("tap", function() {
			aVariable.btn.btnYouji.disabled = true;
			var a = document.querySelectorAll("li[data-choose='1']");
			var number = a.length;
			if (number == 0) {
				mui.toast('请选择需要邮寄的果实');
				aVariable.btn.btnYouji.disabled = false;
				return;
			}
			var addressId = aVariable.params.addressId;
			if (addressId == '' || addressId == null) {
				mui.toast('请选择地址');
				aVariable.btn.btnYouji.disabled = false;
				return;
			}
			var allnum = 0;
			aVariable.params.sendList = [];

			for (var i = 0; i < a.length; i++) {
				var id = a[i].getAttribute("data-id");
				var num = a[i].getAttribute("data-num");
				var data = {};
				data['id'] = id;
				data['num'] = num;
				allnum = allnum + parseFloat(num);
				aVariable.params.sendList.push(data);
			}
			// if (allnum < 2 || allnum > 2.7) {
			// 	mui.toast('邮寄范围在2到2.7公斤');
			// 	aVariable.btn.btnYouji.disabled = false;
			// } else {
				var bts = ["是", "取消"];
				plus.nativeUI.confirm("当前邮寄" + allnum.toFixed(2) + "公斤,邮费为"+aVariable.ipt.iptYunfei.innerText+"积分\n邮寄不可取消，请您确认", function(e) {
					var i = e.index;
					if (i == 0) {
						warehouseServer.sendToHmoe(JSON.stringify(aVariable.params.sendList), addressId, function(data) {
							if (data.status == 200) {
								if (data.data.status == 'SUCCESS') {
									mui.toast('邮寄成功');
									aVariable.params.sendList = [];
									var main = plus.webview.currentWebview().opener();
									mui.fire(main, 'refreshWarehouse', {});
									mui.back();
								} else {
									aVariable.btn.btnYouji.disabled = false;
									aVariable.params.sendList = [];
									mui.toast(data.msg);
								}
							} else {
								aVariable.btn.btnYouji.disabled = false;
								aVariable.params.sendList = [];
								mui.toast(data.msg);
							}
						}, function() {

						});
					} else {

					}
				}, "邮寄到家", bts);
				aVariable.btn.btnYouji.disabled = false;
			// }
		})

		window.addEventListener('wchoose', function(e) {
			aVariable.params.addressId = e.detail.addressId;
			aVariable.ipt.iptName.innerText = e.detail.name;
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
		// aVariable.params.vegetablesId = aVariable.webview.current.vegetablesId;
		// aVariable.params.name = aVariable.webview.current.name;
		// aVariable.params.sum = aVariable.webview.current.sum;
		// aVariable.params.plant = aVariable.webview.current.plant;
		// aVariable.params.get = aVariable.webview.current.get;
		// aVariable.params.image = aVariable.webview.current.image;
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

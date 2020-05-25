var aFunc = {
	initData: function() {
		// aVariable.ipt.iptPlantName.innerText = aVariable.params.name;
		// aVariable.ipt.iptSum.innerText = aVariable.params.sum;
		// aVariable.ipt.iptPlant.innerText = aVariable.params.plant;
		// aVariable.ipt.iptGet.innerText = aVariable.params.get;
		// aVariable.ipt.iptImage.src = aServer.ApiUrl+aVariable.params.image;
		aVariable.box.recordList.innerHTML='';
		warehouseServer.getMyStore(function(data) {
				if (data.status == 200) {
					// console.log(JSON.stringify(data.data));
					aVariable.box.recordList.innerHTML = aUi.warehouse.youJiList(data.data);
					mui(aVariable.box.recordList).on("tap", "li", function(e) {
						if(this.getAttribute("data-choose")==0){
							this.style.backgroundImage='url(../../images/nongchang/yxz.png)';
							this.setAttribute("data-choose",1);							
						}else{
							this.style.backgroundImage='url(../../images/nongchang/wxz.png)'
							this.setAttribute("data-choose",0);
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
			var a=document.querySelectorAll("li[data-choose='1']");
			var number = a.length;
			if (number==0) {
				mui.toast('请选择需要邮寄的果实');
				return;
			}
			for(var i=0;i<a.length;i++){
				var id=a[i].getAttribute("data-id");
				var num=a[i].getAttribute("data-num");
				var data={}
				data['id']=id;
				data['num']=num;
				aVariable.params.sendList.push(data);
			}
			var addressId = aVariable.params.addressId;
			if (addressId == '' || addressId == null) {
				mui.toast('请选择地址');
				return;
			}
			warehouseServer.sendToHmoe(JSON.stringify(aVariable.params.sendList), addressId, function(data) {
				if (data.status == 200) {
					if (data.data.status == 'SUCCESS') {
						mui.toast('邮寄成功');
						mui.back();
						aVariable.params.sendList=[];					
					} else {
						aVariable.params.sendList=[];						
						mui.toast(data.msg);
					}
				} else {
					aVariable.params.sendList=[];					
					mui.toast(data.msg);
				}
			}, function() {

			});
		})

		window.addEventListener('wchoose', function(e) {
			aVariable.params.addressId = e.detail.addressId;
			aVariable.ipt.iptName.innerText = e.detail.name;
			aVariable.ipt.iptPhone.innerText = e.detail.phone;
			aVariable.ipt.iptAddress.innerText = e.detail.province + e.detail.city + e.detail.district + e.detail.detail;
			aVariable.btn.btnChoose.hidden = "";
			aVariable.btn.btnChooseNew.hidden = "hidden";
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

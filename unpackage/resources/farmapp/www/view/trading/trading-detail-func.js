var aFunc = {
	initData: function() {
		// var id = aVariable.params.noticeId;
		// noticeServer.getNotice(id, function(data) {
		// 	if(data.code == 200) {
		// 		aVariable.ipt.iptHeader.innerHTML = data.body.title + " -- 详情";
		// 		aVariable.ipt.iptTitle.innerHTML = data.body.title || "";
		// 		aVariable.ipt.iptNum.innerHTML = data.body.readNum || "";
		// 		aVariable.ipt.iptName.innerHTML = data.body.name || "";
		// 		aVariable.ipt.iptTime.innerHTML = data.body.publishDate || "";
		// 		aVariable.ipt.iptContent.innerHTML = data.body.content || "";
		// 	}
		// }, function() {

		// });
		aVariable.ipt.iptName.innerText = aVariable.params.name;
		aVariable.ipt.iptPlant.innerText = aVariable.params.plantTime;
		aVariable.ipt.iptGet.innerText = aVariable.params.getTime;
		aVariable.ipt.iptNum.innerText = aVariable.params.num;
		aVariable.ipt.iptPrice.innerText = aVariable.params.price;
		aVariable.ipt.iptImage.src = aServer.ApiUrl+aVariable.params.image;
		// var num = aVariable.ipt.iptNumber.value;
		// var price = aVariable.ipt.iptPrice.innerText;
		// aVariable.ipt.iptTotal.innerText = num * price;
	},
	bindEvent: function() {
		var input = document.querySelector('input')
		    input.addEventListener('change', function(params) {
		        var num=parseFloat(input.value).toFixed(2);
				var price = aVariable.ipt.iptPrice.innerText;
				aVariable.ipt.iptTotal.innerText = parseFloat(num * price).toFixed(2);
		    })

		aVariable.btn.btnPay.addEventListener("tap", function() {
			if(aVariable.ipt.iptNumber.value==0||aVariable.ipt.iptNumber.value==null){
				mui.toast('请填写购买数量');
				return;
			}
			
			// if(aVariable.ipt.iptNumber.value>aVariable.params.num){
			// 	mui.toast('购买数量不能超过购买数量');
			// 	return;
			// }
			var id=aVariable.params.exchange_info_id;
			var num=parseFloat(aVariable.ipt.iptNumber.value).toFixed(2);		
			tradingListServer.tradingBuy(id,num, function(data) {
				if(data.status == 200) {
					if(data.data.status=='SUCCESS'){
						mui.toast('购买成功');
						var main = plus.webview.currentWebview().opener();
						mui.fire(main, 'refreshTrading', {});
						mui.back();
					}else{
						mui.toast(data.msg)
					}					
				}else{
					mui.toast(data.msg)
				}
			}, function() {
			
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
		aVariable.params.plantTime = aVariable.webview.current.plantTime;
		aVariable.params.getTime = aVariable.webview.current.getTime;
		aVariable.params.name = aVariable.webview.current.name;
		aVariable.params.num = aVariable.webview.current.num;
		aVariable.params.price = aVariable.webview.current.price;
		aVariable.params.image = aVariable.webview.current.image;
		aFunc.initData();
		aFunc.bindEvent();
	}
};

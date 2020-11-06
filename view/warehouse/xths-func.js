var aFunc = {
	initData: function() {
		aVariable.ipt.iptName.innerText = aVariable.params.name;
		aVariable.ipt.iptSum.innerText = aVariable.params.sum + '公斤';
		// aVariable.ipt.iptPlant.innerText = aVariable.params.plant;
		// aVariable.ipt.iptGet.innerText = aVariable.params.get;
		aVariable.ipt.iptPrice.innerText = aVariable.params.price;
		aVariable.ipt.iptImage.src = aServer.ApiUrl + aVariable.params.image;
		// aVariable.ipt.iptcount.innerText = aVariable.params.count;
	},
	bindEvent: function() {
		aVariable.btn.btnSubmit.addEventListener("tap", function() {
			var num=aVariable.ipt.iptNum.value;
			if(num==''||num==null||num==0){
				mui.toast("请填写回收数量");
				return;
			}
			
			if(num>aVariable.params.sum){
				mui.toast("回收数量超出剩余量!");
				return;
			}
			aVariable.btn.btnSubmit.disabled=true;
			warehouseServer.recycle(aVariable.params.vegetablesId, num, function(data) {
					if (data.status == 200) {
						mui.toast("回收成功");
						var main = plus.webview.currentWebview().opener();
						mui.fire(main, 'refreshWarehouse', {});
						mui.back();
					} else {
						aVariable.btn.btnSubmit.disabled=false;
						mui.toast(data.msg);
					}
				},
				function() {

				});
			
		})
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	plusReady: function() {
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		aVariable.webview.current = plus.webview.currentWebview();
		aVariable.params.vegetablesId = aVariable.webview.current.vegetablesId;
		aVariable.params.name = aVariable.webview.current.name;
		aVariable.params.sum = aVariable.webview.current.sum;
		// aVariable.params.plant = aVariable.webview.current.plant;
		// aVariable.params.get = aVariable.webview.current.get;
		aVariable.params.price = aVariable.webview.current.price;
		aVariable.params.image = aVariable.webview.current.image;
		// aVariable.params.count = aVariable.webview.current.count;
		aFunc.initData();
		aFunc.bindEvent();
	}
};

function clearNoNum(obj) {
	 // console.log(123)
     obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
     obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
     obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
     obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
     if (obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
         obj.value = parseFloat(obj.value);
     }
 }


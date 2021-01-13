var aFunc = {
	initData: function() {
		// aVariable.ipt.iptPlantName.innerText = aVariable.params.name;
		// aVariable.ipt.iptSum.innerText = aVariable.params.sum;
		// aVariable.ipt.iptImage.src = aServer.ApiUrl+aVariable.params.image;
		aVariable.box.recordList.innerHTML = '';
		warehouseServer.getMyStore(0,0,function(data) {
				if (data.status == 200) {
					// console.log(JSON.stringify(data.data));
					aVariable.box.recordList.innerHTML = aUi.warehouse.youJiListOne(data.data);
					// mui(aVariable.box.recordList).on("tap", "li", function(e) {
					// 	if (this.getAttribute("data-choose") == 0) {
					// 		this.style.backgroundImage = 'url(../../images/nongchang/yxz.png)';
					// 		this.setAttribute("data-choose", 1);
					// 	} else {
					// 		this.style.backgroundImage = 'url(../../images/nongchang/wxz.png)'
					// 		this.setAttribute("data-choose", 0);
					// 	}
					// });
				} else {
					aVariable.box.recordList.innerHTML = ''
				}
			},
			function() {

			});
			
			warehouseServer.getPostRule(0,function(data){
			    if(data.status == 200){
			     aVariable.ipt.iptTishi.innerText=data.data.description+'\n最小邮寄重量:'+data.data.min_post+'公斤   最大邮寄重量:'+data.data.max_post+'公斤';
			     
			    }
			    
			   },function(){
			    
			   })
	},
	bindEvent: function() {
		aVariable.btn.btnChoose.addEventListener("tap", function() {
			mui.openWindow({
				id: "waddress",
				url: 'address.html',
				extras:{
					chandi:aVariable.params.chandi
				}
			});
		})

		aVariable.btn.btnChooseNew.addEventListener("tap", function() {
			mui.openWindow({
				id: "waddress",
				url: 'address.html',
				extras:{
					chandi:aVariable.params.chandi
				}
			});
		})
		
		aVariable.btn.btnShandong.addEventListener("tap", function() {
			mui('#popover').popover('hide');
			aVariable.params.chandi=0;
			aVariable.ipt.iptChandi.innerText ='当前产地:山东';
			aVariable.ipt.iptAddress.innerText ='';
			aVariable.btn.btnChoose.hidden = "hidden";
			aVariable.btn.btnChooseNew.hidden = "";
			aVariable.params.addressId='';
			// aVariable.ipt.iptTishi.innerText='甘肃、海南、青海、云南、黑龙江14元,新疆17元';
			warehouseServer.getMyStore(0,0,function(data) {
					if (data.status == 200) {
						aVariable.box.recordList.innerHTML = aUi.warehouse.youJiListOne(data.data);				
					} else {
						aVariable.box.recordList.innerHTML = ''
					}
				},
				function() {
			
				});
				
				warehouseServer.getPostRule(0,function(data){
				    if(data.status == 200){
				     aVariable.ipt.iptTishi.innerText=data.data.description+'\n最小邮寄重量:'+data.data.min_post+'公斤   最大邮寄重量:'+data.data.max_post+'公斤';
				     
				    }
				    
				   },function(){
				    
				   })
		})
		
		aVariable.btn.btnYunnan.addEventListener("tap", function() {
			mui('#popover').popover('hide');
			aVariable.params.chandi=1;
			aVariable.ipt.iptChandi.innerText ='当前产地:云南';
			aVariable.ipt.iptAddress.innerText ='';
			aVariable.btn.btnChoose.hidden = "hidden";
			aVariable.btn.btnChooseNew.hidden = "";
			aVariable.params.addressId='';
			// aVariable.ipt.iptTishi.innerText='青海、甘肃、宁夏、黑龙江、吉林、辽宁2元,内蒙古、海南16元，新疆、西藏35元'
			warehouseServer.getMyStore(0,0,function(data) {
					if (data.status == 200) {
						aVariable.box.recordList.innerHTML = aUi.warehouse.youJiListTwo(data.data);				
					} else {
						aVariable.box.recordList.innerHTML = ''
					}
				},
				function() {
			
				});
				
				warehouseServer.getPostRule(1,function(data){
				    if(data.status == 200){
				     aVariable.ipt.iptTishi.innerText=data.data.description+'\n最小邮寄重量:'+data.data.min_post+'公斤   最大邮寄重量:'+data.data.max_post+'公斤';
				     
				    }
				    
				   },function(){
				    
				   })
		})
		
		aVariable.btn.btnHainan.addEventListener("tap", function() {
			mui('#popover').popover('hide');
			aVariable.params.chandi=2;
		aVariable.ipt.iptChandi.innerText ='当前产地:海南';
			aVariable.ipt.iptAddress.innerText ='';
			aVariable.btn.btnChoose.hidden = "hidden";
			aVariable.btn.btnChooseNew.hidden = "";
			aVariable.params.addressId='';
			// aVariable.ipt.iptTishi.innerText='青海、甘肃、宁夏、黑龙江、吉林、辽宁2元,内蒙古、海南16元，新疆、西藏35元'
			warehouseServer.getMyStore(0,0,function(data) {
					if (data.status == 200) {
						aVariable.box.recordList.innerHTML = aUi.warehouse.youJiListThree(data.data);				
					} else {
						aVariable.box.recordList.innerHTML = ''
					}
				},
				function() {
			
				});
		
		warehouseServer.getPostRule(2,function(data){
		    if(data.status == 200){
		     aVariable.ipt.iptTishi.innerText=data.data.description+'\n最小邮寄重量:'+data.data.min_post+'公斤   最大邮寄重量:'+data.data.max_post+'公斤';
		     
		    }
		    
		   },function(){
		    
		   })
		})

		aVariable.btn.btnYouji.addEventListener("tap", function() {
			aVariable.btn.btnYouji.disabled = true;
			var a = document.querySelectorAll("input");
			var b=[];
			console.log(a.length);
			for(var i=0;i<a.length;i++){
				if(a[i].value==0||a[i].value==''||a[i].value==null){
								
				}else{
					b.push(a[i])
				}
			}
			// var a = document.querySelectorAll("li[data-choose='1']");
			var number = b.length;
			if (number == 0) {
				mui.toast('请填写需要邮寄果实的数量');
				aVariable.btn.btnYouji.disabled = false;
				return;
			}
			
			if(number==1){
				if(b[0].getAttribute('data-min')>b[0].value){
					mui.toast('不能低于最低邮寄重量');
					aVariable.btn.btnYouji.disabled = false;
					return;
				}
			}
					
			if(number>1){
				var chandi=b[0].getAttribute('data-origin');
				for (var i = 0; i < b.length; i++) {
					// console.log(b[i].getAttribute('data-origin'))
					// if(b[i].getAttribute('data-origin')!=chandi){
					// 	mui.toast('一次只能邮寄同一产地的果实');
					// 	aVariable.btn.btnYouji.disabled = false;
					// 	return;
					// }
					console.log(b[i].getAttribute('data-min'))
					if(b[i].getAttribute('data-min')>b[i].value){
						mui.toast('不能低于最低邮寄重量');
						aVariable.btn.btnYouji.disabled = false;
						return;
					}
					}
			}
					
			var addressId = aVariable.params.addressId;
			if (addressId == '' || addressId == null) {
				mui.toast('请选择地址');
				aVariable.btn.btnYouji.disabled = false;
				return;
			}
			var allnum = 0;
			aVariable.params.sendList = [];

			for (var i = 0; i < b.length; i++) {
				var id = b[i].getAttribute("data-id");
				var num = b[i].value;
				var data = {};
				data['id'] = id;
				data['num'] = num;
				allnum = allnum + parseFloat(num);
				aVariable.params.sendList.push(data);
			}
			
			warehouseServer.getYunFei(aVariable.params.addressId,aVariable.params.chandi,function(data) {
					if (data.status == 200) {
						var bts = ["是", "取消"];
						plus.nativeUI.confirm("当前邮寄" + allnum.toFixed(2) + "公斤,本次运费为"+data.data.freight_price+"元,邮寄不可取消，请您确认", function(e) {
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
											
					} else {
						
					}
				},
				function() {
			
				});
			// if (allnum < 2 || allnum > 2.7) {
			// 	mui.toast('邮寄范围在2到2.7公斤');
			// 	aVariable.btn.btnYouji.disabled = false;
			// } else {
				
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
			warehouseServer.getYunFei(e.detail.addressId,aVariable.params.chandi,function(data) {
					if (data.status == 200) {
						// aVariable.ipt.iptYunfei.innerText=data.data.freight_price;
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

 function clearNoNum(obj) {
	 // console.log(123)
     obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
     obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
     obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
     obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
     if (obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
         obj.value = parseFloat(obj.value);
     }
	 
	 if(obj.value>parseFloat(obj.getAttribute('data-num'))){
		 obj.value=obj.getAttribute('data-num');
	 }
	 
	 // if(obj.value<obj.getAttribute('data-min')){
	 // 		 obj.value=obj.getAttribute('data-min');
	 // }
	 // console.log(obj.id)
	 // var a = document.querySelectorAll("input");
	 // console.log(a.length)
	 // console.log(a[0].id)
	 // console.log(a[0].value)
 }
 
 // function nofind(item) {
 // 	item.src = "../../images/homemenu/bannerOne.jpg";
 // }

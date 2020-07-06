var aFunc = {
	initData: function() {
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				console.log(JSON.stringify(data.data))
				LocalStorage.setItem(LocalStorage.keys.User_Money, data.data.money);
				aVariable.ipt.iptName.innerText = data.data.nick_name;
				aVariable.ipt.iptJifen.innerText = data.data.money;
				aVariable.ipt.iptYue.innerText = data.data.real_money;
				// aVariable.ipt.iptPhone.value = data.data.phone;
				aVariable.ipt.iptImage.src = aServer.ApiUrl + data.data.avatar;
			}
		}, function() {

		});

	},
	blur_name: function() {
		aVariable.ipt.iptName.disabled = true
		aVariable.ipt.iptName.className = 'ipt-n'
		// mui.toast("名字失去焦点")
	},
	blur_phone: function() {
		aVariable.ipt.iptPhone.disabled = true
		aVariable.ipt.iptPhone.className = 'ipt-n'
		// mui.toast("手机号失去焦点")
	},
	bindEvent: function() {
		// //修改手机号
		// aVariable.btn.btnName.addEventListener("tap", function() {
		// 	aVariable.ipt.iptName.disabled=false
		// 	aVariable.ipt.iptName.className='ipt-y'
		// 	setTimeout(function() {
		// 		aVariable.ipt.iptName.focus()
		// 	}, 100);	
		// })
		// //修改手机号
		// aVariable.btn.btnPhone.addEventListener("tap", function() {
		// 	aVariable.ipt.iptPhone.disabled=false
		// 	aVariable.ipt.iptPhone.className='ipt-y'
		// 	setTimeout(function() {
		// 		aVariable.ipt.iptPhone.focus()
		// 	}, 100);
		// })
		//修改个人信息
		aVariable.ipt.iptName.addEventListener("tap", function() {
			mui.openWindow({
				id: "editInfo",
				url: 'information.html'
			});
		})

		aVariable.ipt.iptImage.addEventListener("tap", function() {
			mui.openWindow({
				id: "editInfo",
				url: 'information.html'
			});
		})

		window.addEventListener('refreshJf', function(e) {
			myServer.getUserInfo(function(data) {
				if (data.status == 200) {
					aVariable.ipt.iptJifen.innerText = data.data.money;
					aVariable.ipt.iptYue.innerText = data.data.real_money;
				}
			}, function() {

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
		//待付款
		// aVariable.btn.btnDfk.addEventListener("tap", function() {
		// 	mui.openWindow({
		// 		id: "allOrderOne",
		// 		url: '/view/order/order.html',
		// 		extras: {
		// 			page: 1
		// 		}
		// 	});
		// })
		//已付款
		// aVariable.btn.btnYfk.addEventListener("tap", function() {
		// 	mui.openWindow({
		// 		id: "allOrderTwo",
		// 		url: '/view/order/order.html',
		// 		extras: {
		// 			page: 2
		// 		}
		// 	});
		// })
		//我的积分
		aVariable.btn.btnwdjf.addEventListener("tap", function() {
			mui.openWindow({
				id: "wdjf",
				url: '/view/wallet/wallet.html'
			});
		})

		//我的钱包
		aVariable.btn.btnwdqb.addEventListener("tap", function() {
			// mui.openWindow({
			// 	id: "wdqb",
			// 	url: '/view/wallet/money.html'
			// });
		})

		//我的交易
		// aVariable.btn.btnWdjy.addEventListener("tap", function() {
		// 	mui.openWindow({
		// 		id: "wdjy",
		// 		url: 'wdjy.html'
		// 	});
		// })

		//我的地址
		aVariable.btn.btnWddz.addEventListener("tap", function() {
			mui.openWindow({
				id: "wddz",
				url: '/view/address/address.html'
			});
		})

		//邮寄到家
		aVariable.btn.btnYjdj.addEventListener("tap", function() {
			// mui.toast("暂未开放")
			mui.openWindow({
				id: "yjdj",
				url: '/view/warehouse/yjdj.html'
			});
		})

		//意见反馈
		aVariable.btn.btnYjfk.addEventListener("tap", function() {
			mui.openWindow({
				id: "yjfk",
				url: '/view/sys/idea.html'
			});
		})

		//我的银行卡
		aVariable.btn.btnWdyhk.addEventListener("tap", function() {
			bankServer.getThirdInfo(function(data) {
				if (data.data.isPhoneChecked) {
					mui.openWindow({
						id: "wdyhk",
						url: '/view/my/wdyhk.html'
					});
				} else {
					mui.toast('请先绑定手机号');
					mui.openWindow({
						id: "bdsjh",
						url: '/view/my/phone.html'
					});
				}
			}, function() {

			});
		})

		//绑定手机号
		aVariable.btn.btnBdsjh.addEventListener("tap", function() {
			bankServer.getThirdInfo(function(data) {
				if (data.data.isPhoneChecked) {
					mui.toast('您已绑定过手机号');
				} else {
					mui.openWindow({
						id: "bdsjh",
						url: '/view/my/phone.html'
					});
				}
			}, function() {

			});
		})

		//电子协议
		aVariable.btn.btnDzxy.addEventListener("tap", function() {
			// bankServer.unlock(function(data) {
			// 	console.log(JSON.stringify(data));
			// 	if (data.status == 200) {

			// 	} else {

			// 	}
			// }, function() {

			// });		
			bankServer.createMember(function(data) {
				if (data.status == 200) {
					bankServer.signContract(function(data) {
						if (data.status == 200) {
							mui.openWindow({
								id: "xieyi",
								url: '/view/my/xieyi.html',
								extras: {
									url: data.msg
								}
							});
						} else {

						}
					}, function() {

					});
				} else {

				}
			}, function() {

			});

		})

		//种植明细
		aVariable.btn.btnZzmx.addEventListener("tap", function() {
			mui.openWindow({
				id: "zzmx",
				url: '/view/plant/plant-record.html'
			});
		})

		//修改密码
		aVariable.btn.btnXgmm.addEventListener("tap", function() {
			mui.openWindow({
				id: "xgmm",
				url: '/view/sys/xgmm.html'
			});
		})
		//关于
		aVariable.btn.btnXtsj.addEventListener("tap", function() {
			mui.openWindow({
				id: "xtsj",
				url: '/view/sys/update.html'
			});
		})
		// //帮助中心
		// aVariable.btn.btnBzzx.addEventListener("tap", function() {
		// 	mui.toast("暂未开放")
		// })
		//客服中心
		aVariable.btn.btnKfzx.addEventListener("tap", function() {
			var btnArray = [{
				title: "客服电话:400-9997815"
			}, {
				title: "微信：18663604825"
			}, {
				title: "QQ：1039860457"
			}];
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: btnArray
			}, function(event) {});
		})
		//注销登录
		aVariable.btn.btnZxdl.addEventListener("tap", function() {
			var btnArray = [{
				title: "退出当前账号"
			}, {
				title: "直接关闭应用"
			}];
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: btnArray
			}, function(event) {
				var index = event.index;
				switch (index) {
					case 1:
						//注销帐号
						//						localStorage.clearAll();
						mui.toast("注销登录");
						var wvs = plus.webview.all();

						for (var i = 0,
								len = wvs.length; i < len; i++) {
							if (wvs[i].getURL() != null) {
								if (wvs[i].getURL().indexOf("login") == -1) {
									plus.webview.close(wvs[i]);
								}
							}
						}
						break;
					case 2:
						if (mui.os.ios) {
							mui.toast("注销登录");
							var mainHtml = plus.webview.getWebviewById('index');
							mainHtml.close();
							var loginHtml = plus.webview.getWebviewById('login');
							loginHtml.close();
							mui.openWindow({
								id: 'login',
								url: '/view/sys/login.html',
								extras: {}
							});
							break;
						} else {
							plus.runtime.quit();
							break;
						}
				}
			});
		})
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			plus.screen.lockOrientation("portrait-primary");
		}
		aVariable.webview.current = plus.webview.currentWebview();
		// aVariable.params.noticeId = aVariable.webview.current.noticeId;
		// console.log(aVariable.params.noticeId);
		var page = null;
		page = mui.preload({
			url: 'information.html',
			id: 'editInfo'
		});
		aFunc.initData();
		aFunc.bindEvent();
	}
};

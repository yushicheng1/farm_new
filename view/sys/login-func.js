var isnew = 1;
var aFunc = {
	back: function() {
		mui.back = function(event) {
			aVariable.ipt.backButtonPress++;
			if (aVariable.ipt.backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				aVariable.ipt.backButtonPress = 0;
			}, 1000);
			return false;
		};
	},
	bindEvent: function() {
		aVariable.btn.btnOne.addEventListener('tap', function(event) {
			aVariable.btn.btnOne.style.fontSize = '20px';
			aVariable.btn.btnTwo.style.fontSize = '16px';
			aVariable.btn.btnOne.style.color = '#1c1b1b';
			aVariable.btn.btnTwo.style.color = '#9fb2c7';
			aVariable.btn.btnOne.className = 'tab';
			aVariable.btn.btnTwo.className = 'tab1';
			aVariable.div.itemOne.hidden = '';
			aVariable.div.itemTwo.hidden = 'hidden';
			aVariable.div.divLogin.hidden = '';
			aVariable.div.divRegister.hidden = 'hidden';
		})
		aVariable.btn.btnTwo.addEventListener('tap', function(event) {
			aVariable.btn.btnOne.style.fontSize = '16px';
			aVariable.btn.btnTwo.style.fontSize = '20px';
			aVariable.btn.btnOne.style.color = '#9fb2c7';
			aVariable.btn.btnTwo.style.color = '#1c1b1b';
			aVariable.btn.btnOne.className = 'tab1';
			aVariable.btn.btnTwo.className = 'tab';
			aVariable.div.itemOne.hidden = 'hidden';
			aVariable.div.itemTwo.hidden = '';
			aVariable.div.itemThree.hidden = 'hidden';
			aVariable.div.divLogin.hidden = 'hidden';
			aVariable.div.divRegister.hidden = '';
		})
		aVariable.btn.btnForgetPsw.addEventListener('tap', function(event) {
			mui.openWindow({
				id: 'forget',
				url: 'forget.html'
			});
		})

		aVariable.btn.btnAgreement.addEventListener('tap', function(event) {
			mui.openWindow({
				id: 'agreement',
				url: 'agreement.html'
			});
		})

		aVariable.btn.btnYzm.addEventListener('tap', function(event) {
			aVariable.value.suiji = (Math.random() * 1000000).toFixed(0);
			aVariable.btn.btnYzm.src = 'http://farmapi.yiqianyun.com/api/verify_code?code=' + aVariable.value.suiji;
		})
		//登录验证码
		aVariable.btn.btnCodeNew.addEventListener('tap', function(event) {
			if (aVariable.value.codeNew == true) {
				var phone = aVariable.ipt.iptAccountNew.value;
				if (phone == "") {
					mui.toast("请填写手机号!");
					return;
				}

				if (!(/^1[3456789]\d{9}$/.test(phone))) {
					alert("请输入正确的手机号码");
					return;
				}

				sysServer.getVerify(phone, 'login', function(data) {
					console.log(JSON.stringify(data))
					if (data.status == "400") {
						mui.toast(data.msg);
					} else {

					}
				}, function() {

				});
				aFunc.freshBtnNew(60)
			}
		})

		//注册验证码
		aVariable.btn.btnCode.addEventListener('tap', function(event) {
			if (aVariable.value.code == true) {
				var phone = aVariable.ipt.iptRegisterAccount.value;
				var code = aVariable.ipt.iptImgCode.value;
				if (phone == "") {
					mui.toast("请填写手机号!");
					return;
				}

				if (!(/^1[3456789]\d{9}$/.test(phone))) {
					alert("请输入正确的手机号码");
					return;
				}

				if (code.trim() == '') {
					mui.toast("请填写验证码!");
					return;
				}

				sysServer.getVerify(phone, code, aVariable.value.suiji,'register', function(data) {
					console.log(JSON.stringify(data))
					if (data.status == "400") {
						mui.toast(data.msg);
					} else {
						aFunc.freshBtn(60);
					}
				}, function() {

				});

			}
		})

		//记住密码
		aVariable.ipt.iptChkRem.addEventListener('tap', function(event) {
			if (aVariable.ipt.iptChkRem.checked) {
				LocalStorage.setItem(LocalStorage.keys.Auto_Save, '0');
			} else {
				LocalStorage.setItem(LocalStorage.keys.Auto_Save, '1');
			}
		})
		//登录按钮
		aVariable.btn.btnLogin.addEventListener('tap', function(event) {
			if (parseInt(aVariable.value.version) >= parseInt(aVariable.value.version_new)) {
				if (aVariable.value.loginWay == 'psw') {
					var check = document.getElementById("ipt-chkRem");
					// aVariable.btn.btnLogin.disabled = "disabled";
					var phone = aVariable.ipt.iptAccount.value;
					var password = aVariable.ipt.iptPassword.value;
					if (phone == "") {
						mui.toast("手机号不能为空");
						return;
					}

					if (!(/^1[3456789]\d{9}$/.test(phone))) {
						alert("请输入正确的手机号码");
						return;
					}

					if (password == "" || password.trim().length < 1) {
						mui.toast("密码不能为空");
						return;
					}

					if (password.trim().length < 6 || password.trim().length > 20) {
						mui.toast("请输入6-20位的密码");
						return;
					}

					sysServer.login(phone, password.trim(), 'password', function(data) {
						if (data.status == "200") {
							LocalStorage.clearAll();
							//添加登录后的token本地保存
							if (data.data.token != null) {
								LocalStorage.setItem(LocalStorage.keys.Auth_Token, data.data.token);
								console.log(data.data.token)
								console.log(data.data.expires_time);
								LocalStorage.setItem(LocalStorage.keys.Expires_Time, data.data.expires_time);
							}
							if (check.checked) { //判断记住密码项是否勾选，是则记住密码到本地缓存
								LocalStorage.setItem(LocalStorage.keys.Auto_Save, '1');
								LocalStorage.setItem(LocalStorage.keys.User_Account, phone);
								LocalStorage.setItem(LocalStorage.keys.User_Password, password);
							} else {
								LocalStorage.setItem(LocalStorage.keys.Auto_Save, '0');
								aVariable.ipt.iptAccount.value = '';
								aVariable.ipt.iptPassword.value = '';
							}


							// aVariable.btn.btnLogin.disabled = "";
							// window.location.reload();
							var guideFlag = LocalStorage.getItem(LocalStorage.keys.guideFlag);
							console.log(guideFlag)
							if (guideFlag) {
								mui.openWindow({
									id: 'main',
									url: '../../view/main/main.html',
									waiting: {
										autoShow: true,
										title: '正在加载...'
									}
								});
							} else {
								mui.openWindow({
									id: 'newhand',
									url: '../../view/sys/newhand.html',
									waiting: {
										autoShow: true,
										title: '正在加载...'
									}
								});
							}
						} else {
							mui.toast(data.msg);
							aVariable.btn.btnLogin.disabled = "";
						}
					}, function() {
						aVariable.btn.btnLogin.disabled = "";
						mui.toast("登录失败");
					});
				} else {
					var phone = aVariable.ipt.iptAccountNew.value;
					var password = aVariable.ipt.iptLoginCode.value;
					if (phone == "") {
						mui.toast("手机号不能为空");
						return;
					}

					if (!(/^1[3456789]\d{9}$/.test(phone))) {
						alert("请输入正确的手机号码");
						return false;
					}

					if (password == "") {
						mui.toast("验证码不能为空");
						return;
					}
					sysServer.login(phone, password, 'code', function(data) {
						if (data.status == "200") {
							LocalStorage.clearAll();
							//添加登录后的token本地保存
							if (data.data.token != null) {
								LocalStorage.setItem(LocalStorage.keys.Auth_Token, data.data.token);
							}
							mui.openWindow({
								id: 'index',
								url: '../../index.html'
							});

						} else {
							mui.toast(data.msg);
							aVariable.btn.btnLogin.disabled = "";
						}
					}, function() {
						aVariable.btn.btnLogin.disabled = "";
						mui.toast("登录失败");
					});
				}
			} else {
				if (aVariable.value.version_new == '' || aVariable.value.version_new == null) {
					// mui.toast('')
				} else {
					mui.toast("发现新版本，请到应用商店更新");
					return;
				}
			}

		});

		//注册按钮
		aVariable.btn.btnRegister.addEventListener('tap', function(event) {
			var agree = aVariable.ipt.iptAgree.checked;
			if (agree) {
				var phone = aVariable.ipt.iptRegisterAccount.value;
				var name = aVariable.ipt.iptRegisterName.value;
				var verify = aVariable.ipt.iptRegisterCode.value;
				var passwordOne = aVariable.ipt.iptRegisterPasswordOne.value;
				var passwordTwo = aVariable.ipt.iptRegisterPasswordTwo.value;
				var invite = aVariable.ipt.iptInvite.value;
				if (phone == "" || phone.trim().length < 1) {
					mui.toast("手机号不能为空");
					return;
				}
				if (!(/^1[3456789]\d{9}$/.test(phone))) {
					alert("请输入正确的手机号码");
					return false;
				}
				if (name == "" || name.trim().length < 1) {
					mui.toast("昵称不能为空");
					return;
				}
				if (verify == "") {
					mui.toast("验证码不能为空");
					return;
				}
				if (passwordOne == "" || passwordOne.trim().length < 1) {
					mui.toast("密码不能为空");
					return;
				}
				if (passwordOne.trim().length < 6 || passwordOne.trim().length > 20) {
					mui.toast("请输入6-20位的密码");
					return;
				}
				if (passwordTwo == "" || passwordTwo.trim().length < 1) {
					mui.toast("确认密码不能为空");
					return;
				}
				if (passwordOne != passwordTwo) {
					mui.toast("两次输入密码不一致");
					return;
				}
				sysServer.register(phone, name.trim(), verify, passwordOne.trim(), invite, function(data) {
					if (data.status == "200") {
						mui.toast("注册成功");
						window.location.reload();
					} else {
						mui.toast(data.msg);
					}
				}, function() {
					mui.toast("注册失败");
				});
			} else {
				mui.toast('请先阅读并同意农场注册协议')
			}
		});
	},
	initData: function() {
		var type;
		mui.getJSON("../../manifest.json", null, function(manifest) {
			aVariable.value.version = Number(manifest.version.code);
		});
		console.log(aVariable.value.version);

		if (mui.os.android) {
			type = 0;
			sysServer.checkVersion(type, function(data) {
				var android_version = data.data.version;
				// var android_desc = data.newFeatures;
				aVariable.value.version_new = data.data.version;
				aVariable.value.url = data.data.url;
				// aVariable.value.desc=data.desc;
				if (parseInt(aVariable.value.version) < parseInt(android_version)) {
					//isnew = 0;
					mui.toast('发现新版本，请到应用商店更新');
				} else {
					//自动登录 本地时间与token过期时间比较,  需在版本判断之后
					autoLogin();
				}
			}, function() {});
		} else {
			type = 1;
			sysServer.checkVersion(type, function(data) {
				var ios_version = data.data.version;
				aVariable.value.version_new = data.data.version;
				aVariable.value.url = data.data.url;
				// var ios_desc = data.data.newFeatures;
				aVariable.value.version = 14;
				if (aVariable.value.version < parseInt(ios_version)) {

					var bts = ["确定", "取消"];
					plus.nativeUI.confirm("请到AppStore进行更新", function(e) {
						var i = e.index;
						if (i == 0) {
							plus.runtime.openURL("https://apps.apple.com/cn/app/%E5%A4%A7%E5%86%9C%E4%B8%BB/id1494099375");
						} else {

						}
					}, "版本更新", bts);
				} else {
					autoLogin();
				}
			}, function() {});

		}






		//判断是否记住密码
		var auto_save = LocalStorage.getItem(LocalStorage.keys.Auto_Save);
		if (auto_save == '1') {
			aVariable.ipt.iptChkRem.checked = true;
			var account = LocalStorage.getItem(LocalStorage.keys.User_Account);
			var password = LocalStorage.getItem(LocalStorage.keys.User_Password);
			console.log(account)
			console.log(password)
			if (account && password) {
				aVariable.ipt.iptAccount.value = account;
				aVariable.ipt.iptPassword.value = password;
			}
		} else {
			// aVariable.ipt.iptAccount.value = '';
			// aVariable.ipt.iptPassword.value = '';
		}
		
		var random=Math.random();
		aVariable.value.suiji=(Math.random()*1000000).toFixed(0);
		aVariable.btn.btnYzm.src = 'http://farmapi.yiqianyun.com/api/verify_code?code='+aVariable.value.suiji; 
	},
	plusReady: function() {
		if (mui.os.plus) {
			plus.navigator.closeSplashscreen();
			// plus.screen.lockOrientation("portrait-primary");
			// aVariable.webview.current = plus.webview.currentWebview();
		}
		aFunc.initData();
		// 绑定事件
		aFunc.bindEvent();
		aFunc.back();
	},
	freshBtn: function(num) {
		// console.log(num)
		var getSmsBtn = document.getElementById('btn-code');
		num--;
		if (num == 0) {
			getSmsBtn.innerText = "重新发送";
			aVariable.value.code = true;
			num = 5;
			return false;
		} else {
			//var sec_counts = 120-num;
			aVariable.value.code = false;
			getSmsBtn.innerText = "验证码(" + num + ")";
		}
		setTimeout("aFunc.freshBtn(" + num + ")", 1000);
	},
	freshBtnNew: function(num) {
		console.log(num)
		var getSmsBtn = document.getElementById('btn-code-new');
		num--;
		if (num == 0) {
			getSmsBtn.innerText = "重新发送";
			aVariable.value.codeNew = true;
			num = 5;
			return false;
		} else {
			//var sec_counts = 120-num;
			aVariable.value.codeNew = false;
			getSmsBtn.innerText = "验证码(" + num + ")";
		}
		setTimeout("aFunc.freshBtnNew(" + num + ")", 1000);
	}
};

function autoLogin() {
	var time = Date.parse(new Date()) / 1000;
	var outTime = LocalStorage.getItem(LocalStorage.keys.Expires_Time);
	console.log(outTime);
	console.log(time);
	if (outTime) {
		if (time < outTime) {
			console.log(11111111111111111111111)
			mui.openWindow({
				id: 'main',
				url: '../../view/main/main.html',
				waiting: {
					autoShow: true,
					title: '正在加载...'
				}
			});
		} else {
			mui.toast("自动登录已过期,请重新登录");
			console.log(22222222222222)
		}
	}
}


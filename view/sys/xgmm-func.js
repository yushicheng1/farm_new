var aFunc = {
	initData: function() {
		
	},
	bindEvent: function() {
		aVariable.btn.btnSave.addEventListener("tap", function() {
			var password = aVariable.ipt.iptPassword.value;
			var passwordNew = aVariable.ipt.iptPasswordNew.value;
			var passwordConfirm = aVariable.ipt.iptPasswordConfirm.value;
			
			if (password == '' || password.trim().length == 0) {
				mui.toast('旧密码不能为空');
				return;
			}
			
			if (passwordNew == '' || passwordNew.trim().length == 0) {
				mui.toast('新密码不能为空');
				return;
			}
			
			if (passwordConfirm == '' || passwordConfirm.trim().length == 0) {
				mui.toast('确认密码不能为空');
				return;
			}
			
			if (passwordNew !=passwordConfirm) {
				mui.toast('两次密码输入不一致');
				return;
			}
			

			myServer.updatePwd(password, passwordNew, function(data) {
				if (data.status == 200) {					
					mui.toast(data.msg);
				} else {
					mui.toast('修改密码失败');
				}
				aVariable.ipt.iptPassword.value='';
				aVariable.ipt.iptPasswordNew.value='';
				aVariable.ipt.iptPasswordConfirm.value='';
			}, function() {

			});

		})
	},

	initView: function() {

	},
	plusReady: function() {
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }
		
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

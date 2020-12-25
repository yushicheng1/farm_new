var aFunc = {
	initData: function() {
		aVariable.params.isSubmit = false;
		sysServer.getMyDraw(function(data) {
				console.log(JSON.stringify(data))
				if (data.status == 200) {
					if(data.data.length==0){
						aVariable.params.isSubmit = true;
					}else{
						 aVariable.ipt.iptName.value=data.data.name;
						  aVariable.ipt.iptPhone.value=data.data.phone;
						   aVariable.ipt.iptReason.value=data.data.reason;
						   aVariable.params.isSubmit = false;
					}			
				} else {
					aVariable.params.isSubmit = false;
				}
			},
			function() {
				aVariable.params.isSubmit = false;
			});
	},
	bindEvent: function() {
		aVariable.btn.btnSubmit.addEventListener('tap', function(event) {
			if (!aVariable.params.isSubmit) {
				return;
				}
			var phone = aVariable.ipt.iptPhone.value;
			var name = aVariable.ipt.iptName.value;
			var reason = aVariable.ipt.iptReason.value;
			if (name == "") {
				mui.toast("请填写联系人姓名!");
				return;
			}
			if (phone == "" || phone.trim().length < 1) {
				mui.toast("手机号不能为空");
				return;
			}
			if (!(/^1[3456789]\d{9}$/.test(phone))) {
				alert("请输入正确的手机号码");
				return false;
			}
			if (reason.trim() == "") {
				mui.toast("请填写账号注销原因!");
				return;
			}
			
			var btnArray = ['是', '否'];
			mui.confirm("本操作提交后立即进入账号清退服务且不可撤销，请谨慎操作", "注销清退", btnArray, function(e) {
				if (e.index == 0) {					
					if (aVariable.params.isSubmit) {
						aVariable.params.isSubmit = false;
						sysServer.drawUser(name,phone,reason,function(data) {
								// console.log(JSON.stringify(data))
								if (data.status == 200) {
									mui.toast("提交成功");
									mui.back();
									aVariable.params.isSubmit = true;
								} else {
									aVariable.params.isSubmit = true;
								}
							},
							function() {
								aVariable.params.isSubmit = true;
							});
					}
				} else {
			
				}
			});
		
		})
	},
	plusReady: function() {
		aFunc.initData();
		// aFunc.initView();
		aFunc.bindEvent();
	}
};

var aFunc = {
	initData: function() {
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptTx.src = aServer.ApiUrl + data.data.avatar;
				aVariable.ipt.iptJf.innerText = data.data.money;
			}
		}, function() {

		});
		aVariable.params.landId = '';
		aVariable.params.seedId = '';
	},
	bindEvent: function() {
		aVariable.btn.btnShouye.addEventListener("tap", function() {
			mui.back();
		})

		aVariable.btn.btnWatering.addEventListener("tap", function() {
			var land_id = aVariable.params.landId;
			if (land_id == '') {
				mui.toast('请选择需要浇水的土地!');
				return;
			}
			plantServer.JiaoShui(land_id, function(data) {
					if (data.status == 200) {
						mui.toast(data.msg);
						aVariable.list.page.item_page = 1;
						aVariable.div.divPland.innerHTML = '';
						aFunc.initData();
						document.getElementById('popover').style.display = 'none';
						aFunc.up2Refresh();
						mui('#div_pland1').pullRefresh().refresh(true);
					} else {

					}
				},
				function() {

				});
		})
		aVariable.btn.btnTask.addEventListener("tap", function() {
			var land_id = aVariable.params.landId;
			if (land_id == '') {
				mui.toast('请选择需要施肥的土地!');
				return;
			}
			plantServer.ShiFei(land_id, function(data) {
					if (data.status == 200) {
						mui.toast(data.msg);
						aVariable.list.page.item_page = 1;
						aFunc.initData();
						aVariable.div.divPland.innerHTML = '';
						document.getElementById('popover').style.display = 'none';
						aFunc.up2Refresh();
						mui('#div_pland1').pullRefresh().refresh(true);
					} else {

					}
				},
				function() {

				});
		})
		aVariable.btn.btnOneWater.addEventListener("tap", function() {
			plantServer.JiaoShuiALL(function(data) {
					console.log(JSON.stringify(data))
					if (data.status == 200) {
						mui.toast(data.msg);
						aVariable.list.page.item_page = 1;
						aVariable.div.divPland.innerHTML = '';
						aFunc.initData();
						document.getElementById('popover').style.display = 'none';
						aFunc.up2Refresh();
						mui('#div_pland1').pullRefresh().refresh(true);
					} else {

					}
				},
				function() {

				});
		})
		aVariable.btn.btnOneTask.addEventListener("tap", function() {
			plantServer.ShiFeiAll(function(data) {
					console.log(JSON.stringify(data))
					if (data.status == 200) {
						mui.toast(data.msg);
						aVariable.list.page.item_page = 1;
						aFunc.initData();
						aVariable.div.divPland.innerHTML = '';
						document.getElementById('popover').style.display = 'none';
						aFunc.up2Refresh();
						mui('#div_pland1').pullRefresh().refresh(true);
					} else {

					}
				},
				function() {

				});
		})

		aVariable.btn.btnToucai.addEventListener("tap", function() {
			plantServer.touCai(function(data) {
					mui.toast(data.msg)
				},
				function() {

				});
		})

		window.addEventListener('refreshavatar', function(e) {
			aFunc.initData();
		});

		window.addEventListener('refreshJifen', function(e) {
			myServer.getUserInfo(function(data) {
				if (data.status == 200) {
					aVariable.ipt.iptJf.innerText = data.data.money;
				}
			}, function() {

			});
		});
	},
	up2Refresh: function() {
		setTimeout(function() {
			var pages = aVariable.list.page.item_page;
			var size = aVariable.list.page.item_num;
			plantServer.tuDi(pages, size, function(data) {
					if (data.status == 200) {
						aVariable.list.page.item_page += 1;
						aVariable.div.divPland.innerHTML += aUi.seed.tuDiList(data.data);
						mui('#div_pland1').pullRefresh().endPullupToRefresh(data.data.length < 9)
						mui(aVariable.div.divPland).on("tap", "div", function(e) {
							if (document.getElementsByClassName('mui-plant-land').length > 0) {
								var length = document.getElementsByClassName('mui-plant-land').length;
								for (var i = 0; i < length; i++) {
									document.getElementsByClassName('mui-plant-land')[i].style.border = '0';
								}
							}
							var landId = this.getAttribute('data-landId');
							var seedId = this.getAttribute('data-seedId');
							var name = this.getAttribute('data-name');
							var day = this.getAttribute('data-day');
							aVariable.ipt.iptPlantName.innerText = name;
							aVariable.ipt.iptPlantDay.innerText = day;
							aVariable.params.landId = landId;
							aVariable.params.seedId = seedId;
							this.style.border = 'solid 3px greenyellow';
							mui("#popover").popover('hide')
							mui("#popover").popover('toggle', this)
						});
					} else {

					}
				},
				function() {

				});
		}, 200);
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	initView: function() {
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptJf.innerText = data.data.money;
			}
		}, function() {

		});
	},
	plusReady: function() {
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		// aVariable.webview.current = plus.webview.currentWebview();
		mui.init({
			pullRefresh: {
				container: '#div_pland1',
				up: {
					auto: true,
					contentrefresh: '正在加载...',
					contentnomore: '没有更多土地了',
					callback: aFunc.up2Refresh
				}
			}
		});
		aFunc.initData();
		aFunc.bindEvent();
	}
};


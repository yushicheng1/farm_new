var aFunc = {
	initData: function() {
sysServer.getJiankong(function(data) {
				if (data.status == 200) {
					aVariable.box.jiankongList.innerHTML=aUi.main.jiankongList(data.data);
				} else {
					
				}
			}, function() {

			});
	},
	bindEvent: function() {
       //查看详情
       mui(aVariable.box.scroll).on("tap", "li", function(e) {
       	var url = this.getAttribute("data-url");
       	mui.openWindow({
       		id: "jiankongDetail",
       		url: 'jiankong-detail.html',
       		extras: {
       			url:url
       		}  
       	});
       });
	},
	nofind: function(item) {
		item.src = "../../images/res/slider.png";
	},
	plusReady: function() {
		plus.screen.lockOrientation("portrait-primary-primary");
		aFunc.initData();
		aFunc.bindEvent();
	}
};

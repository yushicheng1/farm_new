var aFunc = {
	initData: function() {
		sysServer.getNotice(function(data) {
			if (data.status == 200) {
				console.log(123)
				aVariable.box.recordList.innerHTML=aUi.notice.noticeList(data.data); 
			} else {
			
			}
		}, function() {
		
		});
	},
	bindEvent: function() {

	},
	initView: function() {

	},
	plusReady: function() {
		aFunc.initData();
		aFunc.bindEvent();
	}
};

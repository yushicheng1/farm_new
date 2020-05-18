mui.init();
mui('.mui-scroll-wrapper').scroll({
	bounce: false,
	indicators: false, //是否显示滚动条
	deceleration: mui.os.ios ? 0.003 : 0.0009 //阻尼系数
});
mui.plusReady(function() {
	var showGuide= true//LocalStorage.getItem(LocalStorage.keys.First_Open);
		if(showGuide){
			if (mui.os.plus) {
				setTimeout(function() {
					mui.plusReady(aFunc.plusReady);
				}, 300);
			} else {
				mui.ready(aFunc.plusReady);
			}
	}else{
		mui.openWindow({
						id: 'welcome',
						url: '/welcome.html',
						extras: {}
			});
	
	}
		
});

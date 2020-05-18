mui.init({
beforeback:function(){
	return false;
}
	//	{
	//	pullRefresh: {
	//		container: "#pullrefreshAPP",
	//		deceleration: 0.0006,
	//		up: {
	//			contentrefresh: "正在加载...",
	//			contentnomore: '',
	//			callback: function() {
	//				var self = this;
	//				self.endPullupToRefresh(false);
	//				setTimeout(function() {
	//					aFunc.openMore(); //进入更多页面
	//				}, 500);
	//			}
	//
	//		},
	//		down: {
	//			contentdown: "下拉可以刷新",
	//			contentover: "释放立即刷新",
	//			contentrefresh: "正在刷新...",
	//			callback: function() {
	////				setTimeout(function() {
	//					console.log(111);
	//					//					aVariable.page = 1;
	//					//					aVariable.isnodata = false;
	//					//					aFunc.loadAppInfo();
	////					aVariable.box.pullrefreshAPP.pullRefresh().endPulldownToRefresh();
	////					aVariable.box.pullrefreshAPP.pullRefresh().refresh(true);
	////				}, 300)
	//			}
	//		}
	//	}
	//}
});
//mui('.mui-scroll-wrapper').scroll({
//	bounce: false,
//	indicators: false, //是否显示滚动条
//	deceleration: mui.os.ios ? 0.003 : 0.0009 //阻尼系数
//});
if(mui.os.plus) {
	setTimeout(function() {
		mui.plusReady(aFunc.plusReady);
	}, 300);
} else {
	mui.ready(aFunc.plusReady);
}
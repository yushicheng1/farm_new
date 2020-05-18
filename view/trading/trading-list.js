// mui.init();
// mui('.mui-scroll-wrapper').scroll({
// 	bounce: true,
// 	indicators: false, //是否显示滚动条
// 	deceleration: mui.os.ios ? 0.003 : 0.0009 //阻尼系数
// });
if (mui.os.plus) {
	setTimeout(function() {
		mui.plusReady(aFunc.plusReady);
	}, 300);
} else {
	mui.ready(aFunc.plusReady);
}
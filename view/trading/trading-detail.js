mui.init();
if (mui.os.plus) {
	setTimeout(function() {
		mui.plusReady(aFunc.plusReady);
	}, 300);
} else {
	mui.ready(aFunc.plusReady);
}
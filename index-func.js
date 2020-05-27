var aFunc = {

	bindEvent: function() {

	},

	initData: function() {

	},
	plusReady: function() {

		aFunc.initLogin();
		// 绑定事件
		aFunc.bindEvent();
		aFunc.initData();


	}
	// initMessage: function() {

	// 	var info = plus.push.getClientInfo();

	// 	// 监听点击消息事件
	// 	plus.push.addEventListener("click", function(msg) {
	// 		//plus.ui.alert(msg.content);
	// 	}, false);
	// 	// 监听在线消息事件
	// 	plus.push.addEventListener("receive", function(msg) {
	// 		if (msg.aps) { // Apple APNS message
	// 			console.log("接收到在线APNS消息：");
	// 		} else {
	// 			console.log("接收到在线透传消息：");
	// 		}
	// 		//			plus.nativeUI.alert(msg.content);
	// 		//创建本地消息
	// 		//			plus.push.createMessage(msg.content, "", {
	// 		//				cover: false
	// 		//			});
	// 		//
	// 		//			mui.openWindow({
	// 		//				id: 'aboutus',
	// 		//				url: '/view/sys/aboutus.html'
	// 		//			});
	// 	});
	// },
	// initPushSetting: function() {
	// 	var mainActivity = plus.android.runtimeMainActivity();
	// 	var notificationManager = mainActivity.getSystemService(Context.NOTIFICATION_SERVICE);
	// 	var appIntent = new Intent(Intent.ACTION_MAIN, null);
	// 	appIntent.addCategory(Intent.CATEGORY_LAUNCHER);
	// 	appIntent.setComponent(new ComponentName(mainActivity, mainActivity.getClass()));
	// 	appIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);

	// 	var contentIntent = PendingIntent.getActivity(mainActivity, 0, appIntent, 0);

	// 	var builder = new Notification.Builder(mainActivity);
	// 	builder.setContentIntent(contentIntent);
	// 	builder.setSmallIcon(17301620);
	// 	builder.setAutoCancel(true);
	// 	//		builder.setContentTitle( & quot; title & quot;);
	// 	//		builder.setContentText( & quot; content & quot;);
	// 	builder.setDefaults(Notification.DEFAULT_ALL);

	// }
};

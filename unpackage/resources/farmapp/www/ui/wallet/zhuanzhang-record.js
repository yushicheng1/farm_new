"use strict";
var aUi = aUi || {};
aUi.record = {
	_record: function(data) {
		var status="审核中";
		if(data.status==1){
			status="已通过";
		}
		// //种植时间
		// var plantTime=formatTime(data.plant_time,'Y-M-D');
		// //到期时间
		// var endTime=formatTime(data.expire_time,'Y-M-D');
		var html= '<li class="mui-table-view-cell mui-media">'+
							'<div class="mui-media-body">'+
								// '<p>'+data.sname+'</p>'+
								'<p>'+
									'<span>卡号:'+data.cardnumber+'</span>'+									
								'</p>'+
								'<p>'+
									'<span>转账时间:'+formatTime(data.add_time,'Y-M-D h:m:s')+'</span>'+
								'</p>'+
								'<p>'+
									'<span>姓名:'+data.realname+'</span>'+									
								'</p>'+
								'<p>'+
									'<span">金额:'+data.number+'</span>'+
								'</p>'+
								'<p>'+
								'<span>验证码:'+data.unique_code+'</span>'+
									'<span style="float: right;">状态:'+status+'</span>'+
								'</p>'+
							'</div>'+
					'</li>';
		return html;
	},
	recordList: function(list4Record) {
		var html = "";
		for(var i = 0; i < list4Record.length; i++) {
			html += this._record(list4Record[i]);
		}
		return html;
	}
}

/** 
 * 时间戳转化为年 月 日 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/  
function formatTime(number,format) {  
  
  var formateArr  = ['Y','M','D','h','m','s'];  
  var returnArr   = [];  
  
  var date = new Date(number * 1000);  
  returnArr.push(date.getFullYear());  
  returnArr.push(formatNumber(date.getMonth() + 1));  
  returnArr.push(formatNumber(date.getDate()));  
  returnArr.push(formatNumber(date.getHours()));  
   returnArr.push(formatNumber(date.getMinutes()));  
   returnArr.push(formatNumber(date.getSeconds())); 
  for (var i in returnArr)  
  {  
    format = format.replace(formateArr[i], returnArr[i]);  
  }  
  return format;  
} 

//数据转化  
function formatNumber(n) {  
  n = n.toString()  
  return n[1] ? n : '0' + n  
}  
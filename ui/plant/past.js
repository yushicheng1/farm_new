"use strict";
var aUi = aUi || {};
aUi.record = {
	_record: function(data) {
		var html= '<li class="mui-table-view-cell mui-media">'+
							'<div class="mui-media-body">'+
								'<p>'+
									'<span>'+data.sname+'</span>'+
									'<span style="float: right;">预计产量:'+data.yield+'</span>'+
								'</p>'+
								'<p>'+
									'<span>种植时间:'+data.plant_time+'</span>'+
									'<span style="float: right;">成熟天数:'+data.ripe_day+'天</span>'+
								'</p>'+
								'<p>'+
									'<span>到期时间:'+data.expire_time+'</span>'+
									'<span style="float: right;">结果天数:'+data.ending_day+'天</span>'+
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
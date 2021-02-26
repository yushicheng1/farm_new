"use strict";
var aUi = aUi || {};
aUi.notice = {
	_notice: function(data) {
		var time=formatTime(data.add_time,'Y-M-D');
		var time1=time.substring(0,4);
		var time2=time.substring(5,10);
		if(data.img==''){
			var html= '<li class="mui-table-view-cell mui-media">'+
							'<div>'+
								'<P style="font-size: 18px;font-weight: 700;padding-top: 5px;">'+data.title+'</P>'+
								'<P style="color: #6d6d6d;padding-top: 8px;">'+data.msg+'</P>'+
							'</div>'+
						'</li>';
			return html;
		}else{
			var html= '<li class="mui-table-view-cell mui-media">'+
							'<div class="mui-content-padded">'+
								'<img src="'+aServer.ApiUrl+data.img+'" style="width: 100%;">'+
							'</div>'+
							'<div>'+
								'<P style="font-size: 18px;font-weight: 700;padding-top: 5px;">'+data.title+'</P>'+
								'<P style="color: #6d6d6d;padding-top: 8px;">'+data.msg+'</P>'+
							'</div>'+
						'</li>';
			return html;
		}

	},
	noticeList: function(list4Record) {
		var html = "";
		for(var i = 0; i < list4Record.length; i++) {
			html += this._notice(list4Record[i]);
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

/**
 * 格式化秒
 * @param int  value 总秒数
 * @return string result 格式化后的字符串
 */
function formatSeconds(value) { 
 var theTime = parseInt(value);// 需要转换的时间秒 
 var theTime1 = 0;// 分 
 var theTime2 = 0;// 小时 
 var theTime3 = 0;// 天
 if(theTime > 60) { 
  theTime1 = parseInt(theTime/60); 
  theTime = parseInt(theTime%60); 
  if(theTime1 > 60) { 
   theTime2 = parseInt(theTime1/60); 
   theTime1 = parseInt(theTime1%60); 
   if(theTime2 > 24){
    //大于24小时
    theTime3 = parseInt(theTime2/24);
    theTime2 = parseInt(theTime2%24);
   }
  } 
 } 
 var result = '';
 if(theTime > 0){
  result = ""+parseInt(theTime)+"秒";
 }
 if(theTime1 > 0) { 
  result = ""+parseInt(theTime1)+"分"+result; 
 } 
 if(theTime2 > 0) { 
  result = ""+parseInt(theTime2)+"小时"+result; 
 } 
 if(theTime3 > 0) { 
  result = ""+parseInt(theTime3)+"天"+result; 
 }
 return result; 
}

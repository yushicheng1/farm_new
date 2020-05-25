"use strict";
var aUi = aUi || {};
aUi.wfh = {
	_wfh: function(data) {
		var name='';
		var vegetables=data.vegetables_detail;
		var img=vegetables[0].img;
		for(var i=0;i<vegetables.length;i++){
			if(i==vegetables.length-1){
				name+=vegetables[i].vegetable_name;
			}else{
				name+=vegetables[i].vegetable_name+'+';
			}			
		}
		var html = '<li class="mui-table-view-cell mui-media mui-collapse-content" data-name="'+data.realname+'" data-phone="'+data.phone+'" data-address="'+data.address+'" data-id="'+data.id+'" data-total="'+data.total_num+'">'+
						'<div class="mui-Received">'+
							'<img class="mui-media-object mui-pull-left" src="'+aServer.ApiUrl+img+'" style="max-width: 80px;height: 80px;border-radius: 10px;"'+
							 'onerror="nofind(this)">'+
							'<div class="mui-media-body">'+
								'<div style="height: 43px;">'+
									'<p style="overflow: hidden;height: 40px;color: #11872a;">'+name+'</p>'+
								'</div>'+
								'<p style="font-size: 13px;color: #000000;"><span>邮寄数量:</span><span style="float: right;font-size: 11px;margin-left: 4px;">公斤</span><span style="float: right;font-size: 15px;">'+data.total_num+'</span></p>'+
								'<p style="font-size: 13px;color: #000000;"><span>配送方式:</span><span style="float:right">快递包邮</span></p>'+
							'</div>'+
						'</div>'+
					'</li>'
		return html;
	},
	wfhList: function(list4Wfh) {
		var html = "";
		for(var i = 0; i < list4Wfh.length; i++) {
			html += this._wfh(list4Wfh[i]);
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

function nofind(item) {
	item.src = "../../images/scl/zhongzi.png";
}
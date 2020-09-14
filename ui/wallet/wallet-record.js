"use strict";
var aUi = aUi || {};
aUi.record = {
	_record: function(data) {
		var pm='';
		if(data.pm==0){
			pm='-';
		}else{
			pm='+'
		}
		var time=formatTime(data.add_time,'Y-M-D h:m     ');
		var src='';
		if(data.type=='buy_seed'){
			src='../../images/jifen/gmzz.png';
		}else if(data.type=='watering'){
			src='../../images/jifen/js.png';
		}else if(data.type=='fertilize'){
			src='../../images/jifen/sf.png';
		}else if(data.type=='onewatering'){
			src='../../images/jifen/yjjs.png';
		}else if(data.type=='onefertilize'){
			src='../../images/jifen/yjsf.png';
		}else if(data.type=='recycle'){
			src='../../images/jifen/xths.png';
		}else if(data.type=='pay_post'){
			src='../../images/jifen/yf.png';
		}else if(data.type=='charge'||data.type=='buy_vegetable'){
			src='../../images/jifen/gm.png';
		}else if(data.type=='reward'){
			src='../../images/jifen/zs.png';
		}else if(data.type=='auto_service'){
			src='../../images/jifen/tuoguan.png';
		}else{
			src='../../images/kongbai.png';
		}
		var html= '<li class="mui-table-view-cell mui-media">'+
		                    '<img src="'+src+'" class="mui-media-object mui-pull-left"/>	'+
							'<div class="mui-media-body">'+
								'<p>'+data.title+'</p>'+
								'<p class="mui-ellipsis">'+
									'<span class="grade">'+time+'</span>'+
								'</p>'+
							'</div>'+
						'<div class="liRight">'+
							'<span style="color: #13D1BE;">'+pm+'</span><span style="color: #13D1BE;">'+data.number+'</span>'+
							'<span class="war">￥</span>'+
						'</div>'+
					'</li>'
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
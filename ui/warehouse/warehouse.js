"use strict";
var aUi = aUi || {};
aUi.warehouse = {
	_warehouse: function(data) {
		//种植时间
		var plantTime=formatTime(data.plant_time,'Y-M-D');
		//收获时间
		var getTime=formatTime(data.get_time,'Y-M-D');
		//剩余时间
		var remaindTime=formatSeconds(data.remaind_time);

		var html = '<li class="mui-table-view-cell mui-collapse">'+
						'<div class="detail">'+
							'<img class="mui-media-object mui-pull-left" src="'+aServer.ApiUrl+data.img+'" style="max-width: 100px;height: 80px;border-radius: 10px;" data-type="0" onerror="nofind(this)">'+
							'<div class="mui-media-body">'+
								'<p><span style="color: green;font-size: 15px;"><b>'+data.name+'</b></span></p>'+
								'<p style="font-size: 13px;"><span>种植日期:</span><span>'+plantTime+'</span></p>'+
								'<p style="font-size: 13px;"><span>收获日期:</span><span>'+getTime+'</span></p>'+
								'<p style="font-size: 13px;"><span>剩余量:</span><span></span>'+data.num+'<span>公斤</span></p>'+
							'</div>'+
						'</div>'+
						// '<span style="font-size: 14px;">剩余</span><span style="font-size: 14px;">'+remaindTime+'</span>'+
						'<a class="mui-navigate-right" style="width: 120px;float: right;font-size: 13px;">查看更多</a>'+
						'<div class="mui-collapse-content" style="width:100%">'+
							'<div class="mui-row mui-text-center navig">'+
								'<div class="mui-col-sm-3 mui-col-xs-3">'+
								'	<img src="../../images/homemenu/yjdj.png" data-type="1" data-id="'+data.id+
								'" data-name="'+data.name+'" data-sum="'+data.num+'" data-plant="'+plantTime+'" data-get="'+getTime+'" data-image="'+data.img+'"/>'+
									'<p>邮寄到家</p>'+
								'</div>'+
								// '<div class="mui-col-sm-3 mui-col-xs-3">'+
								// 	'<img src="../../images/homemenu/gdjydt.png" data-type="2" data-id="'+data.id+'" data-price="'+data.recycle_price+
								// 	'" data-name="'+data.name+'" data-sum="'+data.num+'" data-plant="'+plantTime+'" data-get="'+getTime+'" data-image="'+data.img+'"/>'+
								// 	'<p>挂到交易大厅</p>'+
								// '</div>'+
								'<div class="mui-col-sm-3 mui-col-xs-3 ckecklogin">'+
									'<img src="../../images/homemenu/xths.png" data-type="3" data-id="'+data.id+'" data-price="'+data.recycle_price+
									'" data-name="'+data.name+'" data-sum="'+data.num+'" data-plant="'+plantTime+'" data-get="'+getTime+'" data-image="'+data.img+'" data-count="'+data.recycle_count+'"/>'+
									'<p>系统回收</p>'+
								'</div>'+
								'<div class="mui-col-sm-3 mui-col-xs-3">'+
									'<img src="../../images/homemenu/dq.png" data-type="4" data-id="'+data.id+'"/>'+
									'<p>丢弃</p>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</li>';
		
		return html;
	},
	warehouseList: function(list4Warehouse) {
		var html = "";
		for(var i = 0; i < list4Warehouse.length; i++) {
			html += this._warehouse(list4Warehouse[i]);
		}
		return html;
	},
	_record: function(data) {
		//种植时间
		var time=formatTime(data.time,'Y-M-D h-m-s');
		var type=data.type;
		var bgm=''
		if(type==0){
			bgm='../../images/cangku/bgm_0.png'
		}else if(type==1){
			bgm='../../images/cangku/bgm_1.png'
		}else if(type==2){
			bgm='../../images/cangku/bgm_2.png'
		}else if(type==3){
			bgm='../../images/cangku/bgm_3.png'
		}else if(type==4){
			bgm='../../images/cangku/bgm_4.png'
		}else if(type==5){
			bgm='../../images/cangku/bgm_5.png'
		}else if(type==6){
			bgm='../../images/cangku/bgm_6.png'
		}else if(type==7){
			bgm='../../images/cangku/bgm_7.png'
		}else if(type==8){
			bgm='../../images/cangku/bgm_8.jpg'
		}else{
			bgm='../../images/cangku/bgm_9.png'
		}
	
		var html = '<li class="mui-table-view-cell" style="background-image: url('+bgm+');background-size: 100% 100%;">'+
						'<div class="detail">'+
							'<img class="mui-media-object mui-pull-left" src="'+aServer.ApiUrl+data.img+'" style="max-width: 80px;height: 80px;border-radius: 50%;" onerror="nofind(this)">'+
							'<div class="mui-media-body">'+
								'<p style="margin-top: 8px;"><span style="color: #1e910e;font-size: 18px;">'+data.sname+'</span></p>'+
								'<p style="font-size: 13px;"><span>数量:</span><span>'+data.num+'</span></p>'+
								'<p style="font-size: 13px;"><span>操作时间:</span><span>'+time+'</span></p>'+
							'</div>'+
						'</div>'+
					'</li>';
		return html;
	},
	recordList: function(list4Warehouse) {
		var html = "";
		for(var i = 0; i < list4Warehouse.length; i++) {
			html += this._record(list4Warehouse[i]);
		}
		return html;
	},
	_youJi: function(data) {
		//种植时间
		var plantTime=formatTime(data.plant_time,'Y-M-D');
		//收获时间
		var getTime=formatTime(data.get_time,'Y-M-D');
		//剩余时间
		var remaindTime=formatSeconds(data.remaind_time);
	
		var html = '<li class="mui-table-view-cell mui-collapse" style="background-image: url(../../images/nongchang/wxz.png);background-size: 100% 100%;" data-id="'+data.id+'" data-num="'+data.num+'" data-choose="0">'+
						'<div class="detail">'+
							'<img class="mui-media-object mui-pull-left" src="'+aServer.ApiUrl+data.img+'" style="max-width: 100px;height: 80px;border-radius: 10px;" data-type="0" onerror="nofind(this)">'+
							'<div class="mui-media-body">'+
								'<p><span style="color: green;font-size: 15px;"><b>'+data.name+'</b></span></p>'+
								'<p style="font-size: 13px;"><span>种植日期:</span><span>'+plantTime+'</span></p>'+
								'<p style="font-size: 13px;"><span>收获日期:</span><span>'+getTime+'</span></p>'+
								'<p style="font-size: 13px;"><span>剩余量:</span><span></span>'+data.num+'<span>公斤</span></p>'+
							'</div>'+
						'</div>'+
					'</li>';
		
		return html;
	},
	youJiList: function(list4Warehouse) {
		var html = "";
		for(var i = 0; i < list4Warehouse.length; i++) {
			html += this._youJi(list4Warehouse[i]);
		}
		return html;
	},
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
"use strict";
var aUi = aUi || {};
aUi.tradingList = {
	_tradingList: function(data) {
		//种植时间
		// var plantTime=formatTime(data.plant_time,'Y-M-D');
		// //收获时间
		// var getTime=formatTime(data.get_time,'Y-M-D');
		// var html=  '<li class="mui-table-view-cell mui-media">'+
		// 				'<div>'+
		// 					'<img class="mui-media-object mui-pull-left" src="../../images/homemenu/xhs.jpg" style="max-width: 100px;height: 100px;border-radius: 10px;">'+
		// 					'<div class="mui-media-body">'+
		// 						'<p><span style="color: green;font-size: 18px;"><b>'+data.name+'</b></span></p>'+
		// 						'<p style="color: #FF5053;font-size: 11px;"><span>价格:</span><span>'+data.sales_price+'</span><span>元/斤</span></p>'+
		// 						'<p style="color: black;font-size: 11px;"><span>种植日期:</span><span>'+getTime+'</span></p>'+
		// 						'<p style="color: black;font-size: 11px;"><span>收获日期:</span><span>'+plantTime+'</span></p>'+
		// 						'<p style="color: black;font-size: 11px;"><span>剩余量:</span><span></span>'+data.num+'<span>斤</span>'+
		// 						'</p>'+
		// 					'</div>'+
		// 				'</div>'+
		// 			'</li>';
		
		var html= '<li class="mui-table-view-cell mui-media" style="float: left;">'+
						'<div>'+
							'<img class="img_seed" src="'+aServer.ApiUrl+data.image+'" onerror="nofind(this)">'+
							'<div class="mui-media-body">'+
								'<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span style="color: green;font-size: 13px;"><b>'+data.name+'</b></span></p>'+
								'<p style="color: black;font-size: 11px;"><span>库存:</span><span>'+data.stock+'</span><span>'+data.unit_name+'</span></p>'+
								// '<p style="color: black;font-size: 11px;"><span>收获日期:</span><span>'+getTime+'</span></p>'+
								// '<p style="color: black;font-size: 11px;"><span>剩余量:</span><span></span>'+data.num+'<span>公斤</span>'+
								'<p style="color: #FF5053;font-size: 15px;"><span>'+data.price+'</span><button data-id="'+data.id+'" data-name="'+data.name+'"  data-price="'+data.price+'" data-image="'+data.image+'" data-stock="'+data.stock+'" data-unit="'+data.unit_name+'" data-dis="'+data.description+'" type="button" class="mui-btn mui-btn-outlined btn-seed">购买</button></p>'+							
							'</div>'+
						'</div>'+
					'</li>';
		return html;
	},
	tradingList: function(list4Trading) {
		var html = "";
		for(var i = 0; i < list4Trading.length; i++) {
			html += this._tradingList(list4Trading[i]);
		}
		return html;
	},
	_myTradingList: function(data) {
		//种植时间
		var plantTime=formatTime(data.plant_time,'Y-M-D');
		//收货时间
		var getTime=formatTime(data.get_time,'Y-M-D');
		//上架时间
		var upTime=formatTime(data.create_time,'Y-M-D');
		var html=
		'<li class="mui-table-view-cell mui-media" style="height: 210px;">'+
			'<div>'+
				'<img class="mui-media-object mui-pull-left" src="'+aServer.ApiUrl+data.img+'" style="max-width: 150px;height: 110px;border-radius: 10px;" onerror="nofind(this)">'+
				'<div class="mui-media-body" style="height: 120px;">'+
					'<p style="text-align: center;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span style="color: green;font-size: 14px;"><b>'+data.name+'</b></span></p>'+
					'<p style="text-align: center;"><span>种植日期:</span><span id="ipt_plant">'+plantTime+'</span></p>'+
					'<p style="text-align: center;"><span>收获日期:</span><span id="ipt_get">'+getTime+'</span></p>'+
					'<p style="text-align: center;"><span>上架时间 :</span><span id="ipt_num">'+upTime+'</span></p>'+
					'<p style="text-align: center;margin-top:5px"><button  data-id="'+data.id+'" type="button" class="mui-btn mui-btn-outlined btn-seed">下架</button></p>'+
				'</div>'+
			'</div>'+
			'<div>'+
				'<ul class="mui-table-view" style="">'+
					'<li style="padding: 5px 1px;" class="mui-table-view-cell">'+
						'<span style="float: left;font-size: 14px;">售卖价格:</span><input style="float: right;width: 60%;text-align: right;border: 0;color: #11872a;"'+
						' id="ipt_name" readonly="readonly" value="'+data.sales_price+'" />'+
					'</li>'+
					'<li style="padding: 0px 1px;" class="mui-table-view-cell">'+
						'<span style="float: left;font-size: 14px;">剩余数量:</span><input style="float: right;width: 60%;text-align: right;border: 0;color: #11872a;"'+
						 'id="ipt_phone" readonly="readonly" value="'+data.num+'" />'+
					'</li>'+
				'</ul>'+
			'</div>'+
		'</li>';
		return html;
	},
	myTradingList: function(list4Trading) {
		var html = "";
		for(var i = 0; i < list4Trading.length; i++) {
			html += this._myTradingList(list4Trading[i]);
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

function nofind(item) {
	item.src = "../../images/scl/zhongzi.png";
}
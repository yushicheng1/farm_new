"use strict";
var aUi = aUi || {};
aUi.seed = {
	_tuDi: function(data) {
		//当前时间戳减去种植时间
		var time=parseInt(new Date().getTime()/1000)-data.plant_time;
		var time1=(time/86400)-data.seed.ripe_day;
		var time2;
		var day;		
		if(data.seed.ripe_day==1&&time1<0){
			day=6;
		}else if(data.seed.ripe_day==1&&time1>0){
			//向下取整取余
			 time2=Math.floor(time1)%5;
			 day=5-time2+1;
		}else if(data.seed.ripe_day>1&&time1<0){
			if(time<0){
				day=data.seed.ripe_day;
			}else{
				day=Math.ceil(Math.abs(time1));
			}						
		}else if(data.seed.ripe_day>1&&time1>0){
			//向下取整取余
			 time2=Math.floor(time1)%5;
			 day=5-time2+1;
		}
		
		var status=data.option_status;
		var url;
		if(status==0){
			url='../../images/nongchang/tu2.png';
		}else if(status==1){
			url='../../images/nongchang/tu4.png';
		}else if(status==2){
			url='../../images/nongchang/tu1.png';
		}else if(status==3){
			url='../../images/nongchang/tu3.png';
		}else{
			url='../../images/nongchang/tudi.png';
		}
		var html = '<div class="mui-plant-land" style="background-image: url('+url+');" data-day="'+day+'" data-name="'+data.seed.name+'"  data-landId="'+data.id+'" data-seedId="'+data.seed.id+'">' +
		'<a href="#popover" style="display: block;width:100%;height:100%">'+
			'<img src="'+aServer.ApiUrl+data.level_img+'" class="image1" onerror="nofindZz(this)">' +
			'</a>'+
			'</div>';
		return html;
	},
	tuDiList: function(list4TuDi) {
		var html = "";
		for (var a = 0; a < list4TuDi.length; a++) {
			html += this._tuDi(list4TuDi[a]);
		}
		return html;
	},
	_zhongZi: function(data) {
		var html = '<li class="mui-table-view-cell" style="width: 30%;float: left;" data-num="' + data.num +
			'" data-unique="' + data.spec.unique + '"data-size ="' + data.spec.size + '">' +
			'<div style="height: 19%;text-align: center;font-size: 0.705rem;display: flex;justify-content: center;align-items: center;color:white;font-weight:bold">' +
			data.product_name +
			'</div>' +
			'<div style="height: 56%;display: flex;justify-content: center;align-items: center;">' +
			'<img src="'+aServer.ApiUrl+data.img+'" style="width: 66%;height: 82%;" onerror="nofind(this)">' +
			'</div>' +
			'<div style="height: 19%;padding-right: 12%;">' +
			'<span style="float: right;font-size: 0.825rem;color: red;">' + data.num + '</span>' +
			'</div>' +
			'</li>';
		return html;
	},

	zhongZiList: function(list4ZhongZi) {
		var html = "";
		for (var i = 0; i < list4ZhongZi.length; i++) {
			html += this._zhongZi(list4ZhongZi[i]);
		}
		return html;
	},
	_liBiao: function(data) {
		var html = '<div data-page="' + data.page + '" data-limit="' + data.limit + '">' + '<p style="margin-left: 25px;">' +
			data.product_name + '</p>' +
			'<img src="../../images/cangku/xhs.png" style="width: 70%;height: 70%; margin-left: 10%;margin-top: -10%;" >' +
			'<p style="margin-top: -20px;margin-left: 77%;">5</p>' + '</div>';
		return html;
	},

	liBiaoList: function(list4LiBiao) {
		var html = "";
		for (var i = 0; i < list4LiBiao.length; i++) {
			html += this._liBiao(list4LiBiao[i]);
		}
		return html;
	},
	_tdkc: function(data) {
		//购买时间
		var addTime=formatTime(data.add_time,'Y-M-D');
		//过期时间
		var expireTime=formatTime(data.expire_time,'Y-M-D');
		//剩余面积
		var num=data.num;
		var html = 
		'<li class="mui-table-view-cell mui-media">'+
			'<div>'+
				'<img class="mui-media-object mui-pull-left" src="../../images/cangku/tdbg.png" style="max-width: 80px;height: 80px;border-radius: 10px;">'+
				'<div class="mui-media-body">'+
					'<p style="text-align: center;"><span style="color: #662702;font-size: 1.2rem;">购买时间 '+addTime+'</span></p>'+
					'<p style="text-align: center;;color: #662702;font-size: 1.2rem;"><span>到期时间 '+expireTime+'</span></p>'+
					'<p style="text-align: center;;color: #662702;font-size: 1.2rem;background-image: url(../../images/cangku/tsbg.png);background-size: 100% 100%;background-repeat: no-repeat"><span>您还剩余'+num+'平方米土地</span></p>'+				
				'</div>'+
			'</div>'+
		'</li>';
		return html;
	},
	tdkcList: function(list4TuDi) {
		var html = "";
		for (var a = 0; a < list4TuDi.length; a++) {
			html += this._tdkc(list4TuDi[a]);
		}
		return html;
	},
}

function nofind(item) {
	item.src = "../../images/scl/zhongzi.png";
}

function nofindZz(item) {
	item.src = "../../images/sz/qiezi/faya.png";
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

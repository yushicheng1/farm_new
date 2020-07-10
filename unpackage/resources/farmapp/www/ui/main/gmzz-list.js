"use strict";
var aUi = aUi || {};
aUi.seed = {
	_seedYm: function(data) {
		var chanLiang;
		if(data.ripe_day==1){
			chanLiang=parseFloat((data.ending_day)*data.yield).toFixed(2);
		}else{
			chanLiang=parseFloat((data.ending_day+5)*data.yield).toFixed(2);
		}
		
		var html = 
		'<li class="mui-table-view-cell mui-media" style="float: left;background-image: url('+aServer.ApiUrl+data.img+');background-size: 100% 100%;" data-id="'+data.id+'" data-name="'+data.name+'" data-img="'+data.img+'" data-shengzhang="'+data.ripe_day+'" data-jieguo="'+data.ending_day+'" data-chanliang="'+chanLiang+'">'+
			'<div style="height: 50%;">'+			
			'</div>'+
			'<div style="height: 50%; background:rgba(0, 0, 0, 0.4);filter:alpha(opacity=60);">'+
				'<div style="height: 50%;padding-top: 10px;">'+
					'<p style="font-size: 15px;color: #045586;text-align: center;white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: white 1px 0 0, white 0 1px 0, white -1px 0 0, white 0 -1px 0;">'+data.name+'</p>'+
				'</div>'+
				'<div style="height: 50%;">'+
					'<p style="font-size: 12px;color: white;padding-left: 8%;padding-right: 8%;"><span style="float: left;">产量:'+chanLiang+'</span><span style="float: right;color: #f4c615;">'+data.price+'积分</span></p>'+
				'</div>'+					
			'</div>'+
		'</li>';
		
		return html;
	},
	seedYmList: function(list4Seed) {
		var html = ""; 
		for (var i = 0; i < list4Seed.length; i++) {
			html += this._seedYm(list4Seed[i]);
		}
		return html;
	},
	_seedCs: function(data) {
		var chanLiang=parseFloat(data.ending_day*data.yield).toFixed(2);
		var html = 
		'<li class="mui-table-view-cell mui-media" style="float: left;background-image: url('+aServer.ApiUrl+data.img+');background-size: 100% 100%;" data-id="'+data.id+'" data-name="'+data.name+'" data-img="'+data.img+'" data-shengzhang="'+data.ripe_day+'" data-jieguo="'+data.ending_day+'" data-chanliang="'+chanLiang+'">'+
			'<div style="height: 50%;">'+			
			'</div>'+
			'<div style="height: 50%; background:rgba(0, 0, 0, 0.4);filter:alpha(opacity=60);">'+
				'<div style="height: 50%;padding-top: 10px;">'+
					'<p style="font-size: 16px;color: #045586;text-align: center;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;text-shadow: white 1px 0 0, white 0 1px 0, white -1px 0 0, white 0 -1px 0;">'+data.name+'</p>'+
				'</div>'+
				'<div style="height: 50%;">'+
					'<p style="font-size: 12px;color: white;padding-left: 8%;padding-right: 8%;"><span style="float: left;">产量:'+chanLiang+'</span><span style="float: right;color: #f4c615;">'+data.price+'积分</span></p>'+
				'</div>'+					
			'</div>'+
		'</li>';
		// '<li class="mui-table-view-cell mui-media" style="float: left;">'+
		// 	'<div>'+
		// 		'<img class="img_seed" src="'+aServer.ApiUrl+data.img+'" onerror="nofind(this)">'+
		// 		'<div class="mui-media-body">'+
		// 			'<p><span style="color: green;font-size: 13px;"><b>'+data.name+'</b></span></p>'+
		// 			'<p style="color: black;font-size: 11px;"><span>生长周期:</span><span>'+data.ripe_day+'</span></p>'+
		// 			'<p style="color: black;font-size: 11px;"><span>结果周期:</span><span>'+data.ending_day+'</span></p>'+
		// 			'<p style="color: black;font-size: 11px;"><span>预计产量:</span><span>'+chanLiang+'</span></p>'+
		// 			'<p><span style="color: #FF7272;">'+data.price+'积分</span><button type="button" data-id="'+data.id+'" data-name="'+data.name+'" data-img="'+data.img+'" class="mui-btn mui-btn-outlined btn-seed" style="float: right;">购买</button></p>'+
		// 		'</div>'+
		// 	'</div>'+
		// '</li>';
		return html;
	},
	seedCsList: function(list4Seed) {
		var html = ""; 
		for (var i = 0; i < list4Seed.length; i++) {
			html += this._seedCs(list4Seed[i]);
		}
		return html;
	},
	_hot: function(data) {
		var chanLiang=parseFloat(data.ending_day*data.yield).toFixed(2);
		var html = 
		 '<div class="mui-col-sm-3  mui-col-xs-3 " data-id="'+data.id+'" data-name="'+data.name+'" data-image="'+data.img+'" data-shengzhang="'+data.ripe_day+'" data-jieguo="'+data.ending_day+'" data-chanliang="'+chanLiang+'">'+
			'<img src="'+aServer.ApiUrl+data.img+'" />'+
			'<p>'+data.name+'</p>'+
		'</div>';
		return html;
	},
	hotList: function(list4Seed) {
		var html = "";
		var length=list4Seed.length;
		if(length>4){
			length=4
		}
		for (var i = 0; i < length; i++) {
			html += this._hot(list4Seed[i]);
		}
		return html;
	}
}

function nofind(item) {
	item.src = "../../images/scl/zhongzi.png";
}

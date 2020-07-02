"use strict";
var aUi = aUi || {};
aUi.main = {
	//滚动APP信息
	sliderInfo: function(list4APPInfo) {
		var html4Item = "";
		var html4Indicator = "";
		html4Item += '<div class="mui-slider-item mui-slider-item-duplicate" style="height:190px;"><img  src="' + aServer.ApiUrl + list4APPInfo[list4APPInfo.length - 1].url + '" onerror="nofind(this);" /></a></div>';
		for(var i = 0; i < list4APPInfo.length; i++) {
			html4Item += this._sliderInfoItem(list4APPInfo[i]);
			html4Indicator += '<div class="mui-indicator' + (i == 0 ? ' mui-active' : '') + '"></div>';
		}
		html4Item += '<div class="mui-slider-item mui-slider-item-duplicate" style="height:190px;"><img src="' + aServer.ApiUrl + list4APPInfo[0].url + '" onerror="nofind(this);" /></div>';
	
		return {
			item: html4Item,
			indicator: html4Indicator
		};
	},
	_sliderInfoItem: function(data) {
		var htmlVal = '<div class="mui-slider-item" style="height:190px;"><img style="height:190px;" src="' + aServer.ApiUrl + data.url + '" onerror="nofind(this);" /></div>';
		return htmlVal;
	},
	//监控
	_jiankong: function(data) {	
		var html = 
		'<li class="mui-table-view-cell mui-media" style="float: left;" data-url="'+data.url+'">'+
				'<img src="'+aServer.ApiUrl+data.img+'" >'+			
		'</li>';		
		return html;
	},
	jiankongList: function(list4Jiankong) {
		var html = ""; 
		for (var i = 0; i < list4Jiankong.length; i++) {
			html += this._jiankong(list4Jiankong[i]);
		}
		return html;
	},
}

function nofind(item) {
	item.src = "../../images/homemenu/bannerOne.jpg";
}

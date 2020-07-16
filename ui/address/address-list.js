"use strict";
var aUi = aUi || {};
aUi.address = {
	_address: function(data) {
		var html = '<li class="mui-table-view-cell mui-media" data-id="'+data.id+'"  data-name="'+data.real_name+'" data-phone="'+data.phone+'" data-province="'+data.province+'" data-city="'+data.city+'" data-district="'+data.district+'" data-detail="'+data.detail+'" data-default="'+data.is_default+'" >' +
			'<div class="mui-slider-right mui-disabled">' +
				'<a class="mui-btn mui-btn-red"><span style="font-size: 20px;">删除</span></a>'+
			'</div>' +
			'<div class="mui-slider-handle">' +
			'<a class="mui-navigate-right">' +
			'<img class="mui-media-object mui-pull-left border" src="../../images/homemenu/address.png" style="height: 30px;width: 24px;">' +
			'<div class="mui-media-body">' +
			'<p><span>'+data.real_name+'</span> <span>'+data.phone+'</span></p>' +
			'<p class="mui-ellipsis top8"><span>'+data.province+'</span><span>'+data.city+'</span><span>'+data.district+'</span><span>'+data.detail+'</span></p>' +
			'</div>' +
			'</a>' +
			'</div>' +
			'</li>';
		return html;
	},
	addressList: function(list4Address) {
		var html = "";
		for (var i = 0; i < list4Address.length; i++) {
			html += this._address(list4Address[i]);
		}
		return html;
	},
	_addressNew: function(data) {
		var html = '<li class="mui-table-view-cell mui-media" data-id="'+data.id+'"  data-name="'+data.real_name+'" data-phone="'+data.phone+'" data-province="'+data.province+'" data-city="'+data.city+'" data-district="'+data.district+'" data-detail="'+data.detail+'" data-default="'+data.is_default+'" >' +
			'<div class="mui-slider-right mui-disabled">' +
				'<a class="mui-btn mui-btn-red"><span style="font-size: 20px;">删除</span></a>'+
			'</div>' +
			'<div class="mui-slider-handle">' +
			'<a class="mui-navigate-right">' +
			'<img class="mui-media-object mui-pull-left border" src="../../images/homemenu/address.png" style="height: 30px;width: 24px;">' +
			'<div class="mui-media-body">' +
			'<p><span>'+data.real_name+'</span> <span>'+data.phone+'</span></p>' +
			'<p class="mui-ellipsis top8"><span>'+data.province+'</span><span>'+data.city+'</span><span>'+data.district+'</span><span>'+data.detail+'</span></p>' +
			'</div>' +
			'</a>' +
			'</div>' +
			'</li>';
		return html;
	},
	addressListNew: function(list4Address) {
		var html = "";
		for (var i = 0; i < list4Address.length; i++) {
			html += this._addressNew(list4Address[i]);
		}
		var ziti='<li class="mui-table-view-cell mui-media" data-id="0"  data-name="次日自提" data-phone="15615963133(物流客服)" data-province="" data-city="" data-district="" data-detail="前阙番茄大世界南门(8点-11.30,13.30-18点)" data-default="" >' +
			'<div class="mui-slider-handle">' +
			'<a class="mui-navigate-right">' +
			'<img class="mui-media-object mui-pull-left border" src="../../images/homemenu/address.png" style="height: 30px;width: 24px;">' +
			'<div class="mui-media-body">' +
			'<p><span>自提</span><span> 15615963133物流客服</span></p>' +
			'<p class="mui-ellipsis top8"><span>前阙番茄大世界南门(8点-11.30,13.30-18点)</span></p>' +
			'</div>' +
			'</a>' +
			'</div>' +
			'</li>';
		return ziti+html;
	}
}

"use strict";
var aUi = aUi || {};
aUi.bank = {
	_bank: function(data) {
		var html = '<li class="mui-table-view-cell mui-media" style="height: 150px;background-image: url(../../images/tixian/bgm_1.png);background-size: 100% 100%;">'+
						'<div style="height: 60%;padding-top: 7%;">'+
							'<p style="color: white;font-size: 25px;">'+data.bankname+'</p>'+
						'</div>'+
						'<div style="height: 40%;">'+
							'<p style="color: white;font-size: 23px;text-align: center;letter-spacing: 1.5px;">'+data.cardnumber+'</p>'+
						'</div>'+
					'</li>';
		return html;
	},
	bankList: function(list4Bank) {
		var html = "";
		for (var i = 0; i < list4Bank.length; i++) {
			html += this._bank(list4Bank[i]);
		}
		return html;
	},
	
	_bankOne: function(data) {
		
		var html = '<li class="mui-table-view-cell" style="color: #000000;" data-type="3" data-phone="'+data.phone+'" data-cardId="'+data.id+'" data-no="'+data.cardnumber+'" data-name="'+data.bankname+'">'+
					'<a class="mui-navigate-right">'+data.bankname+'('+data.cardnumber.substring(data.cardnumber.length-4) +')'+'</a>'+
				'</li>';
		return html;
	},
	bankOneList: function(list4Bank) {
		var html = "";
		for (var i = 0; i < list4Bank.length; i++) {
			html += this._bankOne(list4Bank[i]);
		}
		return html;
	}
}
